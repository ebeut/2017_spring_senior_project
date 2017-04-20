#!/usr/bin/env python3
from flask import render_template, flash
import sqlite3
import sys


class FlaskDatabase:
    def __init__(self):
        """Constructor for FlaskDatabase class. Connects to database and creates
        the table if it does not already exist.

        Arguments: N/A

        Returns: Creates FlaskDatabase class object
        """
        try:
            conn = sqlite3.connect("TheWatchList.db")
            print(" * Opened database successfully")
        except Exception as m:
            print(" * Error creating database", m)
            sys.exit()

        try:
            conn.execute('''CREATE TABLE IF NOT EXISTS WATCHLIST
                         (IDNUM INTEGER PRIMARY KEY,
                         EMAIL TEXT NOT NULL,
                         SHOWID INT NOT NULL);''')
            # second table to map id num to episodes watched
            conn.execute('''CREATE TABLE IF NOT EXISTS EPISODES
                         (IDNUM INT NOT NULL,
                         EPINUM INT NOT NULL);''')
            print(" * Tables created successfully")
            conn.close()
        except Exception as m:
            print(" * Error creating table:", m)
            sys.exit()

    def get_connection(self):
        """Get a database connection

        Arguments: N/A

        Returns: database connection
        """
        return sqlite3.connect("TheWatchList.db")

    def insert_show(self, email, showID):
        """Add entry to main table

        Arguments:
            email:          user's email address
            showID:         show's ID number

        Returns: N/A
        """
        conn = self.get_connection()
        cur = conn.cursor()

        cur.execute("INSERT INTO WATCHLIST(EMAIL, SHOWID) \
                    VALUES(?, ?);", (email, showID))
        conn.commit()
        flash("Entry added")
        conn.close()

    def remove_show(self, email, showID):
        """Removes entry from main table

        Arguments:
            email:          user's email address
            showID:         show's ID number

        Returns: N/A
        """
        conn = self.get_connection()
        cur = conn.cursor()

        cur.execute("DELETE FROM WATCHLIST WHERE email=? AND showID=?",
                    (email, showID))
        conn.commit()
        flash("Entry removed")
        conn.close()

    def get_favorites(self, email):
        """Get rows(favorites) for email provided

        Arguments:
            email:    user's email

        Returns:    create_dict_shows()
        """
        conn = self.get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM WATCHLIST WHERE email=?", (email,))

        rows = cur.fetchall()
        conn.close()

        return self.create_dict_shows(rows)

    def create_dict_shows(self, rows):
        """Converts rows to dictionary

        Arguments:
            rows:    tuple with row info

        Returns:
            fav_list:    list of dictionaries containing rows
        """
        fav_list = []

        for row in rows:
            temp = {
                "id": row[0],
                "email": row[1],
                "showID": row[2],
            }
            fav_list.append(temp)

        return fav_list

    def print_table(self):
        """Displays table as HTML page

        Arguments: N/A

        Returns: HTML rendering
        """
        conn = self.get_connection()
        cursor = conn.execute("SELECT idnum, email, showid from \
                                     WATCHLIST")
        return render_template('print_table.html', items=cursor.fetchall())

    def print_table_episodes(self):
        """Displays table of episodes as HTML page

        Arguments: N/A

        Returns: HTML rendering
        """
        conn = self.get_connection()
        cursor = conn.execute("SELECT idnum, epinum from \
                                     EPISODES")
        return render_template('print_table_episodes.html',
                               items=cursor.fetchall())
