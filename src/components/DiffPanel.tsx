import React, { useState } from 'react';
import { DiffNode, ChangeStatus, BomVersion } from '../types/bom';
import { BomTreeNode } from './BomTreeNode';

interface Props {
  nodes: DiffNode[];
  leftBom: BomVersion;
  rightBom: BomVersion;
}

const FILTERS: Array<{ value: ChangeStatus | 'all'; label: string; color: string }> = [
  { value: 'all',       label: 'All',       color: '#94A3B8' },
  { value: 'modified',  label: 'Modified',  color: '#F59E0B' },
  { value: 'added',     label: 'Added',     color: '#10B981' },
  { value: 'removed',   label: 'Removed',   color: '#EF4444' },
  { value: 'unchanged', label: 'Unchanged', color: '#475569' },
];

export const DiffPanel: React.FC<Props> = ({ nodes, leftBom, rightBom }) => {
  const [filter, setFilter] = useState<ChangeStatus | 'all'>('all');
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [selectedDetail, setSelectedDetail] = useState<DiffNode | undefined>();

  const handleSelect = (node: DiffNode) => {
    setSelectedNode(node.id);
    setSelectedDetail(node);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, minHeight: 0 }}>
      {/* Filter toolbar */}
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center',
        padding: '10px 16px', background: '#0D1B2A', borderBottom: '1px solid #1E293B',
      }}>
        <span style={{ color: '#475569', fontSize: 11, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', marginRight: 4 }}>
          SHOW
        </span>
        {FILTERS.map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{
              padding: '4px 14px',
              background: filter === value ? `${color}22` : 'transparent',
              border: `1px solid ${filter === value ? color : '#1E293B'}`,
              borderRadius: 5, color: filter === value ? color : '#475569',
              fontFamily: 'Rajdhani, sans-serif', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Tree */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '8px 4px',
          background: '#0B1622',
        }}>
          {/* Column headers */}
          <div style={{
            display: 'flex', gap: 8, padding: '4px 12px 8px',
            borderBottom: '1px solid #1E293B', marginBottom: 4,
          }}>
            <span style={{ width: 16 }} />
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', minWidth: 150, letterSpacing: '0.12em' }}>PART NO.</span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', flex: 1, letterSpacing: '0.12em' }}>DESCRIPTION</span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#3B82F6', width: 40, letterSpacing: '0.08em' }}>
              {leftBom.label}
            </span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#10B981', width: 40, letterSpacing: '0.08em' }}>
              {rightBom.label}
            </span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 10, color: '#475569', width: 80, letterSpacing: '0.08em' }}>STATUS</span>
          </div>

          {nodes.map((node) => (
            <BomTreeNode
              key={node.id}
              node={node}
              side="diff"
              onSelect={handleSelect}
              selected={selectedNode}
              filterStatus={filter === 'all' ? undefined : filter}
            />
          ))}
        </div>

        {/* Detail pane */}
        {selectedDetail && (
          <div style={{
            width: 280, borderLeft: '1px solid #1E293B',
            background: '#0D1B2A', padding: 16,
            display: 'flex', flexDirection: 'column', gap: 12,
            overflowY: 'auto',
          }}>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 11, color: '#475569', letterSpacing: '0.15em' }}>
              COMPONENT DETAIL
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Part No.', selectedDetail.partNumber],
                ['Description', selectedDetail.description],
                ['Unit', selectedDetail.unit],
                [`${leftBom.label} Qty`, selectedDetail.leftQty?.toString() ?? '—'],
                [`${rightBom.label} Qty`, selectedDetail.rightQty?.toString() ?? '—'],
                ['Status', selectedDetail.status.toUpperCase()],
                ...(selectedDetail.detail ? [['Changes', selectedDetail.detail]] : []),
              ].map(([key, val]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ color: '#475569', fontSize: 10, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em' }}>{key}</span>
                  <span style={{ color: '#CBD5E1', fontSize: 12, fontFamily: 'Rajdhani, sans-serif' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
