/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

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

const initialState = { count: 0 };

const selectCount = createSelector(
  state => state.count,
  count => count,
);

const App = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(reducer, initialState, init);
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

  const incrementCounter = useCallback(
    () => dispatch({ type: 'INCREMENT_COUNTER' }),
    [dispatch],
  );

  const decrementCounter = useCallback(
    () => dispatch({ type: 'DECREMENT_COUNTER' }),
    [dispatch],
  );
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
      {count}
      <button
        type="button"
        onClick={() => dispatch({ type: 'reset', payload: initialState })}
      >

        Reset
      </button>
      <button type="button" onClick={incrementCounter}>+</button>
      <button type="button" onClick={decrementCounter}>-</button>
      <h1>{newName}</h1>
      <h2>
        Value from the store:
        {count}
      </h2>
    </>
  );
};

export default App;
