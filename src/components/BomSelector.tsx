import React from 'react';
import { BomVersion, BomType } from '../types/bom';

const TYPE_CONFIG: Record<BomType, { label: string; color: string; bg: string }> = {
  engineering: { label: 'E-BOM', color: '#3B82F6', bg: '#1E3A5F' },
  manufacturing: { label: 'M-BOM', color: '#10B981', bg: '#064E3B' },
  'as-built': { label: 'As-Built', color: '#F59E0B', bg: '#451A03' },
  service: { label: 'Service', color: '#A78BFA', bg: '#2E1065' },
};

interface Props {
  boms: BomVersion[];
  selected: string;
  onChange: (id: string) => void;
  label: string;
  exclude?: string;
}

export const BomSelector: React.FC<Props> = ({ boms, selected, onChange, label, exclude }) => {
  const available = boms.filter((b) => b.id !== exclude);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em', color: '#94A3B8', textTransform: 'uppercase' }}>
        {label}
      </span>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: '#0F172A',
          border: '1px solid #334155',
          borderRadius: 6,
          color: '#F1F5F9',
          padding: '8px 12px',
          fontSize: 13,
          fontFamily: 'Rajdhani, sans-serif',
          cursor: 'pointer',
          outline: 'none',
          minWidth: 240,
        }}
      >
        {available.map((bom) => {
          const cfg = TYPE_CONFIG[bom.type];
          return (
            <option key={bom.id} value={bom.id}>
              {cfg.label} — {bom.versionNumber} ({bom.source})
            </option>
          );
        })}
      </select>
      {(() => {
        const b = boms.find((x) => x.id === selected);
        if (!b) return null;
        const cfg = TYPE_CONFIG[b.type];
        return (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
            <span style={{
              background: cfg.bg, color: cfg.color, padding: '2px 10px',
              borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif',
              border: `1px solid ${cfg.color}44`
            }}>
              {cfg.label}
            </span>
            <span style={{ color: '#64748B', fontSize: 11 }}>{b.status.toUpperCase()}</span>
            <span style={{ color: '#475569', fontSize: 11 }}>·</span>
            <span style={{ color: '#64748B', fontSize: 11 }}>{b.createdAt}</span>
          </div>
        );
      })()}
    </div>
  );
};
