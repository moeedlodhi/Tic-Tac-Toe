import { useState } from "react"
import PlayerInfo from "./components/PlayerInfo"
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer

}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);


  let gameBoard = [...initialGameBoard.map(
    array => [...array]
  )];
  // let gameBoard = initialGameBoard

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col } = square;

      gameBoard[row][col] = player;

  }

  let winner = null;

  for (const combs of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combs[0].row][combs[0].column]
    const secondSquareSymbol = gameBoard[combs[1].row][combs[1].column]
    const thirdSquareSymbol = gameBoard[combs[2].row][combs[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {

      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => {
    //   return curActivePlayer === 'X' ? 'O' : 'X';
    // });

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: activePlayer },...prevTurns];
      return updatedTurns;
    });
  }
  
  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo player="Player 1" symbol="X" isActive={activePlayer === 'X'}></PlayerInfo>
          <PlayerInfo player="Player 2" symbol="O" isActive={activePlayer === 'O'}></PlayerInfo>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare}
        activePlayerSymbol={activePlayer} turns={gameTurns} board={gameBoard}></GameBoard>
       </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
