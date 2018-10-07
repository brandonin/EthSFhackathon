'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');

const shareKit = require('@bloomprotocol/share-kit').util;

const options = {
    size: 200,
}

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const WyreClient = require('@wyre/api').WyreClient
// import {WyreClient} from '@wyre/api'
var session = process.env.WYRE_SUBSCRIPTION;

let wyre = new WyreClient({
    format: "json_numberstring",
    apiKey: process.env.WYRE_API_KEY,
    secretKey: process.env.WYRE_SECRET_KEY,
    baseUrl: "https://api.testwyre.com/"
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

io.on('connection', socket => {
    console.log("it connected");
})

app.post('/', (req, res) => {
    Object.keys(req.body).map((key, value) => {
        req.body = JSON.parse(key);
    })
    req.body.token = "a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf";
    req.body.signature = "0x4ee64886332a9d4fb480dfea0308264c1b56eb8293792d47696f6df2f1c36e1836deab53c46954fdcf0dc1f7ff7a6e7f6ac83039b597cc0f99192d1e8455b11b1b";
    req.body.data.push({
        "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
        "stage": "mainnet",
        "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
        "target": {
            "type": "account-number",
            "data": "111111111111111",
            "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
            "version": "1.0.0"
        },
        "proof": [{
                "position": "left",
                "data": "0x07b51789d6bbe5cb084c502b03168adafbbb58ad5fff2af9f612b2b9cf54c31f"
            },
            {
                "position": "right",
                "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
            }
        ]
    })
    req.body.data.push({
        "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
        "stage": "mainnet",
        "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
        "target": {
            "type": "routing-number",
            "data": "111111111",
            "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
            "version": "1.0.0"
        },
        "proof": [{
                "position": "left",
                "data": "0x07b51789d6bbe5cb084c502b03168adafbbb58ad5fff2af9f612b2b9cf54c31f"
            },
            {
                "position": "right",
                "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
            }
        ]
    });

    const verified = req.body.data.every(data => {
        return true;
        return shareKit.verifyProof(data)
    })

    if (verified) {
        io.emit('foo', req.body);
        res.status(200).json({
            success: true,
            token: req.body.token
        });
    } else {
        console.log('failed to verify merkle proof')
    }
});

app.post('/wyre', (req, res) => {
    console.log("DAT REQUesT", req.body)
    // Do transfer to dai
    wyre.post("/transfers", {
        dest: {
            paymentMethodType: "INTERNATIONAL_TRANSFER",
            paymentType: "LOCAL_BANK_WIRE",
            currency: "USD",
            country: "US",
            beneficiaryType: "INDIVIDUAL",
            firstNameOnAccount: "Brandon",
            lastNameOnAccount: "In",
            beneficiaryPhoneNumber: "1234567890",
            accountNumber: "111111111111111",
            routingNumber: "111111111",
            accountType: "CHECKING",
            chargeablePM: true,
            bankName: "Bank of America"
        },
        destCurrency: "USD",
        sourceCurrency: "DAI",
        destAmount: req.body.amount.toString(),
        autoConfirm: true
    })
    .then( data => {
        console.log('data', data)
        res.status(200).json({
            message: "it worked"
        });
    })
    .catch(console.log);


})

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
