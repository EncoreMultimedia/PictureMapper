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
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 1,
    name: 'Yoda',
    width: 680,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 2,
    name: 'Ewok',
    width: 760,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 3,
    name: 'Luke',
    width: 860,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 4,
    name: 'Vader',
    width: 1000,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 5,
    name: 'Jabba',
    width: 1200,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 6,
    name: 'ATAT',
    width: 1500,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    style: 'focal_point_scale_and_crop',
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
  },
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

let styleOptions = [


  {
    name: "Focal Point Scale and Crop",
    value: "focal_point_scale_and_crop",
  },
  {
    name: "Scale and Crop",
    value: "scale_and_crop",
  },
  {
    name: "Image Crop",
    value: "image_crop",
  },
  {
    name: "Image Resize",
    value: "image_resize",
  },

];


ReactDOM.render(
  <Breakpoints breakpoints={breakpoints} queries={queries} multipliers={multipliers} styleOptions={styleOptions}/>,
  document.getElementById('root')
);
