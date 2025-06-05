interface Props {
  grid: string[][];
  winMessage: string;
}

export default function SlotGrid({ grid, winMessage }: Props) {
  return (
    <div className="slot-grid">
      {grid.map((row, i) =>
        row.map((symbol, j) => (
          <div key={`${i}-${j}`} className="slot-cell">
            <img src={symbol} alt="symbol" width={48} height={48} />
          </div>
        ))
      )}
    </div>
  );
}
