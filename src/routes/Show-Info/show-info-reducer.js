import { connect } from 'react-redux';
import { getShowInfo } from './action';
import ShowInfoPage from './show-info';

const mapDispatchToProps = { getShowInfo };

const mapStateToProps = (state) => ({ showInfo : state.showInfo });

export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoPage)
