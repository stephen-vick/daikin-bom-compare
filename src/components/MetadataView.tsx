import type { BomVersion } from '../types/bom'

interface Props {
  bomA: BomVersion
  bomB: BomVersion
}

function statusClassName(status: string): string {
  return status.toLowerCase().replace(/\s+/g, '-')
}

function MetaCard({ version, side }: { version: BomVersion; side: string }) {
  const { meta, nodeCount } = version
  return (
    <div className="meta-card">
      <div className="meta-card-header">
        &#9881; BOM {side}
      </div>
      <div className="meta-card-body">
        <div className="meta-row">
          <span className="meta-label">Version</span>
          <span className="meta-value">{meta.version}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Source System</span>
          <span className="meta-value">{meta.sourceSystem}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Status</span>
          <span className="meta-value">
            {meta.status === 'Released' && <span>&#10003; </span>}
            <span className={`status-badge ${statusClassName(meta.status)}`}>
              {meta.status}
            </span>
          </span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Effective Date</span>
          <span className="meta-value">{meta.effectiveDate}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Owner</span>
          <span className="meta-value">{meta.owner}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Total Components</span>
          <span className="meta-value">{nodeCount}</span>
        </div>
        <button
          className="btn-profisee"
          onClick={() => window.open('https://example.profisee.com', '_blank')}
        >
          &#8599; View in Profisee
        </button>
      </div>
    </div>
  )
}

export function MetadataView({ bomA, bomB }: Props) {
  return (
    <div className="metadata-view">
      <MetaCard version={bomA} side="A" />
      <MetaCard version={bomB} side="B" />
    </div>
  )
}
