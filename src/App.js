import React, { Component } from "react";
import Scheduler from "./components/Scheduler";
// import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";

import "./App.css";
import withFetchData from "./HOC/withFetchData";

import withUVs from "./HOC/withUVs";

const SchedulerWithData = withFetchData(withUVs(Scheduler))

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
				<header>nihao</header>
				<div class="clearfix wrapper">
					<div class="main">
						<div className="scheduler-container">
							<SchedulerWithData
								timeFormatState={currentTimeFormatState}
								onDataUpdated={this.logDataUpdate}
							/>
						</div>
						<MessageArea messages={messages} />
					</div>
					<div class="left">
						<div class="row">
							<div class="col"></div>
							<div class="col">
								<form>
									<div class="row">

										<label for="exampleInputEmail1">Login</label>
									</div>
									<div class="row">
										<div class="col">
											<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
										</div>
										<div class="col">
											<button type="submit" class="btn btn-primary btn-sm">Submit</button>
										</div>
									</div>
								</form>

							</div>
							<div class="col"></div>
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
