import * as React from 'react';
import './style.css';
import Game from './Game';
import {
  INITIAL_SCORE,
  LOSING_SCORE,
  RIGHT_POINT,
  WINNING_SCORE,
  WRONG_POINT,
} from './constants';
import { showAlert } from './lib';

export default function App() {
  const [progressing, setProgressing] = React.useState(false);
  const [score, setScore] = React.useState(INITIAL_SCORE);
  const [wins, setWins] = React.useState(0);
  const [losses, setLosses] = React.useState(0);

  function handleStart(): void {
    setProgressing(true);
  }

  function handleEnd(): void {
    setProgressing(false);
  }

  function handleReset(): void {
    handleEnd();
    setScore(INITIAL_SCORE);
  }

  function handleGuess(guess: string, word: string): void {
    if (guess === word.substring(1)) setScore(score + RIGHT_POINT);
    else setScore(score + WRONG_POINT);
  }

  React.useEffect(() => {
    if (score === WINNING_SCORE) {
      setWins(wins + 1);
      handleReset();
      showAlert('you have won!');
    }
    if (score == LOSING_SCORE) {
      setLosses(losses + 1);
      handleReset();
      showAlert('you have lost!');
    }
  }, [score]);

  React.useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent): string => {
      const message = 'o/';
      (e || window.event).returnValue = message; //Gecko + IE
      return message;
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div className="center">
      <div>
        {!progressing && (
          <div>
            <div className="margin">
              <span className="wins">{wins} wins </span>
              <span className="losses">{losses} losses</span>
            </div>
            <div className="margin">
              <button type="button" className="button" onClick={handleStart}>
                start game
              </button>
            </div>
          </div>
        )}
        {progressing && (
          <div>
            <div className="margin score">{score} points</div>
            <div className="margin game">
              <Game handleGuess={handleGuess} />
            </div>
            <div className="margin">
              <button type="button" className="button" onClick={handleEnd}>
                end game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
