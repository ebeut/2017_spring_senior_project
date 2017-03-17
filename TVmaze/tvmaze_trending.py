#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import json


class TVmazeTrending:
    def __init__(self, debug):
        """Constructor for TVmazeTrending class

        Arguments:
            debug:    True to print JSON, false not to

        Returns: creates TVmazeTrending class object
        """
        self.__debug = debug
        self.__trendingJSON = None

    def getRottenTomato(self):
        """Scrapes Rotten Tomato for "Most Popular TV on RT"

        Arguments: N/A

        Returns:
            rtTrending:    list containing the titles of the trending shows
        """
        rtTrending = []

        rottenTomato = "https://www.rottentomatoes.com/"
        response = requests.get(rottenTomato)

        soup = BeautifulSoup(response.content, "html.parser")

        for div in soup.findAll("table", attrs={"class": "movie_list",
                                                "id": "tv-list-2"}):
            for item in div.findAll("td", attrs={"class": "middle_col"}):
                for title in item.findAll("a"):
                    rtTrending.append(title.text)

        return rtTrending

    def getTrending(self):
        """Takes the list of titles returned from getRottenTomato and makes a
        request to the API with each title. After each request, calls
        parseTrending with raw JSON data recieved.

        Arguments: N/A

        Returns: sets trendingJSON member
        """
        results = []
        titles = self.getRottenTomato()
        searchURL = "http://api.tvmaze.com/singlesearch/shows?q="

        for title in titles:
            searchTitle = title.replace(" ", "+")
            response = requests.get(searchURL + searchTitle)
            data = response.json()

            tempShow = self.parseTrending(data)
            # add dictionary returned for trending show to list
            results.append(tempShow)

        # convert list of dictionaries to JSON
        self.__trendingJSON = json.dumps(results)
        if(self.__debug):
            print(results)

    def parseTrending(self, data):
        """Parses the resulting JSON from each trending title

        Arguments:
            data:    JSON response from API query in getTrending

        Returns:
            temp:    dictionary for each show

        Example:
            {"id": "id number", "title": "show title",
            "year": "year premiered, N/A if unavailable", "imdbRating": rating,
            "poster": "link to poster, N/A if unavailable"}
        """
        showID = data["id"]
        title = data["name"]
        imdbRating = data["rating"]["average"]

        try:
            poster = data["image"]["medium"]
        except TypeError:  # poster unavailable
            poster = "N/A"

        year = data["premiered"]
        try:
            year = year[:4]  # just get the year from premiere date
        except TypeError:  # premiere date unavailable
            year = "N/A"

        temp = {
            "id": showID,
            "title": title,
            "year": year,
            "imdbRating": imdbRating,
            "poster": poster,
        }

        return temp

    def getTrendingJSON(self):
        """Getter for trendingJSON

        Arguments: N/A

        Returns:
            trendingJSON:    JSON containing trending shows
        """
        return self.__trendingJSON
