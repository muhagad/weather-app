const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

const tempData = [];

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
}))
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


const getProjectData = (req, res) => {
    res.send(tempData)
}

app.get('/all', getProjectData);


app.post('/addTempData', (req, res) => {
   
     
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    }

    tempData.push(projectData)
    console.log(tempData)

})



// Setup Server

app.listen(port, () => {
    console.log('server is running on port,', port)
    console.log(`server is running on url, http://localhost:${port}` )

})