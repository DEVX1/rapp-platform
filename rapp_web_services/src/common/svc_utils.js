/*!
 * @file service_handler.js
 * @brief Hop service handler.
 */

/**
 *  MIT License (MIT)
 *
 *  Copyright (c) <2014> <Rapp Project EU>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *
 *  Authors: Konstantinos Panayiotou
 *  Contact: klpanagi@gmail.com
 *
 */

var ON_ERROR_DEFAULT_MSG = "RAPP Platform Failure";

var registerSvc = function( svcImpl, svcParams ){
  // Register service to service handler.
  var msg = {
    request: "svc_registration",
    svc_name: svcParams.name,
    worker_name: svcParams.worker,
    svc_frame: undefined,
    svc_path: ''
  };

  var svc = new hop.Service( svcImpl );
  // Set path if not anonymous service
  if( ! svcParams.anonymous ){
    svc.name = (svcParams.namespace) ?
      util.format("%s/%s", svcParams.namespace, svcParams.name) :
      svcParams.url_name;
    msg.svc_path = svc.path;
    msg.svc_frame = svc;
    postMessage(msg);
  }
};


/*!
 * @brief Returns the client-response object after appending an error message
 * under the "error" property.
 * If not an errorMsg is provided, a default error message is used.
 * The default Platform's error message used can be obtained from:
 *  ON_ERROR_DEFAULT_MSG.
 *
 * @param {Object} respObj - Client-Response Object of the service.
 * @param {String} errorMsg - The error message.
 */
var errorResponse = function( respObj, errorMsg ){
  errorMsg = errorMsg || ON_ERROR_DEFAULT_MSG;
  respObj = respObj || {error: ''};
  respObj.error = errorMsg;
  return respObj;
};


/*!
 * @brief Call parent Worker thread to get the absolute url path of a
 * web service.
 *
 * @param {String} svcName - Service's name.
 * @param {Function} callback - Callback function to execute on message
 * received from parent worker thread.
 */
var getSvcUrl = function( svcName, callback ){
  //TODO !!!!!!
};


exports.registerSvc = registerSvc;
exports.errorResponse = errorResponse;
exports.ERROR_MSG_DEFAULT = ON_ERROR_DEFAULT_MSG;
