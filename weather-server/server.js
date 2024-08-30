const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json())
app.use(cors({origin:'http://localhost:3000',methods:"*"}));


app.get('/api/weather', async (req, res) => {
  const city = req.query.q; 
  let apiKey =process.env.WEATHER_API_KEY||'b6e2b70c4b5041e8895155203242608';   
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;

   
    if (!city) {
        return res.status(400).json({ error: "City name is required..node" });
    }

    try {
        const response = await axios.get(url);

        res.json(response.data);
        console.log("data come");
        
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
