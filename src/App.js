import React, { Component } from "react";
import Scheduler from "./components/Scheduler";

import "./App.css";
import withFetchData from "./HOC/withFetchData";

import withUVs from "./HOC/withUVs";
import { LoginInput } from "./components/User/LoginInput";
import { StudentsList } from "./components/User/StudentsList";
import LocalStorageManager from "./utils/LocalStorageManager"

const SchedulerWithData = withFetchData(withUVs(Scheduler))

class App extends Component {
	constructor(props) {
		super(props)

		const storage = new LocalStorageManager()
		storage.set("logins", ["lyujiawe"])
		let logins = storage.logins()


		this.state = {
			currentTimeFormatState: true,
			error: null,
			isLoaded: false,
			logins: logins,
			isByStudent: false
		};
	}

	addLogin = (login) => {
		if (!this.state.logins.includes(login)) {
			this.setState({
				logins: [...this.state.logins, login]
			})
		} else {
			alert("Student has been added in list. Please enter another login !");
		}

	}

	deleteLogin = (login) => {
		this.setState({
			logins: this.state.logins.filter(elem => elem !== login)
		})
	}

	showByStudent = (e) => {
		e.preventDefault();
		this.setState({
			isByStudent: true
		})
	}
	showByClasses = (e) => {
		e.preventDefault();
		this.setState({
			isByStudent: false
		})
	}

	render() {
		const { currentTimeFormatState, logins, isByStudent } = this.state;
		return (
			<div>
				<header className="App-header">
					<h1>UTC Scheduler</h1>
				</header>
				<div className="clearfix main-container">
					<div className="main">
						<div className="scheduler-container">
							<SchedulerWithData
								timeFormatState={currentTimeFormatState}
								onDataUpdated={this.logDataUpdate}
								id="schedule"
								logins={logins}
								isByStudent={isByStudent}
							/>
						</div>
					</div>
					<div className="left">
						<div>
							<LoginInput
								handleClick={(this.addLogin)}
							/>
						</div>
						<div>
							<label htmlFor="exampleInputEmail1">Current students:</label>
							<StudentsList
								logins={logins}
								handleClick={(this.deleteLogin)}
							/>
						</div>
						<div className="display-btn">
							<button
								type="submit"
								className="btn btn-primary btn-sm"
								onClick={this.showByStudent}
							>
								Show by student
							</button>
							<button
								type="submit"
								className="btn btn-primary btn-sm"
								onClick={this.showByClasses}
							>
								Show by class
            	</button>
						</div>
					</div>
				</div>
				<footer className="App-footer">
					UTC SR03 P20 - Lyu Jiawen - Linh Nguyen
				</footer>
			</div >
		);

	}
}
export default App;
