import { connect } from 'react-redux';
import { getTrending } from './action';
import CalendarPage from './calendar';
import { getShowSeasonInfo, getShowInfo } from '../Show-Info/action';

const mapDispatchToProps = { getTrending, getShowSeasonInfo, getShowInfo };

const mapStateToProps = (state => ({calendarData: state.calendarData, showData : state.showInfo}));

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
