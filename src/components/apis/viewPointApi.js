class ViewPointAPi {
  constructor(key) {
    this.key = key
  }

  async getData(lat, lng, radius, keyword) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&keyword=${keyword}&key=${this.key}`)
    const data = await response.json()
    return data
  }

}

module.exports = ViewPointAPi


