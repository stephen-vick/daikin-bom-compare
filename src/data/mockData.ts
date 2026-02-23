import type { BomNode, BomVersion, Product } from '../types/bom'

function n(
  id: string,
  partNumber: string,
  description: string,
  quantity: number,
  children: BomNode[] = [],
  supplier?: string,
): BomNode {
  return { id, partNumber, description, quantity, uom: 'EA', children, supplier }
}

const ebomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, [
  n('assy-comp', 'ASSY-COMP-060', 'Compressor Section', 1, [
    n('comp-scroll', 'ZP51K5E-PFV', 'Scroll Compressor \u2014 51K BTU', 1),
    n('comp-mounts', 'MNT-RBR-4PK', 'Vibration Isolation Mounts', 4),
    n('comp-valve', 'VLV-SVC-038', 'Service Valve \u2014 3/8\u2033 Flare', 2),
    n('comp-heater', 'HTR-CRK-060', 'Crankcase Heater \u2014 60W', 1),
    n('comp-sensor', 'SENS-DISCH-T1', 'Discharge Temperature Sensor', 1),
    n('comp-proto', 'SENS-PROTO-X1', 'Prototype Vibration Sensor', 1),
    n('comp-harness', 'HARN-COMP-060', 'Compressor Wiring Harness', 1),
    n('comp-bracket', 'BRK-MTG-060', 'Compressor Mounting Bracket', 1),
    n('comp-gasket', 'GSK-COMP-SET', 'Compressor Gasket Set', 1),
    n('comp-blanket', 'INS-COMP-BLK', 'Compressor Insulation Blanket', 1),
  ]),
  n('assy-cond', 'ASSY-COND-060', 'Condenser Coil Assembly', 1, [
    n('cond-coil', 'COIL-COND-060', 'Micro-Channel Condenser Coil', 1),
    n('cond-fan', 'FAN-COND-24', 'Condenser Fan Motor \u2014 1/4 HP', 1),
    n('cond-blade', 'BLD-FAN-26', 'Fan Blade \u2014 26\u2033 Diameter', 1),
    n('cond-grille', 'GRL-FAN-TOP', 'Fan Guard / Top Grille', 1),
    n('cond-cap', 'CAP-RUN-440', 'Run Capacitor \u2014 40\u00b5F 440VAC', 1),
    n('cond-bearing', 'BRG-FAN-060', 'Fan Motor Bearing Assembly', 2),
    n('cond-shroud', 'SHR-COND-060', 'Condenser Shroud', 1),
    n('cond-screws', 'SCR-COND-SET', 'Coil Mounting Screw Set', 1),
    n('cond-therm', 'THM-AMB-060', 'Ambient Temperature Sensor', 1),
  ]),
  n('assy-refr', 'ASSY-REFR-060', 'Refrigerant Circuit', 1, [
    n('refr-txv', 'TXV-060-R410', 'Thermostatic Expansion Valve', 1),
    n('refr-drier', 'FLT-DRI-083', 'Filter Drier \u2014 3/8\u2033 ODS', 1),
    n('refr-sight', 'SGL-LIQ-038', 'Liquid Line Sight Glass', 1),
    n('refr-accum', 'ACC-SUCT-060', 'Suction Line Accumulator', 1),
    n('refr-rev', 'RVS-VLV-060', 'Reversing Valve \u2014 4-Way', 1),
    n('refr-charge', 'CHG-R410A', 'R-410A Refrigerant Charge', 12),
    n('refr-braze', 'BRZ-CU-SET', 'Brazing Alloy Kit', 1),
    n('refr-insul', 'INS-SUCT-060', 'Suction Line Insulation', 1),
    n('refr-clamp', 'CLP-PIPE-SET', 'Pipe Clamp Set', 1),
    n('refr-schrader', 'SCH-VALVE-060', 'Schrader Valve Core Set', 2),
  ]),
  n('assy-struc', 'ASSY-STRUC-060', 'Structural / Cabinet', 1, [
    n('struc-bolt', 'BLT-M8X40-SS', 'Bolt M8\u00d740 \u2014 Stainless', 24),
    n('struc-nut', 'NUT-M8-SS', 'Nut M8 \u2014 Stainless', 24),
    n('struc-panel-l', 'PNL-ACC-060', 'Access Panel \u2014 Left', 1),
    n('struc-panel-r', 'PNL-ACC-R60', 'Access Panel \u2014 Right', 1),
    n('struc-washer', 'WSH-M8-SS', 'Washer M8 \u2014 Stainless', 48),
    n('struc-feet', 'FT-ANTI-VIB', 'Anti-Vibration Feet (4-Pack)', 1),
    n('struc-label', 'LBL-RATING', 'Rating Plate / Nameplate', 1),
    n('struc-paint', 'PNT-COMP-WHT', 'Powder Coat \u2014 Daikin White', 1),
  ]),
])

const mbomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, [
  n('assy-comp', 'ASSY-COMP-060', 'Compressor Section', 1, [
    n('comp-scroll', 'ZP54K5E-PFV', 'Scroll Compressor \u2014 54K BTU (Upgraded)', 1),
    n('comp-mounts', 'MNT-RBR-4PK', 'Vibration Isolation Mounts', 4),
    n('comp-valve', 'VLV-SVC-038', 'Service Valve \u2014 3/8\u2033 Flare', 2),
    n('comp-heater', 'HTR-CRK-060', 'Crankcase Heater \u2014 60W', 1),
    n('comp-sensor', 'SENS-DISCH-T1', 'Discharge Temperature Sensor', 1),
    n('comp-harness', 'HARN-COMP-060', 'Compressor Wiring Harness', 1),
    n('comp-bracket', 'BRK-MTG-060', 'Compressor Mounting Bracket', 1),
    n('comp-gasket', 'GSK-COMP-SET', 'Compressor Gasket Set', 1),
    n('comp-blanket', 'INS-COMP-BLK', 'Compressor Insulation Blanket', 1),
  ]),
  n('assy-cond', 'ASSY-COND-060', 'Condenser Coil Assembly', 1, [
    n('cond-coil', 'COIL-COND-060', 'Micro-Channel Condenser Coil', 1),
    n('cond-fan', 'FAN-COND-24', 'Condenser Fan Motor \u2014 1/4 HP', 1),
    n('cond-blade', 'BLD-FAN-26', 'Fan Blade \u2014 26\u2033 Diameter', 1),
    n('cond-grille', 'GRL-FAN-TOP', 'Fan Guard / Top Grille', 1),
    n('cond-cap', 'CAP-RUN-445', 'Run Capacitor \u2014 45\u00b5F 440VAC (Alt Source)', 1, [], 'Kemet'),
    n('cond-bearing', 'BRG-FAN-060', 'Fan Motor Bearing Assembly', 2),
    n('cond-shroud', 'SHR-COND-060', 'Condenser Shroud', 1),
    n('cond-screws', 'SCR-COND-SET', 'Coil Mounting Screw Set', 1),
    n('cond-therm', 'THM-AMB-060', 'Ambient Temperature Sensor', 1),
  ]),
  n('assy-refr', 'ASSY-REFR-060', 'Refrigerant Circuit', 1, [
    n('refr-txv', 'TXV-060-R410', 'Thermostatic Expansion Valve', 1),
    n('refr-drier', 'FLT-DRI-083', 'Filter Drier \u2014 3/8\u2033 ODS', 1),
    n('refr-sight', 'SGL-LIQ-038', 'Liquid Line Sight Glass', 1),
    n('refr-accum', 'ACC-SUCT-060', 'Suction Line Accumulator', 1),
    n('refr-rev', 'RVS-VLV-060', 'Reversing Valve \u2014 4-Way', 1),
    n('refr-charge', 'CHG-R410A', 'R-410A Refrigerant Charge', 12.5),
    n('refr-braze', 'BRZ-CU-SET', 'Brazing Alloy Kit', 1),
    n('refr-insul', 'INS-SUCT-060', 'Suction Line Insulation', 1),
    n('refr-clamp', 'CLP-PIPE-SET', 'Pipe Clamp Set', 1),
    n('refr-schrader', 'SCH-VALVE-060', 'Schrader Valve Core Set', 2),
  ]),
  n('assy-struc', 'ASSY-STRUC-060', 'Structural / Cabinet', 1, [
    n('struc-bolt', 'BLT-M8X40-SS', 'Bolt M8\u00d740 \u2014 Stainless', 28),
    n('struc-nut', 'NUT-M8-SS', 'Nut M8 \u2014 Stainless', 28),
    n('struc-panel-l', 'PNL-ACC-060', 'Access Panel \u2014 Left', 1),
    n('struc-panel-r', 'PNL-ACC-R60', 'Access Panel \u2014 Right', 1),
    n('struc-washer', 'WSH-M8-SS', 'Washer M8 \u2014 Stainless', 48),
    n('struc-feet', 'FT-ANTI-VIB', 'Anti-Vibration Feet (4-Pack)', 1),
    n('struc-label', 'LBL-RATING', 'Rating Plate / Nameplate', 1),
    n('struc-paint', 'PNT-COMP-WHT', 'Powder Coat \u2014 Daikin White', 1),
    n('struc-jig-braze', 'JIG-BRAZE-060', 'Brazing Fixture \u2014 Refrigerant Lines', 1),
    n('struc-jig-chk', 'JIG-CHK-060', 'Leak Check Fixture', 1),
  ]),
])

const serviceBomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, [
  n('assy-comp', 'ASSY-COMP-060', 'Compressor Section', 1, [
    n('comp-scroll', 'ZP54K5E-PFV', 'Scroll Compressor \u2014 54K BTU (Upgraded)', 1),
    n('comp-mounts', 'MNT-RBR-4PK', 'Vibration Isolation Mounts', 4),
    n('comp-valve', 'VLV-SVC-038', 'Service Valve \u2014 3/8\u2033 Flare', 2),
    n('comp-heater', 'HTR-CRK-060', 'Crankcase Heater \u2014 60W', 1),
    n('comp-sensor', 'SENS-DISCH-T1', 'Discharge Temperature Sensor', 1),
    n('comp-harness', 'HARN-COMP-060', 'Compressor Wiring Harness', 1),
    n('comp-bracket', 'BRK-MTG-060', 'Compressor Mounting Bracket', 1),
    n('comp-gasket', 'GSK-COMP-SET', 'Compressor Gasket Set', 1),
    n('comp-blanket', 'INS-COMP-BLK', 'Compressor Insulation Blanket', 1),
    n('comp-svc-kit', 'SVC-COMP-KIT', 'Compressor Service Kit', 1),
  ]),
  n('assy-cond', 'ASSY-COND-060', 'Condenser Coil Assembly', 1, [
    n('cond-coil', 'COIL-COND-060', 'Micro-Channel Condenser Coil', 1),
    n('cond-fan', 'FAN-COND-24', 'Condenser Fan Motor \u2014 1/4 HP', 1),
    n('cond-blade', 'BLD-FAN-26', 'Fan Blade \u2014 26\u2033 Diameter', 1),
    n('cond-grille', 'GRL-FAN-TOP', 'Fan Guard / Top Grille', 1),
    n('cond-cap', 'CAP-RUN-445', 'Run Capacitor \u2014 45\u00b5F 440VAC (Alt Source)', 1, [], 'Kemet'),
    n('cond-bearing', 'BRG-FAN-060', 'Fan Motor Bearing Assembly', 2),
    n('cond-shroud', 'SHR-COND-060', 'Condenser Shroud', 1),
    n('cond-screws', 'SCR-COND-SET', 'Coil Mounting Screw Set', 1),
    n('cond-therm', 'THM-AMB-060', 'Ambient Temperature Sensor', 1),
  ]),
  n('assy-refr', 'ASSY-REFR-060', 'Refrigerant Circuit', 1, [
    n('refr-txv', 'TXV-060-R410', 'Thermostatic Expansion Valve', 1),
    n('refr-drier', 'FLT-DRI-083', 'Filter Drier \u2014 3/8\u2033 ODS', 1),
    n('refr-sight', 'SGL-LIQ-038', 'Liquid Line Sight Glass', 1),
    n('refr-accum', 'ACC-SUCT-060', 'Suction Line Accumulator', 1),
    n('refr-rev', 'RVS-VLV-060', 'Reversing Valve \u2014 4-Way', 1),
    n('refr-charge', 'CHG-R410A', 'R-410A Refrigerant Charge', 12.5),
    n('refr-braze', 'BRZ-CU-SET', 'Brazing Alloy Kit', 1),
    n('refr-insul', 'INS-SUCT-060', 'Suction Line Insulation', 1),
    n('refr-clamp', 'CLP-PIPE-SET', 'Pipe Clamp Set', 1),
    n('refr-schrader', 'SCH-VALVE-060', 'Schrader Valve Core Set', 2),
  ]),
  n('assy-struc', 'ASSY-STRUC-060', 'Structural / Cabinet', 1, [
    n('struc-bolt', 'BLT-M8X40-SS', 'Bolt M8\u00d740 \u2014 Stainless', 28),
    n('struc-nut', 'NUT-M8-SS', 'Nut M8 \u2014 Stainless', 28),
    n('struc-panel-l', 'PNL-ACC-060', 'Access Panel \u2014 Left', 1),
    n('struc-panel-r', 'PNL-ACC-R60', 'Access Panel \u2014 Right', 1),
    n('struc-washer', 'WSH-M8-SS', 'Washer M8 \u2014 Stainless', 48),
    n('struc-feet', 'FT-ANTI-VIB', 'Anti-Vibration Feet (4-Pack)', 1),
    n('struc-label', 'LBL-RATING', 'Rating Plate / Nameplate', 1),
    n('struc-paint', 'PNT-COMP-WHT', 'Powder Coat \u2014 Daikin White', 1),
  ]),
])

