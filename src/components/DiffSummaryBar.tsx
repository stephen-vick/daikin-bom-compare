import React from 'react';

interface Props {
  summary: { added: number; removed: number; modified: number; unchanged: number; total: number };
}

const PILLS = [
  { key: 'modified' as const, label: 'Modified', color: '#F59E0B', bg: '#451A03' },
  { key: 'added' as const, label: 'Added', color: '#10B981', bg: '#064E3B' },
  { key: 'removed' as const, label: 'Removed', color: '#EF4444', bg: '#450A0A' },
  { key: 'unchanged' as const, label: 'Unchanged', color: '#64748B', bg: '#1E293B' },
];

export const DiffSummaryBar: React.FC<Props> = ({ summary }) => {
  const changed = summary.added + summary.removed + summary.modified;
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center', padding: '10px 20px',
      background: '#0D1B2A', borderBottom: '1px solid #1E293B', flexWrap: 'wrap',
    }}>
      <span style={{ color: '#94A3B8', fontSize: 12, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
        DELTA SUMMARY
      </span>
      <span style={{ color: '#334155', fontSize: 12 }}>|</span>
      {PILLS.map(({ key, label, color, bg }) => (
        <div key={key} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: bg, border: `1px solid ${color}33`,
          borderRadius: 5, padding: '3px 10px',
        }}>
          <span style={{ color, fontSize: 16, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif' }}>
            {summary[key]}
          </span>
          <span style={{ color: '#64748B', fontSize: 11, fontFamily: 'Rajdhani, sans-serif' }}>{label}</span>
        </div>
      ))}
      <span style={{ color: '#334155', fontSize: 12 }}>|</span>
      <span style={{ color: changed > 0 ? '#F59E0B' : '#10B981', fontSize: 12, fontFamily: 'Rajdhani, sans-serif' }}>
        {changed > 0 ? `${changed} CHANGES DETECTED` : 'NO CHANGES'}
      </span>
    </div>
  );
};
