import sqlite3
from sqlite3 import Error



class Database:
    def create_connection(db_file):
    #create a database connection to a SQLite database
        try:
            conn = sqlite3.connect('TheWatchList.db')
            print(sqlite3.version)
        except Error as e:
            print(e)
        finally:
            conn.close()

            def create_table(conn, create_table_sql):
                try:
                    c = conn.cursor()
                    c.execute(create_table_sql)
                except Error as e:
                    print(e)
#insert row
    def create_row(conn, watchlist):
        sql = ''' INSERT INTO watchlist(email, showId, lastWatched)
                VALUES(?,?,?) '''
                cur = conn.cursor()
                cur.execute(sql, watchlist)
                return cur.lastrowid

    #def addFaveShow(email, showId);
    def addFaveShow(conn, watchlist):
        cur.execute("INSERT INTO watchlist
                VALUES (?,?,?)", (showId))

    #def updateLatestWatched(email, showId), lastWatched;
    def updateLatestWatched(conn, watchlist):
        sql = ''' UPDATE watchlist
                  SET latestWatched = ?
        cur = conn.cursor()
        cur.execute(sql, watchlist)
                VALUES(?,?,?)'''
        conn.commit()

    #read latest watched show
    def readLatestWatched(conn, watchlist):
        cur = conn.cursor()
        cur.execute("SELECT latestWatched FROM watchlist WHERE email =?", (email))

        rows = cur.fetchall()

        for row in rows:
            print(row)

    #read favorite shows
    def readFaveShow(conn, watchlist):
        cur = conn.cursor()
        cur.execute("SELECT showId FROM watchlist WHERE email=?", (email))

        rows = cur.fetchall()

        for row in rows:
            print(row)


#create database file
    def main():
        database = "Users\TheWatchList.db"
 #Create table
        watchlist = """ CREATE TABLE IF NOT EXISTS watchlist (
                                        email integer PRIMARY KEY,
										showId integer,
                                        lastWatched float,
                                    ); """


    # create a database connection
        conn = create_connection(database)
        if conn is not None:
        # create watchlist table
            create_table(conn, sql_create_watchlist_table)
        else:
            print("Error! cannot create the database connection.")


            if __name__ == '__main__':
                main()
