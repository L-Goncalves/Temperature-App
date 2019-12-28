# Temperature-App

# Informations About the App

Allow the Location so the Application can work (It doesn't work if you don't allow it).
It doesn't need anything else other than a localhost live server but that's easy to use

The Application gets your latitude and longitude to know your location and there's a free API that gets the weather from your location, I just converted it to a JSON and made it to show inside the elements.

The Application has a clock inside it, it gets the current time from your Computer and shows it to you.
There's also informations in it such as humidity and Wind Speed (All Informations comes from the API).

The background changes if the temperatures are higher than 25 C° (or 77F) and 10 C° (50F).
The data updates every 1min.

# What I learned

I learned that it's possible to get informations from web using API's and that it's important to use the "console.log()" to actually know what's going on in the development of an app.

I learned from a huge mistake that you should never use a setInterval() function that gets informations from a server within a short period of time like "SetInverval(getInfo, 10)" it'll send so much requests that if the server doesn't have a security anti-ddos it'll take the website down, but if it has (fortunately it had a security system) it'll block you with a 429 status due to Too many requests.

I learned as well:

How use things put an information inside an html element with .textContent.

Some styling that I didn't know before that was possible

How to create a clock using Javascript

Make a function to restart every x seconds.

that there's a built-in stuff on Javascript to get user's location (I thought we need to use some framework for that).



Thanks for checking out this project! Have fun checking the temperature in your city

Note: It won't show as "Country/City" it'll probably show as "Continent/City" for some places.
