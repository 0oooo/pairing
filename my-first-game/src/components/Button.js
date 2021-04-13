import React from 'react';
import './Button.css';

const Button = (props) => {

    const clickHandler = () => {
        props.handler();
    }
    
    return (
        <button onClick = {clickHandler} className="Button" >
            {props.message? props.message : "Click me"}
        </button>
    );
}

export default Button;
