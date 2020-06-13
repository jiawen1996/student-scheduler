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
						<div class="left-content">
							<div class="row">
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
							</div>
							<div class="row" />
							<div class="row">
								<label for="exampleInputEmail1">Current students</label>
							</div>
							<div class="row">
								<ul class="list-group">
									<li class="list-group-item">Cras justo odio</li>
									<li class="list-group-item">Dapibus ac facilisis in</li>
									<li class="list-group-item">Morbi leo risus</li>
									<li class="list-group-item">Porta ac consectetur ac</li>
									<li class="list-group-item">Vestibulum at eros</li>
								</ul>
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
