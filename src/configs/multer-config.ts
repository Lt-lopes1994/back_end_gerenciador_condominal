import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const s3Config = new S3Client({
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    region: 'us-east-005',
    credentials: {
        accessKeyId: process.env.BUCKET_KEYID,
        secretAccessKey: process.env.BUCKET_SECRETKEY,
    }
});

const multerConfig = {
    storage: multerS3({
        s3: s3Config,
        bucket: process.env.BUCKET_KEYNAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const fileName =
                path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

            const extension = path.parse(file.originalname).ext;
            cb(null, `${fileName}${extension}`);
        },
    }),
};

export default multerConfig;