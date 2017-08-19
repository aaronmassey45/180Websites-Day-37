import React, {Component} from 'react';

export default class Timer extends Component {
  addSession() {
    this.props.add(this.props.session, 'session');
  }
  minusSession() {
    this.props.minus(this.props.session, 'session');
  }
  addBreak() {
    this.props.add(this.props.rest, 'rest');
  }
  minusBreak() {
    this.props.minus(this.props.rest, 'rest');
  }
  render() {
    let props = this.props;
    return (
      <div className='Timer' id='Timer'>
        <div className='row'>
          <p>Session Time</p>
          <button onClick={this.minusSession.bind(this)} className='btn btn-default'>-</button>
          {props.session}
          <button onClick={this.addSession.bind(this)} className='btn btn-default'>+</button>
        </div>
        <div className='row'>
          <p>Break Time</p>
          <button onClick={this.minusBreak.bind(this)} className='btn btn-default'>-</button>
          {props.rest}
          <button onClick={this.addBreak.bind(this)} className='btn btn-default'>+</button>
        </div>
      </div>
    );
  }
}
