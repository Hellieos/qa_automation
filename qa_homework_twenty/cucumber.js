require('dotenv').config();

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['steps/**/*.ts'],
    publishQuiet: true,
    format: ['progress'],
  },
};
