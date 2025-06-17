
const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model.find().exec();

    if (!q) {
        return res.status(404).json({ message: 'No trips found' });
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec(); // find() returns an array

    if (!q) {
        return res.status(404).json({ message: 'Trip not found' });
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    }
    Model.create(newTrip)
        .then((trip) => {
            return res.status(201).json(trip);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
};


const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } 
        )
        .exec();
    
    if (!q) {
        return res.status(400).json({ "message": "Trip not found" });
    } else {
        return res.status(200).json(q); 
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip 
};