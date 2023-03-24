const { v4: uuidv4 } = require("uuid");
const S3Service = require("../services/S3Service");
const _ = require("lodash");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const { ERR_SBEE_0998 } = require("../constants/ApplicationErrorConstants");


exports.getProfileURL = (ctx) => {
  let id  = _.get(ctx.request.user, "id");
  const { name = "" } = ctx.request.query;
  if (!id) {
    return Promise.reject({ message: ERR_SBEE_0998 });
  }
  return S3Service.getPresignedPutImageURL({
    id: `users/${id}`,
    fileName: `${id}_${name}`,
  });
};

exports.getUserProfilePhotoURL = (ctx) => {
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
      id: "display-image/user",
      fileName: `${name}-${uuidv4()}`,
      format,
    });
    profilePicture["URL"] = photo;
  return profilePicture
};

exports.getPartnerProfilePhotoURL = (ctx) => {
  let id  = _.get(ctx.request.partner, "userId");
  let name  = _.get(ctx.request.partner, "name");
  const profilePicture = {};
  const { format } = ctx.request.query;
  if (!id) {
    ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0998" });
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
    const photo = S3Service.getPresignedPutImageURL({
      id: "display-image/partner",
      fileName: `${name}-${uuidv4()}`,
      format,
    });
    profilePicture["URL"] = photo;
  return profilePicture
};



