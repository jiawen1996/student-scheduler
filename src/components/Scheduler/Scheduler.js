import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';

const scheduler = window.scheduler;


const toColorName = index => (
    {
        0: "#df972f", // orange
        1: "#3a5c34", // green
        2: "#1c3c64", // blue
        3: "#fc8184", // rose
        4: "#9b641b", // brown
        5: "#821605", // red
        6: "#ab7350", // dark rose
        7: "#e8b045", // yellow
        8: "6c6c8c", //purple
        9: "#cab08e", //beige
        10: "#6284a4", //light blue
        11: "#634b1c" 
    }[index]
)

const changeColorForEachStudent = (events, logins) => {
    console.log(logins)

    uvs = getUVs(events)

    events.map(event => {
        let index = 0
        if (uvs.length != 0) {
            index = uvs.indexOf(event.text) % 8;
        }
        
        event.color = toColorName(index)
        console.log("uv ", event.text)
        console.log("uv index : ", index)
        event.text = event.text + "\n" + event.login
        scheduler.updateEvent(event.id)

    })
}

function getUVs(events) {
    let uvs = [];

    events.map(event => {
        if (uvs.indexOf(event.text) == -1) {
            uvs.push(event.text)
        }
    });

    console.log("uvs in scheduler:", uvs);
    
    return uvs;
}

export default class Scheduler extends Component {

    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }

        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('create', ev, id);
            }
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('update', ev, id);
            }
        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('delete', ev, id);
            }
        });
        scheduler._$initialized = true;
    }


    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.first_hour = 8;
        scheduler.config.last_hour = 22;
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 60;

        this.initSchedulerEvents();

        const { events, logins } = this.props;
        console.log("logins in scheduler:", logins)
        scheduler.init(this.schedulerContainer, new Date(2020, 5, 10));
        scheduler.clearAll();
        this.getUVs(events);
        scheduler.parse(events);
        changeColorForEachStudent(events, logins, this.state.uvs);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.events.length !== nextProps.events.length;
    }

    componentDidUpdate() {
        const { events, logins } = this.props
        scheduler.init(this.schedulerContainer, new Date(2020, 5, 10));
        scheduler.clearAll();
        this.getUVs(events);
        scheduler.parse(events);
        changeColorForEachStudent(events, logins, this.state.uvs);
    }

    setTimeFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }

    render() {
        const { timeFormatState } = this.props;
        this.setTimeFormat(timeFormatState);
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}

            ></div>
        );
    }
}