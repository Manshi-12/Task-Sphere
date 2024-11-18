const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        req.userId = decoded.id; // Assuming the user ID is stored in the token
        next();
    });
};

module.exports = verifyToken;
