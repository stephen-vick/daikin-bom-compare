import React, { useState, useMemo } from 'react';
import { MOCK_BOMS } from './data/mockBoms';
import { diffBoms } from './data/diffUtils';
import { BomSelector } from './components/BomSelector';
import { BomPanel } from './components/BomPanel';
import { DiffPanel } from './components/DiffPanel';
import { DiffSummaryBar } from './components/DiffSummaryBar';

type ViewMode = 'sidebyside' | 'diff';

function App() {
  const [leftId, setLeftId] = useState(MOCK_BOMS[0].id);
  const [rightId, setRightId] = useState(MOCK_BOMS[1].id);
  const [viewMode, setViewMode] = useState<ViewMode>('sidebyside');

  const leftBom = MOCK_BOMS.find((b) => b.id === leftId)!;
  const rightBom = MOCK_BOMS.find((b) => b.id === rightId)!;

  const diffResult = useMemo(() => diffBoms(leftBom, rightBom), [leftId, rightId]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', background: '#080F1A',
      fontFamily: 'Rajdhani, sans-serif',
      overflow: 'hidden',
    }}>
      {/* ── Top Toolbar ────────────────────────────────────────────── */}
      <div style={{
        background: '#0D1B2A',
        borderBottom: '1px solid #1E293B',
        padding: '0 20px',
        display: 'flex', alignItems: 'stretch', gap: 0,
        minHeight: 56,
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          paddingRight: 24, borderRight: '1px solid #1E293B', marginRight: 20,
        }}>
          <div style={{
            width: 32, height: 32, background: '#1D4ED8',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Rajdhani, sans-serif' }}>D</span>
          </div>
          <div>
            <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em' }}>DAIKIN</div>
            <div style={{ color: '#475569', fontSize: 10, letterSpacing: '0.15em' }}>BOM COMPARE</div>
          </div>
        </div>

        {/* Order context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingRight: 20, borderRight: '1px solid #1E293B', marginRight: 20 }}>
          <span style={{ color: '#475569', fontSize: 11, letterSpacing: '0.1em' }}>ORDER</span>
          <span style={{ color: '#3B82F6', fontSize: 12, fontWeight: 700 }}>AMZ-CHR-2025-0042</span>
          <span style={{ color: '#1E40AF', fontSize: 11 }}>· Amazon Chiller (CTO)</span>
        </div>

        {/* BOM Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <BomSelector boms={MOCK_BOMS} selected={leftId} onChange={setLeftId} label="Left BOM" exclude={rightId} />
          <div style={{ color: '#334155', fontSize: 18 }}>⇌</div>
          <BomSelector boms={MOCK_BOMS} selected={rightId} onChange={setRightId} label="Right BOM" exclude={leftId} />
        </div>

        {/* View mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1px solid #1E293B', paddingLeft: 20 }}>
          {(['sidebyside', 'diff'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '6px 16px',
                background: viewMode === mode ? '#1D4ED8' : 'transparent',
                border: `1px solid ${viewMode === mode ? '#3B82F6' : '#1E293B'}`,
                borderRadius: 5,
                color: viewMode === mode ? '#fff' : '#64748B',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {mode === 'sidebyside' ? 'SIDE BY SIDE' : 'DIFF VIEW'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Delta Summary ───────────────────────────────────────────── */}
      <DiffSummaryBar summary={diffResult.summary} />

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: 12, gap: 10 }}>
        {viewMode === 'sidebyside' ? (
          <>
            <BomPanel
              bom={leftBom}
              nodes={diffResult.nodes}
              side="left"
            />
            <BomPanel
              bom={rightBom}
              nodes={diffResult.nodes}
              side="right"
            />
          </>
        ) : (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            background: '#0B1622', borderRadius: 8,
            border: '1px solid #1E293B', overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#0D1B2A',
              borderBottom: '1px solid #1E293B',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em' }}>
                CHANGE ANALYSIS — {leftBom.label} {leftBom.versionNumber} vs {rightBom.label} {rightBom.versionNumber}
              </span>
            </div>
            <DiffPanel
              nodes={diffResult.nodes}
              leftBom={leftBom}
              rightBom={rightBom}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
