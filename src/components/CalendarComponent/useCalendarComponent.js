/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState,useEffect, useCallback } from "react";
const useCalendarComponent = () => {
  const containerHeight = window.innerHeight;
  const containerWidth = window.innerWidth;
  const minutesPerDay = 60 * 12; // 60 : number of minutes / 12 : number of hours

  const [SimultaneousEvents, setSimultaneousEvents] = useState([]) // multidimensional array that contains number of events in each 30min section
  const [width, setwidth] = useState([]) //Array that contains the width of each event 
  const [leftOffSetEvents, setleftOffSetEvents] = useState([]) // multidimensional array that contains number of events in each 30min section
// Array of events to present in calendar
  const events = [
    {
      id: 1,
      start: 30,
      duration: 120,
    },
    {
      id: 2,
      start: 160,
      duration: 100,
    },
    {
      id: 3,
      start: 160,
      duration: 100,
    },
    {
      id: 4,
      start: 270,
      duration: 120,
    },
    {
      id: 5,
      start: 300,
      duration: 120,
    },
    {
      id: 6,
      start: 380,
      duration: 120,
    },
  ];

  // getSimultaneousEvents iterates through events and tells you which events are in each 30min slot
    const getSimultaneousEvents = ((events) => {
    let LocalSimultaneousEvents = [];

    // 24 is the nomber of 30min in 12h
    for (var i = 0; i < 24; i++) {
      var time = [];
      for (var j = 0; j < events.length; j++) {
        time.push(0);
      }
      LocalSimultaneousEvents.push(time);
    }

    events.forEach((event, id) => {
      let endEvent = event.start + event.duration // the end of an event
      let startEvent = event.start // the start of an event
      let order = 1; //Order is the horizontal position that can take an event
      while (startEvent < endEvent) {
        let timeIndex = Math.floor(startEvent / 30) //Return the start value in period of 30min
        while (order < events.length) {
          if (LocalSimultaneousEvents[timeIndex].indexOf(order) === -1) {
            break;
          }
          order++;
        }

        LocalSimultaneousEvents[timeIndex][id] = order;
        startEvent = startEvent + 30;
      }

      LocalSimultaneousEvents[Math.floor((endEvent - 1) / 30)][id] = order;
    });
    setSimultaneousEvents(LocalSimultaneousEvents)
  });


//getPosition return the  width and horizontal position of each event in calnedar
  const getPosition = useCallback((event) => {
 
    //resets storage arrays
    let Localewidth = [];
    let LocaleleftOffSetEvents = [];

    for (var i = 0; i < events.length; i++) {
      Localewidth.push(0);
      LocaleleftOffSetEvents.push(0);
    }

    SimultaneousEvents.forEach((period) => {
      // Count the number of events in that period
      let eventCounter = period.reduce((accumulator, currentValue) => {
        return currentValue ? accumulator + 1 : accumulator;
      });

      if (eventCounter > 1) {
        period.forEach((event, id) => {
          //the number of event that sharing a time period .
          if (period[id]) {
            if (eventCounter > Localewidth[id]) {
              Localewidth[id] = eventCounter;
              setwidth(Localewidth);
            }
          }

          if (period[id] && !LocaleleftOffSetEvents[id]) {
            LocaleleftOffSetEvents[id] = period[id];
            setleftOffSetEvents(LocaleleftOffSetEvents);
          }
        });
      }
    });
  });

  // FormatEventObject will return an object that will contain all attributs that EventComponent needs for styling event in calendar.  
  const FormatEventObject = useCallback((event, index) => {
 
    var eventObject = {};
    eventObject.height =((event.start + event.duration - event.start) / minutesPerDay) *containerHeight;
    eventObject.top = (event.start / minutesPerDay) * containerHeight // Margin top of the event
    eventObject.units = width[index];
    if (!eventObject.units) { // if we dont have 
      eventObject.units = 1;
    }
    eventObject.left =(containerWidth / width[index]) * (leftOffSetEvents[index] - 1) + 10 //Margin Left of the event
    if (!eventObject.left || eventObject.left < 0) { 
      eventObject.left = 5;
    }
    return eventObject;
  });

  return {
    getSimultaneousEvents,
    getPosition,
    events,
    containerHeight,
    containerWidth,
    minutesPerDay,
    SimultaneousEvents,
    width,
    leftOffSetEvents,
    FormatEventObject,
  };
};

export default useCalendarComponent;
