import React from 'react'
import { bindActionCreators } from 'redux'
import ShowInfo from 'routes/Show-Info/show-info';
import { shallow } from 'enzyme'

const showInfoSeasonData = [
  {
    "date": "Mon, 29 Aug 2005 00:00:00 GMT",
    "name": "Pilot",
    "number": 1,
    "season": 1,
    "summary": "Lincoln Burrows is currently on death row and scheduled to die in a few months for an assassination his younger brother Michael is convinced he did not commit. With no other options and time winding down, Michael takes drastic measures to get himself incarcerated alongside his brother in Fox River State Penitentiary. Once he's inside, Michael - a structural engineer with the blueprints for the prison - begins to execute an elaborate plan to break Lincoln out and prove him innocent. When Michael arrives at Fox River State Penitentiary, he meets the prison denizens who will, unknowingly, help in his escape plans - his cellmate, the lovelorn Sucre; beautiful prison doctor Dr. Sara Tancredi, who happens to be the governor's daughter; former mob boss John Abruzzi; and Warden Henry Pope. Meanwhile, outside the prison walls, the brothers' childhood friend and Lincoln's lost love, attorney Veronica Donovan, works within the law to free them; Lincoln's teenage son LJ may be going down a path similar to his convicted father's; and Secret Service Agent Paul Kellerman's investigation into Lincoln's case proves that there may be a national conspiracy.",
    "time": "20:00"
  },
  {
    "date": "Mon, 29 Aug 2005 00:00:00 GMT",
    "name": "Allen",
    "number": 2,
    "season": 1,
    "summary": "Michael seeks help of his fellow prison inhabitants to execute his escape plans.",
    "time": "20:00"
  },
  {
    "date": "Mon, 05 Sep 2005 00:00:00 GMT",
    "name": "Cell Test",
    "number": 3,
    "season": 1,
    "summary": "Time is running out, and Michael must enlist the help of his cellmate, Sucre, to help execute his elaborate escape plan. Once Sucre realizes what Michael is up to, however, he decides that he doesn't want any part of it and asks for a cell transfer. Michael's new cellmate, Haywire, is trouble like his name. Unable to continue with his plan, Michael fears the worst. Meanwhile, Veronica's suspicions are growing as she meets a woman who may be able to help stop Lincoln's execution.",
    "time": "20:00"
  },
  {
    "date": "Mon, 12 Sep 2005 00:00:00 GMT",
    "name": "Cute Poison",
    "number": 4,
    "season": 1,
    "summary": "Seeing isn't believing when Haywire develops a fascination with Michael's elaborate torso tattoo, which further delays Michael's timetable for escape. Sucre has a change of heart when an unexpected visitor informs him of Maricruz's affairs. Lincoln's nightmares about his execution intensify. Veronica goes on the defense for Lincoln as she teams with an advocacy lawyer who may be more than interested in justice.",
    "time": "20:00"
  },
  {
    "date": "Mon, 19 Sep 2005 00:00:00 GMT",
    "name": "English, Fitz or Percy",
    "number": 5,
    "season": 1,
    "summary": "Kellerman and Hale pay a visit to Warden Pope, whose past may not be as angelic as it appears; Michael learns he may be getting out of Fox River much sooner than he expected - without Lincoln; Veronica and Nick's investigation to prove Lincoln's innocence makes Veronica doubt whom she can really trust; Michael must raise the roof as another piece of his escape plan.",
    "time": "20:00"
  },
  {
    "date": "Mon, 26 Sep 2005 00:00:00 GMT",
    "name": "Riots, Drills and the Devil (1)",
    "number": 6,
    "season": 1,
    "summary": "Michael turns up the heat to break through to the other side (of his cell wall). Unbeknownst to Lincoln, outside forces plan to move up his execution day. Veronica and Nick track a lead to Washington, DC. A full scale riot in the prison threatens the lives of inmates and employees alike and gives T-Bag an opportunity to uncover a startling secret.",
    "time": "20:00"
  },
  {
    "date": "Mon, 03 Oct 2005 00:00:00 GMT",
    "name": "Riots, Drills and the Devil (2)",
    "number": 7,
    "season": 1,
    "summary": "As the full-scale riot escalates, Michael faces a difficult decision regarding the life of Dr. Sara; Abruzzi and Sucre team up to break the devil's back; T-Bag tastes blood in his quest to be included in the escape plan; Lincoln has a potentially fatal confrontation; and Veronica and Nick track a lead to Washington, DC.",
    "time": "20:00"
  },
  {
    "date": "Mon, 24 Oct 2005 00:00:00 GMT",
    "name": "The Old Head",
    "number": 8,
    "season": 1,
    "summary": "Michael's plan hits a snag when he discovers an old storage shed crucial to the escape has been turned into the guard's break room. Veronica and Nick get an explosive warning to back off their investigation to prove Lincoln's innocence; LJ goes on the run; the conspiracy claims three more lives; the identity of the mystery woman calling the shots is revealed.",
    "time": "20:00"
  },
  {
    "date": "Mon, 31 Oct 2005 00:00:00 GMT",
    "name": "Tweener",
    "number": 9,
    "season": 1,
    "summary": "Abruzzi finds himself demoted in the prison hierarchy, placing the entire escape plan at risk; when T-Bag's latest relationship sours and he targets a new 'fish,' Michael is torn between wanting to protect the new kid and T-Bag's threats that he will reveal the escape plan to the guards if Michael interferes; in the aftermath of the double murder, LJ runs for his life; the inmates digs themselves into a hole with the latest part of the plan.",
    "time": "20:00"
  },
  {
    "date": "Mon, 07 Nov 2005 00:00:00 GMT",
    "name": "Sleight of Hand",
    "number": 10,
    "season": 1,
    "summary": "In order to get Abruzzi back in command of the prison's work detail (and the escape plan back on track), Michael must finally give up Fibonnaci's location (and life) to Philly Falzone; Kellerman and Hale get a little unwanted 'help' to track down a missing LJ; Veronica and Nick uncover evidence against the man Lincoln was convicted of murdering; Michael and Dr. Sara grow closer; And the escape gang grows by one.",
    "time": "20:00"
  },
  {
    "date": "Mon, 14 Nov 2005 00:00:00 GMT",
    "name": "And Then There Were 7",
    "number": 11,
    "season": 1,
    "summary": "The escape gang and Dr. Sara are shocked when they learn the identity of Michael's latest visitor, who brings with her a priceless piece of the plan; Captain Bellick's suspicions are aroused; Tweener's pickpocketing skills get Michael back some valuable time. Quinn tracks Veronica, Nick and LJ to the cabin in the woods and Kellerman and Hale have a life-threatening difference of opinion.",
    "time": "20:00"
  },
  {
    "date": "Mon, 21 Nov 2005 00:00:00 GMT",
    "name": "Odd Man Out",
    "number": 12,
    "season": 1,
    "summary": "With proof that his escape plan is working, Michael gets suited up to overcome the vertical limits of his last obstacle. Back in PI, as the escape attempt draws near, the group tries to reduce their number by one and targets T-Bag, who has some insurance in his pocket. Outside the prison walls, LJ slips away to attend his mother's funeral, which is also attended by her murderer. Veronica gets a call from an unlikely source who sheds light on the night of Terrence Steadman's assassination.",
    "time": "20:00"
  },
  {
    "date": "Mon, 28 Nov 2005 00:00:00 GMT",
    "name": "End of the Tunnel",
    "number": 13,
    "season": 1,
    "summary": "With Lincoln's execution scheduled for the following day, Veronica comes out of hiding to reach out to him and gains a newsworthy ally in the process. Kellerman makes the ultimate sacrifice to preserve the conspiracy. Michael must find a way to get Lincoln out of Solitary confinement in time for the escape that evening. The inmates risk everything as they attempt the escape.",
    "time": "20:00"
  },
  {
    "date": "Mon, 20 Mar 2006 00:00:00 GMT",
    "name": "The Rat",
    "number": 14,
    "season": 1,
    "summary": "With the escape attempt a failure, the inmates must make their way back to their cells without being detected. Dr. Sara asks the Governor for fatherly forgiveness; Veronica and Nick make a final plea to the judge overseeing Lincoln's case; and with only hours until Lincoln's execution, Michael devises an electrifying plan to keep him alive.",
    "time": "20:00"
  },
  {
    "date": "Mon, 27 Mar 2006 00:00:00 GMT",
    "name": "By the Skin and the Teeth",
    "number": 15,
    "season": 1,
    "summary": "A face from the past haunts Lincoln on his execution day; Veronica raises the dead to prove Lincoln's innocence; Michael takes guard duty in formulating a new escape plan; and a mystery man sheds light on the conspiracy.",
    "time": "20:00"
  },
  {
    "date": "Mon, 03 Apr 2006 00:00:00 GMT",
    "name": "Brother's Keeper",
    "number": 16,
    "season": 1,
    "summary": "A series of flashbacks to three years ago unveils how Lincoln, Sucre, T-Bag, C-Note and Dr. Sara landed in Fox River State Penitentiary, and what drove Michael to craft his elaborate plan to break his condemned sibling out of the prison.",
    "time": "20:00"
  },
  {
    "date": "Mon, 10 Apr 2006 00:00:00 GMT",
    "name": "J-Cat",
    "number": 17,
    "season": 1,
    "summary": "As Michael struggles to remember missing pieces of the prison schematics, Warden Pope places him in solitary when he refuses to name names.",
    "time": "20:00"
  },
  {
    "date": "Mon, 17 Apr 2006 00:00:00 GMT",
    "name": "Bluff",
    "number": 18,
    "season": 1,
    "summary": "Transferred to the psych ward, Michael tries to clear Haywire's head and jog his memory of the missing piece of the blueprint tattoo; Bellick wants to auction off Michael's cell to the highest bidder; C-Note and T-Bag must team up in a high-stakes poker game, while Sucre's cousin Manche seems to hold all the cards.",
    "time": "20:00"
  },
  {
    "date": "Mon, 24 Apr 2006 00:00:00 GMT",
    "name": "The Key",
    "number": 19,
    "season": 1,
    "summary": "The mystery man reveals himself to Lincoln as well as his connection to some bad company; when Michael realizes Sara holds the key to the escape plan, he takes their relationship to another level; Fox River turns into a mob scene when a familiar face returns; Tweener must choose sides; and Bellick may finally discover the \"hole\" truth.",
    "time": "20:00"
  },
  {
    "date": "Mon, 01 May 2006 00:00:00 GMT",
    "name": "Tonight",
    "number": 20,
    "season": 1,
    "summary": "Westmoreland uses Bellick to plug a hole in the escape plan, which forces Michael to move up the breakout timetable. A fearful Tweener pledges his loyalty to Michael and in return may get out of jail for free; Michael feels that he has no choice but to involve Sara in the plan and must betray his father figure; and Veronica finds her life in jeopardy from her closest ally, who has a surprising connection to a Fox River inmate.",
    "time": "20:00"
  },
  {
    "date": "Mon, 08 May 2006 00:00:00 GMT",
    "name": "Go",
    "number": 21,
    "season": 1,
    "summary": "Dr. Sara questions if she should leave a light on and the door open for Michael, who must betray the Pope in order to carry out his escape plan. Veronica finds evidence that points her to Montana, but realizes that her closest ally may actually be her greatest enemy. Michael, Lincoln and the other inmates make a break for it, but after the alarm is sounded, find out who will make it over the wall, who will be left behind and who will leave the prison in a body bag.",
    "time": "20:00"
  },
  {
    "date": "Mon, 15 May 2006 00:00:00 GMT",
    "name": "Flight",
    "number": 22,
    "season": 1,
    "summary": "With the escape in motion, Michael, Lincoln and the inmates take flight outside the prison walls, risking life and limb to evade capture. Warden Pope and Captain Bellick embark on a relentless pursuit to capture the escapees; the Vice President fears she will lose her command as well as her life; and Veronica tracks down the most significant piece of evidence to prove Lincoln's innocence.",
    "time": "20:00"
  }
];

