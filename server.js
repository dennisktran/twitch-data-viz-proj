const express = require("express")
const app = express()
const fetch = require('node-fetch')
const port = 3001;
const cors = require('cors')
const bodyParser     = require('body-parser');


const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/api', async (req,res)=>{
  const popResponse = await fetch('https://api.twitch.tv/helix/games/top', {
    headers: {
      "Client-ID": "fisr6jm358bu440cf6rgr8y5kgr7fn"
    }
  })
  const parsed = await popResponse.json()
    res.json({
      data: parsed
    })
})

app.post('/game', async (req, res) => {
  const gameResponse = await fetch(`https://api.twitch.tv/helix/streams?game_id=${req.body.id}&first=100`, {
    headers: {
      "Client-ID": "fisr6jm358bu440cf6rgr8y5kgr7fn"
    }
  })
  const parsed = await gameResponse.json()
    res.json({
      data: parsed
    })
})

app.get('/streamer', async (req,res)=>{
  const topStreamers = await fetch('https://api.twitch.tv/helix/streams?first=40', {
    headers: {
      "Client-ID": "fisr6jm358bu440cf6rgr8y5kgr7fn"
    }
  })
  const parsed = await topStreamers.json()
    res.json({
      data: parsed
    })
})

app.get('/profile', async (req,res)=>{
  const topStreamers = await fetch('https://api.twitch.tv/helix/users?id=71092938', {
    headers: {
      "Client-ID": "fisr6jm358bu440cf6rgr8y5kgr7fn"
    }
  })
  const parsed = await topStreamers.json()
    res.json({
      data: parsed
    })
})

app.listen(port, () => {
  console.log(`Server running at  ${port}/`);
});
