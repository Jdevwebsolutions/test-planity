import React from 'react';
import ReactDOM from 'react-dom';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';

export default function App() {
    ReactDOM.render(
        <CalendarComponent />,
      document.getElementById('root')
    );
};


