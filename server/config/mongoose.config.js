const mongoose = require('mongoose');

module.exports = (DB) => {
    mongoose.set('strictQuery',false);
    mongoose.connect('mongodb://0.0.0.0/' + DB)
        .then(() => console.log(`Established a connection to the ${DB} database`))
        .catch(err => console.log(`Something went wrong when connecting to the ${DB} database `, err));


}

