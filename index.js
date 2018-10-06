'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');

const shareKit = require('@bloomprotocol/share-kit');

const options = {
    size: 200,
}

const PORT = 8000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.post('/', (req, res) => {
    fs.write()
    // try {
    //     serverLogger.info(`Received data for request token ${req.body.token}`)
    //     const parsedData: IVerifiedData[] = req.body.data
    //     parsedData.forEach(dataToVerify => {
    //         serverLogger.info(`Attempting to verify ${JSON.stringify(dataToVerify)}`)
    //     })
    //     return res.status(200).json({
    //         success: true,
    //         token: req.body.token,
    //     })
    // } catch (error) {
    //     serverLogger.warn('Encountered an error while receiving data', {
    //         error,
    //     })
    //     return renderError(req, res)(
    //         new ClientFacingError('Encountered an error while receiving data')
    //     )
    // }

    console.log(req.body)
    // const verified = req.body.every(data => {
    //     return shareKit.verifyProof(data)
    // })

    // if (verified) {
    //     console.log('success')
    // } else {
    //     console.log('failed to verify merkle proof')
    // }
});

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
