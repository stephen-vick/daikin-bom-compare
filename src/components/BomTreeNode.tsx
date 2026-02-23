import React, { useState } from 'react';
import { DiffNode, ChangeStatus } from '../types/bom';

const STATUS_STYLE: Record<ChangeStatus, { bg: string; border: string; badge: string; badgeColor: string }> = {
  added:     { bg: '#052E16', border: '#10B981', badge: '+ ADDED',    badgeColor: '#10B981' },
  removed:   { bg: '#2D0A0A', border: '#EF4444', badge: '− REMOVED',  badgeColor: '#EF4444' },
  modified:  { bg: '#1C1000', border: '#F59E0B', badge: '~ MODIFIED', badgeColor: '#F59E0B' },
  unchanged: { bg: 'transparent', border: '#1E293B', badge: '',       badgeColor: '#64748B' },
};

interface Props {
  node: DiffNode;
  side: 'left' | 'right' | 'diff';
  onSelect?: (node: DiffNode) => void;
  selected?: string;
  filterStatus?: ChangeStatus | 'all';
}

export const BomTreeNode: React.FC<Props> = ({ node, side, onSelect, selected, filterStatus }) => {
  const [expanded, setExpanded] = useState(true);
  const style = STATUS_STYLE[node.status];
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selected === node.id;

  const hidden = filterStatus && filterStatus !== 'all' && node.status !== filterStatus;
  if (hidden) return null;

  const qty = side === 'left' ? node.leftQty : side === 'right' ? node.rightQty : undefined;

  return (
    <div style={{ marginLeft: node.depth * 20 }}>
      <div
        onClick={() => onSelect?.(node)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 12px',
          background: isSelected ? '#1E3A5F' : style.bg,
          borderLeft: `3px solid ${isSelected ? '#3B82F6' : style.border}`,
          marginBottom: 2,
          borderRadius: '0 5px 5px 0',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
      >
        {/* Expand toggle */}
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            style={{
              background: 'none', border: 'none', color: '#94A3B8',
              cursor: 'pointer', padding: 0, fontSize: 13, width: 16,
              fontFamily: 'monospace',
            }}
          >
            {expanded ? '▾' : '▸'}
          </button>
        ) : (
          <span style={{ width: 16, display: 'inline-block' }} />
        )}

        {/* Part number */}
        <span style={{
          fontFamily: 'Rajdhani, sans-serif', fontSize: 12, color: '#94A3B8',
          minWidth: 150, fontWeight: 600, letterSpacing: '0.05em',
        }}>
          {node.partNumber}
        </span>

        {/* Description */}
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 13, color: '#CBD5E1', flex: 1 }}>
          {node.description}
        </span>

        {/* Qty */}
        {qty !== undefined && (
          <span style={{
            fontFamily: 'Rajdhani, sans-serif', fontSize: 13, color: '#F1F5F9',
            fontWeight: 600, minWidth: 40, textAlign: 'right',
          }}>
            {qty} <span style={{ color: '#475569', fontSize: 11 }}>{node.unit}</span>
          </span>
        )}

        {/* Diff badge */}
        {side === 'diff' && style.badge && (
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif',
            color: style.badgeColor, background: `${style.badgeColor}18`,
            border: `1px solid ${style.badgeColor}44`,
            padding: '1px 7px', borderRadius: 3, letterSpacing: '0.08em',
          }}>
            {style.badge}
          </span>
        )}
      </div>

      {/* Detail row (modified only) */}
      {node.status === 'modified' && node.detail && (
        <div style={{
          marginLeft: node.depth * 20 + 20, marginBottom: 4,
          padding: '4px 12px', background: '#1C1000',
          borderLeft: '3px solid #F59E0B44',
          borderRadius: '0 4px 4px 0',
          fontSize: 11, color: '#92400E',
          fontFamily: 'Rajdhani, sans-serif',
        }}>
          {node.detail}
        </div>
      )}

      {/* Children */}
      {expanded && hasChildren && node.children!.map((child) => (
        <BomTreeNode
          key={child.id}
          node={child}
          side={side}
          onSelect={onSelect}
          selected={selected}
          filterStatus={filterStatus}
        />
      ))}
    </div>
  );
};
