#!/bin/usr/env python3
import requests
import datetime
import re


class FlaskTvEpisodes:
    def __init__(self, showID, epSeason):
        """Constructor for FlaskTvEpisodes class

        Arguments:
            showID:      ID for show from CLI
            epSeason:    season number, from CLI, used to get episodes from

        Returns: creates FlaskTvEpisodes class object
        """
        self.__showID = showID
        self.__epSeason = epSeason
        self.__episodeJSON = None

    def getEpisodes(self):
        """Makes initial request to API and calls parseEpisodes with raw
        JSON data recieved

        Arguments: N/A

        Returns: sets episodeJSON member
        """
        searchURL = "http://api.tvmaze.com/shows/" + str(self.__showID) \
            + "/episodes"

        response = requests.get(searchURL)
        data = response.json()

        self.__episodeJSON = self.parseEpisodes(data)

    def parseEpisodes(self, data):
        """Parses the resulting JSON from getEpisodes

        Arguments:
            data:    JSON response from API query in getEpisodes

        Returns:
            episodes:    list containing a dictionary for each episode
        """
        episodes = []
        flag = False  # to check season number

        for episode in data:
            if(episode["season"] == self.__epSeason):
                flag = True

                name = episode["name"]
                season = episode["season"]
                number = episode["number"]

                date = episode["airdate"]
                # format date (ex. Mar 10, 2017)
                date = self.formatAirDate(date)

                time = episode["airtime"]  # 24 hour format
                runtime = episode["runtime"]

                # not every episode has a summary, will result in empty string
                # removes html tags from summary
                summary = re.sub("<.*?>", "", str(episode["summary"]))

                temp = {
                    "id": self.__showID,
                    "name": name,
                    "season": season,
                    "number": number,
                    "date": date,
                    "time": time,
                    "runtime": runtime,
                    "summary": summary
                }
                episodes.append(temp)
                continue

            if(flag):  # finished collecting episodes from season
                break

        return episodes

    def formatAirDate(self, date):
        """Takes the date from the original JSON and reformats

        Arguments:
            date:    original date from JSON

        Returns: reformatted date (ex. Mar 10, 2017)
        """
        try:
            year, month, day = date.split("-")
            newDate = datetime.date(int(year), int(month), int(day))
        except ValueError:
            newDate = "N/A"

        # format date (ex. Mar 10, 2017)
        try:
            formatDate = newDate.strftime("%b %-d, %Y")
        except (ValueError, AttributeError):
            formatDate = newDate

        return formatDate

    def getEpisodeJSON(self):
        """Getter function for episodeJSON

        Arguments: N/A

        Returns:
            episodeJSON:    JSON containing episodes for season provided
        """
        return self.__episodeJSON
