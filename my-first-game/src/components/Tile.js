import React, { useState } from 'react';
import './Tile.css';

const Tile = (props) => {
    const [currentMark, setCurrentMark] = useState('Click me');

    const onClickHandler = (event) => {
        setCurrentMark(props.mark);
    }

    return (
        <div onClick = { onClickHandler } className="Tile" >
            {currentMark}
        </div>
    );
}

export default Tile;
