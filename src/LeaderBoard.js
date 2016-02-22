import React from 'react';
import './LeaderBoard.scss';

const TOP30=1, ALLTIME=2,
      UP=1, DOWN=2,

      sortByField = field => {
          return direction => {
              let ascSort = (u1, u2) => {
                  if( u1[field] > u2[field] ) return -1;
                  if( u1[field] < u2[field] ) return 1;
                  return 0;
              },
                  descSort = (u1, u2) => {
                      if( u1[field] < u2[field] ) return -1;
                      if( u1[field] > u2[field] ) return 1;
                      return 0;
                  };

              return direction===UP ? descSort : ascSort;
          };
      },
      sortByRecent = sortByField('recent'),
      sortByAlltime = sortByField('alltime'),
      isNumber = n => { return typeof n === 'number'; },
      isEven = n => { return n%2===0; }
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
            newState = {leaders: this.data.sort(sorter(this.sortDirection)).slice(0,100)};

        this.setState(newState);
    }
    constructor() {
        super();
        this.state = {leaders:[]};
        this.sortBy = TOP30;
        this.sortDirection = DOWN;
        this.loadFromServer();
    }
    resort(sortBy) {
        console.log('resort!');
        if(this.sortBy===sortBy) {
            this.sortDirection ^= 3;
        } else {
            this.sortBy = sortBy;
        }
        this.updateBoard();
    }
    render() {
        const leaders = this.state.leaders.map((leader,i)=>{
            return (<LeaderBoardRow key={leader.username} count={i+1} name={leader.username} recent={leader.recent} alltime={leader.alltime} />);
        });
        return (
            <div>
                <LeaderBoardHeader onSort={this.resort.bind(this)}
            sortBy={this.sortBy} sortDirection={this.sortDirection} />
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

    if( isNumber(props.count) ) {
        classes.push(isEven(props.count) ? 'even' : 'odd');
    }

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
const LeaderBoardHeader = (props) => {
    // return leaderBoardRowHelper({className:'fcc-table-heading', count:'#', name:'Camper Name', recent:'30 Days', alltime:'All Time'});
    let directionIcon = props.sortDirection===UP ? 'fa fa-chevron-up' : 'fa fa-chevron-down',
        top30Icon = props.sortBy===TOP30 ? directionIcon : '',
        alltimeIcon = props.sortBy===ALLTIME ? directionIcon : '';

    return (
            <div className='row odd fcc-clickable fcc-table-heading'>
            <div className="column small-1">#</div>
            <div className="column small-5">Camper Name</div>
            <div className="column small-3 fcc-clickme" onClick={props.onSort.bind(props, TOP30)}>30 Days <i className={top30Icon}></i></div>
            <div className="column small-3 fcc-clickme" onClick={props.onSort.bind(props, ALLTIME)}>All Time <i className={alltimeIcon}></i></div>
            </div>
    );
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
