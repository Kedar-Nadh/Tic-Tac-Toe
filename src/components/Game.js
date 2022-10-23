import React, {useState} from "react";
import Box from "./Box"

const initialState = ["", "", "", "", "", "", "", "", ""]


export default function Game(){

    const [gameState, setGameState] = useState(initialState)
    const [xTurn, setXTurn] = useState(true)
    const [count, setCount] = useState(0)
    const [singlePlay, setSinglePlay] = useState(true)



    if(singlePlay && xTurn){
        let xIdx = bestMove();
        let boxes = [...gameState]
        boxes[xIdx] = "X"
        setGameState(boxes)
        setXTurn(!xTurn)
        setCount(count+1)
    }


    function boxClick(idx){
        let boxes = [...gameState]
        if(singlePlay){
            boxes[idx] = "O"
        }else {
            boxes[idx] = xTurn ? "X" : "O"
        }
        setGameState(boxes)
        setXTurn(!xTurn)
        setCount(count+1)
    }


    function bestMove(){
        let bestScore = -Infinity;
        let bestMove;
        for(let i=0; i<gameState.length; i++){
            if(gameState[i] === ''){
                gameState[i] = 'X';
                let score = minimax(gameState, false);
                gameState[i] = '';
                if(score > bestScore){
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove
    }
    
    function minimax(gameState, isMaximizing){
        let winner = checkWinner();
        if(winner === 'X'){
            return 10;
        }
        if(winner === 'O'){
            return -10;
        }
        if(winner === 'Draw'){
            return 0;
        }
        
        if(isMaximizing){
            let bestScore = -Infinity;
            for(let i=0; i<gameState.length; i++){
                if(gameState[i] === ''){
                    gameState[i] = 'X';
                    let score = minimax(gameState, false);
                    gameState[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        }
        else{
            let bestScore = Infinity;
            for(let i=0; i<gameState.length; i++){
                if(gameState[i] === ''){
                    gameState[i] = 'O';
                    let score = minimax(gameState, true);
                    gameState[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore
        }
    }





   
    
    const winner = checkWinner();

    
    function checkWinner(){
        const winWays = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        
        for(let i=0; i < winWays.length; i++) {
            const [a,b,c] = winWays[i]
            if(gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]){
                return gameState[a]
            }
        }
        let counter = 0;
		for(let i=0; i<gameState.length; i++){
			if(gameState[i] !== ''){
				counter += 1;
			}
		}
		if(counter === gameState.length){
			return 'Draw'
		}
        return null;
    }

    function singlePlayer(){
        setSinglePlay(true)
        newgame()
    }

    function multiPlayer(){
        setSinglePlay(false)
        newgame()
    }
    
    function newgame(){
        setGameState(initialState)
        setXTurn(true)
        setCount(0)
    }


    return(
        <div className="game--field">
            <div>
                <button className={singlePlay ? "btn-s" : "btn"} onClick={() => singlePlayer()}>Single Player</button>
                <button className={singlePlay ? "btn" : "btn-s"} onClick={() => multiPlayer()}>Multi Player</button>
            </div>

            <div className="game--box">
                <div className="row">
                    <Box className="box-border-right-bottom" state={gameState[0]} boxClick={() => gameState[0] === "" && !winner && boxClick(0)}/>
                    <Box className="box-border-right-bottom" state={gameState[1]} boxClick={() =>gameState[1] === "" && !winner && boxClick(1)}/>
                    <Box className="box-border-bottom" state={gameState[2]} boxClick={() =>gameState[2] === "" && !winner && boxClick(2)}/>
                </div>
                <div className="row">
                    <Box className="box-border-right-bottom" state={gameState[3]} boxClick={() =>gameState[3] === "" && !winner && boxClick(3)}/>
                    <Box className="box-border-right-bottom" state={gameState[4]} boxClick={() =>gameState[4] === "" && !winner && boxClick(4)}/>
                    <Box className="box-border-bottom" state={gameState[5]} boxClick={() =>gameState[5] === "" && !winner && boxClick(5)}/>
                </div>
                <div className="row">
                    <Box className="box-border-right" state={gameState[6]} boxClick={() =>gameState[6] === "" && !winner && boxClick(6)}/>
                    <Box className="box-border-right" state={gameState[7]} boxClick={() =>gameState[7] === "" && !winner && boxClick(7)}/>
                    <Box className="box-border-none" state={gameState[8]} boxClick={() =>gameState[8] === "" && !winner && boxClick(8)}/>
                </div>
            </div>
            <div>
                {winner && winner !== "Draw" ? <p className="winner--text"><span className={winner === "X" ? "xwon" : "ywon"}>"{winner}"</span>  won the game 🎉 </p> : count >= 9 ? <p className="winner--text">It's a Draw❗️</p> : ''}
            </div>
            <button className="newgame-btn" onClick={() => newgame()}>New Game</button>
        </div>
    )
}