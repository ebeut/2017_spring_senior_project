import { connect } from 'react-redux';
import { login } from './action';
import LoginPage from './login';

const mapDispatchToProps = { login };

const mapStateToProps = (state) => ({ userData: state.userData});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
