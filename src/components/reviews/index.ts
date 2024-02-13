import { lazy } from 'react';

const Reviews = lazy(
  () => import('./reviews' /* webpackChunkName: "channels" */)
);

export default Reviews;
