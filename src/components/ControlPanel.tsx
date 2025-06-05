interface Props {
  lines: number;
  balance: number;
  setBalance: (n: number) => void;
  onSpin: () => void;
}

export default function ControlPanel({
  balance,
  setBalance,
}: Props) {
  return (
    <div className="control-panel-bottom"> 
      <button className="btn-small" onClick={() => setBalance(balance + 1000)}> +1000</button>
      <button className="btn-small" onClick={() => setBalance(0)}>Retirar</button>
    </div>
    //className="control-panel-bottom"
  );
}
