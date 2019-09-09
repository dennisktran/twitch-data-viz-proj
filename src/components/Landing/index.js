import React, { Component } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { render } from 'react-dom'

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
      console.log(popResponse)
      const parsed = await popResponse.json()

      this.setState({
        top: parsed.data.data,
      }, ()=>{
        this.getViews()
      })

      console.log(parsed);
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

          const viewResponse = await fetch('http://localhost:3001/game', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({id: v.id}),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const parsed = await viewResponse.json()
          console.log(parsed, '<----- parsed')
          parsed.data.data.forEach(streamer =>{
            viewCount += streamer.viewer_count
            users.push({user_name: streamer.user_name, viewer_count: streamer.viewer_count})
          })
         return games.push({...v, viewCount, users, color: this.color()})
       }))
       console.log("we are setting load to true")
       this.setState({
         top:games,
         load:true
       })

      } catch(err) {
        console.log(err);
      }
    }

    buildData = () => {
      console.log("building data")
      return  this.state.top.map(p => {
        return  {
            "name": p.name,
            "color": `hsl(${p.color}, 70%, 50%)`,
            loc: p.viewCount,
            "children": p.users ? this.streamerData(p) : []
          }
        })
}

    streamerData = (game) => {
      console.log(game)
      return game.users.map(u=>{
        return {
          "name": u.user_name,
          "color": "hsl(287, 70%, 50%)",
          "loc": u.viewer_count
        }
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
  // console.log(this.streamerData())
  return(
    
    <div style={{ height: '50em', width: '50em' }}>
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
      cornerRadius={2}
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

    )
  }
}






export default TopGames
