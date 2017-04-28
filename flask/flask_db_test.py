#!/usr/bin/env python3

import pytest
import sqlite3
import os


@pytest.fixture
def get_connection():
    """Get a database connection

    Arguments: N/A

    Returns: database connection
    """
    return sqlite3.connect("TheWatchList.db")


def test_db_exists():
    """Check that the database file exists"""
    assert os.path.isfile("TheWatchList.db")


def test_watchlist_table_exists(get_connection):
    """Check that the watchlist table exists"""
    cur = get_connection.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type=? AND \
                       name=?", ("table", "WATCHLIST"))
    table_name = cur.fetchone()
    assert table_name


def test_episodes_table_exists(get_connection):
    """Check that the episodes table exists"""
    cur = get_connection.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type=? AND \
                       name=?", ("table", "EPISODES"))
    table_name = cur.fetchone()
    assert table_name


def test_users_table_exists(get_connection):
    """Check that the users table exists"""
    cur = get_connection.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type=? AND \
                       name=?", ("table", "USERS"))
    table_name = cur.fetchone()
    assert table_name
