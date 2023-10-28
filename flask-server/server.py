import sqlite3
from flask import Flask, render_template,request

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('instance/data.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/get')
def get():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM crime_table').fetchall()
    results = [tuple(row) for row in posts]
    conn.close()
    return results

@app.route('/post', methods=['POST'])
def insert():
    
    if request.method == 'POST':
        
        data = request.get_json()
        conn = get_db_connection()
        id = None
        with open("primary_key_count.txt", 'r') as my_file:
            id = str(int(my_file.readline())+1)
        with open("primary_key_count.txt", 'w') as my_file:
            my_file.write(str(id))
                
        type = data['type']
        address = data['location']['address']
        longtitude = data['location']['longtitude']
        latitude = data['location']['latitude']
        date = data['date']
        time = data['time']
        conn.execute(f"INSERT INTO crime_table(id,type,address,longtitude,latitude,date,time) VALUES ({id},'{type}','{address}','{longtitude}','{latitude}','{date}','{time}')")
        conn.commit()
        conn.close()
        return "Done"

if __name__ == "__main__":
    app.run(debug=True)