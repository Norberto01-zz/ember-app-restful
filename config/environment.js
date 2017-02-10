/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false,
        Array: true
      }
    },

    APP: {
      API_AUTH: 'api/v1/auth-token/',
      API_NAMESPACE_V1: 'api/v1',
      API_NAMESPACE_V2: 'api/v2',
      API_NAMESPACE_V3: 'api',
      API_HOST_V1: 'http://localhost:4200/api/v1',
      API_HOST_V2: '',
      API_HOST_V3: 'http://localhost:4200/prepymerest/public/index.php',

      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };
  ENV.APP.API_LARAVEL = ENV.APP.API_HOST_V3 +'/'+ ENV.APP.API_NAMESPACE_V3;

  if (environment === 'development') {
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:django',
    authenticationRoute: 'signin',
    routeAfterAuthentication: '',
    serverAuthEndpoint: ENV.APP.API_AUTH
  };

  ENV.contentSecurityPolicy = {
    'connect-src': "'self' http://localhost:4200 http://localhost:8000 http://192.168.1.244",
    'font-src' : "'self' http://*.gstatic.com http://*.googleapis.com",
    'style-src': "'self' http://*.googleapis.com",
    'script-src': "'self' http://localhost:4200 http://localhost:8000 http://192.168.1.244",
    'img-src': "'self' http://localhost:4200 http://localhost:8000",
    'object-src': "http://localhost:4200",
    'unsafe-inline': "'self' http://*.googleapis.com",
  };


  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.API_HOST = 'http://localhost:4200';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.serviceWorker = {
      precachedURLs: [
        '/api/*',
      ],
      networkFirstURLs: [
        '/api/*',
      ],
      fastestURLs: [
        '/index.html',
        '/assets/*',
        '',
        'index.html',
        'assets/*',
      ],
    };
  }

  if (environment === 'production') {
    ENV.serviceWorker = {
      precachedURLs: [
        '/api/*',
      ],
      networkFirstURLs: [
        '/api/*',
      ],
      fastestURLs: [
        '/index.html',
        '/assets/*',
        '',
        'index.html',
        'assets/*',
      ],
    };
    ENV.manifest = {
      enabled: true,
      appcacheFile: "/manifest.appcache",
      excludePaths: ['index.html'],
      includePaths: ['/'],
      network: ['*'],
      showCreateDate: true,
    };
  }
  ENV.ENABLE_DS_FILTER = true;
  // window.EmberENV = window.EmberENV || {};
  // window.EmberENV.ENABLE_DS_FILTER = true;

  return ENV;
};
