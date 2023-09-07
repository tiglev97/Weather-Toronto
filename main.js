

const url_weather = 'https://api.open-meteo.com/v1/forecast?latitude=43.7001&longitude=-79.4163&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,windspeed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=America%2FNew_York';
const url_time = 'http://worldtimeapi.org/api/timezone/America/Toronto';

async function get_weather(url) {
    await fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        //Get current temperature
        document.getElementById('temperature').innerHTML = `${data.current_weather.temperature}°C`;
        //Get the current humidity
        document.getElementById('jshumidity').innerHTML = `${data.hourly.relativehumidity_2m[0]}%`;
        //Get the current feels like
        document.getElementById('jsfeelslike').innerHTML = `${data.hourly.apparent_temperature[0]}°C`;
        //Get the current perception
        document.getElementById('jsperception').innerHTML = `${data.hourly.precipitation_probability[0]}%`;
        //Get the current UV index
        document.getElementById('jsuvindex').innerHTML = `${data.hourly.uv_index[0]}`;
        //Get the current windspeed
        document.getElementById('jswindspeed').innerHTML = `${data.current_weather.windspeed} km/h`;
        //Get the min temp
        document.getElementById('jsmintemp').innerHTML = `${data.daily.temperature_2m_min[0]}°C`;
        //Get the max temp
        document.getElementById('jsmaxtemp').innerHTML = `${data.daily.temperature_2m_max[0]}°C`;

        //Get the wind direction
        var wind_deg = data.current_weather.winddirection;
        //console.log(wind_deg);
        //Rotate the icon
        document.getElementById('windicon').style.transform=`rotate(${wind_deg}deg)`


        let wind_direction = ''
        if (wind_deg > 337.5 || wind_deg < 22.5){
            wind_direction = 'North'
        } else if (wind_deg >= 22.5 && wind_deg <= 67.5){
            wind_direction = 'North-East'
        } else if (wind_deg > 67.5 && wind_deg < 112.5){
            wind_direction = 'East'
        } else if (wind_deg >= 112.5 && wind_deg <= 157.5){
            wind_direction = 'South-East'
        } else if (wind_deg > 157.5 && wind_deg < 202.5){
            wind_direction = 'South'
        } else if (wind_deg >= 202.5 && wind_deg <= 247.5){
            wind_direction = 'South-West'
        } else if (wind_deg > 247.5 && wind_deg < 292.5){
            wind_direction = 'West'
        } else if (wind_deg >= 292.5 && wind_deg <= 337.5){
            wind_direction = 'North-West'
        }

        document.getElementById('jswinddirection').innerHTML = `${wind_direction}`;



    });    

};




function determine_icon(is_day , weather_code) {
    switch(is_day , weather_code){
        case (0 , 0):
            return ('./night.svg');
        case(1, 1):
            return('./cloudy-day-1.svg');
        case(1, 2):
            return('./cloudy-day-2.svg');
        case(1,3):
            return ('./cloudy.svg');
        case(0, 1):
            return('./cloudy-night-1.svg');
        case(0, 2):
            return('./cloudy-night-2.svg');
        case(0,3):
            return ('./cloudy-night-3.svg');
        case(1, 0):
            return ('./day.svg');
        case(1, 51):
            return('./rainy-1.svg');
        case(1,53):
            return('./rainy-2.svg');
        case(1,55):
            return('./rainy-3.svg');
        case(1, 61):
            return('./rainy-4.svg');
        case(1, 63):
            return ('./rainy-5.svg');
        case(1, 65):
            return ('./rainy-6.svg');
        case (1,56):
            return ('./snowy-1.svg');
        case (1, 57):
            return ('./snowy-2.svg');
        case (1, 71):
            return ('./snowy-3.svg');
        case (1,73):
            return ('./snowy-4.svg');
        case (1, 75):
            return ('./snowy-5.svg');
        case (0, 45):
            return ('./icons8-fog.gif');
        case (0, 48):
            return ('./icons8-fog.gif');
        case (1, 45):
            return ('./icons8-haze.gif');
        case (1, 48):
            return ('./icons8-haze.gif');
        //to be continued....

    };
    

};


async function populate_icons() {
    const weather_code = {
        0: 'Clear', //good
        1: 'Mostly Clear', //good
        2: 'Partly Cloudy', //good
        3: 'Overcast', //good
        45: 'Fog',
        48: 'Fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Desnse Intensity Rainfall',
        56: 'Freezing Drizzle - Light',
        57: 'Freezing Drizzle - Moderate',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        66: 'Freezing Rain - Light',
        67: 'Freezing Rain - Heavy',
        71: 'Snowfall - Slight',
        73: 'Snowfall - Moderate',
        75: 'Snowfall - Heavy',
        77: 'Snow Grains',
        80: 'Rain Showers - Slight',
        81: 'Rain Showers - Moderate',
        82: 'Rain Showers - Heavy',
        85: 'Snow Showers - Light',
        86: 'Snow Showers - Heavy',

    };

    await fetch(url_weather).then(response => response.json()).then(data => {


        let today = data.current_weather.weathercode;
        today = weather_code[today];
        document.getElementById('description').innerHTML = `${today}`;
        //get the weather for today and put it up

        //get the icon for today...
        let icon = determine_icon(data.current_weather.is_day , data.current_weather.weathercode); //call function based on the info from the API
        let today_icon = document.getElementById('todayicon');
        today_icon.src = icon;
        

    });

    
};



async function get_date_time(url) {
    await fetch(url).then(response => response.json()).then(data => {
        var time = data.datetime.slice(11,16);
        var date = data.datetime.slice(0,10);

        document.getElementById('time').innerHTML = time;
        document.getElementById('date').innerHTML = date;

    
    });    

};


get_date_time(url_time);

get_weather(url_weather);

populate_icons();



const number_to_day = {
    0: "Sunday" ,
    1: "Monday" ,
    2: "Tuesday" ,
    3: "Wednesday" ,
    4: "Thursday" ,
    5: "Friday" ,
    6: "Saturday",
    7: "Sunday",
    8: "Monday" ,
    9: "Tuesday" ,
    10: "Wednesday",
    11: "Thursday",
    12: "Friday" 

};

var today = new Date().getDay();
let today_1 = today + 1;
let today_2 = today + 2;
let today_3 = today + 3;
let today_4 = today + 4;
let today_5 = today + 5;
let today_6 = today + 6;

document.getElementById('weekday').innerHTML = number_to_day[today];
