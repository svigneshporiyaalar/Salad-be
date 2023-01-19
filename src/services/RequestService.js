const { get } = require("request");
const templateHelper = require("../helpers/templateHelper")
const HTTPSService = require("./HTTPSService")

module.exports = {
  processRequest({ request, context, message, globalMessage }, cb) {

    request = templateHelper.convertPayload(request, context);

    let options = {
        method: request.method || 'GET',
        uri: request.url,
    }

    if (request.body) {
        options.json = request.body
    }

    HTTPSService(options)
        .then(({response, body}) => {
            try {
                body = JSON.parse(body)
            }
            catch(e) {
                console.log(e);
            }

            finally {
                message = templateHelper.convertPayload(message, {...context, response: body});
                globalMessage = templateHelper.convertPayload(globalMessage, {...context, response: body});

                cb(null, { message, globalMessage });
            }
            
        })
        .catch((err) => {
            cb(err, { message, globalMessage});
        })
  }   
}