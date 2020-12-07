const User=require("../models/user")
require('dotenv').config()
const braintree= require('braintree')
require('dotenv').config()

const gateway=new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:"q877hxrw9wprd83m",
    publicKey:"3f8j5ccvyqxh3ngb",
    privateKey:"acc205629eb633a24b507334a30da69a"

})

exports.generateToken=(req, res)=>{
gateway.clientToken.generate({},(err, response)=>{
    if(err){
        res.status(500).send(err)
    }
    else{
        res.send(response)
    }
})
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
