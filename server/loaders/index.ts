import expressLoader from './express.js';
import mongodbLoader from './mongodb.js';

export default () => {
  expressLoader();
  mongodbLoader();
};
