import conejo from '../assets/Conejo.png';
import bar from "../assets/Bar.png";
import barTriple from "../assets/BarTriple.png";
import cincoBar from "../assets/CincoBar.png";
import cereza from "../assets/Cereza.png";
import sieteNegro from "../assets/SieteNegro.png";
import sieteBlanco from "../assets/SieteBlanco.png";

const NON_SPECIAL = [conejo, bar, barTriple, cincoBar, cereza, sieteNegro, sieteBlanco];

const multipliers: Record<string, number[]> = {
  bar: [1.25, 1.5, 2],
  barTriple: [2, 2.5, 3],
  cereza: [1.25, 1.5, 2],
  sieteNegro: [1.25, 1.5, 2],
  sieteBlanco: [1.5, 2, 2.5],
  cincoBar: [2.5, 3, 4],
  conejo: [2, 2.5, 3],
};

function getSymbolName(symbol: string): string {
  switch (symbol) {
    case conejo: return "conejo";
    case bar: return "bar";
    case barTriple: return "barTriple";
    case cincoBar: return "cincoBar";
    case cereza: return "cereza";
    case sieteNegro: return "sieteNegro";
    case sieteBlanco: return "sieteBlanco";
    default: return "";
  }
}

export function getRandomSymbol(): string {
  const pool = [
    bar, bar,bar,bar,bar,
    barTriple, barTriple,
    cereza, cereza,cereza,cereza,cereza, 
    sieteNegro, sieteNegro,
    sieteBlanco, sieteBlanco,
    cincoBar, cincoBar,
    conejo, conejo,
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function evaluateLines(
  grid: string[][],
  lines: number,
  cost: number,
  setWinMessage: (msg: string) => void
): {

  totalWin: number;
  win: boolean;
  multiplier: number;
  hasNormalWin: boolean;
} {
  let totalEsferas = 0;
  let totalMultiplier = 0;
  let hasNormalWin = false;
  const winMessages: string[] = [];

  const activeLines: number[][][] = [];

  const baseLines = [
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Línea del medio
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // Línea superior
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Línea inferior
  ];
  const diagonalLines = [
    [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]], // Diagonal arriba→abajo
    [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], // Diagonal abajo→arriba
  ];

  if (lines === 1) activeLines.push(baseLines[0]);
  else if (lines === 3) activeLines.push(...baseLines); // las 3 horizontales
  else if (lines === 5) activeLines.push(...baseLines, ...diagonalLines);

  const conejoChecks: { [key: string]: boolean } = {};

  for (const line of activeLines) {
    const firstSymbol = grid[line[0][0]][line[0][1]];
    let count = 1;

    for (let i = 1; i < line.length; i++) {
      const [prevR, prevC] = line[i - 1];
      const [currR, currC] = line[i];

      const prevSymbol = grid[prevR][prevC];
      const currSymbol = grid[currR][currC];

      if (currSymbol === prevSymbol) {
        count++;
      } else {
        break;
      }
    }

    const symbolName = getSymbolName(firstSymbol);


    if (count === 2 && symbolName === "cincoBar") {
      totalMultiplier += 2;
      winMessages.push("¡BONO x2 por 2 CINCO BAR!");
      hasNormalWin = true;
      continue;
    }


    if (count >= 3 && NON_SPECIAL.includes(firstSymbol)) {
      const multiplier = multipliers[symbolName]?.[count - 3] || 0;
      totalMultiplier += multiplier;
      winMessages.push(`¡${count} ${symbolName.toUpperCase()}! x${multiplier}`);
      hasNormalWin = true;

      if (symbolName === "conejo") {
        conejoChecks[line.toString()] = true;
      }
    }

  }

  // 🎯 Validación del conejo: si solo ganaste por conejo, no se paga
  const soloConejo = Object.keys(conejoChecks).length > 0 && winMessages.every(msg => msg.includes("CONEJO"));
  if (soloConejo) {
    totalMultiplier = 0;
    winMessages.length = 0;
    setWinMessage("");
  }

  const wonAmount = Math.floor(totalMultiplier * cost);

  if (wonAmount > 0 && !soloConejo) {
    setWinMessage(`USTED HA GANADO $${wonAmount}`);
  }

  return {
    win: wonAmount > 0,
    multiplier: totalMultiplier,
    hasNormalWin,
    totalWin: wonAmount
  };
}

