import React, { 
    useState 
} from 'react';
import './Board.css';
import Tile from './Tile.js';
import uuid from 'react-uuid';

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

    const [columns, setColumns] = useState({
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

    const [diagonals, setDiagonals] = useState({
        0: {
            X : 0, 
            O: 0,
        }, 
        1: {
            X : 0, 
            O: 0,
        }, 
    }); 

    const diagonalsSet = new Set(["[0, 0]", "[0, 2]", "[1, 1]", "[2, 0]", "[2, 2]"]);

    const drawGame = (coordinates) => {
        const newTiles = [...tiles];
        newTiles[coordinates.y][coordinates.x] = player;
        setTiles(newTiles);
    }

    const updateRows = (row) => {
        const newRows = rows;
        newRows[row][player]++; 
        setRows(newRows); 
    }

    const updateColumns = (column) => {
        const newColumns = columns;
        newColumns[column][player]++; 
        setColumns(newColumns); 
    }

    const isDiagonal1 = (coordinates) => {
        if(coordinates.x === coordinates.y) return true; 
        return false; 
    }

    const isDiagonal2 = (coordinates) => {
        if(coordinates.x !== coordinates.y) return true; 
        if(coordinates.x === 1 && coordinates.y === 1) return true; 
        return false; 
    }

    const updateDiagonal = (coordinates) => {
        const coordString = "["+ coordinates.x + ", " + coordinates.y + "]";
        if(diagonalsSet.has(coordString)) {
            const newDiagonals = diagonals;
            if(isDiagonal1) newDiagonals[0][player]++; 
            if(isDiagonal2) newDiagonals[1][player]++; 
            setDiagonals(newDiagonals);
        }
    }

    const handler = (coordinates) => {
        drawGame(coordinates); 

        if(checkWinner(coordinates)){
            console.log("Winner is ", player);
            return; 
        }
        updateRows(coordinates.y);
        updateColumns(coordinates.x);
        updateDiagonal(coordinates);

        setPlayer(player === players.x ? players.o : players.x);
    }

    const checkWinner = (coordinates) => {
        if(rows[coordinates.y][player] === 2) {
            return true; 
        }
        if(columns[coordinates.x][player] === 2){
            return true; 
        } 
        if(isDiagonal1(coordinates) && diagonals[0][player] === 2){
            console.log("diagonals = ", diagonals);
            console.log("player = ", player);
            return true; 
        }
        // if(isDiagonal2(coordinates) && diagonals[1][player] === 2){
        //     return true; 
        // }
        return false
    }

    return (
        <div className="Container">
            <div className="Board">
                {tiles.map(
                    (row, y) => row.map(
                        (tile, x) => (<Tile key={uuid()} handler={handler} coordinates={{x, y}} mark={tile}/>)
                    )
                )}
            </div>
        </div>
    );
}

export default Board;
