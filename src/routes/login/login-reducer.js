import { connect } from 'react-redux';
import { login, register, isLogin } from './action';
import LoginPage from './login';

const mapDispatchToProps = { login, register, isLogin };

const mapStateToProps = (state) => ({ userData: state.userData });

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
