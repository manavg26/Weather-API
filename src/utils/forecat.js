const request = require('postman-request')

// default-url=http://api.weatherstack.com/current?access_key=b1873770960daf3166cb09db3342e15b&query=31.8267,-122.4233&units=m

const forecast=(longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b1873770960daf3166cb09db3342e15b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'&units=m'
    request({url,json:true},(error,{body}={})=>{
        if (error) {
        callback("Unable to connect to weather service !",undefined)
    }else if(body.error){
        callback(body.error.info,undefined)
    }
    else{
    callback(undefined ,{
        description:body.current.weather_descriptions[0],
        temperature: body.current.temperature  ,
        feels: body.current.feelslike})
}
    })
}


module.exports = forecast