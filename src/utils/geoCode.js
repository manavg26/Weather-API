const request = require('postman-request')

const geoCode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiZ29lbG1hbmF2MjAwOSIsImEiOiJja3k3OGk0d3EweWlzMndzMXcybXFnb2s3In0.SkwXDBE5pwjY8eEv2wL3Cg&limit=1'
    request({ url, json: true }, (error, {body}={}) => {
        const {features}=body
        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (features.length === 0) {
            callback("Please enter a valid location.", undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }

    })
}
module.exports=geoCode