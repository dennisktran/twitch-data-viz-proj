import React, { Component } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'

class TopGames extends Component {
  state = {
    top: [],
    streamers:[],
    load: false
  }

  componentDidMount(){
    this.getGames()
  }

  getGames = async() => {
    try {
      const popResponse = await fetch('http://localhost:3001/api')

      const parsed = await popResponse.json()

      this.setState({
        top: parsed.data.data,
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
        popstreamer : parsed.data
      })

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

         return games.push({...v, viewCount, users, color: this.color()})

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
    return  this.state.top.map(p => {
      return  {
          "name": p.name,
          "color": `hsl(${p.color}, 70%, 50%)`,
          "loc": p.viewCount,
          "children": p.users ? this.streamerData(p) : []
        }
      })
    }

  streamerData = (game) => {
    return game.users.map(u=>{
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

      return <li> <img src = {t.box_art_url}/> {t.name}<br/> <i>View Count</i>: <b>{t.viewCount}</b> </li>

    })
  }

  color = () =>{
      const array = new Array(20).fill("h")
      return array.map(g =>{
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      })
    }

render(){
  console.log(this.buildData())
  return(
    <div style={{display:'flex'}}>
      <div style={{ height: '100vh', width: '50vw', flex:'0 0 50%' }}>
      {this.state.load &&
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
        colors={this.color()}
        childColor={{ from: 'color'}}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        />
        }
        </div>
        <div style={{flex:'1',position:'relative',display: 'flex'}}>
          <div style={{position:"sticky", overflow:"scroll",height: '100vh'}}>
            <b> Most Popular Games </b>
            <ul>
              {this.listTopGames()}<br/>
            </ul>
          </div>
          <div style={{position:"sticky", overflow:"scroll",height: '100vh'}}>
            <b> Top Streamers </b>
            <ul>
              {this.listTopGames()}<br/>
            </ul>
          </div>
        </div>
      </div>


    )
  }
}






export default TopGames
