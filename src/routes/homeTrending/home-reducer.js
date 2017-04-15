import { connect } from 'react-redux';
import { getHomePageData } from './action';
import { getShowInfo } from '../Show-Info/action';
import { getTrending } from '../Calendar/action';
import HomePage from './home';

const mapDispatchToProps = { getHomePageData, getTrending, getShowInfo };

const mapStateToProps = (state) => ({ homeData: state.homeData, calendarData: state.calendarData, showInfo : state.showInfo, });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
