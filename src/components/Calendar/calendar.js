import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./calendar.css";
import { connect } from 'react-redux';

const styles = {
  wrap: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: 'rgb(243, 243, 243)',
    alignItems: 'center'
  },
  main: {
    height: "540px",
    flexGrow: "1",
    display: "flex"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Создать новую задачу:", "Задача 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Обновить текст задачи:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  componentDidMount() {
    this.setState({
      startDate: "2022-03-07",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2022-03-07T10:30:00",
          end: "2022-03-07T13:00:00"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-03-08T09:30:00",
          end: "2022-03-08T11:30:00",
          backColor: "#6aa84f"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2022-03-08T12:00:00",
          end: "2022-03-08T15:00:00",
          backColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 4",
          start: "2022-03-06T11:30:00",
          end: "2022-03-06T14:30:00",
          backColor: "#cc4125"
        },
      ]
    });
  }

  render() {
    const { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={{ fontSize: '40px', paddingTop: '100px' }}>Планирование задач</div>
        <div style={styles.left}>
        </div>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', paddingBottom: '190px' }}>
          <div style={styles.main}>
            <DayPilotCalendar
              {...config}
              ref={component => {
                this.calendar = component && component.control;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.messageReducer.assignments })

export default connect(mapStateToProps, null)(Calendar)

