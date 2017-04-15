import { connect } from 'react-redux';
import { searchTVAPI } from './action';
import { getShowInfo } from '../Show-Info/action';
import { getTrending } from '../Calendar/action';
import SearchPage from './search';

const mapDispatchToProps = { searchTVAPI, getShowInfo, getTrending };

const mapStateToProps = (state => ({searchRes: state.searchRes, calendarData: state.calendarData,}));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
