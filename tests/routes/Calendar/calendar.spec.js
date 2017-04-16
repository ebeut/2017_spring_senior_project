import React from 'react';
import { bindActionCreators } from 'redux';
import CalendarPage from 'routes/Calendar/calendar';
import { shallow } from 'enzyme';

const showInfoSeasonData = [
  {
    "date": "Mon, 29 Aug 2005 00:00:00 GMT",
    "name": "Pilot",
    "id": 541,
    "number": 1,
    "season": 1,
    "summary": "Lincoln Burrows is currently on death row and scheduled to die in a few months for an assassination his younger brother Michael is convinced he did not commit. With no other options and time winding down, Michael takes drastic measures to get himself incarcerated alongside his brother in Fox River State Penitentiary. Once he's inside, Michael - a structural engineer with the blueprints for the prison - begins to execute an elaborate plan to break Lincoln out and prove him innocent. When Michael arrives at Fox River State Penitentiary, he meets the prison denizens who will, unknowingly, help in his escape plans - his cellmate, the lovelorn Sucre; beautiful prison doctor Dr. Sara Tancredi, who happens to be the governor's daughter; former mob boss John Abruzzi; and Warden Henry Pope. Meanwhile, outside the prison walls, the brothers' childhood friend and Lincoln's lost love, attorney Veronica Donovan, works within the law to free them; Lincoln's teenage son LJ may be going down a path similar to his convicted father's; and Secret Service Agent Paul Kellerman's investigation into Lincoln's case proves that there may be a national conspiracy.",
    "time": "20:00"
  },
  {
    "date": "Mon, 29 Aug 2005 00:00:00 GMT",
    "name": "Allen",
    "id": 541,
    "number": 2,
    "season": 1,
    "summary": "Michael seeks help of his fellow prison inhabitants to execute his escape plans.",
    "time": "20:00"
  },
  {
    "date": "Mon, 05 Sep 2005 00:00:00 GMT",
    "name": "Cell Test",
    "id": 541,
    "number": 3,
    "season": 1,
    "summary": "Time is running out, and Michael must enlist the help of his cellmate, Sucre, to help execute his elaborate escape plan. Once Sucre realizes what Michael is up to, however, he decides that he doesn't want any part of it and asks for a cell transfer. Michael's new cellmate, Haywire, is trouble like his name. Unable to continue with his plan, Michael fears the worst. Meanwhile, Veronica's suspicions are growing as she meets a woman who may be able to help stop Lincoln's execution.",
    "time": "20:00"
  },
];
const showInfo = {
  "cast": [
    {
      "character": "Michael Scofield",
      "image": "http://static.tvmaze.com/uploads/images/medium_portrait/50/125564.jpg",
      "name": "Wentworth Miller"
    },
    {
      "character": "Lincoln Burrows",
      "image": "http://static.tvmaze.com/uploads/images/medium_portrait/7/18087.jpg",
      "name": "Dominic Purcell"
    },
    {
      "character": "Theodore 'T-Bag' Bagwell",
      "image": "http://static.tvmaze.com/uploads/images/medium_portrait/2/7417.jpg",
      "name": "Robert Knepper"
    }
  ],
  "id": 541,
  "imdbRating": 8.7,
  "network": "FOX",
  "numSeasons": 5,
  "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/104/261035.jpg",
  "summary": "Lincoln Burrows is currently on death row and scheduled to die in a few months for an assassination his younger brother Michael is convinced he did not commit. With no other options and time winding down, Michael takes drastic measures to get himself incarcerated alongside his brother in Fox River State Penitentiary. Once he's inside, Michael - a structural engineer with the blueprints for the prison - begins to execute an elaborate plan to break Lincoln out and prove him innocent. When Michael arrives at Fox River State Penitentiary, he meets the prison denizens who will, unknowingly, help in his escape plans - his cellmate, the lovelorn Sucre; beautiful prison doctor Dr. Sara Tancredi, who happens to be the governor's daughter; former mob boss John Abruzzi; and Warden Henry Pope. Meanwhile, outside the prison walls, the brothers' childhood friend and Lincoln's lost love, attorney Veronica Donovan, works within the law to free them; Lincoln's teenage son LJ may be going down a path similar to his convicted father's; and Secret Service Agent Paul Kellerman's investigation into Lincoln's case proves that there may be a national conspiracy.",
  "title": "Prison Break",
  "year": "2005"
};
const trending = [
  {
    "cast": [
      {
        "character": "Michael Scofield",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/50/125564.jpg",
        "name": "Wentworth Miller"
      },
      {
        "character": "Lincoln Burrows",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/7/18087.jpg",
        "name": "Dominic Purcell"
      },
      {
        "character": "Theodore 'T-Bag' Bagwell",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/2/7417.jpg",
        "name": "Robert Knepper"
      }
    ],
    "id": 541,
    "imdbRating": 8.7,
    "network": "FOX",
    "numSeasons": 5,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/104/261035.jpg",
    "summary": "Lincoln Burrows is currently on death row and scheduled to die in a few months for an assassination his younger brother Michael is convinced he did not commit. With no other options and time winding down, Michael takes drastic measures to get himself incarcerated alongside his brother in Fox River State Penitentiary. Once he's inside, Michael - a structural engineer with the blueprints for the prison - begins to execute an elaborate plan to break Lincoln out and prove him innocent. When Michael arrives at Fox River State Penitentiary, he meets the prison denizens who will, unknowingly, help in his escape plans - his cellmate, the lovelorn Sucre; beautiful prison doctor Dr. Sara Tancredi, who happens to be the governor's daughter; former mob boss John Abruzzi; and Warden Henry Pope. Meanwhile, outside the prison walls, the brothers' childhood friend and Lincoln's lost love, attorney Veronica Donovan, works within the law to free them; Lincoln's teenage son LJ may be going down a path similar to his convicted father's; and Secret Service Agent Paul Kellerman's investigation into Lincoln's case proves that there may be a national conspiracy.",
    "title": "Prison Break",
    "year": "2005"
  }
];

