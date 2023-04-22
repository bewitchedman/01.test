const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
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

const bucket_name = 'anystory-main';
const MAX_KEYS = 300;

var params = {
    Bucket: bucket_name,
    MaxKeys: MAX_KEYS
};

(async () => {

    // List All Objects
    console.log('List All In The Bucket');
    console.log('==========================');

    while(true) {

        let response = await S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(`Marker = ${response.Marker ? response.Marker : null}`);
        console.log(`NextMarker = ${response.NextMarker ? response.NextMarker : null}`);
        console.log(`  Object Lists`);
        for(let content of response.Contents) {
            console.log(`    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`);
        }

        if(response.IsTruncated) {
            params.Marker = response.NextMarker;
        } else {
            break;
        }

    }

    // List Top Level Folder And Files
    params.Delimiter = '/';
    console.log('Top Level Folders And Files In The Bucket');
    console.log('==========================');

    while(true) {

        let response = await S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(`Marker = ${response.Marker ? response.Marker : null}`);
        console.log(`NextMarker = ${response.NextMarker ? response.NextMarker : null}`);

        console.log(`  Folder Lists`);
        for(let folder of response.CommonPrefixes) {
            console.log(`    Name = ${folder.Prefix}`)
        }

        console.log(`  File Lists`);
        for(let content of response.Contents) {
            console.log(`    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`)
        }


        if(response.IsTruncated) {
            params.Marker = response.NextMarker;
        } else {
            break;
        }

    }

})();
