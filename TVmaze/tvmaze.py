#!/usr/bin/env python3
from tvmaze_args import TVmazeArgs
from tvmaze_search import TVmazeSearch
from tvmaze_show_details import TVmazeShowDetails


def main():
    """Main file for TVmaze script

    Arguments: N/A

    Returns:
        search():            if search option provided, JSON containing search
                             results based on title provided
        getShowDetails():    if details option provided, JSON containing
                             details related to the ID provided
    """
    args = TVmazeArgs()
    showID, showTitle, search, details, debug = args.getArgs()

    if(search):
        searchShows = TVmazeSearch(showTitle, debug)
        return searchShows.search()

    if(details):
        showDetails = TVmazeShowDetails(showID, debug)
        return showDetails.getShowDetails()


if __name__ == '__main__':
    main()
