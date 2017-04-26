#!/usr/bin/env python3

import pytest
import requests

status_ok = 200
type_json = "application/json"


@pytest.fixture
def search_request():
    """Request for search JSON (ex. The Office)"""
    return requests.get("http://localhost:5000/tv/search/the+office")


@pytest.fixture
def details_request():
    """Request for details JSON (ex. The Office)"""
    return requests.get("http://localhost:5000/tv/details/526")


@pytest.fixture
def episodes_request():
    """Request for episodes JSON (ex. The Office season 1)"""
    return requests.get("http://localhost:5000/tv/episodes/526/1")


@pytest.fixture
def trending_request():
    """Request for trending JSON"""
    return requests.get("http://localhost:5000/tv/trending")


def test_search_status(search_request):
    """Checks that search status code is 200 (OK)"""
    assert search_request.status_code == status_ok


def test_search_content(search_request):
    """Checks that search Content-Type is application/json"""
    assert search_request.headers["Content-Type"] == type_json


def test_search_keys(search_request):
    """Checks that search JSON has correct keys"""
    searchKeys = ["id", "imdbRating", "poster", "title", "year"]
    data = search_request.json()
    show = data[0]

    for key in searchKeys:
        if key not in show:
            assert key in show


def test_details_status(details_request):
    """Checks that details status code is 200 (OK)"""
    assert details_request.status_code == status_ok


def test_details_content(details_request):
    """Checks that details Content-Type is application/json"""
    assert details_request.headers["Content-Type"] == type_json


def test_details_keys(details_request):
    """Checks that details JSON has correct keys"""
    detailsKeys = ["cast", "id", "imdbRating", "network", "numSeasons",
                   "poster", "streaming", "summary", "title", "year"]
    data = details_request.json()

    for item in detailsKeys:
        if item not in data:
            assert item in data


def test_episodes_status(episodes_request):
    """Checks that episodes status is 200 (OK)"""
    assert episodes_request.status_code == status_ok


def test_episodes_content(episodes_request):
    """Checks that episodes Content-Type is application/json"""
    assert episodes_request.headers["Content-Type"] == type_json


def test_episodes_key(episodes_request):
    """Checks that episodes JSON has correct keys"""
    episodesKeys = ["date", "name", "number", "season", "summary", "time",
                    "runtime"]
    data = episodes_request.json()
    episode = data[0]

    for key in episodesKeys:
        if key not in episode:
            assert key in episode


def test_trending_status(trending_request):
    """Checks that trending status code is 200 (OK)"""
    assert trending_request.status_code == status_ok


def test_trending_content(trending_request):
    """Checks that trending Content-Type is application/json"""
    assert trending_request.headers["Content-Type"] == type_json


def test_trending_keys(trending_request):
    """Checks that trending JSON has correct keys"""
    trendingKeys = ["id", "imdbRating", "poster", "title", "year"]
    data = trending_request.json()
    show = data[0]

    for key in trendingKeys:
        if key not in show:
            assert key in show
