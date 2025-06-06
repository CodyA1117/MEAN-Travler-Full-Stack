const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    const q = await Model.find().exec();

    //console.log(q);

    if(!q) {
        return res.status(404).json({ message: 'No trips found' });
    } else {
        return res.status(200).json(q);
    
    }

}

const tripsFindByCode = async (req, res) => {
    const q = await Model.findOne({'code' : req.params.tripCode}).exec();

    if(!q) {
        return res.status(404).json({ message: 'Trip not found' });
    } else {
        return res.status(200).json(q);
    }  
    
};

module.exports = {
    tripsList,
    tripsFindByCode
}
