import React from 'react';

class LeaderBoard extends React.Component {
    constructor() {
        super();

        this.state = {leaders:[]};
    }
    render() {
        return (
            <div>
            <LeaderBoardHeader />
                <LeaderBoardRow count="1" name="Jimbo" recent="556" alltime="1233" />
                </div>
        );
    }
}

/**
 * leaderBoardRowHelper: Just keepin it DRY.
 *
 * @param {} props
 * @returns {} 
 */
const leaderBoardRowHelper = (props) => {
    let classes = ['row'];
    if ( typeof props.className==='string' ) classes = props.className.split(/\s+/).concat(classes);
    else classes.push('fcc-table-row');
    return (
            <div className={classes.join(' ')}>
            <div className="column small-1">{props.count}</div>
            <div className="column small-5">{props.name}</div>
            <div className="column small-3">{props.recent}</div>
            <div className="column small-3">{props.alltime}</div>
            </div>
    );
}

/**
 * LeaderBoardHeader element

 * @returns {} 
 */
const LeaderBoardHeader = () => {
    return leaderBoardRowHelper({className:'fcc-table-heading', count:'#', name:'Camper Name', recent:'30 Days', alltime:'All Time'});
};


/**
 * LeaderBoardRow element.
 *
 * @properties className count name avatar recent alltime
 * @param {} props
 * @returns {} ReactDOM
 */
const LeaderBoardRow = (props) => {
    return leaderBoardRowHelper(props);
};

export default LeaderBoard;
