/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';

const useLogToConsoleAndReturnNewName = (newName) => {
  const [customHookName, setCustomHookName] = useState('I am a custom hook');

  const updateName = useCallback(
    () => setCustomHookName(`I am ${newName}`), [newName],
  );

  useEffect(() => {
    updateName();
    console.log('My custom hook', customHookName);
  }, [customHookName, newName, updateName]);
  return customHookName;
};

function init(initialState) {
  console.log('Called init function', initialState);
  return initialState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

const initialState = { count: 0 };

const App = () => {
  const count = useSelector(state => state.count);
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const newName = useLogToConsoleAndReturnNewName('Colline');

  /**
   * Similar to componentDidMount and componentDidUpdate:
   * This function can optionally return a function that
   * performs clean up as shown bellow:
   * useEffect(() => {
   * document.title = `You clicked ${count} times`;
   * return () => console.log('clean up executed');
  });
   */
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  // This code breaks the first rule of hooks and should not be used
  // if (count > 0 ) {
  //   useEffect(() => {
  //     localStorage.setItem('formData', count);
  //   });
  // }

  // Better code. Use the condition inside the hook.
  useEffect(() => {
    if (count > 0) {
      localStorage.setItem('formData', count);
    }
  });

  /**
     * Unlike the setState method found in class components,
     * useState does not automatically merge update objects.
     * You can replicate this behavior by combining the function
     * updater form with object spread syntax:
     * setState(prevState => {
     *  // Object.assign would also work
     * return {...prevState, ...updatedValues};
     *});
     *
     * Another option is useReducer, which is more suited
     * for managing state objects that contain multiple sub-values.
     */

  return (
    <>
      Count:
      {' '}
      {state.count}
      <button
        type="button"
        onClick={() => dispatch({ type: 'reset', payload: initialState })}
      >

        Reset
      </button>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <h1>{newName}</h1>
      <h2>
        Value from the store:
        {count}
      </h2>
    </>
  );
};

export default App;
