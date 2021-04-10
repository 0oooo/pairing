import React, { useState } from 'react';

const Tile = (props) => {
    const [currentMark, setCurrentMark] = useState('Click me');

    const onClickHandler = (event) => {
        setCurrentMark(props.mark);
    }

    return (
        <div onClick = { onClickHandler } style={{border:"1px solid blue", width: 40 + 'px', height:40 + 'px'}}>
            {currentMark}
        </div>
    );
}

export default Tile;
