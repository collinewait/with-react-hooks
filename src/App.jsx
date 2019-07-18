import React, { useState, useEffect } from 'react';

const useLogToConsoleAndReturnNewName = (newName) => {
  const [customHookName, setCustomHookName] = useState('I am a custom hook');

  useEffect(() => {
    setCustomHookName(`I am ${newName}`);
    // eslint-disable-next-line no-console
    console.log('My custom hook', customHookName);
  }, [customHookName, newName]);
  return customHookName;
};

const App = () => {
  const [count, setCount] = useState(0);

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
      {count}
      <button type="button" onClick={() => setCount(0)}>Reset</button>
      <button type="button" onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button type="button" onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <h1>{newName}</h1>
    </>
  );
};

export default App;
