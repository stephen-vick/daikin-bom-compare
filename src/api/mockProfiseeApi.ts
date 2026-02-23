import type { BomNode, BomVersion } from '../types/bom'
import { cloneTree } from '../utils/treeUtils'

interface ProductMaster {
  products: Array<{
    productId: string
    modelNumber: string
    productCategory: string
    lifecycleStatus: string
    packaging?: { uom?: string }
    lastUpdatedUtc: string
  }>
}

interface InstalledBase {
  systems: Array<{
    systemId: string
    customerType: string
    installedBase: {
      outdoorUnit?: ComponentRef | null
      indoorUnit?: ComponentRef | null
      indoorCoil?: ComponentRef | null
      thermostat?: {
        model?: string | null
        connected?: boolean
      } | null
    }
    commissioning?: {
      installedDate?: string
    }
  }>
}

interface ComponentRef {
  productId?: string
  modelNumber?: string
  serialNumber?: string
  type?: string
}

async function loadJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load mock data from ${url}`)
  }
  return (await response.json()) as T
}

function buildNodeFromComponent(
  idPrefix: string,
  label: string,
  component: ComponentRef | null | undefined,
  productMap: Map<string, ProductMaster['products'][number]>,
  sourceSystem: string,
  effectiveDate: string,
): BomNode | null {
  if (!component) {
    return null
  }

  const product = component.productId ? productMap.get(component.productId) : undefined
  const partNumber = component.modelNumber ?? component.productId ?? `${idPrefix}-UNKNOWN`

  return {
    id: `${idPrefix}-${partNumber}`,
    partNumber,
    description: product?.productCategory ?? component.type ?? label,
    quantity: 1,
    uom: product?.packaging?.uom ?? 'EA',
    effectiveDate,
    sourceSystem,
    status: product?.lifecycleStatus ?? 'Active',
    children: [],
    metadata: {
      role: label,
      productId: component.productId,
      serialNumber: component.serialNumber,
    },
  }
}

function buildBaseTree(
  system: InstalledBase['systems'][number],
  productMap: Map<string, ProductMaster['products'][number]>,
): BomNode {
  const effectiveDate = system.commissioning?.installedDate ?? '2026-01-01'
  const rootProductId = system.installedBase.outdoorUnit?.productId
  const rootProduct = rootProductId ? productMap.get(rootProductId) : undefined
  const rootPart = system.installedBase.outdoorUnit?.modelNumber ?? rootProductId ?? system.systemId
  const sourceSystem = 'PLM'

  const children: BomNode[] = []
  const outdoor = buildNodeFromComponent(
    `${system.systemId}-outdoor`,
    'Outdoor Unit',
    system.installedBase.outdoorUnit,
    productMap,
    sourceSystem,
    effectiveDate,
  )
  const indoor = buildNodeFromComponent(
    `${system.systemId}-indoor`,
    'Indoor Unit',
    system.installedBase.indoorUnit,
    productMap,
    sourceSystem,
    effectiveDate,
  )
  const coil = buildNodeFromComponent(
    `${system.systemId}-coil`,
    'Indoor Coil',
    system.installedBase.indoorCoil,
    productMap,
    sourceSystem,
    effectiveDate,
  )

  if (outdoor) children.push(outdoor)
  if (indoor) children.push(indoor)
  if (coil) children.push(coil)

  if (system.installedBase.thermostat) {
    children.push({
      id: `${system.systemId}-thermostat`,
      partNumber: system.installedBase.thermostat.model ?? 'THERMO-UNKNOWN',
      description: 'Thermostat',
      quantity: 1,
      uom: 'EA',
      effectiveDate,
      sourceSystem,
      status: system.installedBase.thermostat.connected ? 'Connected' : 'Non-Connected',
      children: [],
      metadata: {
        connected: system.installedBase.thermostat.connected ?? false,
      },
    })
  }

  return {
    id: `${system.systemId}-root`,
    partNumber: rootPart,
    description: rootProduct?.productCategory ?? `${system.customerType} System`,
    quantity: 1,
    uom: rootProduct?.packaging?.uom ?? 'EA',
    effectiveDate,
    sourceSystem,
    status: rootProduct?.lifecycleStatus ?? 'Released',
    children,
    metadata: {
      systemId: system.systemId,
      productId: rootProductId,
      customerType: system.customerType,
    },
  }
}

function buildMockVersions(baseRoot: BomNode): BomVersion[] {
  const ebomRoot = cloneTree(baseRoot)

  const mbomRoot = cloneTree(baseRoot)
  mbomRoot.sourceSystem = 'ERP'
  if (mbomRoot.children[1]) {
    mbomRoot.children[1].quantity = 2
    mbomRoot.children[1].status = 'Draft'
  }

  const serviceRoot = cloneTree(baseRoot)
  serviceRoot.sourceSystem = 'MDM'
  serviceRoot.status = 'Active Service'
  if (serviceRoot.children[0]) {
    serviceRoot.children[0].status = 'Replaced'
  }
  serviceRoot.children.push({
    id: `${serviceRoot.id}-service-filter`,
    partNumber: 'FLT-SERVICE-KIT',
    description: 'Service Filter Kit',
    quantity: 1,
    uom: 'EA',
    effectiveDate: serviceRoot.effectiveDate,
    sourceSystem: 'MDM',
    status: 'Installed',
    children: [],
    metadata: { serviceAction: 'AddedDuringService' },
  })

  return [
    {
      type: 'EBOM',
      label: 'Engineering BOM',
      sourceSystem: 'PLM',
      lastUpdated: new Date().toISOString(),
      editableInMdm: false,
      root: ebomRoot,
    },
    {
      type: 'MBOM',
      label: 'Manufacturing BOM',
      sourceSystem: 'ERP',
      lastUpdated: new Date().toISOString(),
      editableInMdm: false,
      root: mbomRoot,
    },
    {
      type: 'SERVICE',
      label: 'Service BOM',
      sourceSystem: 'MDM',
      lastUpdated: new Date().toISOString(),
      editableInMdm: true,
      root: serviceRoot,
    },
  ]
}

export async function fetchMockBomVersions(): Promise<BomVersion[]> {
  const [installedBase, productMaster] = await Promise.all([
    loadJson<InstalledBase>('/data/daikin_ct_installed_base_large.json'),
    loadJson<ProductMaster>('/data/daikin_ct_product_master_large.json'),
  ])

  if (!installedBase.systems?.length) {
    throw new Error('No systems found in installed base dataset')
  }

  const productMap = new Map(productMaster.products.map((product) => [product.productId, product]))
  const baseTree = buildBaseTree(installedBase.systems[0], productMap)
  return buildMockVersions(baseTree)
}
