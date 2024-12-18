import { winnerCombos } from '../../constants.js';

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {  // revisa si todos (every) de los squares del newBoard 
    // estan llenos con X u O 
return newBoard.every((square) => square !== null)
}