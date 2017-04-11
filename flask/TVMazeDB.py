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
    def create_row(conn, watchlistRow):
        sql = ''' INSERT INTO watchlist(userId, name, email, begin_date, end_date, showId, showTitle, episode, season)
                VALUES(?,?,?,?,?,?,?,?) '''
                cur = conn.cursor()
                cur.execute(sql, watchlistRow)
                return cur.lastrowid
#create database file
    def main():
        database = "Users\TheWatchList.db"
 #Create table
        sql_create_watchlist_table = """ CREATE TABLE IF NOT EXISTS watchlist (
                                        userId integer PRIMARY KEY,
                                        name text NOT NULL,
										email text NOT NULL,
                                        begin_date text,
                                        end_date text,
										showId integer,
                                        showTitle text,
										episode integer,
										season integer,
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
