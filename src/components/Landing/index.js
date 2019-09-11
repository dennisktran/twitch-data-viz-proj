import React, { Component } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'

class TopGames extends Component {
  state = {
    top: [],
    streamers:[],
    popstreamer:[],
    load: false
  }

  componentDidMount(){
    this.getGames()
    this.getStreamers()
  }

  getGames = async() => {
    try {
      const popResponse = await fetch('http://localhost:3001/api')

      const parsed = await popResponse.json()
      const gameArray = parsed.data.data.map(g => {return {...g, color: this.color()}})
      this.setState({
        top: gameArray
      }, ()=>{
        this.getViews()
      })

    } catch(err) {
      console.log(err);
    }
  }

  imageHandler = (str,w,h)=>{
    let array = str.split("-")
    array[array.length -1] = `${w}x${h}.jpg`
    return array.join("-")
  }

  getStreamers = async() => {
    try {
      const userReponse = await fetch("http://localhost:3001/streamer")

      const parsed = await userReponse.json()
      this.setState({
        popstreamer : parsed.data.data
      }, () => this.listTopStreamers()
    )

  } catch(err) {
    console.log(err);
  }
}

  getViews = async () => {
    try {
      let games = []
      await Promise.all(this.state.top.map(async(v) => {
        let viewCount = 0
        let users = []
        let boxArt = []

        const viewResponse = await fetch('http://localhost:3001/game', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({id: v.id}),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const parsed = await viewResponse.json()
        parsed.data.data.forEach(streamer =>{
          viewCount += streamer.viewer_count
          users.push({user_name: streamer.user_name, viewer_count: streamer.viewer_count})
        })

         v.box_art_url = this.imageHandler(v.box_art_url, 100,150)

         return games.push({...v, viewCount, users})

       }))

       this.setState({
         top:games,
         load:true
       })

      } catch(err) {
        console.log(err);
      }
    }

  buildData = () => {
    const colorArray = this.state.top.map(t => t.color)
    return  this.state.top.map(p => {
      return  {
          "name": p.name,
          "color": colorArray,
          "loc": p.viewCount,
          "children": p.users ? this.streamerData(p) : []
        }
      })
    }

  streamerData = (game) => {
    return game.users.map(u => {
      return {
        "name": u.user_name,
        "color": "hsl(287, 70%, 50%)",
        "loc": u.viewer_count
      }
    })
  }

  listTopGames = () => {
   const sorted = [...this.state.top].sort((a,b) => b.viewCount - a.viewCount)
    return sorted.map(t => {

      return  <li style = {{listStyle:"none", display:'flex',marginTop: "5px", backgroundColor:`${t.color}`}}>
                <img src = {t.box_art_url}/>
                <div style={{display: 'flex', flexDirection:"column", justifyContent: "center", alignItems: "center", width:'100%'}}>
                  <a href ={`https://www.twitch.tv/directory/game/${t.name}`} style={{textDecoration: "none", color:'#fbf7f5'}}>{t.name}</a><br/>
                  <div><i style ={{color: "#fbf7f5"}}>View Count: </i> <b style = {{color: '#fbf7f5'}}>{t.viewCount}</b></div>
                </div>
              </li>

    })
  }

  topStreamers = () => {
   const sorted = [...this.state.popstreamer].sort((a,b) => b.viewer_count - a.viewer_count)
    return sorted.map(s => {

      return <li style={{listStyle: "none", marginTop: "8px"}}>
                <img src = {s.profile_image} height = {"100"} width = {"100"} style={{borderRadius:"10000px"}}/><br/>
                <a href ={`https://www.twitch.tv/${s.user_name}`} style={{textDecoration: "none"}}>{s.user_name}</a><br/>
                <i style = {{color: 'black'}}>Language: </i><b>{s.language.toUpperCase()}</b><br/>
                <i style = {{color: 'black'}}>View Count: </i> <b>{s.viewer_count}</b>
            </li>

    })
  }


 listTopStreamers = async() => {
   try {
     let userAndImage = []
     await Promise.all(this.state.popstreamer.map(async(s) => {
       console.log(s)
       const viewResponse = await fetch('http://localhost:3001/profile', {
         method: 'POST',
         credentials: 'include',
         body: JSON.stringify({id: s.user_id}),
         headers: {
           "Content-Type": "application/json"
         }
       })
       const parsed = await viewResponse.json()
       console.log(parsed)
       return userAndImage.push({...s,profile_image: parsed.data.data[0].profile_image_url})
      }))
      this.setState({
        popstreamer: userAndImage,
        load:true
      })
     } catch(err) {
       console.log(err);
     }
   }


  color = () =>{
        return `hsla(${Math.floor(Math.random() * 361)}, ${Math.floor(Math.random() * 101)}%, ${Math.floor(Math.random() * 71)}%, 0.7)`
    }

render(){
  return(
    <div style={{display:'flex'}}>
      <div style={{ height: '80vh', width: '50vw', flex:'0 0 50%' }}>
      {this.state.load ?
        <ResponsiveSunburst
        data={{
          "name": "top games",
          "color": "hsl(287, 70%, 50%)",
          "children": this.buildData()
        }}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        identity="name"
        value="loc"
        cornerRadius={2.5}
        borderWidth={1}
        borderColor="white"
        colors={this.state.top.map(g => g.color)}
        childColor={{ from: 'color'}}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        />
        :<h1>Sunburst loading... </h1>
        }
        </div>
        <div style={{flex:'1',position:'relative',display: 'flex'}}>
          <div style={{position:"sticky", overflow:"scroll",height: '80vh'}}>
            <b style={{position:"fixed", backgroundColor: "white", width: '100%'}}> Most Popular Games </b>
            <ul>
              {this.listTopGames()}<br/>
            </ul>
          </div>
          <div style={{position:"sticky", overflow:"scroll",height: '80vh'}}>
            <b style={{position:"fixed", backgroundColor: "white", width: '100%'}}> Top Streamers </b>
            <ul>
              {this.topStreamers()}<br/>
            </ul>
          </div>
        </div>
      </div>
    )
}
}



export default TopGames
