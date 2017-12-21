import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE, restartGame, makeGuess, generateAuralUpdate} from './actions';
import reducer from './reducer';

describe('Hot Cold reducer', () => {
  const testingState = {
    guesses: [1, 2, 3, 4, 5],
    feedback: 'WRONG!',
    auralStatus: 'Something Here',
    correctAnswer: 100
  }
  //
  it('Should set the initial state on when nothing passed in', () => {
    const state = reducer(undefined, {type: "UNKNOWN"});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual("");
  });

  it('Should not alter the state on an unknown action', () => {
    const state = reducer(testingState, {type: 'UNKNOWN'})
    expect(state).toEqual(testingState);
  })

  it('Should make a guess', () => {
    const state = reducer(testingState, {type: MAKE_GUESS, guess: 25})
    expect(state.guesses).toEqual([...testingState.guesses, 25])
  });

  describe('MAKE_GUESS', () => {
    it('Should give Feedback: Ice Cold', () => {
      const state = reducer(testingState, {type: MAKE_GUESS, guess: 25});
      expect(state.feedback).toEqual("You're Ice Cold...");
    });

    it('Should give Feedback: You got it!', () => {
      const state = reducer(testingState, {type: MAKE_GUESS, guess: 100});
      expect(state.feedback).toEqual('You got it!');
    })
  });

  describe('RESTART_GAME', () => {
    it('Should restart the game and set state to intial state', () => {
      const state = reducer(testingState, {type: RESTART_GAME});
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.auralStatus).toEqual("");
    })
  })

});
