import type { BomVersion } from '../../types/bom'

interface ToolbarProps {
  versions: BomVersion[]
  selectedTypes: string[]
  leftType: string
  rightType: string
  onToggleType: (type: string) => void
  onSetLeftType: (type: string) => void
  onSetRightType: (type: string) => void
}

export function Toolbar({
  versions,
  selectedTypes,
  leftType,
  rightType,
  onToggleType,
  onSetLeftType,
  onSetRightType,
}: ToolbarProps) {
  return (
    <header className="toolbar">
      <div className="toolbar-title">
        <h1>Daikin BOM Compare Portal</h1>
        <small>Mock Scaffold (local JSON data)</small>
      </div>

      <div className="toolbar-controls">
        <label>
          Left BOM
          <select value={leftType} onChange={(event) => onSetLeftType(event.target.value)}>
            {versions.map((version) => (
              <option key={version.type} value={version.type}>
                {version.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Right BOM
          <select value={rightType} onChange={(event) => onSetRightType(event.target.value)}>
            {versions.map((version) => (
              <option key={version.type} value={version.type}>
                {version.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="bom-type-toggles">
        {versions.map((version) => (
          <label key={version.type} className="toggle">
            <input
              type="checkbox"
              checked={selectedTypes.includes(version.type)}
              onChange={() => onToggleType(version.type)}
            />
            <span>{version.type}</span>
          </label>
        ))}
      </div>
    </header>
  )
}
