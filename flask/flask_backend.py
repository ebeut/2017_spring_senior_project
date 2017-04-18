#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_tv_search import FlaskTvSearch
from flask_tv_details import FlaskTvDetails
from flask_tv_episodes import FlaskTvEpisodes
from flask_tv_trending import FlaskTvTrending
from TVMazeDB import Database
from flask_cors import CORS


app = Flask(__name__)
cor = CORS(app, resources={r"/*": {"origin": "*"}}, supports_credentials=True)


@app.route("/db/insert/<email>/<showId>/<lastWatched>")
def create_row(email, showId, lastWatched):
    dbCreateRow = FlaskDB(email, showId, lastWatched)
    dbCreateRow.create_row()

    dbCreateRowJSON = jsonify(dbCreateRow.getRowJSON())
    dbCreateRowJSON.status_code = 200
    return dbCreateRowJSON


@app.route("/db/favorite/<email>/showId>/<lastWatched>")
def addFaveShow(showId):
    dbFave = FlaskFave(showId)
    dbFave.addFaveShow()

    dbFaveJSON = jsonify(dbFaveJSON.getFaveJSON())
    dbFaveJSON.status_code = 200
    return dbFaveJSON

@app.route("/db/updateLatest/<email>/<showId/<lastWatched>")
def updateLastWatched(lastWatched):
    dbLastWatched = FlaskLast(lastWatched)
    dbLastWatched.addLastWatched()

    dbLastWatchedJSON = jsonify(dbLastWatched.getLastWatchedJSON())
    dbLastWatchedJSON.status_code = 200
    return dbLastWatchedJSON

@app.route("db/readLatestWatched/<email>/<showId/<lastWatched>")
def readLastWatched(lastWatched, email):
    dbReadLast = FlaskReadLast(lastWatched, email)
    dbReadLast.addReadLast()

    dbReadLastJSON = jsonify(dbReadLast.getReadLastJSON())
    dbReadLastJSONstatus_code = 200
    return dbReadLastJSON

@app.route("db/readFaveShow/<email>/<showId/<lastWatched>")
def readFaveShow(showId, email):
    dbReadFave = FlaskReadFave(showId, email)
    dbReadFave.addReadFave()

    dbReadFaveJSON = jsonify(dbReadFave.getReadFaveJSON())
    dbReadFaveJSONstatus_code = 200
    return dbReadFaveJSON



@app.route("/tv/search/<showTitle>")
def api_search(showTitle):
    """Search request to flask backend. Show title must have "+" instead of
    spaces (ex. the+office).

    Arguments:
        showTitle:    title of show with "+" instead of spaces (ex. the+office)

    Returns:
        searchJSON: JSON containing search results

    Example:
        [
            {
                "id": ID number,
                "imdbRating": IMDb rating,
                "poster": "link to poster, N/A if unavailable",
                "title": "show title",
                "year": year premiered, N/A if unavailable
            }
        ]
    """
    searchShows = FlaskTvSearch(showTitle)
    searchShows.search()

    searchJSON = jsonify(searchShows.getResultJSON())
    searchJSON.status_code = 200
    return searchJSON


@app.route("/tv/details/<int:showID>")
def api_details(showID):
    """Details request to flask backend

    Arguments:
        showID:    ID number for show from TVmaze API

    Returns:
        detailsJSON:    JSON containing show details

    Example:
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
    """
    showDetails = FlaskTvDetails(showID)
    showDetails.getShowDetails()

    detailsJSON = jsonify(showDetails.getDetailsJSON())
    detailsJSON.status_code = 200
    return detailsJSON


@app.route("/tv/episodes/<int:showID>/<int:seasonNum>")
def api_episodes(showID, seasonNum):
    """Episodes request to flask backend

    Arguments:
        showID:       ID number for show from TVmaze API
        seasonNum:    number of season

    Returns:
        episodesJSON:    JSON containing episodes for the provided season

    Example:
        [
            {
                "date": "date aired",
                "name": "name of episode",
                "number": episode number,
                "season": season number,
                "summary": "summary of episode"
            }
        ]
    """
    episodes = FlaskTvEpisodes(showID, seasonNum)
    episodes.getEpisodes()

    episodesJSON = jsonify(episodes.getEpisodeJSON())
    episodesJSON.status_code = 200
    return episodesJSON


@app.route("/tv/trending")
def api_trending():
    """Trending request to flask backend

    Arguments: N/A

    Returns:
        trendingJSON:    JSON containing trending shows from Rotten Tomato

    Example:
        [
            {
                "id": ID number,
                "imdbRating": IMDb rating,
                "poster": "link to poster, N/A if unavailable",
                "title": "show title",
                "year": year premiered, N/A if unavailable
            }
        ]
    """
    trending = FlaskTvTrending()
    trending.getTrending()

    trendingJSON = jsonify(trending.getTrendingJSON())
    trendingJSON.status_code = 200
    return trendingJSON


if __name__ == '__main__':
    app.run(threaded=True)
