![Logo](/logo.png?raw=true.png)

A todo list of shows to watch, better known as, **The Watch List**!

## Features
- Subscribe to shows
- See original air date, time and channel or platform
- See shows in calendar view
- Check off episodes watched
- Discover new shows based on ratings (Rotten Tomatoes, IMDb)

## Team Members
- Navjot Singh
- Eric Beutler
- Hamilton Lam
- Leo Jon Imutan

## Framework
Bases of framework pulled from [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## Packages
- [superagent](https://www.npmjs.com/package/superagent)
- [Material-UI](http://www.material-ui.com/#/)
- [React-Big-Calendar](https://github.com/intljusticemission/react-big-calendar)

## APIs
- [TVmaze](http://www.tvmaze.com/api)

## Compile and Test
1. [Install Node.js](https://nodejs.org/en/)
2. To check that npm is installed enter `npm -v` from the terminal
3. From the working directory in the terminal enter:
    - `npm install`
    - `npm run dev`
4. From the working directory navigate to `/flask`
5. Follow steps under [Flask Backend](#flask-backend)
5. From a web browser navigate to "localhost:3000"

## Flask Backend
- Make executable `chmod +x flask_backend.py` or run `python flask_backend.py`
    - Libraries needed:
        - Flask: `pip install Flask`
        - requests: `pip install requests`
        - BeautifulSoup: `pip install beautifulsoup4`
        - Flask-CORS: `pip install flask-cors`
- Should then see `* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`

### Database
#### Structure
##### Watchlist Table
ID Number | Username | Show ID | Last Watched
--------- | -------- | ------- | ------------
1 | johnDoe | 100 | 2017-04-25
2 | janeDoe | 13 | 2017-02-28
3 | johnDoe | 7273 | 2017-04-12

##### Episode Table
ID Number | Episode
--------- | -------
2 | 1.1
2 | 1.2
1 | 1.1
3 | 1.1
3 | 1.2

##### User Table
Username | Logged In
-------- | ---------
johnDoe | 1
janeDoe | 0

#### Register
- `http://127.0.0.1:5000/db/usr/register/username/password` adds the user's information to the User table and returns a JSON with an error message and whether or not the user was registered
```
{
    "error": "Error message or None",
    "registered": true or false
}
```

#### Login
- `http://127.0.0.1:5000/db/usr/login/username/password` validates users information and returns a JSON with an error message and whether or not the user was logged in
```
{
    "error": "Error message or None",
    "login": true or false
}
```

#### Check Login
- `http://127.0.0.1:5000/db/usr/loggedin` checks if the user is logged in

#### Log Out
- `http://127.0.0.1:5000/db/usr/logout/username` logouts out the user and returns True

#### Add Show
- `http://127.0.0.1:5000/db/insert/username/showID` inserts show into Watchlist table

#### Remove Show
- `http://127.0.0.1:5000/db/remove/username/showID` removes show from Watchlist table

#### Add Episode
- `http://127.0.0.1:5000/db/epi/insert/username/showID/seasonEpNum` inserts episode into Episodes table

#### Remove Episode
- `http://127.0.0.1:5000/db/epi/remove/username/showID/seasonEpNum` removes episode from Episodes table

#### Get Favorites
- `http://127.0.0.1:5000/db/fav/username` gets the users favorite shows and returns a JSON with the show's ID numbers
```
[
    show ID number,
    show ID number
]
```

#### Get Episodes Watched
- `http://127.0.0.1:5000/db/epi/username/showID` gets the users watched episodes for a specific show and returns a JSON with the season and episode number
```
[
    season.episode,
    season.episode
]
```

#### Delete User
- `http://127.0.0.1:5000/db/usr/remove/username` complete removes all of the user's information from all three tables

### TVmaze
#### Search
- `http://127.0.0.1:5000/tv/search/title+of+show` returns JSON with all shows from the search including: ID, show title, year premiered, IMDb rating, and a link to its poster
```
[
    {
        "id": ID number,
        "imdbRating": IMDb rating,
        "poster": "link to poster, N/A if unavailable",
        "title": "show title",
        "year": year premiered, N/A if unavailable
    }
]
```

#### Show Details
- `http://127.0.0.1:5000/tv/details/idNumber` returns JSON containing details about the show connected to the provided ID. Details included: ID, show title, year premiered, IMDb rating, network it is televised on, a link to its poster, a summary of the plot, and cast members.
```
{
    "cast": [
        {
            "character": "character actor plays",
            "image": "link to image of actor, N/A if unavailable",
            "name": "actor name"
        }
    ],
    "id": ID number,
    "imdbRating": IMDb rating,
    "network": "name of network, N/A if unavailable",
    "numSeasons": number of seasons,
    "poster": "link to poster, N/A if unavailable",
    "streaming": "service, N/A if unavailable",
    "summary": "plot of show",
    "title": "show title",
    "year": year premiered, N/A if unavailable
}
```

#### Episodes
- `http://127.0.0.1:5000/tv/episodes/idNumber/seasonNumber` returns JSON containing all the episodes for the provided season based on the ID. The episodes include: the name of the episode, the season number, the episode number, the date aired, and a summary of the episode.
```
[
    {
        "date": "date aired",
        "id": ID number,
        "name": "name of episode",
        "number": episode number,
        "runtime": length of episode,
        "season": season number,
        "summary": "summary of episode",
        "time": "24 hour format time aired"
    }
]
```

#### Trending
- `http://127.0.0.1:5000/tv/trending` returns JSON with all the trending shows from Rotten Tomato, each show includes: ID, show title, year premiered, IMDb rating, and a link to its poster
```
[
    {
        "id": ID number,
        "imdbRating": IMDb rating,
        "poster": "link to poster, N/A if unavailable",
        "title": "show title",
        "year": year premiered, N/A if unavailable
    }
]
```

## npm Unit Testing
- From test directory run: `npm run test`

## pytest
- Unit testing for Flask backend
- Libraries needed:
    - pytest: `pip install pytest`
    - requests: `pip install requests`
- From flask directory call `pytest`
    - `pytest -v` for verbose
