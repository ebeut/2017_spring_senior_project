import { connect } from 'react-redux';
import Favorite from './favorite';
import { getFav } from './action';
import { isLogin, logout } from '../login/action';
import { getShowInfo, delFavorite, addFavorite } from '../Show-Info/action';

const mapDispatchToProps = { getFav, isLogin, logout, getShowInfo, delFavorite, addFavorite };

const mapStateToProps = (state) => ({ favInfo: state.favInfo, userData: state.userData, showData: state.showInfo });

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
