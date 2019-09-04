import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import zip from 'lodash/zip';

class Territory extends React.Component {
    render() {
        if (!this.props.territory_props) {
            return <span>Loading...</span>;
        }
        let classname = "territory territory-type-" 
        + this.props.territory_props[0]

        return (
            <div className = {classname} >
                <div className="number-token">
                    <p>{this.props.territory_props[1][1]}</p>
                </div>
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board_pieces: piece_generator()
        }
    }

    renderTerritory(i) {
        return (
            <Territory
                territory_props = {this.state.board_pieces[i]}
            />
        )
    }

    render() {
        return (
            <div className="board">
                <div className="board-row">
                    <div className="spacer"></div>
                    {this.renderTerritory(0)}
                    {this.renderTerritory(1)}
                    {this.renderTerritory(2)}
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    {this.renderTerritory(3)}
                    {this.renderTerritory(4)}
                    {this.renderTerritory(5)}
                    {this.renderTerritory(6)}
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    {this.renderTerritory(7)}
                    {this.renderTerritory(8)}
                    {this.renderTerritory(9)}
                    {this.renderTerritory(10)}
                    {this.renderTerritory(11)}
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    {this.renderTerritory(12)}
                    {this.renderTerritory(13)}
                    {this.renderTerritory(14)}
                    {this.renderTerritory(15)}
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    {this.renderTerritory(16)}
                    {this.renderTerritory(17)}
                    {this.renderTerritory(18)}
                    <div className="spacer"></div>
                </div>
             </div>
        )
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function piece_generator() {
    const number_chits = [
        ["A",5,4],
        ["B",2,1],
        ["C",6,5],
        ["D",3,2],
        ["E",8,5],
        ["F",10,3],
        ["G",9,4],
        ["H",12,1],
        ["I",11,2],
        ["J",4,3],
        ["K",8,5],
        ["L",10,3],
        ["M",9,4],
        ["N",4,3],
        ["O",5,4],
        ["P",6,5],
        ["Q",3,2],
        ["R",11,2]
    ];

    const terrain_map = [
        ["wheat",4],
        ["forest",4],
        ["sheep",4],
        ["ore",3],
        ["brick",3]
    ];

    // todo: simplify this
    let terrains = [];
    terrain_map.forEach((t) => {
        for(let i=0; i < t[1]; i++) {
            terrains.push(t[0]);
        }
    });

    // const shuffled_terrains = ;
    // const shuffled_numbers = ;
    const pieces = zip(shuffle(terrains),shuffle(number_chits));
    
    pieces.splice(Math.floor(Math.random()*(pieces.length)),0,["desert",[null,null,null]]);

    console.log(pieces)
    return pieces;
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);