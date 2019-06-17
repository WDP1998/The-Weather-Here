let lat, lon, weather, air;
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        var json;
        try{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);
            const api_url = `weather/${lat},${lon}`;
            const fetch_response = await fetch(api_url);
            json = await fetch_response.json();
            weather = json.weather.currently;

            document.getElementById('summary').textContent = weather.summary;
            document.getElementById('temperature').textContent = weather.temperature;

            air = json.air_quality.results[0].measurements[0];
            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;
            
            const data = {lat, lon, weather, air};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);
        } catch(error){
            console.error(error);
             lat = position.coords.latitude;
             lon = position.coords.longitude;
            document.getElementById('data').textContent = `The weather here at ${lat}°, ${lon}° is ${weather.summary} with a temperature of ${weather.temperature}°F.`
            const air = { value: -1 };
            const data = {
                lat,
                lon,
                weather,
                air
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
        }
    });
} else {
    console.log('geolocation not available');
}