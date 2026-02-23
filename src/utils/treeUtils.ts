import type { BomNode } from '../types/bom'

export function walkTree(node: BomNode, visitor: (node: BomNode) => void): void {
  visitor(node)
  for (const child of node.children) {
    walkTree(child, visitor)
  }
}

export function flattenTree(root: BomNode): BomNode[] {
  const nodes: BomNode[] = []
  walkTree(root, (node) => nodes.push(node))
  return nodes
}

export function cloneTree(node: BomNode): BomNode {
  return {
    ...node,
    metadata: { ...node.metadata },
    children: node.children.map((child) => cloneTree(child)),
  }
}

export function mapTree(node: BomNode, mapper: (node: BomNode) => BomNode): BomNode {
  const mapped = mapper(node)
  return {
    ...mapped,
    children: mapped.children.map((child) => mapTree(child, mapper)),
  }
}
