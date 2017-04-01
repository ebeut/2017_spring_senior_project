import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);
const events = [
    {
        'title': 'Legion',
        'start': new Date(2017, 2, 29, 22, 0, 0),
        'end': new Date(2017, 2, 29, 23, 0, 0),
        'desc': 'Airs on FX at 11pm'
    },
]

export default class CalendarPage extends Component {
render () {
        return (
            <div
                id="calendar-page"
                style={{
                    padding:35,
                    height: 1000,
                }}
            >
                <BigCalendar
                    selectable
                    events={events}
                    onSelectEvent={event => alert(event.desc)}
                />
            </div>
        );
    }
}
