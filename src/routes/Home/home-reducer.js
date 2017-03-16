import { connect } from 'react-redux';
import { getHomePageData } from './action';
import HomePage from './components/home';

const mapDispatchToProps = { getHomePageData };

const mapStateToProps = (state => ({homeData: state.homeData}));

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
