const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = {
	readFile: (relPath) => fs.readFileSync(relPath, { encoding: 'utf8' }),
	writeFile: (relPath, data) => {
		fs.writeFile(relPath, data, (err) => {
			if (err) throw err;
			console.log('Saved!');
		});
	},
	writeCSV: (relPath, data, header) => {
		const csvWriter = createCsvWriter({
			path: relPath,
			header,
		});

		csvWriter
			.writeRecords(data) // returns a promise
			.then(() => {
				console.log('...Done');
			});
	},
};
