import React, { Component} from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'

import Chart from 'chart.js'


class Home extends Component {
  state = {
    user: {
      username: '',
      email: ''
    }
  }

  componentDidMount() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
      datasets: [{
  backgroundColor: [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC"],
  hoverBackgroundColor: [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC"
  ],
  data: [
  0.0,
  0.0,
  8.31,
  10.43,
  84.69,
  0.84
  ]
},
{
  backgroundColor: [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC"],
  hoverBackgroundColor: [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC"
  ],
  data: [
  8.31,
  95.96
  ]
}],
labels: [
"game1",
"game2",
"stream1",
"stream2",
"stream3",
"resource-group-2 - Other"
]
},

    // Configuration options go here

    options: {
      title: {
        display: true,
        text: 'Top viewed games '
      }
    }
});

    this.props.userId
    && this.props.firebase
    .user(this.props.userId).once('value')
    .then(snapShot => {
      snapShot.val()
      this.setState({
        user: {
          username: snapShot.val().username,
          email: snapShot.val().email
        }
      })
    })
  }




  render() {
    return (
      <canvas id="myChart"></canvas>
    )
  }
}

export default withFirebase(withRouter(Home))
