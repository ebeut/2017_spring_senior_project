#!/bin/usr/env python3
import requests
import json
import re


class TVmazeShowDetails:
    def __init__(self, showID, debug):
        """Constructor for TVmazeShowDetails class

        Arguments:
            showID:    ID of show provided in CLI arguments
            debug:     True to print JSON, False not to

        Returns: creates TVmazeShowDetails class object
        """
        self.__showID = showID     # private
        self.__debug = debug       # private
        self.__detailsJSON = None  # private

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

        # converts dictionary to JSON
        self.__detailsJSON = json.dumps(self.parseShowDetails(data))
        if(self.__debug):
            print(self.__detailsJSON)

    def parseShowDetails(self, data):
        """Parses the resulting JSON

        Arguments:
            data:    JSON response from API query in getShowDetails

        Returns:
            details:    dictionary containing relevant show details

        Example:
            {"id": ID number, "title": "show title",
            "year": "year premiered, N/A if unavailable", "imdbRating": rating,
            "network": "name of network",
            "poster": "link to poster, N/A if unavailable",
            "summary": "plot of show", "cast": [{"name": "actor name",
            "character": "character actor plays",
            "image": "link to image of actor, N/A if unavailable"}]}
        """
        cast = []

        title = data["name"]

        year = data["premiered"]
        try:
            year = year[:4]  # just get the year from premiere date
        except TypeError:
            year = "N/A"  # premiere date unavailable

        imdbRating = data["rating"]["average"]
        network = data["network"]["name"]

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

        details = {
            "id": self.__showID,
            "title": title,
            "year": year,
            "imdbRating": imdbRating,
            "network": network,
            "poster": poster,
            "summary": summary,
            "cast": cast,
        }

        return details

    def getDetailsJSON(self):
        """Getter function for detailsJSON

        Arguments: N/A

        Returns:
            detailsJSON:    JSON containing show details
        """
        return self.__detailsJSON
