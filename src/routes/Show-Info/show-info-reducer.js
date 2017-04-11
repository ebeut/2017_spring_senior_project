import { connect } from 'react-redux';
import ShowInfoPage from './show-info';
import { getShowSeasonInfo } from './action';

const mapDispatchToProps = { getShowSeasonInfo };

const mapStateToProps = (state) => ({ showInfo : state.showInfo });

export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoPage)