const dx20vcVersions: BomVersion[] = [
  {
    id: 'ebom-v3.2',
    type: 'EBOM',
    label: 'E-BOM v3.2',
    dropdownLabel: 'E-BOM v3.2 \u2014 Windchill PLM',
    meta: {
      version: 'E-BOM v3.2',
      sourceSystem: 'Windchill PLM',
      status: 'Released',
      effectiveDate: '2026-01-15',
      owner: 'J. Tanaka (Engineering Lead)',
    },
    root: ebomRoot,
    nodeCount: 42,
  },
  {
    id: 'mbom-v1.0',
    type: 'MBOM',
    label: 'M-BOM v1.0',
    dropdownLabel: 'M-BOM v1.0 \u2014 SAP S/4HANA',
    meta: {
      version: 'M-BOM v1.0',
      sourceSystem: 'SAP S/4HANA',
      status: 'In Review',
      effectiveDate: '2026-02-01',
      owner: 'M. Rodriguez (Manufacturing Engineer)',
    },
    root: mbomRoot,
    nodeCount: 43,
  },
  {
    id: 'svc-v2.0',
    type: 'SERVICE',
    label: 'Service BOM v2.0',
    dropdownLabel: 'Service BOM v2.0 \u2014 Prophecy MDM',
    meta: {
      version: 'Service BOM v2.0',
      sourceSystem: 'Prophecy MDM',
      status: 'Active',
      effectiveDate: '2026-02-10',
      owner: 'K. Patel (Service Manager)',
    },
    root: serviceBomRoot,
    nodeCount: 44,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'dx20vc-060',
    modelNumber: 'DX20VC-060',
    description: '5-Ton Variable-Speed Split System Heat Pump',
    versions: dx20vcVersions,
  },
  {
    id: 'dx16vc-036',
    modelNumber: 'DX16VC-036',
    description: '3-Ton Variable-Speed Split System Heat Pump',
    versions: dx20vcVersions,
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getVersion(productId: string, versionId: string): BomVersion | undefined {
  return getProduct(productId)?.versions.find((v) => v.id === versionId)
}
