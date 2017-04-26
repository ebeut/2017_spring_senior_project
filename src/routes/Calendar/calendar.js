import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import Loading from '../../components/Loading';
import moment from 'moment';

import './calendar.css';

BigCalendar.momentLocalizer(moment);

// used to save information from previous Flask requests
var titleNetwork =[]
// will hold all the episodes that the calendar will display
var events = []

export default class CalendarPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    }
  }
    static propTypes = {
        calendarData: PropTypes.object,
        showData: PropTypes.object,
        getTrending: PropTypes.func,
        getShowSeasonInfo: PropTypes.func,
        getShowInfo: PropTypes.func,
    };

    componentWillMount () {
        if(events.length <= 0) {
            this.setState({open: true});
            this.props.getTrending()
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.showData != newProps.showData && newProps.showData) {
            if(newProps.showData.show.id) {
                // information to be saved from show details request
                var temp = {
                    'id': newProps.showData.show.id,
                    'title': newProps.showData.show.title,
                    'network': newProps.showData.show.network,
                    'streaming': newProps.showData.show.streaming,
                    'season': newProps.showData.show.numSeasons,
                }
                titleNetwork.push(temp)
                this.props.getShowSeasonInfo(newProps.showData.show.id, newProps.showData.show.numSeasons)
            }

            if(newProps.showData.showSeasonInfo) {
                if(newProps.showData.showSeasonInfo.length != 0) {
                    newProps.showData.showSeasonInfo.map((episode) => {
                        for (var i = 0; i < titleNetwork.length; i++) {
                            // check that IDs match to match info to episodes
                            if(titleNetwork[i].id == episode.id) {
                                var tempTitle = titleNetwork[i].title
                                var tempEpiTitle = episode.name
                                var tempEpiNum = episode.number
                                var tempEpiDesc = episode.summary
                                var tempNetwork = titleNetwork[i].network
                                var tempStreaming = titleNetwork[i].streaming

                                if(tempNetwork == "N/A") {
                                    tempNetwork = tempStreaming
                                }

                                var tempDate = new Date(episode.date)
                                var tempTime = episode.time

                                if(tempTime) {
                                    var tempTwelveHour = moment(tempTime, "HH:mm").format("h:mm A")

                                    var tempDesc = "\"" + tempEpiTitle + "\"\n" + tempEpiDesc + "\n\nAirs on " + tempNetwork + " at " + tempTwelveHour
                                }
                                else {  // if episode does not have a time
                                    tempDate.setHours(0)
                                    tempDate.setMinutes(0)
                                    var tempDesc = "\"" + tempEpiTitle + "\"\n" + tempEpiDesc + "\n\nAirs on " + tempNetwork
                                }

                                // create the event/episode to add to events
                                var tempEvent = {
                                    'title': "s" + titleNetwork[i].season + "e" + tempEpiNum + " " + tempTitle,
                                    'start': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate(), tempDate.getHours(), tempDate.getMinutes()),
                                    'end': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate(), tempDate.getHours()+1, tempDate.getMinutes()),
                                    'desc': tempDesc
                                }

                                events.push(tempEvent)
                                break
                            }
                        }
                    });
                }
                this.setState({open: false});
            }
        }

        if(this.props.calendarData.trendingData != newProps.calendarData.trendingData) {
            if(newProps.calendarData.trendingData) {
                for(var i = 0; i < newProps.calendarData.trendingData.length; i++) {
                    var show = newProps.calendarData.trendingData[i]
                    this.props.getShowInfo(show.id)
                }
            }
        }
    }

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
                <Loading id="calendar-loading" open={this.state.open}/>
                <BigCalendar
                    id="calendar-big-calendar"
                    popup
                    selectable
                    events={events}
                    onSelectEvent={event => alert(event.desc)}
                    scrollToTime={new Date(1970, 1, 1, 12)}
                />
            </div>
        );
    }
}
