import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import Loading from '../../components/Loading';
import moment from 'moment';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import CalendarDlg from '../../components/CalendarDlg';

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
      calOpen: false,
      logout: false,
      title: "",
      desc: ""
    }
  }
    static propTypes = {
        calendarData: PropTypes.object,
        showData: PropTypes.object,
        userData: PropTypes.object,
        getTrending: PropTypes.func,
        getShowSeasonInfo: PropTypes.func,
        getShowInfo: PropTypes.func,
        getFav: PropTypes.func,
        logout: PropTypes.func,
        isLogin: PropTypes.func,
    };

    componentWillMount () {
        this.props.isLogin();
    }

    componentWillReceiveProps(newProps) {
      if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
        this.setState({logout: true});
      }
      if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
        if (newProps.userData.loginData === 'N/A') {
            this.setState({open: true});
            this.props.getTrending()
        } else {
          this.setState({userName: newProps.userData.loginData});
          this.setState({open: true});
          this.props.getFav(newProps.userData.loginData)
        }
      }
        if(this.props.showData !== newProps.showData && newProps.showData) {
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
                if(newProps.showData.showSeasonInfo.length !== 0) {
                    newProps.showData.showSeasonInfo.map((episode) => {
                        for (var i = 0; i < titleNetwork.length; i++) {
                            // check that IDs match to match info to episodes
                            if(titleNetwork[i].id == episode.id) {
                                var tempTitle = titleNetwork[i].title
                                var tempEpiTitle = episode.name
                                var tempEpiNum = episode.number
                                var tempEpiDesc = episode.summary

                                if(tempEpiDesc == "None") {
                                    tempEpiDesc = "N/A."
                                }

                                var tempNetwork = titleNetwork[i].network
                                var tempStreaming = titleNetwork[i].streaming

                                if(tempNetwork == "N/A") {
                                    tempNetwork = tempStreaming
                                }

                                var tempDate = new Date(episode.date)
                                var tempTime = episode.time

                                var twentyFourHour = episode.time.split(":")
                                var tempRuntime = episode.runtime

                                if(tempTime) {
                                    var tempTwelveHour = moment(tempTime, "HH:mm").format("h:mm A")

                                    var tempDesc = tempEpiDesc + "\n\nAirs on " + tempNetwork + " at " + tempTwelveHour + "."
                                }
                                else {  // if episode does not have a time
                                    tempDate.setHours(0)
                                    tempDate.setMinutes(0)
                                    var tempDesc = tempEpiDesc + "\n\nAirs on " + tempNetwork + "."
                                }

                                // create the event/episode to add to events
                                if(twentyFourHour.length == 2) {
                                    var tempEvent = {
                                        'title': "s" + titleNetwork[i].season + "e" + tempEpiNum + " " + tempTitle + " - " + "\"" + tempEpiTitle + "\"\n",
                                        'start': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate(), parseInt(twentyFourHour[0]), parseInt(twentyFourHour[1])),
                                        'end': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate(), parseInt(twentyFourHour[0]), parseInt(twentyFourHour[1])+tempRuntime),
                                        'desc': tempDesc
                                    }
                                }
                                else {
                                    var tempEvent = {
                                        'title': "s" + titleNetwork[i].season + "e" + tempEpiNum + " " + tempTitle + " - " + "\"" + tempEpiTitle + "\"\n",
                                        'start': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate()),
                                        'end': new Date(tempDate.getUTCFullYear(), tempDate.getMonth(), tempDate.getDate()),
                                        'desc': tempDesc
                                    }
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
        if(newProps.showData && this.props.showData.getFavRes != newProps.showData.getFavRes) {
            if(newProps.showData.getFavRes) {
                for(var i = 0; i < newProps.showData.getFavRes.length; i++) {
                    var show = newProps.showData.getFavRes[i]
                    this.props.getShowInfo(show)
                }
            }
        }
    }

    componentWillUnmount() {
        events = []
    }

    mkCalDlg(event) {
        this.setState({calOpen: true, title: event.title, desc: event.desc})
    }

    onClose = () => {
        this.setState({calOpen: false})
    }

    render () {
        return (
          <div style={{width: '100%'}}>
            <LogoutDlg open={this.state.logout} email={this.state.userName} />
            {this.state.calOpen ? <CalendarDlg open={this.state.calOpen} title={this.state.title} desc={this.state.desc} onClose={this.onClose} /> : null }
            <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
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
                    onSelectEvent={event => this.mkCalDlg(event)}
                    scrollToTime={new Date(1970, 1, 1, 12)}
                />
            </div>
          </div>
        );
    }
}
