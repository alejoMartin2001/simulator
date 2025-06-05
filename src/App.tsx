import { useState } from "react";
import SlotGrid from "./components/SlotGrid";
import ControlPanel from "./components/ControlPanel";
import LineSelector from "./components/LineSelector";
import conejo from './assets/Conejo.png';
import bar from "./assets/Bar.png";
import barTriple from "./assets/BarTriple.png";
import cincoBar from "./assets/CincoBar.png";
import cereza from "./assets/Cereza.png";
import sieteNegro from "./assets/SieteNegro.png";
import sieteBlanco from "./assets/SieteBlanco.png";
import esfera from "./assets/Esfera.png";
import Informacion from "./components/Informacion";

import { getRandomSymbol, evaluateLines } from "./utils/gameLogic";

const ROWS = 3;
const COLS = 5;

export default function App() {
  const [balance, setBalance] = useState(0);
  const [lines, setLines] = useState(1);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [grid, setGrid] = useState<string[][]>(generateGrid());
  const [winMessage, setWinMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);


  function generateGrid(): string[][] {
    return Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => getRandomSymbol())
    );
  }

  function spin() {
    
    const cost = lines * 10;//el costo si hay juegos gratis es 0 sino multiplico las lineas que se juegan por 10. Esta bien

    if (balance < cost){
      return;
    }else{
      setBalance(prev => prev - cost);
    }

        

    let count = 0;
    let finalGrid: string[][] = [];

    const interval = setInterval(() => {
      const tempGrid = generateGrid();
      setGrid(tempGrid);
      count++;

      if (count >= 10) {
        clearInterval(interval);
        finalGrid = generateGrid();
        setGrid(finalGrid);

        const result = evaluateLines(finalGrid, lines, cost, setWinMessage);

        if (result.totalWin > 0) {
          setBalance(prev => prev + result.totalWin);
        }

        setShowSpinModal(true); // Siempre mostrar modal
          }
       
    }, 100);
    setWinMessage("");
  }


  return (
    <div className="app-container">
      <div className="header-banner">
        <div className="paytable">
          {/* Grupo 1 */}
          <div className="paytable-row">
            <div className="icon-group">
              <img src={bar} className="symbol-icon" alt="Bar" />
              <img src={cereza} className="symbol-icon" alt="Cereza" />
              <img src={sieteNegro} className="symbol-icon" alt="Siete Negro" />
            </div>
            <div className="payout-info">
              <span>X3 = 1.25x</span>
              <span>X4 = 1.5x</span>
              <span>X5 = 2x</span>
            </div>
          </div>

          {/* Grupo 2 */}
          <div className="paytable-row">
            <div className="icon-group">
              <img src={barTriple} className="symbol-icon" alt="Bar Triple" />
              <img src={conejo} className="symbol-icon" alt="Conejo" />
            </div>
            <div className="payout-info">
              <span>X3 = 2x</span>
              <span>X4 = 2.5x</span>
              <span>X5 = 3x</span>
            </div>
          </div>

          {/* Grupo 3 */}
          <div className="paytable-row">
            <div className="icon-group">
              <img src={sieteBlanco} className="symbol-icon" alt="Siete Blanco" />
            </div>
            <div className="payout-info">
              <span>X3 = 1.5x</span>
              <span>X4 = 2x</span>
              <span>X5 = 2.5x</span>
            </div>
          </div>

          {/* Grupo 4 */}
          <div className="paytable-row">
            <div className="icon-group">
              <img src={cincoBar} className="symbol-icon" alt="Cinco Bar" />
            </div>
            <div className="payout-info">
              <span>X2 = 2x</span>
              <span>X3 = 2.5x</span>
              <span>X4 = 3x</span>
              <span>X5 = 4x</span>
            </div>
          </div>
        </div>
        </div>

      <div className="game-interface">
        <div className="left-panel">
          <div className="info-block">
            <div>💰 Saldo: ${balance}</div>
            <div>🎯 Líneas: {lines}</div>
          </div>
        </div>

        <div className={`slot-machine-frame ${showSpinModal ? "blurred" : ""}`}>
          <SlotGrid grid={grid} winMessage={winMessage} />
          <div className="win-display">{winMessage}</div>
        
          <div className="control-panel-bottom">
            <button className="btn-small" onClick={spin}>Girar</button>
            <ControlPanel
            lines={lines}
            balance={balance}
            setBalance={setBalance}
            onSpin={spin}
          />
          </div>
          {/* Selector de líneas movido adentro del frame */}
          <div>
            <div className="line-selector-c">
              <LineSelector lines={lines} setLines={setLines} />
            </div>
            <div className="informacion" onClick={() => setShowInfo(true)}>
              i
            </div>

          </div>

        </div>
          
      </div>
      {showInfo && (
            <div className="info-overlay">
              <div className="info-content">
                <button className="btn-cerrar-info" onClick={() => setShowInfo(false)}>Cerrar ❌</button>
                <Informacion />
              </div>
              </div>
                )}
    </div>
    
  );
}
