![Logo](/logo.png?raw=true.png)

A todo list of shows to watch, better known as, **The Watch List**!

## Features
- Subscribe to shows
- See original air date, time and channel or platform
- See shows in calendar view
- Check off episodes watched
- Discover new shows based on ratings (Rotten Tomatoes, IMDb)
- Share shows and episodes (Twitter, Facebook)

## Team Members
- Navjot Singh
- Eric Beutler
- Hamilton Lam
- Leo Jon Imutan

## Framework
Bases of framework pulled from [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## Packages
- [Material-UI](http://www.material-ui.com/#/)
- [React-Big-Calendar](https://github.com/intljusticemission/react-big-calendar)
- [React-Google-Login](https://github.com/anthonyjgrove/react-google-login)

## APIs
- [TVmaze](http://www.tvmaze.com/api)
- [Google](https://developers.google.com/identity/sign-in/web/) Sign-In
- [Twitter](https://dev.twitter.com/web/tweet-button) Tweet button
- [Facebook](https://developers.facebook.com/docs/sharing/reference/share-dialog) share dialog

## Compile and Test
1. [Install Node.js](https://nodejs.org/en/)
2. To check that npm is installed enter `npm -v` from the terminal
3. From the working directory in the terminal enter:
    - `npm install`
    - `npm run dev`
4. From a web browser navigate to "localhost:3000"

## Flask Backend
- Make executable `chmod +x flask_backend.py` or run `python flask_backend.py`
    - Libraries needed:
        - Flask: `pip install Flask`
        - requests: `pip install requests`
        - BeautifulSoup: `pip install beautifulsoup4`
        - Flask-CORS: `pip install flask-cors`
- Should then see `* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`

### Search
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

### Show Details
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
    "summary": "plot of show",
    "title": "show title",
    "year": year premiered, N/A if unavailable
}
```

### Episodes
- `http://127.0.0.1:5000/tv/episodes/idNumber/seasonNumber` returns JSON containing all the episodes for the provided season based on the ID. The episodes include: the name of the episode, the season number, the episode number, the date aired, and a summary of the episode.
```
[
    {
        "date": "date aired",
        "name": "name of episode",
        "number": episode number,
        "season": season number,
        "summary": "summary of episode",
        "time": "24 hour format time aired"
    }
]
```

### Trending
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

## pytest
- Unit testing for Flask backend
- Libraries needed:
    - pytest: `pip install pytest`
    - requests: `pip install requests`
- From flask directory call `pytest`
    - `pytest -v` for verbose
