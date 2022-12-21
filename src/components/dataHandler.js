const dataHandler = (response) => {
  output = []
  response.results.map( place => {
    output.push({
      name: place.name,
      location: {
        lat: place.geometry.location.lat,
        long: place.geometry.location.lng,
      },
      rating: place.rating,
    })
  })

  return output 

}

module.exports = dataHandler;