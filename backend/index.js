const csv = require('csvtojson')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const SEARCH_RANGE = 0.2

function initServer () {
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  })
  app.listen(1111, function () {
    console.log('Listening 1111 port')
  })
}

function mapData (entry) {
  return {
    address: {
      city: entry.city,
      postalCode: entry['postal-code'],
      street: entry.adress
    },
    type: entry.type,
    name: entry.name,
    coordinates: [Number(entry['longitude']), Number(entry['latitude'])],
    openHoures: JSON.parse(entry['open-houres']),
    ratings: {
      serviceTime: Math.random() * 5,
      availability: Math.random() * 5,
      service: Math.random() * 5,
    }
  }
}

function filterPointsByCoordinates (pointsList, sourceLatitude, sourceLongitude) {
  return pointsList.filter(point => {
    const [longitude, latitude] = point.coordinates
    if (sourceLatitude + SEARCH_RANGE > latitude)
    return sourceLatitude + SEARCH_RANGE > latitude  && latitude > sourceLatitude - SEARCH_RANGE &&
    sourceLongitude + SEARCH_RANGE > longitude  && latitude> sourceLongitude - SEARCH_RANGE
  })
}

async function burnBabyBurn () {
  try {
    let mockData = await csv().fromFile('./mocks/pickup-points.csv')
    mockData = mockData.map(mapData)

    if (mockData) {
      initServer()
      app.get('/points-list' ,(req, res) => {
        const longitude = req.param('longitude')
        const latitude = req.param('latitude')
        if (longitude && latitude) {
          res.send(filterPointsByCoordinates(mockData, Number(latitude), Number(longitude)))
        } else {
          res.status(500).send('Invalid Params!')
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
}

burnBabyBurn()