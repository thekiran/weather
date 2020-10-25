const app = require('express')()
const axios = require('axios')
const cors = require('cors')

const key = '24373ca8e3444c1a51cfd3182648c3d0'
app.get('/', (req, res) => {
  res.send('hello')
})

// var corsOptions = {
// 	origin: 'http://localhost:5000',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(cors())
// cors(),
app.get('/city/:cname', async (req, res) => {
  //console.log(req.params.cname);
  try {
    const cname = req.params.cname
    const base = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${cname}&appid=${key}`
    // const key = key
    console.log(base + query)
    const response = await axios.get(base + query)
    const data = await response.data
    console.log(data)
    // res.json(response.data)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json('serber')
    console.log(error)
  }
})
app.get('/pos/:lat/:lon', async (req, res) => {
  //console.log(req.params.cname);
  try {
    const lat = req.params.lat
    const lon = req.params.lon
    console.log(lat + lon)
    const base = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?lat=${lat}&lon=${lon}&appid=${key}`
    console.log(base + query)

    const response = await axios.get(base + query)
    const data = await response.data
    // console.log(data);
    // res.send('hello');
    // res.json(response.data);
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json('serber')
    console.log(error)
  }
})

app.listen(process.env.PORT || 5000, () => console.log('running on port 5000'))
