#!/usr/bin/env python3

import pytest
import requests


@pytest.fixture
def trending_request():
    """Request for trending JSON"""
    return requests.get("http://localhost:5000/trending")


def test_trending_status(trending_request):
    """Checks that status code is 200 (OK)"""
    assert trending_request.status_code == 200


def test_trending_content(trending_request):
    """Checks that Content-Type is application/json"""
    assert trending_request.headers["Content-Type"] == "application/json"


def test_trending_keys(trending_request):
    """Checks that JSON has correct keys"""
    trendingKeys = ["id", "imdbRating", "poster", "title", "year"]
    data = trending_request.json()
    show = data[0]

    for key in trendingKeys:
        if key not in show:
            assert key in show
