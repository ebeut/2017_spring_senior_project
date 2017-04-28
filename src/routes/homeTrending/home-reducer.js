import { connect } from 'react-redux';
import { getHomePageData } from './action';
import { getShowInfo } from '../Show-Info/action';
import { getTrending } from '../Calendar/action';
import { isLogin, logout } from '../login/action';
import HomePage from './home';

const mapDispatchToProps = { getHomePageData, getTrending, getShowInfo, isLogin, logout };

const mapStateToProps = (state) => ({ homeData: state.homeData, calendarData: state.calendarData, showInfo : state.showInfo, userData: state.userData });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
