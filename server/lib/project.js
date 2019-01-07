const ncp = require('ncp').ncp;
const path = require('path');

const create = (destination) => {
    return new Promise(function(resolve, reject) {
        const source = path.resolve('server/.template/');

        ncp(source, destination, function(err) {
            if (err) {
                console.log('error', err);
                throw err;
            } else {
                console.log('done');
                return resolve();
            }
        });
    });
};


module.exports = {
    create: create
};
