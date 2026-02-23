import type { BomNode, BomVersion, Product } from '../types/bom'

function n(
  id: string,
  partNumber: string,
  description: string,
  quantity: number,
  uom: string,
  category: string,
  children: BomNode[] = [],
  overrides: Partial<BomNode> = {},
): BomNode {
  return {
    id, partNumber, description, quantity, uom, category,
    children,
    supplier: '', lifecycleStatus: 'Active', isReplaceable: false, warrantyMonths: 12,
    ...overrides,
  }
}

// ── DX20VC-060 E-BOM ──
const ebomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, 'EA', 'Assembly', [
  n('assy-comp', 'COMP-ASY-100', 'Compressor Assembly', 1, 'EA', 'Subassembly', [
    n('comp-scroll', 'ZP51K5E-PFV', 'Scroll Compressor 51K BTU', 1, 'EA', 'Component', [], { supplier: 'Copeland', isReplaceable: true, warrantyMonths: 60 }),
    n('comp-motor', 'MTR-3PH-5HP', 'Compressor Motor 5HP 3-Phase', 1, 'EA', 'Component', [], { supplier: 'Nidec' }),
    n('comp-bracket', '326-0123-01', 'Compressor Mounting Bracket', 1, 'EA', 'Component'),
    n('comp-vib', 'VIB-ISO-M8', 'Vibration Isolator M8', 4, 'EA', 'Component', [], { isReplaceable: true }),
    n('comp-oil', 'OIL-POE-32', 'POE Lubricant 32oz', 1, 'EA', 'Consumable', [], { supplier: 'Nu-Calgon' }),
  ]),
  n('assy-cond', 'COND-ASY-200', 'Condenser Coil Assembly', 1, 'EA', 'Subassembly', [
    n('cond-coil', 'COIL-AL-5T', 'Aluminum Fin Condenser Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('cond-fan', 'FAN-AXIAL-24', '24" Axial Condenser Fan', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('cond-motor', 'MTR-FAN-1/3', 'Fan Motor 1/3 HP ECM', 1, 'EA', 'Component', [], { supplier: 'Genteq' }),
    n('cond-grille', 'GRILLE-TOP', 'Top Discharge Grille Assembly', 1, 'EA', 'Component'),
    n('cond-guard', 'GUARD-FAN-24', '24" Fan Guard Wire', 1, 'EA', 'Component'),
  ]),
  n('assy-evap', 'EVAP-ASY-300', 'Evaporator Coil Assembly', 1, 'EA', 'Subassembly', [
    n('evap-coil', 'COIL-CU-5T', 'Copper Tube Evaporator Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('evap-pan', 'PAN-DRAIN-SS', 'Stainless Drain Pan', 1, 'EA', 'Component'),
    n('evap-sens', 'SENS-TEMP-EV', 'Evaporator Temperature Sensor NTC', 2, 'EA', 'Component', [], { isReplaceable: true }),
  ]),
  n('assy-ctrl', 'CTRL-ASY-400', 'Controls & Electrical', 1, 'EA', 'Subassembly', [
    n('ctrl-pcb', 'PCB-MAIN-A1', 'Main Control Board Rev A', 1, 'EA', 'Component', [], { supplier: 'Emerson', isReplaceable: true, warrantyMonths: 24 }),
    n('ctrl-inv', 'PCB-INV-VSD', 'Inverter Drive Board VSD', 1, 'EA', 'Component', [], { supplier: 'Emerson' }),
    n('ctrl-cap', 'CAP-RUN-45', 'Run Capacitor 45µF 440V', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-proto', 'SENS-PROTO-X1', 'Prototype Ambient Sensor IoT', 1, 'EA', 'Component', [], { lifecycleStatus: 'Prototype', supplier: 'Internal R&D' }),
    n('ctrl-xfmr', 'XFMR-24V', 'Control Transformer 240V/24V', 1, 'EA', 'Component'),
    n('ctrl-cont', 'CONT-2P-40A', '2-Pole Contactor 40A', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-harn1', 'HARNESS-MAIN', 'Main Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-harn2', 'HARNESS-CTRL', 'Control Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-fuse', 'FUSE-30A', 'Blade Fuse 30A', 2, 'EA', 'Consumable', [], { isReplaceable: true }),
  ]),
  n('assy-ref', 'REF-ASY-500', 'Refrigerant Circuit', 1, 'EA', 'Subassembly', [
    n('ref-txv', 'TXV-5T-R410A', 'Thermostatic Expansion Valve 5T R-410A', 1, 'EA', 'Component', [], { supplier: 'Danfoss', isReplaceable: true }),
    n('ref-dry', 'DRY-FLTR-163', 'Filter Drier 16 ci 3/8 SAE', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ref-sg', 'SG-1/4', 'Sight Glass 1/4" SAE', 1, 'EA', 'Component'),
    n('ref-chk', 'RV-CHECK-3/8', 'Check Valve 3/8"', 2, 'EA', 'Component'),
    n('ref-pipe1', 'PIPE-CU-3/4', 'Copper Line Set 3/4" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-pipe2', 'PIPE-CU-3/8', 'Copper Line Set 3/8" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-chrg', 'CHRG-R410A', 'R-410A Refrigerant Charge', 12, 'LB', 'Consumable'),
  ]),
  n('assy-struct', 'STRUCT-ASY-600', 'Cabinet & Structural', 1, 'EA', 'Subassembly', [
    n('struct-base', 'CAB-BASE', 'Galvanized Steel Base Pan', 1, 'EA', 'Component'),
    n('struct-top', 'CAB-TOP', 'Top Panel Assembly', 1, 'EA', 'Component'),
    n('struct-l', 'CAB-SIDE-L', 'Service Panel Left', 1, 'EA', 'Component'),
    n('struct-r', 'CAB-SIDE-R', 'Service Panel Right', 1, 'EA', 'Component'),
    n('struct-louv', 'CAB-LOUVER', 'Louvered Panel Set', 2, 'EA', 'Component'),
    n('struct-hdw', 'HDW-KIT-SS', 'Stainless Hardware Kit', 1, 'KIT', 'Component'),
    n('struct-bolt', 'BOLT-M8-40', 'Hex Bolt M8x40mm SS', 24, 'EA', 'Raw Material'),
    n('struct-nut', 'NUT-M8-NY', 'Nylon Lock Nut M8 SS', 24, 'EA', 'Raw Material'),
    n('struct-lbl', 'LBL-RATING', 'Rating Plate Label', 1, 'EA', 'Component'),
  ]),
])

// ── DX20VC-060 M-BOM ──
const mbomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, 'EA', 'Assembly', [
  n('assy-comp', 'COMP-ASY-100', 'Compressor Assembly', 1, 'EA', 'Subassembly', [
    n('comp-scroll', 'ZP54K5E-PFV', 'Scroll Compressor 54K BTU', 1, 'EA', 'Component', [], { supplier: 'Copeland', isReplaceable: true, warrantyMonths: 60 }),
    n('comp-motor', 'MTR-3PH-5HP', 'Compressor Motor 5HP 3-Phase', 1, 'EA', 'Component', [], { supplier: 'Nidec' }),
    n('comp-bracket', '326-0123-01', 'Compressor Mounting Bracket', 1, 'EA', 'Component'),
    n('comp-vib', 'VIB-ISO-M8', 'Vibration Isolator M8', 4, 'EA', 'Component', [], { isReplaceable: true }),
    n('comp-oil', 'OIL-POE-32', 'POE Lubricant 32oz', 1, 'EA', 'Consumable', [], { supplier: 'Nu-Calgon' }),
  ]),
  n('assy-cond', 'COND-ASY-200', 'Condenser Coil Assembly', 1, 'EA', 'Subassembly', [
    n('cond-coil', 'COIL-AL-5T', 'Aluminum Fin Condenser Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('cond-fan', 'FAN-AXIAL-24', '24" Axial Condenser Fan', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('cond-motor', 'MTR-FAN-1/3', 'Fan Motor 1/3 HP ECM', 1, 'EA', 'Component', [], { supplier: 'Genteq' }),
    n('cond-grille', 'GRILLE-TOP', 'Top Discharge Grille Assembly', 1, 'EA', 'Component'),
    n('cond-guard', 'GUARD-FAN-24', '24" Fan Guard Wire', 1, 'EA', 'Component'),
  ]),
  n('assy-evap', 'EVAP-ASY-300', 'Evaporator Coil Assembly', 1, 'EA', 'Subassembly', [
    n('evap-coil', 'COIL-CU-5T', 'Copper Tube Evaporator Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('evap-pan', 'PAN-DRAIN-SS', 'Stainless Drain Pan', 1, 'EA', 'Component'),
    n('evap-sens', 'SENS-TEMP-EV', 'Evaporator Temperature Sensor NTC', 2, 'EA', 'Component', [], { isReplaceable: true }),
  ]),
  n('assy-ctrl', 'CTRL-ASY-400', 'Controls & Electrical', 1, 'EA', 'Subassembly', [
    n('ctrl-pcb', 'PCB-MAIN-A1', 'Main Control Board Rev A', 1, 'EA', 'Component', [], { supplier: 'Emerson', isReplaceable: true, warrantyMonths: 24 }),
    n('ctrl-inv', 'PCB-INV-VSD', 'Inverter Drive Board VSD', 1, 'EA', 'Component', [], { supplier: 'Emerson' }),
    n('ctrl-cap', 'CAP-RUN-50', 'Run Capacitor 50µF 440V', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-xfmr', 'XFMR-24V', 'Control Transformer 240V/24V', 1, 'EA', 'Component'),
    n('ctrl-cont', 'CONT-2P-40A', '2-Pole Contactor 40A', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-harn1', 'HARNESS-MAIN', 'Main Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-harn2', 'HARNESS-CTRL', 'Control Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-fuse', 'FUSE-30A', 'Blade Fuse 30A', 2, 'EA', 'Consumable', [], { isReplaceable: true }),
  ]),
  n('assy-ref', 'REF-ASY-500', 'Refrigerant Circuit', 1, 'EA', 'Subassembly', [
    n('ref-txv', 'TXV-5T-R410A', 'Thermostatic Expansion Valve 5T R-410A', 1, 'EA', 'Component', [], { supplier: 'Danfoss', isReplaceable: true }),
    n('ref-dry', 'DRY-FLTR-163', 'Filter Drier 16 ci 3/8 SAE', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ref-sg', 'SG-1/4', 'Sight Glass 1/4" SAE', 1, 'EA', 'Component'),
    n('ref-chk', 'RV-CHECK-3/8', 'Check Valve 3/8"', 2, 'EA', 'Component'),
    n('ref-pipe1', 'PIPE-CU-3/4', 'Copper Line Set 3/4" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-pipe2', 'PIPE-CU-3/8', 'Copper Line Set 3/8" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-chrg', 'CHRG-R410A', 'R-410A Refrigerant Charge', 12, 'LB', 'Consumable'),
  ]),
  n('assy-struct', 'STRUCT-ASY-600', 'Cabinet & Structural', 1, 'EA', 'Subassembly', [
    n('struct-base', 'CAB-BASE', 'Galvanized Steel Base Pan', 1, 'EA', 'Component'),
    n('struct-top', 'CAB-TOP', 'Top Panel Assembly', 1, 'EA', 'Component'),
    n('struct-l', 'CAB-SIDE-L', 'Service Panel Left', 1, 'EA', 'Component'),
    n('struct-r', 'CAB-SIDE-R', 'Service Panel Right', 1, 'EA', 'Component'),
    n('struct-louv', 'CAB-LOUVER', 'Louvered Panel Set', 2, 'EA', 'Component'),
    n('struct-hdw', 'HDW-KIT-SS', 'Stainless Hardware Kit', 1, 'KIT', 'Component'),
    n('struct-bolt', 'BOLT-M8-40', 'Hex Bolt M8x40mm SS', 28, 'EA', 'Raw Material'),
    n('struct-nut', 'NUT-M8-NY', 'Nylon Lock Nut M8 SS', 28, 'EA', 'Raw Material'),
    n('struct-lbl', 'LBL-RATING', 'Rating Plate Label', 1, 'EA', 'Component'),
    n('struct-jig', 'JIG-CHK-001', 'Assembly Check Fixture', 1, 'EA', 'Component', [], { supplier: 'Internal Tooling' }),
  ]),
])

// ── DX20VC-060 Service BOM ──
const serviceBomRoot: BomNode = n('root', 'DX20VC-060', '5-Ton VS Split System Heat Pump', 1, 'EA', 'Assembly', [
  n('assy-comp', 'COMP-ASY-100', 'Compressor Assembly', 1, 'EA', 'Subassembly', [
    n('comp-scroll', 'ZP54K5E-PFV', 'Scroll Compressor 54K BTU', 1, 'EA', 'Component', [], { supplier: 'Copeland', isReplaceable: true, warrantyMonths: 120 }),
    n('comp-motor', 'MTR-3PH-5HP', 'Compressor Motor 5HP 3-Phase', 1, 'EA', 'Component', [], { supplier: 'Nidec', isReplaceable: true }),
    n('comp-bracket', '326-0123-01', 'Compressor Mounting Bracket', 1, 'EA', 'Component'),
    n('comp-vib', 'VIB-ISO-M8', 'Vibration Isolator M8', 4, 'EA', 'Component', [], { isReplaceable: true }),
    n('comp-oil', 'OIL-POE-32', 'POE Lubricant 32oz', 2, 'EA', 'Consumable', [], { supplier: 'Nu-Calgon' }),
  ]),
  n('assy-cond', 'COND-ASY-200', 'Condenser Coil Assembly', 1, 'EA', 'Subassembly', [
    n('cond-coil', 'COIL-AL-5T', 'Aluminum Fin Condenser Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('cond-fan', 'FAN-AXIAL-24', '24" Axial Condenser Fan', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('cond-motor', 'MTR-FAN-1/3', 'Fan Motor 1/3 HP ECM', 1, 'EA', 'Component', [], { supplier: 'Genteq', isReplaceable: true }),
    n('cond-grille', 'GRILLE-TOP', 'Top Discharge Grille Assembly', 1, 'EA', 'Component'),
    n('cond-guard', 'GUARD-FAN-24', '24" Fan Guard Wire', 1, 'EA', 'Component'),
  ]),
  n('assy-evap', 'EVAP-ASY-300', 'Evaporator Coil Assembly', 1, 'EA', 'Subassembly', [
    n('evap-coil', 'COIL-CU-5T', 'Copper Tube Evaporator Coil 5-Ton', 1, 'EA', 'Component', [], { supplier: 'Heatcraft', isReplaceable: true }),
    n('evap-pan', 'PAN-DRAIN-SS', 'Stainless Drain Pan', 1, 'EA', 'Component'),
    n('evap-sens', 'SENS-TEMP-EV', 'Evaporator Temperature Sensor NTC', 2, 'EA', 'Component', [], { isReplaceable: true }),
  ]),
  n('assy-ctrl', 'CTRL-ASY-400', 'Controls & Electrical', 1, 'EA', 'Subassembly', [
    n('ctrl-pcb', 'PCB-MAIN-B1', 'Main Control Board Rev B', 1, 'EA', 'Component', [], { supplier: 'Emerson', isReplaceable: true, warrantyMonths: 24 }),
    n('ctrl-inv', 'PCB-INV-VSD', 'Inverter Drive Board VSD', 1, 'EA', 'Component', [], { supplier: 'Emerson', isReplaceable: true }),
    n('ctrl-cap', 'CAP-RUN-50', 'Run Capacitor 50µF 440V', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-xfmr', 'XFMR-24V', 'Control Transformer 240V/24V', 1, 'EA', 'Component'),
    n('ctrl-cont', 'CONT-2P-40A', '2-Pole Contactor 40A', 1, 'EA', 'Component', [], { isReplaceable: true }),
    n('ctrl-harn1', 'HARNESS-MAIN', 'Main Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-harn2', 'HARNESS-CTRL', 'Control Wiring Harness', 1, 'EA', 'Component'),
    n('ctrl-fuse', 'FUSE-30A', 'Blade Fuse 30A', 4, 'EA', 'Consumable', [], { isReplaceable: true }),
  ]),
  n('assy-ref', 'REF-ASY-500', 'Refrigerant Circuit', 1, 'EA', 'Subassembly', [
    n('ref-txv', 'TXV-5T-R410A', 'Thermostatic Expansion Valve 5T R-410A', 1, 'EA', 'Component', [], { supplier: 'Danfoss', isReplaceable: true }),
    n('ref-dry', 'DRY-FLTR-163', 'Filter Drier 16 ci 3/8 SAE', 2, 'EA', 'Component', [], { isReplaceable: true }),
    n('ref-sg', 'SG-1/4', 'Sight Glass 1/4" SAE', 1, 'EA', 'Component'),
    n('ref-chk', 'RV-CHECK-3/8', 'Check Valve 3/8"', 2, 'EA', 'Component'),
    n('ref-pipe1', 'PIPE-CU-3/4', 'Copper Line Set 3/4" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-pipe2', 'PIPE-CU-3/8', 'Copper Line Set 3/8" x 20ft', 1, 'EA', 'Raw Material'),
    n('ref-chrg', 'CHRG-R410A', 'R-410A Refrigerant Charge', 12, 'LB', 'Consumable'),
  ]),
  n('assy-struct', 'STRUCT-ASY-600', 'Cabinet & Structural', 1, 'EA', 'Subassembly', [
    n('struct-base', 'CAB-BASE', 'Galvanized Steel Base Pan', 1, 'EA', 'Component'),
    n('struct-top', 'CAB-TOP', 'Top Panel Assembly', 1, 'EA', 'Component'),
    n('struct-l', 'CAB-SIDE-L', 'Service Panel Left', 1, 'EA', 'Component'),
    n('struct-r', 'CAB-SIDE-R', 'Service Panel Right', 1, 'EA', 'Component'),
    n('struct-louv', 'CAB-LOUVER', 'Louvered Panel Set', 2, 'EA', 'Component'),
    n('struct-hdw', 'HDW-KIT-SS', 'Stainless Hardware Kit', 1, 'KIT', 'Component'),
    n('struct-bolt', 'BOLT-M8-40', 'Hex Bolt M8x40mm SS', 28, 'EA', 'Raw Material'),
    n('struct-nut', 'NUT-M8-NY', 'Nylon Lock Nut M8 SS', 28, 'EA', 'Raw Material'),
    n('struct-lbl', 'LBL-RATING', 'Rating Plate Label', 1, 'EA', 'Component'),
  ]),
  n('assy-svc', 'SVC-KIT-700', 'Service Kits & Spares', 1, 'EA', 'Subassembly', [
    n('svc-comp', 'SVC-KIT-COMP', 'Compressor Service Kit', 1, 'KIT', 'Component', [], { isReplaceable: true }),
    n('svc-elec', 'SVC-KIT-ELEC', 'Electrical Service Kit', 1, 'KIT', 'Component', [], { isReplaceable: true }),
    n('svc-ref', 'SVC-KIT-REF', 'Refrigerant Service Kit', 1, 'KIT', 'Component', [], { isReplaceable: true }),
    n('svc-manual', 'SVC-MANUAL', 'Field Service Manual', 1, 'EA', 'Component'),
  ]),
])

function countNodes(node: BomNode): number {
  return 1 + node.children.reduce((s, c) => s + countNodes(c), 0)
}

const dx20vcVersions: BomVersion[] = [
  {
    id: 'ebom-v3.2',
    type: 'EBOM',
    label: 'E-BOM v3.2',
    dropdownLabel: 'E-BOM v3.2 \u2014 Windchill PLM',
    meta: {
      version: 'v3.2',
      sourceSystem: 'Windchill PLM',
      status: 'Released',
      effectiveDate: '2026-01-15',
      owner: 'J. Tanaka (Engineering)',
    },
    root: ebomRoot,
    nodeCount: countNodes(ebomRoot),
  },
  {
    id: 'mbom-v1.0',
    type: 'MBOM',
    label: 'M-BOM v1.0',
    dropdownLabel: 'M-BOM v1.0 \u2014 SAP S/4HANA',
    meta: {
      version: 'v1.0',
      sourceSystem: 'SAP S/4HANA',
      status: 'In Review',
      effectiveDate: '2026-02-10',
      owner: 'M. Rodriguez (Manufacturing)',
    },
    root: mbomRoot,
    nodeCount: countNodes(mbomRoot),
  },
  {
    id: 'svc-v1.1',
    type: 'SERVICE',
    label: 'Service v1.1',
    dropdownLabel: 'Service v1.1 \u2014 Profisee MDM',
    meta: {
      version: 'v1.1',
      sourceSystem: 'Profisee MDM',
      status: 'Released',
      effectiveDate: '2026-02-01',
      owner: 'K. Patel (Service Engineering)',
    },
    root: serviceBomRoot,
    nodeCount: countNodes(serviceBomRoot),
  },
]

// ── AWS-CHL-500T Chiller (procedural) ──
const CHL_SEC = [
  { id: 'CMP', nm: 'Compressor Section', sub: [{ id: 'CC', nm: 'Centrifugal Compressor', p: 18 }, { id: 'VSD', nm: 'Variable Speed Drive', p: 12 }, { id: 'MA', nm: 'Motor Assembly', p: 14 }, { id: 'BS', nm: 'Bearings & Seals', p: 10 }, { id: 'LS', nm: 'Lubrication System', p: 8 }, { id: 'IG', nm: 'Inlet Guide Vanes', p: 6 }] },
  { id: 'EVP', nm: 'Evaporator Section', sub: [{ id: 'SHX', nm: 'Shell & Tube Heat Exchanger', p: 16 }, { id: 'RD', nm: 'Refrigerant Distribution', p: 10 }, { id: 'TB', nm: 'Tube Bundle Assembly', p: 22 }, { id: 'WB', nm: 'Water Box Assemblies', p: 8 }, { id: 'INS', nm: 'Insulation & Jacketing', p: 6 }] },
  { id: 'CND', nm: 'Condenser Section', sub: [{ id: 'SC', nm: 'Shell & Tube Condenser', p: 14 }, { id: 'CWB', nm: 'Condenser Water Boxes', p: 8 }, { id: 'RV', nm: 'Relief Valve Assembly', p: 6 }, { id: 'SUB', nm: 'Subcooler Circuit', p: 8 }] },
  { id: 'CTL', nm: 'Controls & Electrical', sub: [{ id: 'MCP', nm: 'Main Control Panel', p: 20 }, { id: 'HMI', nm: 'HMI Touch Display', p: 8 }, { id: 'STR', nm: 'Starter Assembly', p: 12 }, { id: 'SNS', nm: 'Sensors & Transducers', p: 16 }, { id: 'WH', nm: 'Wiring Harnesses', p: 10 }, { id: 'PLC', nm: 'PLC Controller', p: 8 }] },
  { id: 'REF', nm: 'Refrigerant Circuit', sub: [{ id: 'EXP', nm: 'Expansion Devices', p: 8 }, { id: 'PF', nm: 'Piping & Fittings', p: 24 }, { id: 'FD', nm: 'Filter Driers', p: 6 }, { id: 'SGL', nm: 'Sight Glasses', p: 6 }, { id: 'SOV', nm: 'Solenoid Valves', p: 8 }] },
  { id: 'FRM', nm: 'Structural / Frame', sub: [{ id: 'BF', nm: 'Base Frame Assembly', p: 12 }, { id: 'IM', nm: 'Isolation Mounts', p: 8 }, { id: 'AE', nm: 'Acoustic Enclosure Panels', p: 14 }, { id: 'LFT', nm: 'Rigging & Lift Points', p: 6 }] },
  { id: 'AUX', nm: 'Auxiliary Systems', sub: [{ id: 'ORC', nm: 'Oil Recovery System', p: 8 }, { id: 'PG', nm: 'Purge Unit', p: 10 }, { id: 'EC', nm: 'Economizer Circuit', p: 8 }] },
  { id: 'DOC', nm: 'Documentation & Kits', sub: [{ id: 'SM', nm: 'Service Manual Kit', p: 4 }, { id: 'CK', nm: 'Commissioning Kit', p: 6 }, { id: 'SP', nm: 'Spare Parts Kit', p: 12 }] },
]
const SUPPL = ['Copeland', 'Danfoss', 'Emerson', 'Siemens', 'ABB', 'SKF', 'Parker', 'Swagelok', 'Honeywell', 'Schneider', 'Bitzer', 'Alfa Laval', 'GEA', 'Nidec', 'Eaton']
const UOMS = ['EA', 'EA', 'EA', 'EA', 'KIT', 'SET', 'FT', 'LB', 'GAL']

let nc = 0
function genCHL(bt: string, seed = 0): BomNode {
  nc = 0
  const rng = (i: number) => ((seed * 31 + i * 17 + 7) % 100)
  const nid = () => `chl-${String(++nc).padStart(5, '0')}`

  const root: BomNode = {
    id: nid(), partNumber: 'AWS-CHL-500T', description: '500-Ton Centrifugal Water-Cooled Chiller',
    quantity: 1, uom: 'EA', category: 'Assembly', children: [],
  }

  CHL_SEC.forEach((sec, si) => {
    const sn: BomNode = { id: nid(), partNumber: `${sec.id}-ASY`, description: sec.nm, quantity: 1, uom: 'EA', category: 'Subassembly', children: [] }
    sec.sub.forEach((sub, ssi) => {
      const subn: BomNode = { id: nid(), partNumber: `${sec.id}-${sub.id}`, description: sub.nm, quantity: 1, uom: 'EA', category: 'Subassembly', children: [] }
      for (let p = 0; p < sub.p; p++) {
        const r = rng(si * 1000 + ssi * 100 + p)
        const pn = `${sec.id}-${sub.id}-${String(p + 1).padStart(3, '0')}`
        const qty = r < 30 ? 1 : r < 60 ? 2 : r < 80 ? 4 : r < 90 ? 8 : 12
        const ov: Partial<BomNode> = { supplier: SUPPL[r % SUPPL.length], isReplaceable: r % 3 === 0, warrantyMonths: r < 50 ? 12 : 24 }
        let finalQty = qty
        if (bt === 'mbom' && r % 20 === 0) finalQty = qty + 2
        if (bt === 'service' && r % 3 === 0) { ov.warrantyMonths = 36; ov.isReplaceable = true }
        subn.children.push({
          id: nid(), partNumber: pn, description: `${sub.nm} Part ${p + 1}`,
          quantity: finalQty, uom: UOMS[r % UOMS.length], category: 'Component', children: [], ...ov,
        })
      }
      sn.children.push(subn)
    })
    root.children.push(sn)
  })

  if (bt === 'service') {
    root.children.push({
      id: nid(), partNumber: 'SVC-ASY', description: 'Service Kits & Field Spares', quantity: 1, uom: 'EA', category: 'Subassembly',
      children: [
        { id: nid(), partNumber: 'SVC-KIT-CMP', description: 'Compressor Overhaul Kit', quantity: 1, uom: 'KIT', category: 'Component', children: [], isReplaceable: true },
        { id: nid(), partNumber: 'SVC-KIT-BRG', description: 'Bearing Replacement Kit', quantity: 2, uom: 'KIT', category: 'Component', children: [], isReplaceable: true },
        { id: nid(), partNumber: 'SVC-KIT-ELC', description: 'Electrical Service Kit', quantity: 1, uom: 'KIT', category: 'Component', children: [], isReplaceable: true },
        { id: nid(), partNumber: 'SVC-KIT-REF', description: 'Refrigerant Service Kit', quantity: 1, uom: 'KIT', category: 'Component', children: [], isReplaceable: true },
        { id: nid(), partNumber: 'SVC-KIT-OIL', description: 'Oil Service Kit', quantity: 2, uom: 'KIT', category: 'Consumable', children: [], isReplaceable: true },
        { id: nid(), partNumber: 'SVC-MANUAL-500T', description: 'Field Service Manual', quantity: 1, uom: 'EA', category: 'Component', children: [] },
        { id: nid(), partNumber: 'SVC-COMM-KIT', description: 'Commissioning Verification Kit', quantity: 1, uom: 'KIT', category: 'Component', children: [] },
      ],
    })
  }
  if (bt === 'mbom') {
    root.children.push({
      id: nid(), partNumber: 'TOOL-ASY', description: 'Manufacturing Tooling & Fixtures', quantity: 1, uom: 'EA', category: 'Subassembly',
      children: [
        { id: nid(), partNumber: 'JIG-ALIGN-001', description: 'Compressor Alignment Fixture', quantity: 1, uom: 'EA', category: 'Component', children: [], supplier: 'Internal Tooling' },
        { id: nid(), partNumber: 'JIG-LEAK-001', description: 'Pressure Leak Test Fixture', quantity: 1, uom: 'EA', category: 'Component', children: [], supplier: 'Internal Tooling' },
        { id: nid(), partNumber: 'JIG-ELEC-001', description: 'Electrical Test Harness', quantity: 1, uom: 'EA', category: 'Component', children: [], supplier: 'Internal Tooling' },
        { id: nid(), partNumber: 'JIG-HYDRO-001', description: 'Hydrostatic Test Setup', quantity: 1, uom: 'EA', category: 'Component', children: [], supplier: 'Internal Tooling' },
      ],
    })
  }
  return root
}

const chlEbom = genCHL('ebom', 1)
const chlMbom = genCHL('mbom', 2)
const chlSvc = genCHL('service', 3)

const chlVersions: BomVersion[] = [
  {
    id: 'chl-ebom-v2.0', type: 'EBOM', label: 'E-BOM v2.0',
    dropdownLabel: 'E-BOM v2.0 \u2014 Windchill PLM',
    meta: { version: 'v2.0', sourceSystem: 'Windchill PLM', status: 'Released', effectiveDate: '2025-11-20', owner: 'T. Yamamoto (Engineering)' },
    root: chlEbom, nodeCount: countNodes(chlEbom),
  },
  {
    id: 'chl-mbom-v1.0', type: 'MBOM', label: 'M-BOM v1.0',
    dropdownLabel: 'M-BOM v1.0 \u2014 SAP S/4HANA',
    meta: { version: 'v1.0', sourceSystem: 'SAP S/4HANA', status: 'Released', effectiveDate: '2026-01-08', owner: 'R. Chen (Manufacturing)' },
    root: chlMbom, nodeCount: countNodes(chlMbom),
  },
  {
    id: 'chl-svc-v0.9', type: 'SERVICE', label: 'Service v0.9',
    dropdownLabel: 'Service v0.9 \u2014 Profisee MDM',
    meta: { version: 'v0.9', sourceSystem: 'Profisee MDM', status: 'Draft', effectiveDate: '2026-02-15', owner: 'A. Singh (Service Engineering)' },
    root: chlSvc, nodeCount: countNodes(chlSvc),
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
    id: 'aws-chl-500t',
    modelNumber: 'AWS-CHL-500T',
    description: '500-Ton Centrifugal Water-Cooled Chiller',
    versions: chlVersions,
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getVersion(productId: string, versionId: string): BomVersion | undefined {
  return getProduct(productId)?.versions.find((v) => v.id === versionId)
}
