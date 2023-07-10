const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var BigNumber = require("bignumber.js");
const axios = require("axios");

const { API_URL, TOKEN_ADDRESS, TO_ADDRESS, FROM_ADDRESS, WALLET_PK,ETHERSCAN_API } = process.env;
var jsonParser = bodyParser.json();
const app = express();
const walletRegex = RegExp(/^0x[a-fA-F0-9]{40}$/);

function converter(today) {
	var dd = String(today.getMonth()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	return dd + "" + mm + "" + yyyy
}

async function sending (res,wallet) {

	const web3 = createAlchemyWeb3(API_URL);

	const url = "https://api-sepolia.etherscan.io/api" +
		"?module=account" +
		"&action=tokentx" +
		"&contractaddress=" + TOKEN_ADDRESS +
		"&address=" + wallet +
		"&page=1" +
		"&offset=10000"+
		"&startblock=0" +
		"&endblock=27025780" +
		"&sort=desc" +
		"&apikey=" + ETHERSCAN_API;



	axios.get(url)
		.then(function (response) {
			// handle success

			console.log(response?.data)
			if(response) {

				const notTransaction = (response.data.result.length > 0);

				const endBlock = notTransaction && response.data?.result[0];
				const date = notTransaction && new Date(endBlock.timeStamp * 1000);
				const currennt = notTransaction && new Date();

				if(notTransaction  ? (converter(date) < converter(currennt)) : true) {
					let tokenAddress = TOKEN_ADDRESS;
					let toAddress = wallet;
					let fromAddress = FROM_ADDRESS;
					let privateKey = WALLET_PK;

					let contractABI = [
						{
							"constant": false,
							"inputs": [
								{
									"name": "_to",
									"type": "address"
								},
								{
									"name": "_value",
									"type": "uint256"
								}
							],
							"name": "transfer",
							"outputs": [
								{
									"name": "",
									"type": "bool"
								}
							],
							"type": "function"
						}
					];

					let contract = new web3.eth.Contract(contractABI, tokenAddress, { from: fromAddress });

					let amount = new BigNumber("1000000"+"000000000000000000");

					web3.eth.getTransactionCount(fromAddress)
						.then(async (count) => {

							let rawTransaction = {
								"from": fromAddress,
								"gasPrice": web3.utils.toHex(20 * 1e9),
								"gasLimit": web3.utils.toHex(210000),
								"to": tokenAddress,
								"value": 0x0,
								"data": contract.methods.transfer(toAddress, amount).encodeABI(),
								"nonce": web3.utils.toHex(count)
							};


							const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

							web3.eth.sendSignedTransaction(signedTx.rawTransaction)
								.on("transactionHash", console.log).then((e) => {

									return res.send({
									status: 200,
									data: e.transactionHash
								});

							});

						});
				} else {
					return res.send({
						status: 400,
						data: "Error: you used your daily right"
					});
				}

			}
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});

}


app.use(function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});


app.get("/api/send", jsonParser, (req, res) => {

	let wallet = req.query.wallet;

	if (!wallet) {
		return res.send({
			status: 404,
			data: "WALLET NOT FOUND"
		});
	}

	return (sending(res,wallet)).then((e) => {
		console.log(e)
	});

});


app.listen(process.env.PORT || 3445, () => {
	console.log("Server running on port 3445");
});
