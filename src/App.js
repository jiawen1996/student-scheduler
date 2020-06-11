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
		id: 1,
		login: "jiawen"
	},
	{
		start_date: "2020-06-10 6:00",
		end_date: "2020-06-10 8:00",
		text: "C SR03",
		id: 4,
		login: "linh"
	},
	{
		start_date: "2020-06-10 8:15",
		end_date: "2020-06-10 10:15",
		text: "TD SR03",
		id: 2,
		login: "jiawen"
	},
	{
		start_date: "2020-06-13 10:00",
		end_date: "2020-06-13 18:00",
		text: "Event 2",
		id: 3,
		login: "jiawen"
	},
];

const toDays = dayString => (
	{
		"LUNDI": 1,
		"MARDI": 2,
		"MERCREDI": 3,
		"JEUDI": 4,
		"VENDREDI": 5,
		"SAMEDI": 6,
		"DIMANCHE": 7,
	}[dayString]
)
const semestreP20 = [
	"2020-02-24",
	"2020-06-27"
]


const getAllDays = (term, day) => {
	let currentDay = term[0]
	let days = []
	while (currentDay !== term[1]) {
		if (new Date(currentDay).getDay() === day) {
			days = [...days, currentDay]
		}

		let dayArr = currentDay.split("-")

		if ((dayArr[2] == 30 && dayArr[1] % 2 == 0) || (dayArr[2] == 31 && dayArr[1] % 2 == 1)) {
			dayArr[2] = 1
			dayArr[1]++
		} else {
			dayArr[2]++
		}
		currentDay = dayArr.map((elem, index) => {
			if (index !== 0) {
				return elem.toString().length === 1 ? "0" + elem : elem
			} else return elem
		}).join("-")
	}
	if (new Date(currentDay).getDay() === day) {
		days = [...days, term[1]]
	}
	return days
}

const extractUvDateInfo = (uvs, login) => {
	let uvInAllTerm = []
	uvs.map(uv => {
		const daysInTerm = getAllDays(semestreP20, toDays(uv.day))
		daysInTerm.map(day => {
			uvInAllTerm = [...uvInAllTerm,
			{
				start_date: day + " " + uv.begin,
				end_date: day + " " + uv.end,
				text: uv.uv,
				id: uvInAllTerm.length + 1,
				login: login
			}
			]
		})
	})
	return uvInAllTerm
}



const getCurrentStudents = data => Array.from(new Set(data.map(elem => elem.login)))

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
						uvs: result,
						login: "jbarthel"
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
		const { currentTimeFormatState, messages, error, isLoaded, uvs, login } = this.state;
		const data = extractUvDateInfo(uvs, login)
		const currentStudents = getCurrentStudents(data)
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
							currentStudents={currentStudents}
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
