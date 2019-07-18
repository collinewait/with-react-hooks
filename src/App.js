import React, { useState, useEffect } from 'react';

const useLogToConsoleAndReturnNewName = (newName) => {
  const [customHookName, setCustomHookName] = useState('I am a custom hook');

  const setNewHookName = () => setCustomHookName(`I am ${newName}`);

  useEffect(() => {
    setNewHookName();
    console.log('My custom hook', customHookName);
  });
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
      if (count > 0 ) {
      localStorage.setItem('formData', count);
      }
    });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <h1>{newName}</h1>
    </div>
  );
}

export default App;
