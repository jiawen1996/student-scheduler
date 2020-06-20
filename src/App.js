import React, { Component } from "react";
import Scheduler from "./components/Scheduler";

import "./App.css";
import withFetchData from "./HOC/withFetchData";

import withUVs from "./HOC/withUVs";
import { LoginInput } from "./components/LoginInput";
import { StudentsList } from "./components/StudentsList";
import LocalStorageManager from "./utils/LocalStorageManager"

const SchedulerWithData = withFetchData(withUVs(Scheduler))

class App extends Component {
	constructor(props) {
		super(props)

		const storage = new LocalStorageManager()
		storage.set("logins", ["nguyetra","lyujiawe", "jbarthel"])
		let logins = storage.logins()


		this.state = {
			currentTimeFormatState: true,
			messages: [],
			error: null,
			isLoaded: false,
			logins: logins,
			uvs: []
		};
	}

	addLogin = (login) => {
		this.setState({
			logins: [...this.state.logins, login]
		})
	}

	deleteLogin = (login) => {
		this.setState({
			logins: this.state.logins.filter(elem => elem !== login)
		})
	}

	showDeleteModal = (event) => {
		event.preventDefault();

	}

	render() {
		const { currentTimeFormatState, logins } = this.state;
		return (
			<div>
				<header className="App-header">
        		<h1>UTC Scheduler</h1>
      	</header>
				<div className="clearfix main-container">
					<div className="row">
						<div className="left">
							<LoginInput
								handleClick={(this.addLogin)}
							/>
							<div>
								<label htmlFor="exampleInputEmail1">Current students:</label>
							</div>
							<StudentsList
								logins={logins}
								handleClick={(this.deleteLogin)}
							/>
						</div>
						<div className="main">
							<div className="scheduler-container">
								<SchedulerWithData
									timeFormatState={currentTimeFormatState}
									onDataUpdated={this.logDataUpdate}
									id="schedule"
									logins={logins}
								/>
							</div>
						</div>
					</div>
				</div>
				<footer className="App-footer">
					UTC SR03 P20 - Lyu Jiawen - Linh Nguyen
				</footer>
			</div>
		);

	}
}
export default App;
