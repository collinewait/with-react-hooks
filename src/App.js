import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

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
    </div>
  );
}

export default App;
