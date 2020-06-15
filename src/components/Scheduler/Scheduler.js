import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';

const scheduler = window.scheduler;


const toColorName = index => (
    {
        0: "orange",
        1: "green",
        2: "red",
        3: "blue",
        4: "grey"
    }[index]
)
const changeColorForEachStudent = (events, logins) =>
    events.map(event => {
        event.color = toColorName(logins.indexOf(event.login))
        event.text = event.text + "\n" + event.login
        scheduler.updateEvent(event.id)

    })

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
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 70;

        this.initSchedulerEvents();

        const { events, logins } = this.props;
        console.log("logins in scheduler:", logins)
        scheduler.init(this.schedulerContainer, new Date(2020, 5, 10));
        scheduler.clearAll();
        scheduler.parse(events);
        changeColorForEachStudent(events, logins)
    }

    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.logins !== this.props.logins) {
            scheduler.render();
        }
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