import { connect } from 'react-redux';
import { login, register } from './action';
import LoginPage from './login';

const mapDispatchToProps = { login, register };

const mapStateToProps = (state) => ({ userData: state.userData });

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
