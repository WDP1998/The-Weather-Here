const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap)

async function getData() {
    const res = await fetch('/api');
    const data = await res.json();
    console.log(data);
    
    for (item of data) {
        
        var date = new Date(item.timestamp)
        dateString = (date.getMonth()+1) + "/" +date.getDate() + "/" + date.getFullYear();


        const marker = L.marker([item.lat, item.lon]).addTo(mymap)
        let txt = `The weather here at ${item.lat}°, ${item.lon}° on ${dateString} is ${item.weather.summary} with a temperature of ${item.weather.temperature}°F.`

        if(item.air.value < 0){
            txt += ' No air quality reading.'
        }
        else{
            txt += `The concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}.`
        }
         

        marker.bindPopup(txt)
    }
}

getData()