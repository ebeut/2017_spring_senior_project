import { connect } from 'react-redux';
import { searchTVAPI } from './action';
import SearchPage from './search';

const mapDispatchToProps = { searchTVAPI };

const mapStateToProps = (state => ({searchRes: state.searchRes}));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
