const Dictionary = require('oxford-dictionary');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    app_id: process.env.OXFORD_APP_ID,
    app_key: process.env.OXFORD_APP_KEY,
    source_lang: 'en-us'
};

const word = 'comrade';
const dict = new Dictionary(config);

// const definition = dict.definitions(word);
// definition.then(function(res) {
//     console.log(JSON.stringify(res, null, 4));
// },
// function(err) {
//     console.error(err);
// });

const lookup = dict.find(word);
lookup.then(function(res) {
    console.log(JSON.stringify(res, null, 4));
},
function(err) {
    console.error(err);
});