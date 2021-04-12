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

    const [rows, setRows] = useState({
        0: {
            X : 0, 
            O: 0,
        },
        1: {
            X : 0, 
            O: 0,
        },
        2: {
            X : 0, 
            O: 0,
        } 
    }); 

    const handler = (coordinates) => {
        const newTiles = [...tiles];
        newTiles[coordinates.y][coordinates.x] = player;
        setTiles(newTiles);

        if(checkWinner(coordinates.y)){
            console.log("Winner is ", player);
            return; 
        }
        
        const newRows = rows;
        newRows[coordinates.y][player]++; 
        setRows(newRows); 
        console.log("rows = ", rows);

        setPlayer(player === players.x ? players.o : players.x);
    }

    const checkWinner = (row) => {
        if(rows[row][player] === 2) return true; 
        return false
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
