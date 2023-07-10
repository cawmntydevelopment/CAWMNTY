const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
var Abi = require("./Abi.json");

var jsonParser = bodyParser.json();
const app = express();

const API_KEY = "";
const CONTRACT_ADDRESS = "";
const NETWORK_SOCKET = "";
const CHAIN = "";

async function checkAllNfts () {

	const web3 = createAlchemyWeb3(NETWORK_SOCKET);
	const BASE_URL = "https://deep-index.moralis.io/api/v2/nft/"+CONTRACT_ADDRESS+"?chain="+ CHAIN +"&format=decimal&media_items=false";

	const response = await axios.get(
		BASE_URL,
		{
			headers: {
				"Accept": "application/json",
				"X-API-Key": API_KEY
			}
		}
	);

	const data = response?.data?.result;

	let cawNfts = [];

	for (let i = 0; i < ((data ?? "").length ?? 0); i++) {
		const contract = new web3.eth.Contract(Abi, CONTRACT_ADDRESS);
		const network = await contract.methods.getProfileImageURI(data?.[i]?.token_id).call();
		const response = await axios.get(network);
		cawNfts.push({ ...response?.data, tokenId: data?.[i]?.token_id, owner: data?.[i]?.minter_address });
	}

	return cawNfts;
}

async function checkNft (id) {

	const web3 = createAlchemyWeb3(NETWORK_SOCKET);
	const BASE_URL = "https://deep-index.moralis.io/api/v2/nft/getMultipleNFTs?chain="+CHAIN;

	const response = await axios.post(
		BASE_URL,
		{
			"tokens": [{ "token_address": CONTRACT_ADDRESS, "token_id": id }],
			"normalizeMetadata": false,
			"media_items": true
		},
		{
			headers: {
				"Accept": "application/json",
				"X-API-Key": API_KEY,
				"Content-Type": "application/json"
			}
		}
	);

	const data = response?.data;


	if (data[0] !== null) {
		const contract = new web3.eth.Contract(Abi, CONTRACT_ADDRESS);
		const network = await contract.methods.getProfileImageURI(data[0].token_id).call();
		const response = await axios.get(network);

		return { ...response?.data, tokenId: data?.[0]?.token_id, owner: data?.[0]?.minter_address };

	} else {
		return "error"
	}


}


app.use(function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.get("/api/all", jsonParser, (req, res) => {


	let myPromise = new Promise(function (myResolve, myReject) {
		myResolve(checkAllNfts());
	});

	myPromise.then(
		function (value) {
			return res.send({
				status: 200,
				data: value
			});
		}
	);
});


app.get("/api/nft", jsonParser, (req, res) => {

	let id = req.query.id;

	if (!id) {
		return res.send({
			status: 404,
			data: "ID NOT FOUND"
		});
	}

	let myPromise = new Promise(function (myResolve, myReject) {
		const nft = checkNft(id);
		if(nft === "error") {
			myReject("Error")
		} else {
			myResolve(nft);
		}
	});

	myPromise.then(
		function (value) {
			return res.send({
				status: 200,
				data: value
			});
		}
	);
});

app.listen(process.env.PORT || 3443, () => {
	console.log("Server running on port 3443");
});
