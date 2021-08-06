const request = require('request');
const getWeather = (cordinates,callback)=>{
    const urlWeather="http://api.weatherstack.com/current?access_key=fe0291641ee24852e0ff2e279c9aa531&query="+cordinates[1]+","+cordinates[0]+"&units=m";
    request({url:urlWeather,json:true},(errorMain,response)=>{
        const {weather_descriptions:description,temperature:temp,feelslike:feelsLike} = response.body.current
        if(errorMain){
            callback("Unable to connect to weather services",undefined)
        }else if (response.body.error){
            callback("Unable to find location",undefined)
        }
        else{
            const data =response.body;
            callback(undefined,{description,temp,feelsLike})
        }
    })
}

module.exports = getWeather;