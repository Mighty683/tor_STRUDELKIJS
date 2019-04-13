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
  app.listen(process.env.PORT || 1111, function () {
    console.log(`Listening ${process.env.PORT || 1111} port`)
  })
}

function mapData (entry, index) {
  const sR = 1 + Math.random() * 4
  const aR = 1 + Math.random() * 4
  const STR = 1 + Math.random() * 4
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
    overAllRating: (((sR + aR + STR) / 3) * 2).toFixed(2),
    ratings: {
      service: sR,
      availability: aR,
      serviceTime: STR
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
