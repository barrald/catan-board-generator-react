import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import _ from 'lodash';

class Territory extends React.Component {
    render() {
        if (!this.props.territory_props) {
            return <span>Loading...</span>;
        }
        let classname = "territory territory-type-" 
        + this.props.territory_props.territory_type + " prob-"
        + this.props.territory_props.prob;

        return (
            <div className = {classname} >
                <div className="number-token">
                    <p className="number">{this.props.territory_props.number}</p>
                    <p className="probability-ticks">{this.props.territory_props.prob_display}</p>
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
                    <div className="port port-left">?</div>
                    <div className="spacer"></div>
                    <div className="port port-left">🐑</div>
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                    {this.renderTerritory(0)}
                    {this.renderTerritory(1)}
                    {this.renderTerritory(2)}
                    <div className="port port-right">⛏</div>
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="port port-left">🌲</div>
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
                    <div className="port port-right">🐑</div>
                </div>
                <div className="board-row">
                    <div className="port port-left">🌾</div>
                    {this.renderTerritory(12)}
                    {this.renderTerritory(13)}
                    {this.renderTerritory(14)}
                    {this.renderTerritory(15)}
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                    {this.renderTerritory(16)}
                    {this.renderTerritory(17)}
                    {this.renderTerritory(18)}
                    <div className="port port-right">🧱</div>
                    <div className="spacer"></div>
                </div>
                <div className="board-row">
                    <div className="spacer"></div>
                    <div className="port port-left">?</div>
                    <div className="spacer"></div>
                    <div className="port port-left">🐑</div>
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                </div>
             </div>
        )
    }
}


// to-do: consider replacing with Lodash shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function piece_generator() {
    const number_chits = [
        {id:"A",number:5,prob:4},
        {id:"B",number:2,prob:1},
        {id:"C",number:6,prob:5},
        {id:"D",number:3,prob:2},
        {id:"E",number:8,prob:5},
        {id:"F",number:10,prob:3},
        {id:"G",number:9,prob:4},
        {id:"H",number:12,prob:1},
        {id:"I",number:11,prob:2},
        {id:"J",number:4,prob:3},
        {id:"K",number:8,prob:5},
        {id:"L",number:10,prob:3},
        {id:"M",number:9,prob:4},
        {id:"N",number:4,prob:3},
        {id:"O",number:5,prob:4},
        {id:"P",number:6,prob:5},
        {id:"Q",number:3,prob:2},
        {id:"R",number:11,prob:2}
    ];

    const terrain_distribution = [
        ["wheat",4],
        ["forest",4],
        ["sheep",4],
        ["ore",3],
        ["brick",3]
    ];

    // todo: simplify this
    let terrains = [];
    terrain_distribution.forEach((t) => {
        for(let i=0; i < t[1]; i++) {
            terrains.push(t[0]);
        }
    });

    const numbers_shuffled = shuffle(number_chits)
    const terrains_shuffled = shuffle(terrains)

    const pieces = []
    for (let i=0; i < numbers_shuffled.length; i++){
        pieces[i] = numbers_shuffled[i];
        pieces[i].territory_type = terrains_shuffled[i];
        pieces[i].prob_display = "∙".repeat(numbers_shuffled[i].prob);
    }

    pieces.splice(Math.floor(Math.random()*(pieces.length+1)),0,
        {id:"X",number:0,prob:0,territory_type:"desert"});

    console.log(pieces)
    return pieces;
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);