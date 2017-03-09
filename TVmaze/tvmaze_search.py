#!/usr/bin/env python3
import requests
import json


class TVmazeSearch:
    def __init__(self, title, debug):
        """Constructor for TVmazeSearch class

        Arguments:
            title:    title of show provided in CLI arguments
            debug:    True to print JSON, False not to

        Returns: creates TVmazeSearch class object
        """
        self.title = title
        self.debug = debug
        self.resultJSON = None

    def search(self):
        """Makes initial request to API and calls parseSearchResults with raw
        JSON data recieved

        Arguments: N/A

        Returns:
            resultJSON:    new JSON returned from parseSearchResults
        """
        searchURL = "http://api.tvmaze.com/search/shows?q="
        searchTitle = self.title.replace(" ", "+")

        response = requests.get(searchURL + searchTitle)
        data = response.json()

        # convert list of dictionaries to JSON
        self.resultJSON = json.dumps(self.parseSearchResults(data))
        if(self.debug):
            print(self.resultJSON)

        return self.resultJSON

    def parseSearchResults(self, results):
        """Parses the resulting JSON

        Arguments:
            results:    JSON response from API query in search

        Returns:
            searchResults:    list containing a dictionary for each show in
                              the search results

        Example:
            [{"id": "id number", "title": "show title",
            "year": "year premiered, N/A if unavailable",
            "poster": "link to poster, N/A if unavailable"}]
        """
        searchResults = []

        for show in results:
            # id to be used after user selects show from results
            # id can be passed to script to avoid having to search for show
            # again
            showID = show["show"]["id"]
            title = show["show"]["name"]

            try:
                poster = show["show"]["image"]["medium"]
            except TypeError:  # poster unavailable
                poster = "N/A"

            year = show["show"]["premiered"]
            try:
                year = year[:4]  # just get the year from premiere date
            except TypeError:  # premiere date unavailable
                year = "N/A"

            # temp dictionary to append to list
            temp = {
                "id": showID,
                "title": title,
                "year": year,
                "poster": poster,
            }
            searchResults.append(temp)

        return searchResults
