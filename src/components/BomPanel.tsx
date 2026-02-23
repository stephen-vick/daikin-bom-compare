import React from 'react';
import { BomVersion, BomType, DiffNode, ChangeStatus } from '../types/bom';
import { BomTreeNode } from './BomTreeNode';

const TYPE_CONFIG: Record<BomType, { color: string; bg: string }> = {
  engineering:   { color: '#3B82F6', bg: '#1E3A5F' },
  manufacturing: { color: '#10B981', bg: '#064E3B' },
  'as-built':    { color: '#F59E0B', bg: '#451A03' },
  service:       { color: '#A78BFA', bg: '#2E1065' },
};

interface Props {
  bom: BomVersion;
  nodes: DiffNode[];
  side: 'left' | 'right';
  onSelectNode?: (node: DiffNode) => void;
  selectedNode?: string;
  filterStatus?: ChangeStatus | 'all';
}

export const BomPanel: React.FC<Props> = ({ bom, nodes, side, onSelectNode, selectedNode, filterStatus }) => {
  const cfg = TYPE_CONFIG[bom.type];
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: '#0B1622',
      borderRadius: 8,
      border: `1px solid ${cfg.color}44`,
      overflow: 'hidden',
      flex: 1,
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: cfg.bg,
        borderBottom: `1px solid ${cfg.color}44`,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: cfg.color, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em' }}>
            {bom.label} — {bom.versionNumber}
          </span>
          <span style={{
            color: cfg.color, background: `${cfg.color}22`,
            border: `1px solid ${cfg.color}44`,
            padding: '1px 8px', borderRadius: 4,
            fontSize: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, letterSpacing: '0.1em',
          }}>
            {bom.status.toUpperCase()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ color: '#94A3B8', fontSize: 11, fontFamily: 'Rajdhani, sans-serif' }}>
            Source: <span style={{ color: '#CBD5E1' }}>{bom.source}</span>
          </span>
          <span style={{ color: '#94A3B8', fontSize: 11, fontFamily: 'Rajdhani, sans-serif' }}>
            Date: <span style={{ color: '#CBD5E1' }}>{bom.createdAt}</span>
          </span>
          {bom.orderId && (
            <span style={{ color: '#94A3B8', fontSize: 11, fontFamily: 'Rajdhani, sans-serif' }}>
              Order: <span style={{ color: '#CBD5E1' }}>{bom.orderId}</span>
            </span>
          )}
        </div>
      </div>

      {/* Column header */}
      <div style={{
        display: 'flex', gap: 8, padding: '6px 12px',
        background: '#0F1B2A', borderBottom: '1px solid #1E293B',
      }}>
        <span style={{ width: 16 }} />
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', letterSpacing: '0.12em', minWidth: 150 }}>PART NUMBER</span>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', letterSpacing: '0.12em', flex: 1 }}>DESCRIPTION</span>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', letterSpacing: '0.12em' }}>QTY</span>
      </div>

      {/* Tree */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '8px 4px' }}>
        {nodes.map((node) => (
          <BomTreeNode
            key={node.id}
            node={node}
            side={side}
            onSelect={onSelectNode}
            selected={selectedNode}
            filterStatus={filterStatus}
          />
        ))}
      </div>
    </div>
  );
};
