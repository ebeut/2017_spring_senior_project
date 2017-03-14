import { connect } from 'react-redux';
import { searchTVAPI, getShows } from './action';
import SearchPage from './search';

const mapDispatchToProps = { searchTVAPI, getShows };

const mapStateToProps = (state => ({searchRes: state.searchRes}));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
