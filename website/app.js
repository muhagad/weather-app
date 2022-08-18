/* Global Variables */
const APIKey = 'us&appid=670612393986081d2f032dd55d06e35b&units=metric'

const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

const getTemp = async (url='') => {
    const request = await fetch(url)
    try {
        const retrieveData = await request.json()
        // console.log(retrieveData)
        return retrieveData
    } catch(error) {console.log('error', error)}
}

const postTempData = async (url='', data={}) => {
    const response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    try {
        const newData = await response.json()
        console.log(newData)
        return newData

    } catch(error) {console.log('error', error)}
}

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    if ( zip!= '' || content != '') {
        getTemp(baseURL+zip+','+APIKey).then(function(data){
            console.log('datatopost', data)
            // const celisusTemp = (data.main.temp-32) / 1.8
            postTempData('/addTempData', {temperature: data.main.temp, date: newDate, user_response:content})
            updateUI()
        })
    } else {
        alert("no data has been inserted")
    }
   

}





const updateUI = async() => {
    const request= await fetch('/all')
    try {
        const allData = await request.json()
        console.log('data', allData)
        allData.forEach(data=> {
            document.getElementById('date').innerHTML = data.date;
            document.getElementById('temp').innerHTML = data.temperature;
            document.getElementById('content').innerHTML= data.user_response;
        })
        // document.getElementById('date').innerHTML = allData[allData.length-1].date;
        // document.getElementById('temp').innerHTML = allData[allData.length-1].temperature;
        // document.getElementById('content').innerHTML= allData[allData.length-1].user_response;

    }catch(error) {console.log("error", error)}
}
// postTempData('/addTempData',{temperature: temp})
// getTemp('/all',baseURL)