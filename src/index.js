import React from 'react';
import ReactDOM from 'react-dom';
import Breakpoints from './app/Breakpoints'
import './index.css';

let breakpoints = [
  {
    id: 0,
    name: 'Yoda Max',
    width: 460,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 1,
    name: 'Yoda',
    width: 680,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 2,
    name: 'Ewok',
    width: 760,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 3,
    name: 'Luke',
    width: 860,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 4,
    name: 'Vader',
    width: 1000,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 5,
    name: 'Jabba',
    width: 1200,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
  {
    id: 6,
    name: 'ATAT',
    width: 1500,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
  },
];

let queries = [
  {
    id: 0,
    name: 'Mobile',
    points: [320,181],
  },
  {
    id: 1,
    name: 'Tablet',
    points: [600,338],
  },
  {
    id: 2,
    name: 'Desktop',
    points: [1500,554],
  }
];

let multipliers = [

  {
    id: 0,
    name: "1.5x",
    value: 1.5,
    width: 0,
    height: 0,
  },
  {
    id: 1,
    name: "2x",
    value: 2,
    width: 0,
    height: 0,
  },

];


ReactDOM.render(
  <Breakpoints breakpoints={breakpoints} queries={queries} multipliers={multipliers}/>,
  document.getElementById('root')
);
