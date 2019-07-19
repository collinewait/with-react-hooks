import React, { useState } from 'react';


const One = () => {
  const [name, setName] = useState('Colline');
  return (
    <h1>
Hey:
      {' '}
      { name }
    </h1>
  );
};

export default One;
