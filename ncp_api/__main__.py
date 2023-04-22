import json
from api_sender import APISender
from base_auth_info import BaseAuthInfo
import sys
import os
import hashlib
import hmac
import base64
import requests
import time
import urllib.parse
import urllib.request
import ssl

def main(args):
    base_auth_info = BaseAuthInfo()

    url = 'https://h25ynyozdc.apigw.ntruss.com'
    path = '/test/prod/test'

    base_auth_info.set_url(url)
    base_auth_info.set_req_path(path)

    sender = APISender(base_auth_info)

    response = sender.request()

    rescode = response.status_code

    if rescode == 200:
        print("\n## result")
        print(response.text)
    else:
        print("Error : " + response.text)

    return {"result": ""}

if __name__ == '__main__':
    main(None)