/**
 * @file hop2hop.js
 * @brief Sleep functions used to sleep current thread for a given time,
 * in milliseconds.
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




var Fs = require('./fileUtils.js');

function HopServices()
{
  var remoteServerParams_ = {};
  var localServerParams_ = {};

  /*!
   * @brief Remote server params get(er).
   * @return Remote Server Parameters object.
   */
  this.get_remoteServerParams = function( ){
    return remoteServerParams_;
  }

  /*!
   * @brief Local server params get(er).
   * @return Local Server Parameters object.
   */
  this.get_localServerParams = function( ){
    return localServerParams_;
  }

  /*!
   * @brief Sets asynchronous value on server parameters
   * @param value Asynchronous value (Boolean).
   */
  this.setAsync = function( value ){
    remoteServerParams_.asynchronous = value;
  }

  /*!
   * @brief Sets Host value of server parameters
   * @param hostName Host name value (String).
   */
  this.setHostName = function( hostName ){
    remoteServerParams_.host = hostName;
  }

  /*!
   * @brief Sets Port value of server parameters.
   * @param portNumber Port Number value.
   */
  this.setPortNumber = function( portNumber ){
    remoteServerParams_.port = portNumber;
  }

  /*!
   * @brief Sets User value of server parameters.
   * @param userName User name value (String).
   */
  this.setUserName = function( userName ){
    remoteServerParams_.user = userName;
  }

  /*!
   * @brief Sets Password value of server parameters
   * @param passwd User password value (String).
   */
  this.setPassword = function( passwd ){
    remoteServerParams_.password = passwd;
  }

  /*!
   * @brief Sets fail callback of server parameters
   * @param fail Connection refused/fail callback function.
   */
  this.setFail = function( fail ){
    remoteServerParams_.fail = fail;
  }

  /*!
   * @brief Sets remote server parameters
   * @para serverParams ServerParameters Object.
   */
  this.set_remoteServerParams = function ( serverParams ){
    remoteServerParams_ = serverParams;
  }

  /*!
   * @brief Sets local server parameters
   * @para serverParams ServerParameters Object.
   */
  this.set_localServerParams = function ( serverParams ){
    localServerParams_ = serverParams;
  }
};


HopServices.prototype.init = function (
  _localServerParams, _remoteServerParams )
{
  var remoteParams = _remoteServerParams || {};
  var localParams = _localServerParams || {};
  /*----<Set Remote and Local Server Parameters>---*/
  this.set_remoteServerParams( remoteParams );
  this.set_localServerParams( localParams );
  /*-----------------------------------------------*/
  console.log('\n\033[01;36mInitializing Remote Server Params:\033[0;0m');
  console.log( this.get_remoteServerParams() );
  console.log('\n\033[01;36mInitializing Local Server Params:\033[0;0m');
  console.log( this.get_localServerParams() );
};


HopServices.prototype.sendFile = function (
  _filePath, _destPath, _remoteServerParams )
{
  /*Importing the specific service*/
  import service storeFile ( );
  /*  <Read binary data from requested file>
   ****HOP can receive buffer data.
   ****HOP handles encoding/decoding**********/
  var file = Fs.readFileSync( _filePath );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  var retMsg = storeFile( _destPath, file ).post(
    function( msg ){
      return msg;
    },
    remoteParams
  );
  return retMsg;
};


HopServices.prototype.serveFile = function (
  _filePath, _destPath, _remoteServerParams )
{
  import service serveFile ( );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*-------------------Console Tracking-------------------------*/
  console.log( '\nRequesting file \033[0;33m[%s]\033[0;0m' +
    'from remote hop server @\033[01;31m%s: %s\033[0;0m',
   _filePath, remoteParams.host, remoteParams.port );
  /*------------------------------------------------------------*/
  /*----<Call serveFile hop service>----*/
  var dataBin = serveFile( _filePath ).post(
    function( data )
    {
      console.log('Transmited Requested file');
      return data;
    },
    remoteParams
  );
  /*----<Write the received "binary encoded" data in a file>----*/
  Fs.writeFileSync( _destPath, dataBin );
  return dataBin;
}


HopServices.prototype.uploadFile = function (
  _filePath, _destPath, _localServerParams, _remoteServerParams )
{
  import service uploadFile ( );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  var localParams = _localServerParams || this.get_localServerParams();
  /*----<Call upload File hop service>----*/
  uploadFile( _filePath, _destPath, localParams ).post(
    function( data )
    {
      console.log('Transmited Requested file');
      //return data;
    },
    remoteParams
  );
}


HopServices.prototype.qrDetection = function (
  _qrImagePath, _remoteServerParams )
{
  import service qrDetection ( );
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Read data from file and store them in a stringified format>----*/
  var file = Fs.readFileSync( _qrImagePath );
  /*-------Call QR_Node service-------*/
  var retMsg = qrDetection( file.data ).post(
    function( data ){
      return data;
    },
    remoteParams
  );
  /*----------------------------------*/
  return retMsg;
}


HopServices.prototype.faceDetection = function (
  _faceImagePath, _remoteServerParams )
{
  import service faceDetection ( );
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Read data from file and store them in a stringified format>----*/
  var file = Fs.readFileSync( _faceImagePath ); 
  /*-------Call face_Node service-------*/
  var retMsg = faceDetection( file.data ).post(
    function( data ){
      return data;
    },
    remoteParams 
  );
  /*----------------------------------*/
  return retMsg;
};

HopServices.prototype.speech2Text = function ( 
  _audioFileUrl, vocabulary, sentences, grammar, _remoteServerParams )
{
  import service speech2Text ( );
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Read data from file and store them in a stringified format>----*/
  var file = Fs.readFileSync( _audioFileUrl ); 
  /*-------Call face_Node service-------*/
  var retMsg = speech2Text( file.data ).post(
    function( data ){
      return data;
    },
    remoteParams 
  );
  /*----------------------------------*/
  return retMsg;
};

HopServices.prototype.ontology_subclassesOf = function ( 
  queryString, _remoteServerParams )
{
  import service ontology_subclassesOf ( );
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*-------Call face_Node service-------*/
  var retMsg= ontology_subclassesOf( JSON.stringify(queryString) ).post(
    function( data ){
      return data;
    },
    remoteParams 
  );
  /*----------------------------------*/
  return retMsg;
};

/*Exporting the HopServices module*/
module.exports = HopServices;