import type { BomVersion, DiffNode } from '../types/bom'
import { countNodeChanges } from '../utils/treeDiff'

interface Props {
  bomA: BomVersion
  bomB: BomVersion
  diff?: DiffNode
}

const TYPE_COLORS: Record<string, string> = {
  EBOM: '#2563EB',
  MBOM: '#7C3AED',
  SERVICE: '#16A34A',
}

function MetaCard({ version, side }: { version: BomVersion; side: string }) {
  const { meta, nodeCount } = version
  const badgeColor = TYPE_COLORS[version.type] ?? '#666'
  const typeLabel = version.type === 'EBOM' ? 'E-BOM' : version.type === 'MBOM' ? 'M-BOM' : 'Service'

  return (
    <div className="meta-card">
      <div className="meta-card-header">
        <span className="bom-type-badge" style={{ background: badgeColor }}>{typeLabel}</span>
        <span>BOM {side}</span>
      </div>
      {[
        ['Version', meta.version],
        ['Source System', meta.sourceSystem],
        ['Status', meta.status],
        ['Effective Date', meta.effectiveDate],
        ['Owner', meta.owner],
        ['Total Nodes', String(nodeCount)],
      ].map(([k, v]) => (
        <div className="meta-row" key={k}>
          <span className="meta-label">{k}</span>
          <span className="meta-value">{v}</span>
        </div>
      ))}
      <button
        className="btn-profisee"
        onClick={() => window.open('https://example.profisee.com', '_blank')}
      >
        &#8599; View in Profisee
      </button>
    </div>
  )
}

export function MetadataView({ bomA, bomB, diff }: Props) {
  const counts = diff ? countNodeChanges(diff) : null

  return (
    <div className="metadata-view">
      <div className="metadata-cards">
        <MetaCard version={bomA} side="A" />
        <MetaCard version={bomB} side="B" />
      </div>

      {counts && (
        <div className="meta-section">
          <div className="meta-section-title">Change Summary</div>
          <div className="change-summary-row">
            <span><span className="change-dot" style={{ background: '#16A34A' }} />{counts.added} Added</span>
            <span><span className="change-dot" style={{ background: '#DC2626' }} />{counts.removed} Removed</span>
            <span><span className="change-dot" style={{ background: '#E67E00' }} />{counts.changed} Changed</span>
            <span style={{ color: '#666' }}>|</span>
            <span>Across {bomA.nodeCount} (A) / {bomB.nodeCount} (B) total nodes</span>
          </div>
        </div>
      )}

      <div className="meta-section white">
        <div className="meta-section-title">Integration Architecture</div>
        <div className="meta-section-body">
          This compare portal is a <strong>custom web application</strong> deployed alongside Profisee SaaS in Daikin's Azure tenant. It shares Profisee's security model, calls Profisee <strong>REST APIs</strong> for all data operations, and can <strong>deep-link</strong> into the Profisee portal for workflow approvals, DQ rules, and audit history. Data ingestion from PLM and ERP uses native Profisee APIs &mdash; the custom UI renders specialized compare views on top of that governed data.
        </div>
      </div>

      <div className="meta-section white">
        <div className="meta-section-title">Demo Talking Points</div>
        <div className="meta-section-body">
          <p>&bull; Daikin can load <strong>multiple BOM versions</strong> into Profisee as the visibility and governance layer; Service BOM can be stewarded in MDM, while E/M BOM remain source-of-truth in PLM/ERP.</p>
          <p>&bull; The compare UI is <strong>custom</strong> because Daikin needs split-screen + delta at scale; but it uses Profisee APIs, security, and deep-links back into Profisee for workflows/audit/DQ.</p>
          <p>&bull; When an engineering release happens in PLM, Profisee can apply <strong>DQ + approvals + audit</strong> and then trigger downstream publishing (e.g. S/4) once all business checks complete.</p>
        </div>
      </div>
    </div>
  )
}
