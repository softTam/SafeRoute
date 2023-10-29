import requests
x = {'longtitude' : '23', 'latitude' : '52'}
requests.post('http://127.0.0.1:5000/reportCrime',json=x)
