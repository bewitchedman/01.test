from email import message
from email.mime import base
import hashlib
import hmac
import base64
from os import times
from sqlite3 import Timestamp
import time
from urllib import response
import urllib.parse
import urllib.request
import ssl

from requests import request
import requests

class APISender:

    def __init__(self, base_auth_info):
        self.access_key = base_auth_info.get_access_key()
        self.access_secert = base_auth_info.get_access_secret()
        self.url = base_auth_info.get_url()
        self.req_path = base_auth_info.get_req_path()
        self.api_key = base_auth_info.get_api_key()

    def request(self):
        full_path = self.url + self.req_path
        print(">> "+full_path)
        
        timestamp = self.get_timestamp()

        custom_headers = {
            'x-ncp-apigw-timestamp' : timestamp, 
            'x-ncp-apigw-api-key' : self.api_key,
            'x-ncp-iam-access-key' : self.access_key,
            'x-ncp-apigw-signature-v2' : self.make_signature(timestamp)
        }

        response = requests.get(headers=custom_headers, url=full_path)
        return response



    @staticmethod
    def get_timestamp():
        timestamp = int(time.time() * 1000)
        timestamp = str(timestamp)
        return timestamp

    def make_signature(self, timestamp):
        access_secret_bytes = bytes(self.access_secert, 'UTF-8')

        methed = "GET"
        ep_path = self.req_path
        print(self.req_path)

        message = methed + " " + ep_path + "\n" + timestamp + "\n" + self.access_key
        message = bytes(message, 'UTF-8')
        signing_key = base64.b64encode(
            hmac.new(access_secret_bytes, message, digestmod=hashlib.sha256).digest()
        )

        return signing_key