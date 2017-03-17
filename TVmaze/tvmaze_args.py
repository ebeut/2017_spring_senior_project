#!/usr/bin/env python3

import argparse
import sys


class TVmazeArgs:
    def __init__(self):
        """Constructor for TVmazeArgs class

        Arguments: N/A

        Returns: creates TVmazeArgs class object
        """
        parser = argparse.ArgumentParser(description="TVmaze API Script",
                                         prog="tvmaze.py")

        # mutual exclusion between --id, --title, --trending
        group = parser.add_mutually_exclusive_group()
        # mutual exclusion between --details and --episodes
        group1 = parser.add_mutually_exclusive_group()

        # -v, --version
        parser.add_argument("-v", "--version", action="version",
                            version="%(prog)s 1.0")

        # --id
        group.add_argument("--id", help="Show ID provided by search function",
                           dest="showID", type=int)

        # --title
        group.add_argument("--title", help="Title of show", dest="showTitle",
                           type=str)

        # --trending
        group.add_argument("--trending", help="Get trending shows",
                           dest="trending", action="store_true", default=False)

        # --search
        parser.add_argument("--search", help="Search for show", dest="search",
                            action="store_true", default=False)

        # --details
        group1.add_argument("--details", help="Get details about the show, "
                            "including description and cast", dest="details",
                            action="store_true", default=False)

        # --episodes
        group1.add_argument("--episodes", help="Get episodes based "
                            "on season provided", dest="seasonNum",
                            type=int)

        # --debug
        parser.add_argument("--debug", help="Prints JSON that is returned to "
                            "terminal", dest="debug", action="store_true",
                            default=False)

        args = parser.parse_args()

        # check arguments
        if(args.search and args.showTitle is None):
            print("Error: when search is selected a title must be provided")
            sys.exit()
        if(args.details and args.showID is None):
            print("Error: when details is selected an ID must be provided")
            sys.exit()
        if(args.seasonNum and args.showID is None):
            print("Error: when episodes is selected an ID must be provided")
            sys.exit()

        self.__showID = args.showID
        self.__showTitle = args.showTitle
        self.__trending = args.trending
        self.__search = args.search
        self.__details = args.details
        self.__episodeSeason = args.seasonNum
        self.__debug = args.debug

    def getShowID(self):
        """Getter for show ID

        Arguments: N/A

        Returns:
            showID:    ID number provided in CLI
        """
        return self.__showID

    def getShowTitle(self):
        """Getter for show title

        Arguments: N/A

        Returns:
            showTitle:    title of show provided in CLI
        """
        return self.__showTitle

    def getTrending(self):
        """Getter for trending

        Arguments: N/A

        Returns:
            trending:    boolean value based on if trending provided in CLI
                         True if provided, False if not
        """
        return self.__trending

    def getSearch(self):
        """Getter for search

        Arguments: N/A

        Returns:
            search:    boolean value based on if search provided in CLI
                       True if provided, False if not
        """
        return self.__search

    def getDetails(self):
        """Getter for details

        Arguments: N/A

        Returns:
            details:    boolean value based on if details provided in CLI
                        True if provided, False if not
        """
        return self.__details

    def getEpisodeSeason(self):
        """Getter for episodeSeason

        Arguments: N/A

        Returns:
            episodeSeason:    season number used to get episodes from
        """
        return self.__episodeSeason

    def getDebug(self):
        """Getter for debug

        Arguments: N/A

        Returns:
            debug:    boolean value based on if debug provided in CLI
                      True if provided, False if not
        """
        return self.__debug
