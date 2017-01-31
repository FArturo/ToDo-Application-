import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

import '../styles/styles.css';

class Main extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
     }

    this.renderReminder = this.renderReminder.bind(this);
  }
  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate)
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  clearReminders() {
    console.log(`clearing reminders`);
  }

  renderReminder() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-md-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{ moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div onClick={() => this.deleteReminder(reminder.id)} className="list-item delete-button">
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    return(
      <div className="main">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input onChange={e => this.setState({ text: e.target.value })} type="text" className="form-control" placeholder="I have to..."/>
            <input onChange={e => this.setState({ dueDate: e.target.value})} className="form-control" type="datetime-local"/>
            <button onClick={this.addReminder.bind(this)} type="button" className="btn btn-success">Add Reminder</button>
            {this.renderReminder()}
            <button onClick={() => this.props.clearReminders()} className="btn btn-danger clear-reminders">Clear Reminder</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect (mapStateToProps, { addReminder, deleteReminder, clearReminders })(Main);
