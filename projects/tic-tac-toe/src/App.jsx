import { useState } from 'react';
import confetti from 'canvas-confetti'
import './app.css'

const TURN = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const App = () => {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null); // null no hay ganador, false es empate

  const checkWinner = (boardToCheck) => {

    // revisamos todas las opciones ganadoras para ver si X u O gano
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // ves si 0 es una X o una O
        boardToCheck[a] === boardToCheck[b] && // 0 y 3 los compara a ver si hay la X y otra X  u  O y otra O
        boardToCheck[a] === boardToCheck[c]   // Si a y b Y a y c son iguales hay 3 en raya
      ) {
        return boardToCheck[a] // devuelve X u O para ver quien gano
      }
    }
    return null; // no hay ganador
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)

  }

  const checkEndGame = (newBoard) => {  // revisa si todos (every) de los squares del newBoard estan llenos con X u O 
    return newBoard.every((square) => square !== null)
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
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
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

      {
        winner !== null && (
          <section className='winner'>
            <div>
              <h2>
                {
                  winner === false ? 'Es empate' : 'Ha ganado:'
                }
              </h2>
              <header>
                {
                  winner && <Square>{winner}</Square>
                }
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>

          </section>
        )
      }


    </main>
  )
};