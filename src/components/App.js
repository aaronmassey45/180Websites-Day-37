import React, {Component} from 'react';
import Navbar from './navbar';
import Timer from './timer';
import '../App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: 25,
      rest: 5
    }
  }
  componentDidMount() {
    this.hide('reset');
  }
  addMinutes(date, minutes) {
    return date + minutes * 60000;
  }
  addOne(time, timer) {
    time++;
    this.setState({[timer]: time})
  }
  minusOne(time, timer) {
    time--;
    this.setState({[timer]: time})
  }
  hide(elem) {
    document.getElementById(elem).style.display = "none";
  }
  show(elem) {
    document.getElementById(elem).style.display = "inline";
  }
  start() {
    this.hide('start');
    this.hide('Timer');
    this.show('reset');

    let isRest = false;
    let timer = this.addMinutes(new Date().getTime(), this.state.session);
    let x = setInterval(() => {
      let now = new Date().getTime();
      let diff = timer - now;
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let sec = Math.floor((diff % (1000 * 60)) / 1000);

      if (isRest===true) {
        document.getElementById("which").innerHTML = 'Rest Time: '
      } else {
        document.getElementById("which").innerHTML = 'Session Time: '
      }

      document.getElementById("count").innerHTML = `${hours}h:${min}m:${sec}s`;

      if (diff < 1000 && isRest === true) {
        this.show('start');
        this.show('Timer');
        this.hide('reset');
        isRest=false;
        clearInterval(x);
        document.getElementById("count").innerHTML = "EXPIRED";
      } else if (diff < 1000) {
        isRest = true;
        timer = this.addMinutes(new Date().getTime(), this.state.rest);
      }
    }, 1000);
    document.getElementById('reset').onclick = () => {
      isRest=false;
      this.reset(x);
    }
  }
  reset(x) {
    clearInterval(x);
    this.hide('reset');
    this.show('start');
    this.show('Timer');
    document.getElementById("count").innerHTML = this.state.session;
  }
  render() {
    return (
      <div className='App'>
        <Navbar/>
        <div className='container'>
          <h1>Pomodoro Timer</h1>
          <h3>Free Code Camp Advanced Front End Project</h3>
          <h4>Technologies Used: HTML, CSS, BootStrap, JavaScript, React</h4>
          <hr/>
          <Timer add={this.addOne.bind(this)} minus={this.minusOne.bind(this)} session={this.state.session} rest={this.state.rest}/>
          <div>
            <b><span id='which'>Session Time: </span></b>
            <span id='count'>{this.state.session} minutes</span>
          </div>
          <button id='start' className='btn btn-success btn-lg' onClick={this.start.bind(this)}>Start</button>
          <button id='reset' className='btn btn-danger btn-lg'>Reset</button>
        </div>
      </div>
    );
  }
}
