import React from 'react';
import LeaderBoard from './LeaderBoard.js';
import './app.scss';

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <div className="row"><h2 className="fcc-board-header">LeaderBoard</h2></div>
            <LeaderBoard fccUrl="http://fcctop100.herokuapp.com" />
        </div>
        );
  }
}

export default App;
