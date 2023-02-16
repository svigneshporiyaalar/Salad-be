const { v4: uuidv4 } = require("uuid");
const S3Service = require("../services/S3Service");
const _ = require("lodash");
const { ERR_WSG_0011} = require("../constants/ApplicationErrorConstants");


exports.getProfileURL = (ctx) => {
  let id  = _.get(ctx.request.user, "id");
  const { name = "" } = ctx.request.query;
  if (!id) {
    return Promise.reject({ message: ERR_WSG_0011 });
  }
  return S3Service.getPresignedPutImageURL({
    id: `users/${id}`,
    fileName: `${id}_${name}`,
  });
};

exports.getProfilePhotoURL = (ctx) => {
  let id  = _.get(ctx.request.user, "userId");
  let name  = _.get(ctx.request.user, "name");
  const profilePicture = {};
  const { format } = ctx.request.query;
  if (!id) {
    ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0998" });
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
    const photo = S3Service.getPresignedPutImageURL({
      id: `profile/${id}`,
      fileName: `${id}_photo-${uuidv4()}`,
      format,
    });
    profilePicture[`${id}_${name}_DP`] = photo;
  return profilePicture
};


