#!/bin/usr/env python3
import requests
import re


class TVmazeShowDetails:
    def __init__(self, showID):
        """Constructor for TVmazeShowDetails class

        Arguments:
            showID:    ID of show provided in CLI arguments

        Returns: creates TVmazeShowDetails class object
        """
        self.__showID = showID
        self.__detailsJSON = None

    def getShowDetails(self):
        """Makes initial request to API and calls parseShowDetails with raw
        JSON data recieved

        Arguments: N/A

        Returns: sets detailsJSON member
        """
        searchURL = "http://api.tvmaze.com/shows/" + str(self.__showID) \
            + "?embed=cast"

        response = requests.get(searchURL)
        data = response.json()

        self.__detailsJSON = self.parseShowDetails(data)

    def parseShowDetails(self, data):
        """Parses the resulting JSON from getShowDetails

        Arguments:
            data:    JSON response from API query in getShowDetails

        Returns:
            details:    dictionary containing relevant show details
        """
        cast = []

        title = data["name"]

        year = data["premiered"]
        try:
            year = year[:4]  # just get the year from premiere date
        except TypeError:
            year = "N/A"  # premiere date unavailable

        imdbRating = data["rating"]["average"]

        try:
            network = data["network"]["name"]
        except TypeError:
            network = "N/A"  # network unavailable

        try:
            poster = data["image"]["medium"]
        except TypeError:
            poster = "N/A"  # poster unavailable

        summary = re.sub("<.*?>", "", data["summary"])  # remove HTML tags

        count = 0
        for member in data["_embedded"]["cast"]:
            if(count == 3):  # only get first 3 cast members listed
                break

            try:
                castImage = member["person"]["image"]["medium"]
            except TypeError:
                castImage = "N/A"  # cast image unavailable

            tempCast = {
                "name": member["person"]["name"],
                "character": member["character"]["name"],
                "image": castImage
            }
            cast.append(tempCast)
            count += 1

        numSeasons = self.getNumSeasons()

        details = {
            "id": self.__showID,
            "title": title,
            "year": year,
            "numSeasons": numSeasons,
            "imdbRating": imdbRating,
            "network": network,
            "poster": poster,
            "summary": summary,
            "cast": cast,
        }

        return details

    def getNumSeasons(self):
        """Get the number of seasons

        Arguments: N/A

        Returns: the number of seasons
        """
        searchURL = "http://api.tvmaze.com/shows/" + str(self.__showID) \
            + "/seasons"

        response = requests.get(searchURL)
        data = response.json()

        return data[-1]["number"]

    def getDetailsJSON(self):
        """Getter function for detailsJSON

        Arguments: N/A

        Returns:
            detailsJSON:    JSON containing show details
        """
        return self.__detailsJSON
