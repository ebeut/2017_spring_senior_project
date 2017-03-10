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
- [Python-Shell](https://github.com/extrabacon/python-shell)
- [React-Big-Calendar](https://github.com/intljusticemission/react-big-calendar)

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

## TVmaze Python Script
- Make script executable `chmod +x tvmaze.py`
- `./tvmaze.py -h` will show all possible command line options
- `--debug` option prints JSON that is returned to the terminal

### Search
- `./tvmaze.py --title "Title of Show" --search` returns JSON with all shows from the search including: ID, show title, year premiered, IMDb rating, and a link to its poster
```
[{"id": "id number", "title": "show title",
"year": "year premiered, N/A if unavailable", "imdbRating": rating,
"poster": "link to poster, N/A if unavailable"}]
```

### Show Details
- `./tvmaze.py --id ID number --details` returns JSON containing details about the show connected to the provided ID. Details included: ID, show title, year premiered, IMDb rating, network it is televised on, a link to its poster, a summary of the plot, and cast members.
```
{"id": ID number, "title": "show title",
"year": "year premiered, N/A if unavailable",
"numSeasons": number of seasons, "imdbRating": rating,
"network": "name of network",
"poster": "link to poster, N/A if unavailable",
"summary": "plot of show", "cast": [{"name": "actor name",
"character": "character actor plays",
"image": "link to image of actor, N/A if unavailable"}]}
```

### Episodes
- `./tvmaze.py --id ID number --episodes season number` returns JSON containing all the episodes for the provided season based on the ID. The episodes include: the name of the episode, the season number, the episode number, the date aired, and a summary of the episode.
```
[{"name": "name of episode", "season": season number,
"number": episode number, "date": "date aired",
"summary": "summary of episode"}]
```
