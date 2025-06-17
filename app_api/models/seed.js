// This script is now self-contained and only for seeding.
const mongoose = require('mongoose');
const fs = require('fs');

// Define the schema *inside the seeder* to avoid dependency issues.
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// Compile the model
const Trip = mongoose.model('trips', tripSchema);

// Read the JSON data
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));


const seedDB = async () => {
  // Connect to the database
  await mongoose.connect('mongodb://127.0.0.1/travlr', {});
  console.log('Seeder connected to MongoDB.');

  // Delete any existing records
  await Trip.deleteMany({});
  console.log('Existing trips deleted.');

  // Insert seed data
  await Trip.insertMany(trips);
  console.log('Seed data inserted.');
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
  await mongoose.connection.close();
  console.log('Seeder disconnected.');
  process.exit(0);
}).catch(err => {
    console.error('Seeder failed:', err);
    process.exit(1);
});