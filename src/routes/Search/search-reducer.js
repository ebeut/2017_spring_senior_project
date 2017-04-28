import { connect } from 'react-redux';
import { searchTVAPI } from './action';
import { getShowInfo } from '../Show-Info/action';
import { getTrending } from '../Calendar/action';
import { isLogin, logout } from '../login/action';
import SearchPage from './search';

const mapDispatchToProps = { searchTVAPI, getShowInfo, getTrending, isLogin, logout };

const mapStateToProps = (state => ({searchRes: state.searchRes, calendarData: state.calendarData, userData: state.userData}));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
