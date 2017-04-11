import { connect } from 'react-redux';
import { getCalendarData } from './action';
import CalendarPage from './calendar';

const mapDispatchToProps = { getCalendarData };

const mapStateToProps = (state => ({calendarData: state.calendarData}));

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
