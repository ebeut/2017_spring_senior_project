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


@app.route("/db/usr")
def api_show_users():
    """Displays user table as HTML page

    Arguments: N/A

    Returns: HTML rendering
    """
    return db.printTableUsers()


@app.route("/db/insert/<username>/<showID>")
def api_insert_show(username, showID):
    """Insert row to table through flask backend.

    Arguments:
        username:    username
        showID:      show's ID number

    Returns: redirects to /db
    """
    db.insertShow(username, showID)
    return redirect(url_for("api_show_table"))


@app.route("/db/remove/<username>/<showID>")
def api_remove_show(username, showID):
    """Remove row from table through flask backend.

    Arguments:
        username:    username
        showID:      show's ID number

    Returns: redirects to /db
    """
    db.removeShow(username, showID)
    return redirect(url_for("api_show_table"))


@app.route("/db/epi/insert/<username>/<showID>/<seasonEpNum>")
def api_insert_episode(username, showID, seasonEpNum):
    """Insert row to episode table through flask backend.

    Arguments:
        username:       username
        showID:         show's ID number
        seasonEpNum:    season and episode number (#.#)

    Returns: redirects to /db/epi
    """
    db.insertEpisode(username, showID, seasonEpNum)
    return redirect(url_for("api_show_episodes"))


@app.route("/db/epi/remove/<username>/<showID>/<seasonEpNum>")
def api_remove_episodes(username, showID, seasonEpNum):
    """Remove row from episode table through flask backend.

    Arguments:
        username:       username
        showID:         show's ID number
        seasonEpNum:    season and episode number (#.#)

    Returns: redirects to /db/epi
    """
    db.removeEpisode(username, showID, seasonEpNum)
    return redirect(url_for("api_show_episodes"))


@app.route("/db/usr/register/<username>/<hashPwd>")
def api_register(username, hashPwd):
    """Register user through flask backend

    Arguments:
        username:    username
        hashPwd:     hashed password

    Returns:
        regJSON:    JSON containng whether or not the registration was
                    successful

    Example:
        {
            "error": "Error message or None",
            "registered": true or false
        }
    """
    reg = db.registerUser(username, hashPwd)
    if not reg:
        regJSON = {
            "registered": reg,
            "error": "Username already exists"
        }
    else:
        regJSON = {
            "registered": reg,
            "error": "None"
        }

    regJSON = jsonify(regJSON)
    regJSON.status_code = 200
    return regJSON


@app.route("/db/usr/login/<username>/<hashPwd>")
def api_login(username, hashPwd):
    """Login user through flask backend

    Arguments:
        username:    username
        hashPwd:     hashed password

    Returns:
        loginJSON:    JSON containng whether or not the login was
                      successful

    Example:
        {
            "error": "Error message or None",
            "login": true or false
        }
    """
    login = db.loginUser(username, hashPwd)
    if not login:
        loginJSON = {
            "login": login,
            "error": "Username or password incorrect"
        }
    else:
        loginJSON = {
            "login": login,
            "error": "None"
        }

    loginJSON = jsonify(loginJSON)
    loginJSON.status_code = 200
    return loginJSON


@app.route("/db/usr/remove/<username>")
def api_remove_user(username):
    """Removes all information related to username through flask backend

    Arguments:
        username:    username

    Returns: redirects to /db/usr
    """
    db.removeUser(username)
    return redirect(url_for("api_show_users"))


@app.route("/db/usr/logout/<username>")
def api_log_out(username):
    """Updates user table logged in status to false through flask backend.

    Arguments:
        username:    username

    Returns: redirects to /db/usr
    """
    db.logOutUser(username)
    return redirect(url_for("api_show_users"))


@app.route("/db/fav/<username>")
def api_fav(username):
    """Request to get user's favorite shows from flask backend.

    Arguments:
        username:    username

    Returns:
        favsJSON:    JSON containing user's favorite shows

    Example:
        [
            show ID number,
            show ID number
        ]
    """
    favsJSON = jsonify(db.getFavorites(username))
    favsJSON.status_code = 200
    return favsJSON


@app.route("/db/epi/watched/<username>/<showID>")
def api_watched(username, showID):
    """Request to get episodes watched for user's specific favorite show from
    flask backend.

    Arguments:
        username:       username
        showID:         show's ID number

    Returns:
        epiJSON:    JSON cotinaing ordered episodes watched

    Example:
        [
            season.episode,
            season.episode
        ]
    """
    epiJSON = jsonify(db.getWatchedEpisodes(username, showID))
    epiJSON.status_code = 200
    return epiJSON


@app.route("/db/usr/loggedin")
def api_check_logged_in():
    """Checks if anyone is logged in through flask backend

    Arguments: N/A

    Returns:
        loggedJSON:    username or N/A
    """
    loggedJSON = jsonify(db.getUserLoggedIn())
    loggedJSON.status_code = 200
    return loggedJSON


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
