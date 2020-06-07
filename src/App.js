import React, { Component } from "react";
import Scheduler from "./components/Scheduler";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";

import "./App.css";

const data = [
  {
    start_date: "2020-06-10 6:00",
    end_date: "2020-06-10 8:00",
    text: "C SR03",
    id: 1,
  },
  {
    start_date: "2020-06-10 8:15",
    end_date: "2020-06-10 10:15",
    text: "TD SR03",
    id: 2,
  },
  {
    start_date: "2020-06-13 10:00",
    end_date: "2020-06-13 18:00",
    text: "Event 2",
    id: 3,
  },
];

class App extends Component {
  state = {
    currentTimeFormatState: true,
    messages: [],
  };
  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [newMessage, ...this.state.messages];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
  };

  render() {
    const { currentTimeFormatState, messages } = this.state;
    return (
      <div>
        <div className="scheduler-container">
          <Scheduler
            events={data}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea messages={messages} />
      </div>
    );
  }
}
export default App;
