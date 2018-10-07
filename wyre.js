const WyreClient = require('@wyre/api').WyreClient
// import {WyreClient} from '@wyre/api'
var session = process.env.WYRE_SUBSCRIPTION;

let wyre = new WyreClient({
    format: "json_numberstring",
    apiKey: process.env.WYRE_API_KEY,
    secretKey: process.env.WYRE_SECRET_KEY,
    baseUrl: "https://api.testwyre.com/"
})

// create wallet
// wyre.post("/wallets", {
//     name: "user6"
// })
// .then(data => console.log(data))
// .catch(err => console.log(err));

// Do transfer to dai
transferDai("0xf6aea8fd7b296aff67fc1526abd80cb38b84b523")
.then(console.log)
.catch(console.log);

function transferDai(ethAddress) {
    return wyre.post("/transfers", {
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
        destAmount: "5",
        autoConfirm: true
    })
}

// function transferDai(ethAddress) {
//     return wyre.post("/transfers", {
//         sourceAmount: "10",
//         sourceCurrency: "DAI",
//         dest: `ethereum:${ethAddress}`,
//         destCurrency: "DAI",
//         destAmount: "sourceAmount",
//         autoConfirm: true
//     })
// }

// webhook for providing account and routing
// paymentMethods()
// .then(console.log)
// function paymentMethods() {
//     return wyre.post('paymentMethods', {
//         paymentMethodType: "INTERNATIONAL_TRANSFER",
//         paymentType: "LOCAL_BANK_WIRE",
//         currency: "USD",
//         country: "US",
//         beneficiaryType: "INDIVIDUAL",
//         firstNameOnAccount: "Brandon",
//         lastNameOnAccount: "In",
//         beneficiaryPhoneNumber: "1234567890",
//         accountNumber: "111111111111111",
//         routingNumber: "111111111",
//         accountType: "CHECKING",
//         chargeablePM: true
//     })
// }

// Get Money$$$$
