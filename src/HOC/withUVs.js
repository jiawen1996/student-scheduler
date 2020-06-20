import React from 'react'

const demoData = [
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

const demoLogins = [
    "jiawen",
    "linh"
]

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

const extractUvDateInfo = (uvs) => {
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
                login: uv.login
            }
            ]
        })
    })
    return uvInAllTerm
}

const getCurrentClasses = data => Array.from(new Set(data.map(elem => elem.uv)))



const withUVs = WrappedComponent => props => {
    const { data } = props;
    const uvs = extractUvDateInfo(data)
    const classes = getCurrentClasses(data)
    console.log("classes:", classes)
    return <WrappedComponent
        classes={classes}
        events={uvs}
        {...props}
    />;


}

export default withUVs;