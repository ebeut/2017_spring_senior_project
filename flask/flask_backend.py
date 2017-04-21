#!/usr/bin/env python3
from flask import Flask, jsonify, redirect, url_for
from flask_tv_search import FlaskTvSearch
from flask_tv_details import FlaskTvDetails
from flask_tv_episodes import FlaskTvEpisodes
from flask_tv_trending import FlaskTvTrending
from flask_database import FlaskDatabase
from flask_cors import CORS


app = Flask(__name__)
cor = CORS(app, resources={r"/*": {"origin": "*"}}, supports_credentials=True)

db = FlaskDatabase()  # initializes database

#######################
# Database App Routes #
#######################


@app.route("/db")
def api_show_table():
    """Displays main table as HTML page

    Arguments: N/A

    Returns: HTML rendering
    """
    return db.printTable()


@app.route("/db/epi")
def api_show_episodes():
    """Displays episode table as HTML page

    Arguments: N/A

    Returns: HTML rendering
    """
    return db.printTableEpisodes()


@app.route("/db/insert/<email>/<showID>")
def api_insert_show(email, showID):
    """Insert row to table through flask backend.

    Arguments:
        email:     user's email address
        showID:    show's ID number

    Returns: redirects to /db
    """
    db.insertShow(email, showID)
    return redirect(url_for("api_show_table"))


@app.route("/db/remove/<email>/<showID>")
def api_remove_show(email, showID):
    """Remove row from table through flask backend.

    Arguments:
        email:     user's email address
        showID:    show's ID number

    Returns: redirects to /db
    """
    db.removeShow(email, showID)
    return redirect(url_for("api_show_table"))


@app.route("/db/epi/insert/<email>/<showID>/<seasonEpNum>")
def api_insert_episode(email, showID, seasonEpNum):
    """Insert row to episode table through flask backend.

    Arguments:
        email:          user's email address
        showID:         show's ID number
        seasonEpNum:    season and episode number (#.#)

    Returns: redirects to /db/epi
    """
    db.insertEpisode(email, showID, seasonEpNum)
    return redirect(url_for("api_show_episodes"))


@app.route("/db/fav/<email>")
def api_fav(email):
    """Request to get user's favorite shows from flask backend.

    Arguments:
        email:    user's email

    Returns:
        favsJSON:    JSON containing user's favorite shows

    Example:
        [
            {
                "email": "email address",
                "id": user's id number (ascii email added up plus show ID)
                "showID": show ID number
            }
        ]
    """
    favsJSON = jsonify(db.getFavorites(email))
    favsJSON.status_code = 200
    return favsJSON


#######################
# TVmaze App Routes #
#######################


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
    app.secret_key = 'something random'
    app.run(threaded=True)
