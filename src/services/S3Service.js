var AWS = require("aws-sdk");

var credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
};
const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION || "ap-south-1";

const TYPE_PHOTO = "photos";
const _getSignedURL = (options, type) => {
  AWS.config.update({ credentials: credentials, region });
  var s3 = new AWS.S3();

  var presignedGETURL = s3.getSignedUrl(type, options);
  return presignedGETURL;
};
const getPresignedGetURL = ({
  id,
  type,
  fileName,
  format,
  expires,
  contentType,
}) => {
  return _getSignedURL(
    {
      Bucket: bucketName,
      Key: format
        ? `${id}/${type}/${fileName}.${format}`
        : `${id}/${type}/${fileName}`, // filename, // filename
      Expires: expires || 60 * 60, // 60 * 60 sec
      ContentType: contentType,
    },
    "getObject"
  );
};

const getPresignedPutURL = ({
  id,
  type,
  fileName,
  format,
  expires,
  contentType,
}) => {
  return _getSignedURL(
    {
      Bucket: bucketName,
      Key: format
        ? `${id}/${type}/${fileName}.${format}`
        : `${id}/${type}/${fileName}`, // filename, // filename
      Expires: expires || 60 * 60, // 60 * 60 sec
      ContentType: contentType,
    },
    "putObject"
  );
};

module.exports = {
  getPresignedPutURL,
  getPresignedGetURL,
  getPresignedPutImageURL({
    id,
    fileName,
    format = "png",
    expires,
    contentType,
  }) {
    return getPresignedPutURL({
      id,
      fileName,
      type: TYPE_PHOTO,
      format,
      expires,
      contentType,
    });
  },
  getPresignedGetImageURL({
    id,
    fileName,
    format = "png",
    expires,
    contentType,
  }) {
    return getPresignedGetURL({
      id,
      fileName,
      type: TYPE_PHOTO,
      format,
      expires,
      contentType,
    });
  },

  uploadToS3({ path, data }) {
    AWS.config.update({ credentials: credentials, region: "ap-south-1" });
    var s3 = new AWS.S3();
    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: bucketName,
          Key: path,
          Body: data,
        },
        function (s3Err, data) {
          resolve();
          if (s3Err) {
            console.log("error", s3Err);
          } else {
            console.log(`File uploaded successfully at ${data.Location}`);
          }
        }
      );
    });
  },
};
