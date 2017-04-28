import { connect } from 'react-redux';
import { getTrending } from './action';
import CalendarPage from './calendar';
import { getShowSeasonInfo, getShowInfo } from '../Show-Info/action';
import { isLogin, logout } from '../login/action';

const mapDispatchToProps = { getTrending, getShowSeasonInfo, getShowInfo, logout, isLogin };

const mapStateToProps = (state => ({calendarData: state.calendarData, showData : state.showInfo, userData: state.userData}));

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
