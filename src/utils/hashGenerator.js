const crypto = require('crypto');

function hashGenerator(input) {
    console.log("here")
    const hash = crypto.createHash('sha256', 'channel').update(input).digest('hex');
    return hash;
}

module.exports = hashGenerator;
