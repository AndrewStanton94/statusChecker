const fs = require('fs');

module.exports = {
	readFile: (relPath) => fs.readFileSync(relPath, { encoding: 'utf8' }),
	writeFile: (relPath, data) => {
		fs.writeFile(relPath, data, (err) => {
			if (err) throw err;
			console.log('Saved!');
		});
	}
};
