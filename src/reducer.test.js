import reducer from './reducer';
import { generateAuralUpdate, makeGuess, restartGame } from './actions';

describe('Reducer', () => {
  it('Should set the initial state upon start', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.auralStatus).toEqual('');
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('restartGame', () => {
    it('Should restart the game', () => {
      let state = {
        guesses: [12, 45, 68, 90],
        feedback: 'random feedback',
        correctAnswer: 45
      };
      const correctAnswer = 15;
      state = reducer(state, restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.auralStatus).toEqual('');
    });
  });

    describe('makeGuess', () => {
      it('Should make a guess', () => {
        let state = {
          guesses: [],
          feedback: '',
          correctAnswer: 100 // Negative so different to new game
        };

        state = reducer(state, makeGuess(25));
        expect(state.guesses).toEqual([25]);
        expect(state.feedback).toEqual(`You're Ice Cold...`);

        state = reducer(state, makeGuess(60));
        expect(state.guesses).toEqual([25, 60]);
        expect(state.feedback).toEqual(`You're Cold...`);

        state = reducer(state, makeGuess(80));
        expect(state.guesses).toEqual([25, 60, 80]);
        expect(state.feedback).toEqual(`You're Warm.`);

        state = reducer(state, makeGuess(95));
        expect(state.guesses).toEqual([25, 60, 80, 95]);
        expect(state.feedback).toEqual(`You're Hot!`);

        state = reducer(state, makeGuess(100));
        expect(state.guesses).toEqual([25, 60, 80, 95, 100]);
        expect(state.feedback).toEqual(`You got it!`);
    });
});

    it('Can create aural updates', () => {
        let state = {
            guesses: [16, 89, 3, 6],
            feedback: `You're warm.`,
            auralStatus: ''
        };

        state = reducer(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual(
            `Here's the status of the game right now: You're warm. You've made 4 guesses. In order of most- to least-recent, they are: 6, 3, 89, 16`,
        );
    });
});
