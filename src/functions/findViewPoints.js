const dataHandler = require('../components/dataHandler.js')
const api_key = 'AIzaSyCuIx6jsRwkt-nc7yrbrE-nFXXcJYUfGf4'
const ViewPointAPi = require('../components/apis/viewPointApi.js')

const viewPointFinder = async(lat, lng) => {

  const Api = new ViewPointAPi(api_key)
  const keyword = "viewpoints"
  const radius = "1600"
  const data = await Api.getData(lat, lng, radius, keyword);
  return dataHandler(data)
}

module.exports = viewPointFinder