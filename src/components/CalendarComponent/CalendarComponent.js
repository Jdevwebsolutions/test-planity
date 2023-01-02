import React, { useEffect } from 'react';

import EventComponent from "./EventComponent";
import styled from "styled-components";
import useCalendarComponent from './useCalendarComponent'

const ParentContainer = styled.div`
  display: flex;
  top:0;
  bottom:0;
   left:0;
   right:0;
  position: absolute;
  backgroundColor: red;
`;
const TimeLineContainer = styled.div`
  width: 3%;
  height: 100%;
  display: inline-block;
  background-color: #F4F6F7;
`;

const EventsContainer = styled.div`
  position: relative;
  height: 100%;
  width: 97%;
  background-color: #F4F6F7;

  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
`;

export default function CalendarComponent() {
   
  const {
    events,
    containerWidth,
    SimultaneousEvents,
    FormatEventObject,
    getSimultaneousEvents,
    getPosition
  } = useCalendarComponent()

  useEffect(() => {
    getSimultaneousEvents(events);
    getPosition(events);
  },[SimultaneousEvents]);


  return (
    <ParentContainer>
      <TimeLineContainer>
        <ul className="timeList">
          <li>09h00</li>
          <li>09h30</li>
          <li>10h00</li>
          <li>10h30</li>
          <li>11h00</li>
          <li>11h30</li>
          <li>12h00</li>
          <li>12h30</li>
          <li>13h00</li>
          <li>13h30</li>
          <li>14h00</li>
          <li>14h30</li>
          <li>15h00</li>
          <li>15h30</li>
          <li>16h00</li>
          <li>16h30</li>
          <li>17h00</li>
          <li>17h30</li>
          <li>18h00</li>
          <li>18h30</li>
          <li>19h00</li>
          <li>19h30</li>
          <li>20h00</li>
          <li>20h30</li>
          <li>21h00</li>
        </ul>
      </TimeLineContainer>
      <EventsContainer>
        <ul>
          {events.map((event, index) => {
            let eventAttributs= FormatEventObject(event,index)

            return (
              <EventComponent
              height={eventAttributs.height}
              top={eventAttributs.top}
              start={event.start}
              end={event.start + event.duration}
              event={event}
              key={event.title}
              units={eventAttributs.units}
              left={eventAttributs.left}
              containerWidth={containerWidth}
              />
            );
          })}
          
        </ul>
      </EventsContainer>
    </ParentContainer>
  );
}
