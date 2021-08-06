const request = require('request');
const getLocationCoordinates = (place_name,callback)=>{

    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(place_name)+".json?access_token=pk.eyJ1Ijoic2FtYXJ0aHZlcm1hNDQiLCJhIjoiY2tyeDF5ejFnMG0xNjMyczdudXI0bWxvNSJ9.olnu4XxmrbwDEDaGsdE6ng"

    request({url:urlMapBox,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to location services",undefined)
        }
        else if(response.body.features.length===0){
            callback("Unable to find the location. Try another location",undefined)
        }else{
            const {place_name,center} = response.body.features[0];
            console.log("Place: "+place_name)
            callback(undefined,{center,place_name})
        }
    })
}

module.exports = getLocationCoordinates;