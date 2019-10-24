const axios = require('axios');

const { chunks } = require('./karataev');
const { readFile, writeCSV } = require('./files');

const extractResponseData = (url, response) => {
	let { status, statusText, request } = response;
	const { path } = request;

	if (url !== path) {
		status = 301;
		statusText = 'Has been redirected';
	}

	return { url, status, statusText, path };
};

const requestURL = (url, instance) =>
	instance
		.head(url)
		.then((response) => extractResponseData(url, response))
		.catch(({ response }) => extractResponseData(url, response));

const urlsFromFile = readFile('data/urlsToCheck.txt').split('\n');

const instance = axios.create({
	baseURL: 'https://www.port.ac.uk/',
});

chunks(urlsFromFile, (url) => requestURL(url, instance)).then((output) => {
	writeCSV('data/output.csv', output, [
		{ id: 'url', title: 'url' },
		{ id: 'status', title: 'status' },
		{ id: 'statusText', title: 'statusText' },
		{ id: 'path', title: 'path' },
	]);
});
