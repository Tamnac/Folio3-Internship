import requests as r


app_key = "853be5bff9bae2b36c49b362524e0404"
app_id = "d15954a8"


endpoint = f"https://api.edamam.com/api/food-database/parser?ingr=red apple&app_id={app_id}&app_key={app_key}"
print(endpoint)
# Request
request = r.get(endpoint)
print(request.json())
