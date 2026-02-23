import { BomComponent, BomVersion, BomDiffResult, DiffNode, ChangeStatus } from '../types/bom';

function flattenComponents(
  components: BomComponent[],
  depth = 0
): Array<{ component: BomComponent; depth: number }> {
  const result: Array<{ component: BomComponent; depth: number }> = [];
  for (const c of components) {
    result.push({ component: c, depth });
    if (c.children?.length) {
      result.push(...flattenComponents(c.children, depth + 1));
    }
  }
  return result;
}

function compareComponents(
  left: BomComponent | undefined,
  right: BomComponent | undefined,
  depth: number
): DiffNode {
  const base = left || right!;
  let status: ChangeStatus = 'unchanged';
  let detail: string | undefined;

  if (!left) {
    status = 'added';
  } else if (!right) {
    status = 'removed';
  } else {
    const diffs: string[] = [];
    if (left.quantity !== right.quantity) diffs.push(`Qty: ${left.quantity} → ${right.quantity}`);
    if (left.revision !== right.revision) diffs.push(`Rev: ${left.revision ?? '—'} → ${right.revision ?? '—'}`);
    if (left.supplier !== right.supplier) diffs.push(`Supplier: ${left.supplier ?? '—'} → ${right.supplier ?? '—'}`);
    if (left.material !== right.material) diffs.push(`Material: ${left.material ?? '—'} → ${right.material ?? '—'}`);
    if (diffs.length > 0) {
      status = 'modified';
      detail = diffs.join(' | ');
    }
  }

  const node: DiffNode = {
    id: base.id,
    partNumber: base.partNumber,
    description: base.description,
    leftQty: left?.quantity,
    rightQty: right?.quantity,
    unit: base.unit,
    status,
    detail,
    depth,
  };

  // Recurse children
  if (left?.children || right?.children) {
    const leftChildren = left?.children ?? [];
    const rightChildren = right?.children ?? [];
    const allChildIds = new Set([
      ...leftChildren.map((c) => c.partNumber),
      ...rightChildren.map((c) => c.partNumber),
    ]);
    node.children = Array.from(allChildIds).map((pn) => {
      const lc = leftChildren.find((c) => c.partNumber === pn);
      const rc = rightChildren.find((c) => c.partNumber === pn);
      return compareComponents(lc, rc, depth + 1);
    });
  }

  return node;
}

export function diffBoms(left: BomVersion, right: BomVersion): BomDiffResult {
  const allPartNumbers = new Set([
    ...left.components.map((c) => c.partNumber),
    ...right.components.map((c) => c.partNumber),
  ]);

  const nodes: DiffNode[] = Array.from(allPartNumbers).map((pn) => {
    const lc = left.components.find((c) => c.partNumber === pn);
    const rc = right.components.find((c) => c.partNumber === pn);
    return compareComponents(lc, rc, 0);
  });

  const summary = nodes.reduce(
    (acc, node) => {
      acc[node.status]++;
      acc.total++;
      if (node.children) {
        for (const child of node.children) {
          acc[child.status]++;
          acc.total++;
        }
      }
      return acc;
    },
    { added: 0, removed: 0, modified: 0, unchanged: 0, total: 0 }
  );

  return { leftBom: left, rightBom: right, nodes, summary };
}
