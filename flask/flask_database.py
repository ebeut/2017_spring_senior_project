#!/usr/bin/env python3
from flask import render_template, flash
import sqlite3
import sys
import datetime


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
            # IDNUM will be autogenerated
            # table consists of favorite shows
            conn.execute('''CREATE TABLE IF NOT EXISTS WATCHLIST
                         (IDNUM INTEGER PRIMARY KEY,
                         USERNAME TEXT NOT NULL,
                         SHOWID INT NOT NULL,
                         LASTWATCHED TEXT NOT NULL);''')
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

    def insertShow(self, username, showID):
        """Add entry to main table

        Arguments:
            username:    username
            showID:      show's ID number

        Returns: N/A
        """
        conn = self.getConnection()

        cur_check = conn.cursor()
        cur_check.execute("SELECT * FROM WATCHLIST WHERE username=? AND \
                          showid=?", (username, showID))

        # check if entry already exists
        if not cur_check.fetchone():
            cur = conn.cursor()
            date = datetime.date.today()

            cur.execute("INSERT INTO WATCHLIST(USERNAME, SHOWID, LASTWATCHED) \
                        VALUES(?, ?, ?);", (username, showID, date))
            conn.commit()
            flash("Entry added")
        else:
            flash("Entry already exists")

        conn.close()

    def removeShow(self, username, showID):
        """Removes entry from main table

        Arguments:
            username:    username
            showID:      show's ID number

        Returns: N/A
        """
        conn = self.getConnection()
        cur = conn.cursor()

        cur.execute("DELETE FROM WATCHLIST WHERE username=? AND showID=?",
                    (username, showID))
        conn.commit()
        flash("Entry removed")
        conn.close()

    def insertEpisode(self, username, showID, seasonEpNum):
        """Add entry to episode table based on user ID num. Updates last
        watched date in main table.

        Arguments:
            username:       username
            showID:         show's ID number
            seasonEpNum:    season and episode number (#.#)

        Returns: N/A
        """
        conn = self.getConnection()
        cur = conn.cursor()

        cur.execute("UPDATE WATCHLIST SET lastwatched=? WHERE username=? \
                    AND showID=?", (datetime.date.today(), username, showID))

        cur1 = conn.cursor()

        userID = self.getIdNum(username, showID)

        if userID:
            cur1.execute("INSERT INTO EPISODES(IDNUM, EPINUM) VALUES(?, ?);",
                         (userID, seasonEpNum))
            conn.commit()
            flash("Episode added")
        else:
            flash("Username with show ID does not exist")

        conn.close()

    def getIdNum(self, username, showID):
        """Gets user's unique ID number for user show relationship

        Arguments:
            username:    username
            showID:      show's ID number

        Returns:
            userID:    ID number for user and show
            None:      entry does not exist
        """
        conn = self.getConnection()
        cur = conn.cursor()

        cur.execute("SELECT * FROM WATCHLIST WHERE username=? AND showID=?",
                    (username, showID))
        row = cur.fetchone()
        if row:
            userID = row[0]
        else:
            userID = None
        conn.close()

        return userID

    def getFavorites(self, username):
        """Get rows(favorites) for username provided

        Arguments:
            username:    username

        Returns:    createList()
        """
        conn = self.getConnection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM WATCHLIST WHERE username=? ORDER BY \
                    LASTWATCHED DESC", (username,))

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
        cursor = conn.execute("SELECT idnum, username, showid, lastwatched from \
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
