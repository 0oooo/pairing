import React from 'react';
import './Tile.css';

const Tile = (props) => {

    const clickHandler = () => {
        props.handler(props.coordinates);
    }
    
    return (
        <div onClick = {clickHandler} className="Tile" >
            {props.mark}
        </div>
    );
}

export default Tile;
