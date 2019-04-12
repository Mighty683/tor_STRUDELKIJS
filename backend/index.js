const csv = require('csvtojson')
const express = require('express')
const bodyParser = require('body-parser')

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

async function burnBabyBurn () {
  try {
    let mockData = await csv().fromFile('./mocks/pickup-points.csv')

    if (mockData) {
    }
  } catch (e) {
  }
  
}

burnBabyBurn()