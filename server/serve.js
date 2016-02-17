// import express from 'express';
// import path from 'path';
const express = require('express'),
      path = require('path');

const ONE_MINUTE = 60*1000,
      ONE_HOUR = 60 * ONE_MINUTE,
      MAX_AGE = 12 * ONE_HOUR,
      PUBLIC_HTML = path.resolve(__dirname, process.env.PUBLIC_HTML || 'public'),
      PORT = process.env.PORT || 3000,

      log = console.log.bind(console),
      app = express();

      app
        .use('/', express.static(PUBLIC_HTML, {maxAge:MAX_AGE}))
        .listen(PORT, ()=>{
          log('Serving files from: ' + PUBLIC_HTML);
          log('Listening on port: ' + PORT);
        });
