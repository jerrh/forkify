require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Mongoose use ES6 promises

// Import all models 
const Store = require('../models/Store');
const Review = require('../models/Review');
const User = require('../models/User');


const stores = JSON.parse(fs.readFileSync(__dirname + '/stores.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('Deleting Data...');
  await Store.remove();
  await Review.remove();
  await User.remove();
  console.log('Data Deleted. To load sample data, npm run sample');
  process.exit();
}

async function loadData() {
  try {
    await Store.insertMany(stores);
    await Review.insertMany(reviews);
    await User.insertMany(users);
    console.log('Done!');
    process.exit();
  } catch(e) {
    console.log('To import sample data, npm run blowitallaway to drop existing db first');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
