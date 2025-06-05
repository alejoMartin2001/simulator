import conejo from '../assets/Conejo.png';
import bar from "../assets/Bar.png";
import barTriple from "../assets/BarTriple.png";
import cincoBar from "../assets/CincoBar.png";
import cereza from "../assets/Cereza.png";
import sieteNegro from "../assets/SieteNegro.png";
import sieteBlanco from "../assets/SieteBlanco.png";
import esfera from "../assets/Esfera.png";
import rosco from "../assets/rosco.png";
import lineas from "../assets/opcionesLineas.png";
import premioHorizontal from "../assets/premioHorizontal.png";
import premioDiagonal from "../assets/premioDiagonal.png";


export default function informacion(){

  return(
    <div className="infoJuego">
      <h2>Reglas sobre 🎰Simulator🎰</h2>
      <div>
        <p>El juego consiste en un rosco de 3 filas y 5 columnas en el que cada fila y 
          columna determinada de manera aleatoria se elige al azar 1 simbolo de 7 posibles.
          Para comenzar a jugar se debe oprimir +1000 para acreditar el saldo, elegir una linea
          (sino por defecto juego 1 linea) oprimiendo el boton inferior a la izquierda dentro rosco. 
          Y listo puede oprimir Girar.
          Si el jugador quiere sacar su dinero, oprime retirar y listo. 
          Interfaz del rosco:</p>
          <img src={rosco}/>  
      </div>
      <div className='lineas'>
        <p>Si el jugador oprime 1 linea, solo obtiene premios en fila de en medio.
          Si lo hace en 3 lineas, obtiene premios en las tres filas de forma horizontal.
          Si oprime 5 lineas, ademas de premios en las 3 filas obtiene en forma diagonal.
        </p>
        <img src={lineas}/>
      </div>
      <div className='combinaciones'>
          <p>Todas las combinaciones si el jugador juega 1 linea o 3 tienen la misma
            regla, si salen a partir de 3 simbolos consecutivos(salvo en el simbolo cincoBar)
            y la combinación empieza en la primer columna el jugador obtiene premio. 
            Ejemplo:
          </p>
          <img src={premioHorizontal}/>
          <p>Si el jugador juega 5 lineas obtiene premios en diagonal desde arriba izquierda a abajo derecha
            o desde abajo izquierda a arriba derecha.
            Ejemplo:
          </p>
          <img src={premioDiagonal}/>
          <p>El conejo que es una bonificación se obtiene si y solo si el jugador gano otro premio
            diferente ademas del conejo.
          </p>
      </div>
      <div></div>
    </div>    
  );


}


