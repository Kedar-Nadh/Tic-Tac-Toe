import React from "react";

export default function Box(props){
    const classes = props.className ? `${props.className} box` : 'box';
    return (
        <span className={classes} style={{color: props.state === "X" ? "#FA7070" : "#7FB77E"}} onClick={props.boxClick}> {props.state} </span>
    )
}