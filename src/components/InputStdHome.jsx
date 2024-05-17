import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

function InputStdHome(props) {
  const [inputValue, setInputValue] = useState(props.value || props.defaultText);
  const { urlCode } = useContext(AppContext);

  useEffect(() => {
    if (props.defaultValue) {
      setInputValue(props.defaultValue);
    }
  }, []);

  useEffect(() => {
    if (urlCode) {
      setInputValue(urlCode);
    }
  }, [urlCode]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputValue(newValue);
    props.onchange(newValue);
  }

  function handleFocus() {
    if (inputValue === props.defaultText) {
      setInputValue(''); // Actualizar el valor del input a una cadena vacía
      props.onchange(''); // Llamar a onchange con una cadena vacía
    }
  }

  function handleBlur() {
    if (inputValue === '') {
      setInputValue(props.defaultText); // Actualizar el valor del input a una cadena vacía
      props.onchange(props.defaultText); // Llamar a onchange con una cadena vacía
    }
  }

  return (
    <div className="py-2 px-1">
      <div className={(inputValue === props.defaultText ? "font-extralight " : "font-normal")}>
        <input
          className="rounded-md p-1 flex-1 text-m text-center bg-zinc-200"
          type="text"
          value={inputValue}
          onChange={handleChange}
          name={props.name}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div >
    </div>
  );
}

export default InputStdHome;