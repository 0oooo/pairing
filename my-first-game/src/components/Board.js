import React, { 
    useState 
} from 'react';
import './Board.css';
import Tile from './Tile.js';
import Button from './Button.js';
import uuid from 'react-uuid';

const Board = (props) => { 

    const [play, setPlay] = useState(true);

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

    const winningMessage = "And the winner is player ";

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
            if(isDiagonal1(coordinates)) newDiagonals[0][player]++; 
            if(isDiagonal2(coordinates)) newDiagonals[1][player]++; 
            setDiagonals(newDiagonals);
        }
    }

    const canPlay = (coordinates) => {
        if(tiles[coordinates.y][coordinates.x] === null) return true; 
    }

    const setWinner = () =>{
        const winner = winningMessage + player; 
        document.getElementById("winner").style.display = 'block';
        document.getElementById("winner").innerHTML += winner;
    }

    const checkWinner = (coordinates) => {
        if(rows[coordinates.y][player] === 2) return true
        
        if(columns[coordinates.x][player] === 2) return true;  

        if(isDiagonal1(coordinates) && diagonals[0][player] === 2) return true; 
        if(isDiagonal2(coordinates) && diagonals[1][player] === 2) return true; 
        
        return false
    }

    const playHandler = (coordinates) => {
        if(play){
            if(!canPlay(coordinates)) return 
            drawGame(coordinates); 

            if(checkWinner(coordinates)){
                setPlay(false);
                setWinner(); 
                return; 
            }
            updateRows(coordinates.y);
            updateColumns(coordinates.x);
            updateDiagonal(coordinates);
    
            setPlayer(player === players.x ? players.o : players.x);
        }
    }

    const buttonHandler = () => {

        const newTiles = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]; 
        setTiles(newTiles);

        const newRows = {
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
        };
        setRows(newRows);
    
        const newColumns = {
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
        }; 
        setColumns(newColumns);

        const newDiagonals = {
            0: {
                X : 0, 
                O: 0,
            }, 
            1: {
                X : 0, 
                O: 0,
            }, 
        };
        setDiagonals(newDiagonals);
        setPlayer(players.x);
        setPlay(true);
        document.getElementById("winner").style.display = 'none';
        document.getElementById("winner").innerHTML = ''; 
    }

    return (
        <div className="Container">
            <div className="Board">
                {tiles.map(
                    (row, y) => row.map(
                        (tile, x) => (<Tile key={uuid()} handler={playHandler} coordinates={{x, y}} mark={tile}/>)
                    )
                )}
            </div>
            <div id="winner" className="Winner">
            </div>
            <Button message="Play again" handler={buttonHandler}/>
        </div>
    );
}

export default Board;
