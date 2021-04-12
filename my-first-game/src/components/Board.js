import React, { 
    useState 
} from 'react';
import './Board.css';
import Tile from './Tile.js';

const Board = (props) => { 

    const players = {
        x: 'X', 
        o: 'O',
    }
    const [player, setPlayer] = useState(players.x);

    const [tiles, setTiles] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const handler = (coordinates) => {
        const newTiles = [...tiles];
        newTiles[coordinates.y][coordinates.x] = player;
        setPlayer(player === players.x ? players.o : players.x);
        setTiles(newTiles);
    }

    return (
        <div className="Container">
            <div className="Board">
                {tiles.map(
                    (row, y) => row.map(
                        (tile, x) => (<Tile handler={handler} coordinates={{x, y}} mark={tile}/>)
                    )
                )}
            </div>
        </div>
    );
}

export default Board;
