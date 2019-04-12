const Requests = require('./src/requests')
const API = require('./src/api')

async function burnBabyBurn () {
  try {
    const  { data} = await Requests.getAccessToken()

    if ( data && data.access_token) {
      API.init(data.access_token)
    }
  } catch (e) {
    console.log(e)
  }
}

burnBabyBurn()