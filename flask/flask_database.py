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

    def getConnection(self):
        """Get a database connection

        Arguments: N/A

        Returns: database connection
        """
        return sqlite3.connect("TheWatchList.db")

    def insertShow(self, email, showID):
        """Add entry to main table

        Arguments:
            email:          user's email address
            showID:         show's ID number

        Returns: N/A
        """
        conn = self.getConnection()

        cur_check = conn.cursor()
        cur_check.execute("SELECT * FROM WATCHLIST WHERE email=? AND showid=?",
                          (email, showID))

        if not cur_check.fetchone():
            cur = conn.cursor()

            cur.execute("INSERT INTO WATCHLIST(EMAIL, SHOWID) \
                        VALUES(?, ?);", (email, showID))
            conn.commit()
            flash("Entry added")
            conn.close()
        else:
            flash("Entry already exists")
            conn.close()

    def removeShow(self, email, showID):
        """Removes entry from main table

        Arguments:
            email:          user's email address
            showID:         show's ID number

        Returns: N/A
        """
        conn = self.getConnection()
        cur = conn.cursor()

        cur.execute("DELETE FROM WATCHLIST WHERE email=? AND showID=?",
                    (email, showID))
        conn.commit()
        flash("Entry removed")
        conn.close()

    def getFavorites(self, email):
        """Get rows(favorites) for email provided

        Arguments:
            email:    user's email

        Returns:    createList()
        """
        conn = self.getConnection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM WATCHLIST WHERE email=?", (email,))

        rows = cur.fetchall()
        conn.close()

        return self.createList(rows, 2)

    def createList(self, rows, colNum):
        """Converts rows to list

        Arguments:
            rows:    tuple with row info

        Returns:
            li:    list of dictionaries containing rows
        """
        li = []

        for row in rows:
            li.append(row[colNum])

        return li

    def printTable(self):
        """Displays table as HTML page

        Arguments: N/A

        Returns: HTML rendering
        """
        conn = self.getConnection()
        cursor = conn.execute("SELECT idnum, email, showid from \
                                     WATCHLIST")
        return render_template('print_table.html', items=cursor.fetchall())

    def printTableEpisodes(self):
        """Displays table of episodes as HTML page

        Arguments: N/A

        Returns: HTML rendering
        """
        conn = self.getConnection()
        cursor = conn.execute("SELECT idnum, epinum from \
                                     EPISODES")
        return render_template('print_table_episodes.html',
                               items=cursor.fetchall())
