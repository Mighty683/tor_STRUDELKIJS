const csv = require('csvtojson')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

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

/** 
 * CSV OBJECT EXAMPLE
{
  "type": "POCZTA_POLSKA",
  "name": "FUP Puławy 1",
  "adress": "Lubelska 18",
  "postal-code": "24-112",
  "city": "Puławy",
  "geo-length": "21.981315612793",
  "geo-width": "51.4146575927734",
  "open-houres": "[{\"day\":\"MONDAY\",\"from\":\"10:00\",\"to\":\"17:00\"},{\"day\":\"TUESDAY\",\"from\":\"10:00\",\"to\":\"17:00\"},{\"day\":\"WEDNESDAY\",\"from\":\"10:00\",\"to\":\"17:00\"},{\"day\":\"THURSDAY\",\"from\":\"10:00\",\"to\":\"17:00\"},{\"day\":\"FRIDAY\",\"from\":\"10:00\",\"to\":\"20:00\"}]",
  "marks": ""
}
**/
function mapData (entry) {
  return {
    address: {
      city: entry.city,
      postalCode: entry['postal-code'],
      street: entry.adress
    },
    type: entry.type,
    name: entry.name,
    coordinates: [entry['geo-length'], entry['geo-width']],
    openHoures: JSON.parse(entry['open-houres'])
  }
}

async function burnBabyBurn () {
  try {
    let mockData = await csv().fromFile('./mocks/pickup-points.csv')
    mockData = mockData.map(mapData)

    if (mockData) {
      initServer()
      app.get('/points-list' ,(req, res) => {
        res.send(mockData)
      })
    }
  } catch (e) {
    console.log(e)
  }
  
}

burnBabyBurn()