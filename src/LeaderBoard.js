import React from 'react';

const TOP30=1,
      ALLTIME=2,

      sortByField = field => {
          return (u1, u2) => {
              if( u1[field] > u2[field] ) return -1;
              if( u1[field] < u2[field] ) return 1;
              return 0;
          };
      },
      sortByRecent = sortByField('recent'),
      sortByAlltime = sortByField('alltime')
;

class LeaderBoard extends React.Component {
    loadFromServer() {
        require('./leader-board-service.js')()
            .all()
            .then((data)=>{
                this.data = data;
                this.updateBoard();
            });
    }
    updateBoard() {
        let sorter = this.sortBy===TOP30 ? sortByRecent : sortByAlltime,
            newState = {leaders: this.data.sort(sorter).slice(0,100)};

        this.setState(newState);
    }
    constructor() {
        super();
        this.state = {leaders:[]};
        this.sortBy = TOP30;
        this.loadFromServer();
    }
    render() {
        const leaders = this.state.leaders.map((leader,i)=>{
            return (<LeaderBoardRow key={leader.username} count={i+1} name={leader.username} recent={leader.recent} alltime={leader.alltime} />);
        });
        return (
            <div>
                <LeaderBoardHeader />
                {leaders}
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
