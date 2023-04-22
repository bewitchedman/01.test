import AWS from 'aws-sdk'
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const bucket_name = 'anystory-main';
const prefix = 'a';
const access_key = 'A754C4B7179508B912CF';
const secret_key = '76D84323D08CA0EAB63C66E0FE07E3932B467711';
 
 
const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
    accessKeyId : access_key,
    secretAccessKey: secret_key
    }
});
 
 
(async ()=>{

    let response = await S3.listObjectsV2({
        Bucket: bucket_name,
        Prefix: prefix
    }).promise();
 
    console.log(response.Contents);
 
    for(let content of response.Contents) {
        if(encodeURI(content.Key) !== content.Key) {
            console.log(decodeURI(encodeURI(content.Key)))

        // get object
            let inStream = S3.getObject({
                Bucket: bucket_name,
                Key: content.Key,
            }).createReadStream();
        
        // upload file
            await S3.upload({
                Bucket: bucket_name,
                Key: encodeURI(content.Key),
                Body: inStream
            }).promise();
        
        // delete invalid file
            await S3.deleteObject({
                Bucket: bucket_name,
                Key: content.Key
            }).promise();
        }   
    }   
})();