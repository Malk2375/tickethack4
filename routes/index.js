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

router.get('/trips/:departure?/:arrival?/:date?', async function(req, res, next) {
  try {
    const { departure, arrival, date } = req.params;
  
    let query = {};

    if (departure) {
      query.departure = departure;
    }

    if (arrival) {
      query.arrival = arrival;
    }

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Date invalide. Veuillez entrer une date valide (format: yyyy-mm-dd).' });
      }

      query.date = {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)), // Début de la journée
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999)) // Fin de la journée
      };
    }

    const data = await Trip.find(query);

    if (data.length === 0) {
      return res.status(404).json({ message: 'Pas de trajet trouvé pour ces critères.', imagePath: 'images/notfound.png' });
    }

    res.json({ result: true, trip: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
