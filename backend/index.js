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

function mapData (entry, index) {
  return {
    id: index,
    address: {
      city: entry.city,
      postalCode: entry['postal-code'],
      street: entry.adress
    },
    type: entry.type,
    name: entry.name,
    coordinates: [Number(entry['longitude']), Number(entry['latitude'])],
    openHoures: JSON.parse(entry['open-houres']),
    overAllRating: 3 + Math.random() * 7,
    ratings: {
      service: 2 + Math.random() * 2,
      availability: 2 + Math.random() * 2,
      serviceTime: 2 + Math.random() * 2,
    }
  }
}

function filterPointsByCoordinates (pointsList, sourceLatitude, sourceLongitude) {
  return pointsList.filter(point => {
    const [longitude, latitude] = point.coordinates
    if (sourceLatitude + SEARCH_RANGE > latitude)
    return sourceLatitude + SEARCH_RANGE > latitude  && latitude > sourceLatitude - SEARCH_RANGE &&
    sourceLongitude + (SEARCH_RANGE / 2) > longitude  && longitude > sourceLongitude - (SEARCH_RANGE / 2)
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