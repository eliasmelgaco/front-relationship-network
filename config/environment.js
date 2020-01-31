'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'word-relationship-network',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {
      API_RELATIONSHIP: 'http://localhost:5000'
    },

    'ember-cli-mirage': {
      enabled: false
    }
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.API_RELATIONSHIP = '';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.APP.API_RELATIONSHIP = 'https://back-relationship-network.herokuapp.com';
  }

  return ENV;
};
