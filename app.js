window.addEventListener('load',  ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let body = document.querySelector('body');
    let humidity = document.querySelector('.humidity');
    let windspeed = document.querySelector('.windspeed');
    let temperaturefahreinheit = document.querySelector('.temperature-fahreinheit');
    let iconID = document.querySelector(".icon");
    
    Application();
    Timing();

    function Application(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/4bde25596684fdd46b036c69735fa88b/${lat},${long}`;

                fetch(api).then(response =>{
                    return response.json();
    
                })
                  .then(data =>{
                      console.log("Atualizando dados", data)
                      
                      const {temperature, summary} = data;
                      icon1 = data.currently.icon;
                      // Set DOM elements from the API
                      //Converts Fanreinheit to Celsius and Rounds it to a temperature
                        dataTemperature = data.currently.temperature;
                        // Formula to Celsius
                        temperatureToCelsius = parseFloat(( dataTemperature -32 ) * 5/9.2);
                        // Changes float number  to only 2 decimals after "."
                        temperatureDegree.textContent = temperatureToCelsius.toFixed(2) + " C°";
                        // Changes float number  to only 1 decimal after ".
                        temperaturefahreinheit.textContent =  dataTemperature.toFixed(1) + " F";
                        // Hourly Description
                        temperatureDescription.textContent = data.hourly.summary;
                        // Replace _ for blank space
                        locationTimezone.textContent = data.timezone.replace(/[#_]/g, ' ');
                        // Set Icon Function
                        setIcons(icon1, iconID);

                        humidityPercentage = "Humidity: " + data.currently.humidity.toString();
                        humidity.textContent = humidityPercentage.replace("0.", "") + "%";

                        windspeedToKm = data.currently.windSpeed * 3.1;
                        windspeed.textContent = " Wind:" + windspeedToKm.toFixed(1) + " Km/h";
    
                        // This is for South America. The API shows it as "America" and not "South America".
                        if(data, lat < 12 && lat > -55.0 && long > -80 && long < -35){
                            locationTimezone.textContent = data.timezone.replace('America', 'South America').replace(/[#_]/g, ' ')
                        }  else if(lat > 48.999459 && long < -95.589804 && long > -123.099570){
                             // This is A few parts of Canada. The API shows it as "America" and not "Canada".
                            locationTimezone.textContent = data.timezone.replace('America', 'Canada').replace(/[#_]/g, ' ')
                        }
    
                        // Edits the background if the temperature is higher than 25 C°/ 77F
                         if(temperatureToCelsius >= 25){
                            body.style.backgroundImage = "url('images/27celsius.jpg')"
                            body.style.backgroundSize = "1300px"
                        }
                        // Edits the background and color if the temperature is higher than 10 C°/ 50F
                        else if(temperatureToCelsius >=  10){
                            body.style.backgroundImage = "url('images/below24.jpg')"
                            body.style.backgroundSize = "1200px"
                            temperatureDegree.style.color = "#00ffff"   
                        }

                        else{
                            body.style.backgroundImage = "url('images/else.jpg')"
                            body.style.backgroundSize = "1200px"
                            temperatureDegree.style.color = "#00ffff"
                        }
                  });   
            })
        } else{
            console.error("Please Allow the location");
        };
       
        // Don't change this, if you do the app will stop working for a while due to Too many requests
        // Updating every 1min
        setInterval(Application, 60000); // Updates the App Data every 60s
        // setInterval(console.clear, 10000) // Clears console every 10s
    };

    
  
    // Clock
    function Timing(){
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";
        
        if(h == 0){
            h = 12;
        }
        
        if(h > 12){
            h = h - 12;
            session = "PM";
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        
        var time = h + ":" + m + ":" + s + " " + session;
        document.querySelector(".timer").innerText = time;
        document.querySelector(".timer").textContent = 'Right now it is ' + time;
        
        setTimeout(Timing, 1000);
        
    }
    
    Timing();
    
    // Icons
    function setIcons(icon1, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon =  icon1.replace(/-/g, "_").toUpperCase();
        skycons.play();
        skycons.set(iconID, Skycons[currentIcon]);
    }
});


