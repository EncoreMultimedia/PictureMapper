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
    name: 'Yoda Max',
    width: 460,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 320,
      height: 181,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 1,
    name: 'Yoda',
    width: 680,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 2,
    name: 'Ewok',
    width: 760,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 3,
    name: 'Luke',
    width: 860,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 4,
    name: 'Vader',
    width: 1000,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 5,
    name: 'Jabba',
    width: 1200,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
    image: {
      width: 0,
      height: 0,
    },
    style: 'focal_point_scale_and_crop',
  },
  {
    id: 6,
    name: 'ATAT',
    width: 1500,
    height: 0,
    aspectRatio: 0,
    multipliers: [],
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
  },
  {
    id: 1,
    points: [600,338],
    breakpoint: 'luke',
  },
  {
    id: 2,
    points: [1500,554],
    breakpoint: 'atat',
  },
];

//Base multipliers for default settings
const multipliers = [
  {
    header: ['multipliers','Name', 'Value'],
  },
  {
    id: 0,
    name: '2',
    value: 1.5,
    width: 0,
    height: 0,
  },
  {
    id: 1,
    name: '2.5',
    value: 2,
    width: 0,
    height: 0,
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