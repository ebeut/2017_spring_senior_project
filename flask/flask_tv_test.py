#!/usr/bin/env python3

import pytest
import requests


def test_trending():
    """Unit test for trending functionality. Checks status code, content type,
    and JSON fields for correct keys.
    """
    trendingKeys = ["id", "imdbRating", "poster", "title", "year"]
    errors = []
    response = requests.get("http://localhost:5000/trending")

    # check status code
    if(response.status_code != 200):
        errors.append("status code not 200")
    # check content type
    if(response.headers["Content-Type"] != "application/json"):
        errors.append("content type incorrect")

    data = response.json()
    show = data[0]
    # check that the correct keys are used in the JSON
    for key in trendingKeys:
        if key not in show:
            errors.append("JSON format incorrect")
            break

    assert not errors, "Errors occurred:\n{}".format("\n".join(errors))
