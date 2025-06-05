// src/components/LineSelector.tsx
interface Props {
  lines: number;
  setLines: (n: number) => void;
}

export default function LineSelector({ lines, setLines }: Props) {
  return (
    <div style={{ marginTop: "16px" }}>
      <select
        value={lines}
        onChange={(e) => setLines(parseInt(e.target.value))}
        className="line-selector"
      >
        <option value={1}>1 línea</option>
        <option value={3}>3 líneas</option>
        <option value={5}>5 líneas</option>
      </select>
    </div>
  );
}
