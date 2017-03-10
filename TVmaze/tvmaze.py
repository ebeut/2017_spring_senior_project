#!/usr/bin/env python3
from tvmaze_args import TVmazeArgs
from tvmaze_search import TVmazeSearch
from tvmaze_show_details import TVmazeShowDetails


def main():
    """Main file for TVmaze script

    Arguments: N/A

    Returns:
        getResultJSON():     if search option provided, JSON containing search
                             results based on title provided
        getDetailsJSON():    if details option provided, JSON containing
                             details related to the ID provided
    """
    args = TVmazeArgs()

    if(args.getSearch()):
        searchShows = TVmazeSearch(args.getShowTitle(), args.getDebug())
        searchShows.search()
        return searchShows.getResultJSON()

    if(args.getDetails()):
        showDetails = TVmazeShowDetails(args.getShowID(), args.getDebug())
        showDetails.getShowDetails()
        return showDetails.getDetailsJSON()


if __name__ == '__main__':
    main()
