import React, { Component } from "react";
import Scheduler from "./components/Scheduler";
// import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";

import "./App.css";
import withFetchData from "./HOC/withFetchData";

import withUVs from "./HOC/withUVs";
import { LoginInput } from "./components/LoginInput";
import { StudentsList } from "./components/StudentsList";

const SchedulerWithData = withFetchData(withUVs(Scheduler))

class App extends Component {
	state = {
		currentTimeFormatState: true,
		messages: [],
		error: null,
		isLoaded: false,
		logins: [],
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

	addLogin = (login) => {
		this.setState({
			logins: [...this.state.logins, login]
		})
	}

	render() {
		const { currentTimeFormatState, messages, logins } = this.state;
		return (
			<div>
				<header>nihao</header>
				<div class="clearfix wrapper">
					<div class="main">
						<div className="scheduler-container">
							<SchedulerWithData
								timeFormatState={currentTimeFormatState}
								onDataUpdated={this.logDataUpdate}
								id="schedule"
							/>
						</div>
						<MessageArea messages={messages} />
					</div>
					<div class="left">
						<div class="left-content">
							<div class="row">
								<div class="col">
									<LoginInput
										handleClick={(this.addLogin)}
									/>
								</div>
							</div>
							<div class="row" />
							<div class="row">
								<label for="exampleInputEmail1">Current students:</label>
							</div>
							<div class="row">
								{logins}
								<StudentsList logins={logins} />
							</div>
						</div>

					</div>
				</div>
				<footer>
					UTC SR03 P20
				</footer>
			</div >
		);

	}
}
export default App;
