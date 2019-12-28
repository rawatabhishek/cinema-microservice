const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.authMiddleware = function (req, res, next) {
	const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'));
	const authHeader = req.headers.authorization;
	let decodedAuthToken;
	if (authHeader) {
		let authToken = authHeader.split(' ');
		authToken = authToken[1];
		try {
			decodedAuthToken = jwt.verify(authToken, publicKey);
		} catch (error) {
			res.status(401).send({'status': 0, message: error.message});
			return;
		}
		if (decodedAuthToken) {
			next();
		} else {
			res.status(401).send({'status': 0, message: 'Unauthorized API request. Invalid token.'});
		}
	} else {
		res.status(401).send({'status': 0, message: 'Unauthorized API request. Missing authorization token.'});
	}


	// jwt.verify()
}