#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_tv_search import FlaskTvSearch
from flask_tv_details import FlaskTvDetails
from flask_tv_episodes import FlaskTvEpisodes
from flask_tv_trending import FlaskTvTrending


app = Flask(__name__)


@app.route("/search/<showTitle>")
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


@app.route("/details/<int:showID>")
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


@app.route("/episodes/<int:showID>/<int:seasonNum>")
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


@app.route("/trending")
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
    app.run()
