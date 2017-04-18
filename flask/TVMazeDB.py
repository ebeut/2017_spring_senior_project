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
    def create_row(email, showId, lastWatched):
        sql = ''' INSERT INTO watchlist(email, showId, lastWatched)
                VALUES(?,?,?) '''
        cur = conn.cursor()
        cur.execute(sql, watchlist)
        return cur.lastrowid

    #def addFaveShow(email, showId);

    def addFaveShow(showId):
        cur.execute("""INSERT INTO watchlist
                VALUES (?,?,?)""", (showId))

    #def updateLatestWatched(email, showId), lastWatched;
    def updateLastWatched(latestWatched):
        sql = ''' UPDATE watchlist
                  SET lastWatched = ?
        cur = conn.cursor()
        cur.execute(sql, watchlist)
                VALUES(?,?,?)'''
        conn.commit()

    #read latest watched show
    def readLastWatched(lastWatched, email):
        cur = conn.cursor()
        cur.execute("SELECT lastWatched FROM watchlist WHERE email =?", (email))

        rows = cur.fetchall()

        for row in rows:
            print(row)

    #read favorite shows
    def readFaveShow(showId, email):
        cur = conn.cursor()
        cur.execute("SELECT showId FROM watchlist WHERE email=?", (email))

        rows = cur.fetchall()

        for row in rows:
            print(row)

    def connect_db():
        """Connects to the specific database."""
        rv = sqlite3.connect(app.config['watchlist'])
        rv.row_factory = sqlite3.Row
        return rv


    def get_db():
        if not hasattr(g, 'sqlite_db'):
            g.sqlite_db = connect_db()
            return g.sqlite_db

    def close_db(error):
        """Closes the database again at the end of the request."""
        if hasattr(g, 'sqlite_db'):
            g.sqlite_db.close()

    def init_db():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
            db.commit()




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
