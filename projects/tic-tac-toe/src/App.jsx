import { useState } from 'react';
import confetti from 'canvas-confetti'

import { Square } from './assets/components/Square.jsx';
import { TURN } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './assets/logic/board.js'
import { WinnerModal } from './assets/components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './assets/logic/storage/index.js';

import './app.css'

export const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
    // return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.X
  });

  const [winner, setWinner] = useState(null); // null no hay ganador, false es empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)

    resetGameStorage();
  }

  const updateBoard = (index) => {
    // no actualizamos esta posicion si ya tiene algo    
    if (board[index] || winner) return
    // actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
    // guarda aqui la partida
    saveGameToStorage({ board: newBoard, turn: newTurn });
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) { //ver si hay empate para finalizar el juego
      setWinner(false) //empate
    }
  };


  return (
    <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>
        Reset Game
      </button>
      {/* seccion para los juegos */}
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      {/* seccion para los turnos */}
      <section className='turn' >
        <Square
          isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square
          isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
};