const axios = require('axios');

// 'https://www.port.ac.uk'

async function requestURL(url, results, instance) {
	try {
		const response = await instance.head(url);
		const { status, statusText, request } = response;
		const { path } = request;

		console.log(status, statusText, url, path);

		results[url] = { status, statusText, path };
	} catch (error) {
		console.error(error);
	}
}

const requestURLShort = (url, results, instance) => instance.head(url);

const instance = axios.create({
	baseURL: 'https://www.port.ac.uk/',
});
const results = {};
let urlsToCheck = ['/', '/centre-for-operational-research-and-logistics'];

let promises = urlsToCheck.map((url) =>
	requestURLShort(url, results, instance)
);
console.log(promises);

axios.all(promises).then(
	axios.spread(function(acct, perms) {
		// console.log(acct);
		// console.log(perms);

		const { status, statusText, request } = acct;
		const { path } = request;

		console.log(status, statusText, path);

		// Both requests are now complete
	})
);
