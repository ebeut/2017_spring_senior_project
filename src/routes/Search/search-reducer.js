import { connect } from 'react-redux';
import { searchTVAPI } from './action';
import { getShowInfo } from '../Show-Info/action';
import SearchPage from './search';

const mapDispatchToProps = { searchTVAPI, getShowInfo };

const mapStateToProps = (state => ({searchRes: state.searchRes}));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
