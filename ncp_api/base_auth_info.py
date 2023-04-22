


from urllib import response


class BaseAuthInfo:

    ## NCP Access key
    access_key = 'o6hUCvmVoBgYPnAp9Ewm'

    ## NCP Access secret ##
    access_secret = 'tyEh21RXwkLyYXwY8yj8sEp9Dj5HWBcpe195IUQw'

    ## API Gateway api key ##
    api_key = ' '

    #url = 'https://ncloud.apigw.ntruss.com/vpc/v2/'

    req_path = ' '

    def get_access_key(self):
        return self.access_key

    def get_access_secret(self):
        return self.access_secret

    def get_req_path(self):
        return self.req_path

    def get_url(self):
        return self.url

    def get_api_key(self):
        return self.api_key

    def set_access_key(self, access_key):
        self.access_key = access_key

    def set_access_secret(self, access_secret):
        self.access_secret = access_secret



    

    