const showInfoData = {
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

describe('Show Info component', () => {
  let props, spies, wrap

  beforeEach(() => {
    spies = {};
    props = {
      showInfo: {show: {}, showSeasonInfo: []},
      ...bindActionCreators({
        getShowSeasonInfo: (spies.searchTVAPI = sinon.spy()),
      }, spies.dispatch = sinon.spy()),
    };
    wrap = shallow(<ShowInfo {...props} />)
  });
  it('Should render the component', () => {
    expect(wrap.find('div')).to.exist;
  });
  it('Should render go back to search if no content and reders data when three is content', () => {
    wrap.instance().componentWillReceiveProps({showInfo: {showSeasonInfo: []}});
    expect(wrap.find('#show-info-back-to-search')).to.exist;
    let cast = wrap.instance().mkCast();
    expect(cast.props.children.length).to.equal(0);

    wrap.instance().componentWillReceiveProps({showInfo: {show: showInfoData, showSeasonInfo: showInfoSeasonData}});
    expect(wrap.find('#show-poster')).to.exist;
    expect(wrap.find('#show-synopsis')).to.exist;
    expect(wrap.find('#show-cast')).to.exist;
    expect(wrap.find('#show-seasons')).to.exist;
    expect(wrap.find('#show-episodes')).to.exist;
    wrap.update();
    cast = wrap.instance().mkCast();
    expect(cast.props.children.length).to.equal(3);

    wrap.instance().componentWillReceiveProps({showInfo: {show: showInfoData, showSeasonInfo: []}});
    wrap.setState({
      open: false,
      id: 0,
      poster: '',
      title: '',
      cast: [],
      season: 1,
      rating: 0.0,
      summary: '',
      network: '',
      numSeasons: 0,
      year: '',
      episodeTitle: [],
      episodeDescription: []
    });
    wrap.update();
    let epiList = wrap.instance().mkEpisodeList();
    expect(epiList.props.children).to.equal('loading .....');
  });
  it('Should make async call when page is rendering with data', () => {
    spies.dispatch.should.have.not.been.called;
    wrap.instance().componentWillReceiveProps({showInfo: {show: showInfoData, showSeasonInfo: []}});;
    spies.dispatch.should.have.been.called;
  });
});
