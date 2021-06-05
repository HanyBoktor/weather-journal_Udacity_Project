/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const myKey = '67fa16bdab894f732807be735a90280c';

const button = document.querySelector('#generate').addEventListener('click', comingData);

async function comingData () {
  const feeling = document.querySelector('#feelings').value;
  const zipCode = document.querySelector('#zip').value;

    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`);
        const resAPI = await res.json();
        if (resAPI.cod != 200){
          return alert ("invalid Zip Code --- ")
        }
        console.log (resAPI);
        const temp = resAPI.main.temp;
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
        
        const comingRes = await fetch ('/getData', {
          method: 'GET',
          credentials: 'same-origin',
        })
        const comingData = await comingRes.json();
        console.log(comingData);
        document.getElementById('date').innerText = comingData.date;
        document.getElementById('temp').innerText = comingData.temp + " c";
        document.getElementById('content').innerText = comingData.content;
        return comingData;
    } catch (error) {
      alert ("ALERT wait me!!!!! ")
    }

    
};