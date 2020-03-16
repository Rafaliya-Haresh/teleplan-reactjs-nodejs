var express = require('express');
// var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cookieParser = require('cookie-parser')
var multer  = require('multer');
var path = require('path');
var APPLICATION_URL = 'https://tlpt2.moh.hnet.bc.ca';

// File upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/log')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname )
    }
})
var uploadFile = multer({ storage: storage }).single('submitFile');


// Ascii upload
var storageAscii = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/ascii')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname )
  }
})
var uploadAscii = multer({ storage: storageAscii }).single('submitASCII');
app.use(cookieParser());
// app.use(session({
//   key: 'JSESSIONID',
//   secret: 'stuff',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
// }));

// app.use((req, res, next) => {
//   if (req.cookies.JSESSIONID && !req.session.user) {
//       res.clearCookie('JSESSIONID');        
//   }
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.env.PORT = process.env.PORT || 5000;
app.set('port', process.env.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use('/static/js', express.static('./build/static/js'));
app.use('/static/css', express.static('./build/static/css'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./build/index.html'))
});

// Login
app.post('/login', function (req, res) {

    const options = {
      url: APPLICATION_URL+'/TeleplanBroker',
      form: req.body,
      json: true
    };
    request.post(options, function(err, result, body) {
      if(err){
        return res.status(500).json(err);
      }

     // Set Cookies
      if(result && result.caseless && result.caseless.dict && result.caseless.dict['set-cookie']){
        console.log(result.caseless.dict);
        var name = result.caseless.dict['set-cookie'][0].split(';');
        var splitCookie = name[0].split('=');
        res.cookie(splitCookie[0], splitCookie[1],{encode: String});
      }
      
      var string = body.split(';');
      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          username: req.body.username
        }
      }
      return res.send({status:200, data: obj});
    });
});


// Change password
app.post('/change-password', function (req, res) {
    const options = {
      url: APPLICATION_URL+'/TeleplanBroker',
      form: req.body,
      json: true
    };
    request.post(options, function(err, result, body) {
      if(err){
        return res.status(500).json(err);
      }
      var string = body.split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          username: req.body.username
        }
      }
     return res.send({status:200, data: obj});
    });
});


// Sign off
app.post('/signoff', function (req, res) {

  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }
    var string = body.split(';');

    if(string && string.length){
      var obj = {
        Result: string[1].split('=')[1],
        Msgs: string[3].split('=')[1]
      }
    }
    return res.send({status:200, data: obj});
  });
});


// Get Log
app.post('/getlog', function (req, res) {
  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    headers: {
      'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
    },
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }
    var responseString = body;
    if(responseString.match('#TID') != null){
      var splitVal = responseString.split('#');

      var string = splitVal[1].split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          text: splitVal[0]
        }
      }
      return res.send({status:200, data: obj});
    }else{
      return res.status(500).json({data: false});
    }
  });
});

// Get Log List
app.post('/getloglist', function (req, res) {

  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    headers: {
      'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
    },
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }
    var responseString = body;
    if(responseString.match('#TID') != null){
      var splitVal = responseString.split('#');

      var string = splitVal[1].split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          text: splitVal[0]
        }
      }
      return res.send({status:200, data: obj});
    }else{
      return res.status(500).json({data: false});
    }
  });
});


// File Upload
app.post('/file-upload',  function (req, res) {
  uploadFile(req, res, function (err) {
    if (err) {
        return res.status(500).json(err)
    }

    var fileObj = {
      ExternalAction: req.body.ExternalAction,
      submitFile: req.file.path
    }

    const options = {
      url: APPLICATION_URL+'/TeleplanBroker',
      headers: {
        'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
      },
      form: fileObj,
      json: true
    };
    request.post(options, function(err, result, body) {
      if(err){
        return res.status(400).json(err);
      }

      if(body.match('#TID') != null){
        var string = body.split(';');
        
        if(string && string.length){
          var obj = {
            Result: string[1].split('=')[1],
            Msgs: string[3].split('=')[1]
          }
        }
        return res.send({status:200, data: obj});
      }else{
        return res.send({status:400, data: false});
      }
    });
  })  
});



// Ascii Upload
app.post('/ascii-upload',  function (req, res) {
  uploadAscii(req, res, function (err) {
    if (err) {
        return res.status(500).json(err)
    }

    var fileObj = {
      ExternalAction: req.body.ExternalAction,
      submitASCII: req.file
    }

    const options = {
      url: APPLICATION_URL+'/TeleplanBroker',
      headers: {
        'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
      },
      form: fileObj,
      json: true
    };
    request.post(options, function(err, result, body) {
      if(err){
        return res.status(400).json(err);
      }
      if(body.match('#TID') != null){
        var string = body.split(';');
        
        if(string && string.length){
          var obj = {
            Result: string[1].split('=')[1],
            Msgs: string[3].split('=')[1]
          }
        }
        return res.send({status:200, data: obj});
      }else{
        return res.send({status:400, data: false});
      }
    });
  })  
});


// Get Ascii File
app.post('/get-ascii-file', function (req, res) {
  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    headers: {
      'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
    },
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }

    var responseString = body;
    if(responseString.match('#TID') != null){
      var splitVal = responseString.split('#');

      var string = splitVal[1].split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          text: splitVal[0]
        }
      }
      return res.send({status:200, data: obj});
    }else{
      return res.status(500).json({data: false});
    }
  });
});

// Get Remit
app.post('/get-remit', function (req, res) {
  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    headers: {
      'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
    },
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }

    var responseString = body;
    if(responseString.match('#TID') != null){
      var splitVal = responseString.split('#');

      var string = splitVal[1].split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          text: splitVal[0]
        }
      }
      return res.send({status:200, data: obj});
    }else{
      return res.status(500).json({data: false});
    }
  });
});




// Get Remit
app.post('/checkE45', function (req, res) {
  const options = {
    url: APPLICATION_URL+'/TeleplanBroker',
    headers: {
      'Cookie': 'JSESSIONID='+req.cookies.JSESSIONID+';Path=/'
    },
    form: req.body,
    json: true
  };
  request.post(options, function(err, result, body) {
    if(err){
      return res.status(500).json(err);
    }

    var responseString = body;
    if(responseString.match('#TID') != null){
      var splitVal = responseString.split('#');

      var string = splitVal[1].split(';');

      if(string && string.length){
        var obj = {
          Result: string[1].split('=')[1],
          Msgs: string[3].split('=')[1],
          text: splitVal[0]
        }
      }
      return res.send({status:200, data: obj});
    }else{
      return res.status(500).json({data: false});
    }
  });
});
var server = app.listen(app.get('port'), function () {
   var host = server.address().address
   console.log("Example app listening at http://%s:%s", host, app.get('port'))
})