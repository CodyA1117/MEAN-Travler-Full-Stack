/*GET travel view*/
// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};


const travel = async function (req, res, next) {
    console.log('Starting API call to fetch trips...');

    await fetch(tripsEndpoint, options)
        .then((res) => {
            console.log('Received response from API. Now converting to JSON...');
            return res.json();  
        })
        .then((json) => {
            
            let message = null;

            if (!Array.isArray(json)) {
                message = 'API lookup error';
                json = [];
            }

            if (json.length === 0) {
                message = 'No trips exist in our database!';
            }

            console.log('Rendering travel page with trips:', json.length);

            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json,
                message
            });
        })
        .catch((err) => res.status(500).send(err.message));
};




module.exports = {
    travel
};