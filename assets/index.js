import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App/App.js';
import './sass/styles.scss';

//Base breakpoints for default loading of pages.
const breakpoints = [
  {
    header: ['breakpoints','Name', 'Width'],
  },
  {
    id: 0,
    name: 'Default',
    width: 0,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 1,
    name: 'Yoda',
    width: 460,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 2,
    name: 'Ewok',
    width: 680,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 3,
    name: 'Luke',
    width: 760,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 4,
    name: 'Vader',
    width: 860,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 5,
    name: 'Jabba',
    width: 1000,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 6,
    name: 'ATAT',
    width: 1200,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 7,
    name: 'Deathstar',
    width: 1500,
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
];

// Base media queries for default settings
const imageSizes = [
  {
    header: ['imageSizes','ID', 'Width', 'Height'],
  },
  {
    id: 0,
    points: [320,181],
    breakpoint: 'yoda',
    size: '100vw',
  },
  {
    id: 1,
    points: [600,338],
    breakpoint: 'luke',
    size: '100vw',
  },
  {
    id: 2,
    points: [1200,554],
    breakpoint: 'atat',
    size: '100vw',
  },
];

//Base multipliers for default settings
const multipliers = [
  {
    header: ['multipliers','Resolution', 'Multiplier'],
  },
  {
    id: 0,
    name: '2',
    value: 1.5,
  },
  {
    id: 1,
    name: '2.5',
    value: 2,
  },

];

//style Options is used for the image API in drupal. These are the base selections for default settings.
const styleOptions = [
  {
    name: 'Focal Point Scale and Crop',
    value: 'focal_point_scale_and_crop',
  },
  {
    name: 'Scale and Crop',
    value: 'scale_and_crop',
  },
  {
    name: 'Image Crop',
    value: 'image_crop',
  },
  {
    name: 'Image Resize',
    value: 'image_resize',
  },

];

ReactDOM.render(
  <App
    breakpoints={breakpoints}
    imageSizes={imageSizes}
    multipliers={multipliers}
    styleOptions={styleOptions}
  />,
  document.getElementById('root')
);