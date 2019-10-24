const axios = require('axios');

const { chunks } = require('./karataev');
const { writeCSV } = require('./files');

const extractResponseData = (url, response) => {
	const { status, statusText, request } = response;
	const { path } = request;

	console.log(status, statusText, url, path);

	return { url, status, statusText, path };
};

const requestURL = (url, instance) =>
	instance
		.head(url)
		.then((response) => extractResponseData(url, response))
		.catch(({ response }) => extractResponseData(url, response));

const instance = axios.create({
	baseURL: 'https://www.port.ac.uk/',
});
let urlsToCheck = [
	'/',
	'/centre-for-operational-research-and-logistics',
	'/404',
];

chunks(urlsToCheck, (url) => requestURL(url, instance)).then((output) => {
	console.log(output);

	writeCSV('output.csv', output, [
		{ id: 'url', title: 'url' },
		{ id: 'status', title: 'status' },
		{ id: 'statusText', title: 'statusText' },
		{ id: 'path', title: 'path' },
	]);
});
