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

        self.showID = args.showID
        self.showTitle = args.showTitle
        self.search = args.search
        self.details = args.details
        self.debug = args.debug

    def getArgs(self):
        """Gets CLI arguments

        Arguments: N/A

        Returns:
            showID:       ID provided from search function
            showTitle:    Title of show
            search:       True to search, False not to
            details:      True to get details, False not to
            debug:        True to print JSON, False not to
        """
        return self.showID, self.showTitle, self.search, self.details, \
            self.debug
