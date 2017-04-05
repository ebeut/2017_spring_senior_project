import { connect } from 'react-redux';
import ShowInfoPage from './show-info';

const mapStateToProps = (state) => ({ showInfo : state.showInfo });

export default connect(mapStateToProps)(ShowInfoPage)
