import React, { 
    // useState 
} from 'react';
import './Board.css';
import Tile from './Tile.js';

const Board = (props) => {

    
    const tiles = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    return (
        <div className="Container">
            <div className="Board">
                {tiles.map(
                    row => row.map(
                        tile => (<Tile />)
                    )
                )}
            </div>
        </div>
    );
}

export default Board;
