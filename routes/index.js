require("dotenv").config();
var express = require('express');
var router = express.Router();
const Trip = require('../models/trip');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/trips', async function(req, res, next) {
  try {
    const data = await Trip.find();
    res.json({ trips: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
