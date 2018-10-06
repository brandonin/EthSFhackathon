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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.post('/', (req, res) => {
    req.body = {
        "bloom_id": 299,
        "token": "a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf",
        "signature": "0x4ee64886332a9d4fb480dfea0308264c1b56eb8293792d47696f6df2f1c36e1836deab53c46954fdcf0dc1f7ff7a6e7f6ac83039b597cc0f99192d1e8455b11b1b",
        "data": [{
                "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
                "stage": "mainnet",
                "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
                "target": {
                    "type": "phone",
                    "data": "+16195550587",
                    "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
                    "version": "1.0.0"
                },
                "proof": [{
                        "position": "right",
                        "data": "0x662a74ce03d761ab066d0fc8306f474534fa5fdb087ad88baf067caefe1c026f"
                    },
                    {
                        "position": "right",
                        "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
                    }
                ]
            },
            {
                "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
                "stage": "mainnet",
                "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
                "target": {
                    "type": "email",
                    "data": "test@bloom.co",
                    "nonce": "b3877038-79a9-477d-8037-9826032e6af4",
                    "version": "1.0.0"
                },
                "proof": [{
                    "position": "left",
                    "data": "0x2b81050468ea28d94e5db2ee6ae59e3cf03ab6f2da8c5f79c10e4d982af86844"
                }]
            },
            {
                "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
                "stage": "mainnet",
                "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
                "target": {
                    "type": "full-name",
                    "data": "John Bloom",
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
            }
        ]
    };

    const verified = req.body.data.every(data => {
        // console.log('data', data)
        return true;
        return shareKit.verifyProof(data)
    })

    if (verified) {
        // After we have verified the data we can use their BloomId to request information from their smart contract in order to creat a loan origination to their public address that is stored using the Attestation Repo.

        res.status(200).json({
            sucess: true,
            token: req.body.token
        });
    } else {
        console.log('failed to verify merkle proof')
    }
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

    // console.log(req.body)
    // const verified = req.body.every(data => {
    //     return shareKit.verifyProof(data)
    // })
});

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
