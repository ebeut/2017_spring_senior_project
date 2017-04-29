import { connect } from 'react-redux';
import Favorite from './favorite';
import { getFav } from './action';
import { isLogin, logout } from '../login/action';

const mapDispatchToProps = { getFav, isLogin, logout };

const mapStateToProps = (state) => ({ favInfo: state.favInfo, userData: state.userData });

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
