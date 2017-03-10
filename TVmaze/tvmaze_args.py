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

        # mutual exclusion
        group = parser.add_mutually_exclusive_group()

        # -v, --version
        parser.add_argument("-v", "--version", action="version",
                            version="%(prog)s 1.0")

        # --id
        group.add_argument("--id", help="Show ID provided by search function",
                           dest="showID", type=int)

        # --title
        group.add_argument("--title", help="Title of show", dest="showTitle",
                           type=str)

        # --search
        parser.add_argument("--search", help="Search for show", dest="search",
                            action="store_true", default=False)

        # --details
        parser.add_argument("--details", help="Get details about the show, "
                            "including description and cast", dest="details",
                            action="store_true", default=False)

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

        self.__showID = args.showID
        self.__showTitle = args.showTitle
        self.__search = args.search
        self.__details = args.details
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

    def getDebug(self):
        """Getter for debug

        Arguments: N/A

        Returns:
            debug:    boolean value based on if debug provided in CLI
                      True if provided, False if not
        """
        return self.__debug
