import React, { Component } from "react";
import Scheduler from "./components/Scheduler";
// import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";

import "./App.css";
import withFetchData from "./HOC/withFetchData";
import SchedulerWithData from "./components/Scheduler/SchedulerWithData";



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

	render() {
		const { currentTimeFormatState, messages } = this.state;


		return (
			<div>
				<div className="scheduler-container">

					<SchedulerWithData
						timeFormatState={currentTimeFormatState}
						onDataUpdated={this.logDataUpdate}
					/>
				</div>
				<MessageArea messages={messages} />
			</div >
		);

	}
}
export default App;
