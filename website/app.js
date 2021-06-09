/* Global Variables */

// Create a new date instance dynamically with JS
// get the data and put Key using in API as const as public.
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const myKey = '67fa16bdab894f732807be735a90280c';

// start the action to be done once Clice on button (Generate)
const button = document.querySelector('#generate').addEventListener('click', comingData);

// run Async function and put its needed parameter.
async function comingData () {
  const feeling = document.querySelector('#feelings').value;
  const zipCode = document.querySelector('#zip').value;
// start try and catch and running Fetch -- in this Fetch is default (which is "GET") so no need to insert it, enough only fetch and put URL
    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`);
      // read the response as Jason.
        const resAPI = await res.json();
      // put condition if any issue like ZIP code not correct or Internet issue or Server down, so Code will be any other value except 200 so any error report Alert message.
        if (resAPI.cod != 200){
          return alert ("invalid Zip Code --- ")
        }
        console.log (resAPI);
      // catch Temperature from Jason object.
        const temp = resAPI.main.temp;
      
      // send the data to our Server.
        await fetch ('/postData', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          date: newDate,
          temp: temp,
          content: feeling
        }),
        })
        // get the data from our server.
        const comingRes = await fetch ('/getData', {
          method: 'GET',
          credentials: 'same-origin',
        })
        const comingData = await comingRes.json();
        console.log(comingData);
      // start present the data in frontend GUI.
        document.getElementById('date').innerHTML = comingData.date;
        document.getElementById('temp').innerHTML = comingData.temp + " c";
        document.getElementById('content').innerHTML = comingData.content;
        return comingData;
    } catch (error) {
      alert ("ALERT wait me!!!!! ")
    }    
};
