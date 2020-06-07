import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import Toolbar from './components/Toolbar';

import './App.css';
 
const data = [
    { start_date:'2020-06-10 6:00', end_date:'2020-06-10 8:00', text:'C SR03', id: 1 },
    { start_date:'2020-06-10 8:15', end_date:'2020-06-10 10:15', text:'TD SR03', id: 2 },
    { start_date:'2020-06-13 10:00', end_date:'2020-06-13 18:00', text:'Event 2', id: 3 }
];
 
class App extends Component {
  state = {
    currentTimeFormatState: true
  };
  
  handleTimeFormatStateChange = (state) => {
    this.setState({
        currentTimeFormatState: state
    });
  }
  
  render() {
    const { currentTimeFormatState } = this.state;
    return (
        <div>
            <div className="tool-bar">
                <Toolbar
                    timeFormatState={currentTimeFormatState}
                    onTimeFormatStateChange={this.handleTimeFormatStateChange}
                />
            </div>
            <div className='scheduler-container'>
                <Scheduler
                    events={data}
                    timeFormatState={currentTimeFormatState}
                />
            </div>
        </div>
    );
}
 }
 export default App;