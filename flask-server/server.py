import sqlite3
from flask import Flask, render_template,request,jsonify
from flask_cors import CORS
import requests
APIkey = 'AIzaSyAUo1-E-SIqMp2Pq1vL4fVQKG6S36UcD7o'

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('instance/data.db')
    conn.row_factory = sqlite3.Row
    return conn

# @app.route('/members')
# def get():
#     return {"lists": ["Member1", "Member2", "Member3"]}
@app.route('/reportCrime', methods = ['POST'])
def report():
    if request.method == 'POST':
        lat_lng = request.get_json()
        conn = get_db_connection()
        id = None
        with open("primary_key_count.txt", 'r') as my_file:
            id = str(int(my_file.readline())+1)
        with open("primary_key_count.txt", 'w') as my_file:
            my_file.write(str(id))
        data = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat_lng['latitude']},{lat_lng['longtitude']}&key={APIkey}").json()
        address = data['results'][0]['formatted_address']
        longtitude = lat_lng['longtitude']
        latitude = lat_lng['latitude']
        type = 'Violent Crime'
        
        from datetime import date,datetime
        today = date.today()
        d4 = today.strftime("%b-%d-%Y")
        date_ = d4
        time =  datetime.now().strftime("%H:%M:%S")
        
        conn.execute(f"INSERT INTO crime_table(id,type,address,longtitude,latitude,date,time) VALUES ({id},'{type}','{address}','{longtitude}','{latitude}','{date_}','{time}')")
        conn.commit()
        conn.close()
        
        return "Executed"
    



@app.route('/get')
def get():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM crime_table').fetchall()
    conn.close()
    
    
    results = [list(row) for row in posts]
    l = {}
    i = 0
    for crime in results:
        dict = {}   
        dict['id'] = crime[0]
        dict['type'] = crime[1]
        dict['location'] = {'address':crime[2],
                            'longtitude':crime[3],
                            'latitude': crime[4]}
        dict['date'] = crime[5]
        dict['time'] = crime[6]
        print(dict)
        l[i] = dict
        i+=1
    
    return jsonify(l)

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