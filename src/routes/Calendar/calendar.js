import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import './calendar.css';

BigCalendar.momentLocalizer(moment);
const events = [
    {
        'title': 'Legion',
        'start': new Date(2017, 2, 29, 22, 0, 0),
        'end': new Date(2017, 2, 29, 23, 0, 0),
        'desc': 'Airs on FX at 10pm'
    },
]

export default class CalendarPage extends Component {
    render () {
        return (
            <div
                id="calendar-page"
                style={{
                    paddingTop: 50,
                    paddingBottom: 50,
                    paddingLeft: 200,
                    paddingRight: 200,
                    height: 800,
                }}
            >
                <BigCalendar
                    selectable
                    events={events}
                    onSelectEvent={event => alert(event.desc)}
                    scrollToTime={new Date(1970, 1, 1, 12)}
                />
            </div>
        );
    }
}
