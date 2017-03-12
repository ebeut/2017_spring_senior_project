#!/usr/bin/env python3
from tvmaze_args import TVmazeArgs
from tvmaze_search import TVmazeSearch
from tvmaze_show_details import TVmazeShowDetails
from tvmaze_episodes import TVmazeEpisodes


def main():
    """Main function for TVmaze script

    Arguments: N/A

    Returns:
        getResultJSON():     if search option provided, JSON containing search
                             results based on title provided
        getDetailsJSON():    if details option provided, JSON containing
                             details related to the ID provided
        getEpisodeJSON():    if episodes option provided, JSON containing
                             episodes for season provided
    """
    args = TVmazeArgs()

    # search functionality
    if(args.getSearch()):
        searchShows = TVmazeSearch(args.getShowTitle(), args.getDebug())
        searchShows.search()
        return searchShows.getResultJSON()

    # show details functionality
    if(args.getDetails()):
        showDetails = TVmazeShowDetails(args.getShowID(), args.getDebug())
        showDetails.getShowDetails()
        return showDetails.getDetailsJSON()

    # episode functionality
    if(args.getEpisodeSeason()):
        episodes = TVmazeEpisodes(args.getShowID(), args.getEpisodeSeason(),
                                  args.getDebug())
        episodes.getEpisodes()
        return episodes.getEpisodeJSON()


if __name__ == '__main__':
    main()