const events = [
  {
    title: "s5e1 Prison Break",
    start: "Sun Aug 28 2005 20:00:00 GMT-0700 (Pacific Daylight Time)",
    end: "Sun Aug 28 2005 21:00:00 GMT-0700 (Pacific Daylight Time)",
    desc: "\"Pilot\"\nLincoln Burrows is currently on death row and scheduled to die in a few months for an assassination his younger brother Michael is convinced he did not commit. With no other options and time winding down, Michael takes drastic measures to get himself incarcerated alongside his brother in Fox River State Penitentiary. Once he's inside, Michael - a structural engineer with the blueprints for the prison - begins to execute an elaborate plan to break Lincoln out and prove him innocent. When Michael arrives at Fox River State Penitentiary, " +
    "he meets the prison denizens who will, unknowingly, help in his escape plans - his cellmate, the lovelorn Sucre; beautiful prison doctor Dr. Sara Tancredi, who happens to be the governor's daughter; former mob boss John Abruzzi; and Warden Henry Pope. Meanwhile, outside the prison walls, the brothers' childhood friend and Lincoln's lost love, attorney Veronica Donovan, works within the law to free them; Lincoln's teenage son LJ may be going down a path similar to his convicted father's; and Secret Service Agent Paul Kellerman's investigation into Lincoln's " +
    "case proves that there may be a national conspiracy.Airs on FOX at 8 PM",
  },
  {
    title: "s5e2 Prison Break",
    start: "Sun Aug 28 2005 20:00:00 GMT-0700 (Pacific Daylight Time)",
    end: "Sun Aug 28 2005 21:00:00 GMT-0700 (Pacific Daylight Time)",
    desc: "\"Allen\" Michael seeks help of his fellow prison inhabitants to execute his escape plans. Airs on FOX at 8 PM"
  },
  {
    title: "s5e3 Prison Break",
    start: "Sun Sep 04 2005 20:00:00 GMT-0700 (Pacific Daylight Time)",
    end: "Sun Sep 04 2005 21:00:00 GMT-0700 (Pacific Daylight Time)",
    desc: "\"Cell Test\" Time is running out, and Michael must enlist the help of his cellmate, Sucre, to help execute his elaborate escape plan. Once Sucre realizes what Michael is up to, however, he decides that he doesn't want any part of it and asks for a cell transfer. Michael's new cellmate, Haywire, is trouble like his name. Unable to continue with his plan, Michael fears the worst. Meanwhile, Veronica's suspicions are growing as she meets a woman who may be able to help stop Lincoln's execution.Airs on FOX at 8 PM"
  }
 ];

describe('Calendar component', () => {
  let props, spies, wrap;

  beforeEach(() => {
    spies = {};
    props = {
      showData: {},
      calendarData: {},
      ...bindActionCreators({
        getShowSeasonInfo: (spies.getShowSeasonInfo = sinon.spy()),
        getShowInfo: (spies.getShowInfo = sinon.spy()),
        getTrending: (spies.getTrending = sinon.spy())
      }, spies.dispatch = sinon.spy()),
      contextTypes: {router: '/search'}
    };
    wrap = shallow(<CalendarPage {...props} />)
  });
  it('Should render basic components', () => {
    expect(wrap.find('div')).to.exist;
    expect(wrap.find('#calendar-page')).to.exist;
    expect(wrap.find('#calendar-loading')).to.exist;
    expect(wrap.find('#calendar-big-calendar')).to.exist;
  });
  it('Should display loading dialog when the content is loading', () => {
    expect(wrap.state().open).to.equal.true;
    wrap.instance().componentWillReceiveProps({calendarData: {}, showData: {show: showInfo, showSeasonInfo: showInfoSeasonData}});
    expect(wrap.state().open).to.equal.false;
  });
  it('Should be able to handle data coming in', () => {
    wrap.instance().componentWillReceiveProps({calendarData: {trendingData: trending}, showData: {show: {}}, showSeasoninfo: {}});
    spies.getShowInfo.should.have.been.called;
    wrap.instance().componentWillReceiveProps({calendarData: {trendingData: trending}, showData: {show: showInfo}, showSeasoninfo: {}});
    spies.getShowSeasonInfo.should.have.been.called;
    wrap.instance().componentWillReceiveProps({calendarData: {trendingData: trending}, showData: {show: showInfo}, showSeasoninfo: showInfoSeasonData});
    events.map((episode, index) => {
      expect(wrap.find('#calendar-big-calendar').props().events[index].title).to.equal(episode.title);
    });
  });
});
