import React, { Component } from "react";
import Scheduler from "./components/Scheduler";
// import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";

import "./App.css";

const data = [
  {
    start_date: "2020-06-10 6:00",
    end_date: "2020-06-10 8:00",
    text: "C SR03",
    id: 1
  },
  {
    start_date: "2020-06-10 8:15",
    end_date: "2020-06-10 10:15",
    text: "TD SR03",
    id: 2
  },
  {
    start_date: "2020-06-13 10:00",
    end_date: "2020-06-13 18:00",
    text: "Event 2",
    id: 3
  },
];


const semestreP20 = {
  start_date: "2020-02-24",
  end_date: "2020-06-27"
}

const extractUvDateInfo = uvs => uvs.map(uv => ({
  start_date: uv.begin,
  end_date: uv.end,
  day: uv.day,
  text: uv.uv,
  id: uvs.indexOf(uv)
}))

class App extends Component {
  state = {
    currentTimeFormatState: true,
    messages: [],
    error: null,
    isLoaded: false,
    uvs: []
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

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=jbarthel')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            uvs: result
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { currentTimeFormatState, messages, error, isLoaded, uvs } = this.state;
    const data = extractUvDateInfo(uvs)
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
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
        </div >
      );
    }
  }
}
export default App;
