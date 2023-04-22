from urllib import response
import requests

url = "https://naver.com"

response = requests.get(url)

print("status code:", response.status_code)
print("Hello World")

