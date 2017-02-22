const Logr = require('logr');

const log = Logr.createLogger({
  type: 'consoleColor',
  reporters: {
    consoleColor: {
      reporter: require('../')
    }
  }
});

log('message without tags');
log(['debug'], 'message with tag');
log(['warning'], 'message with warning tag');
log(['notice'], 'message with notice tag');
log(['success'], 'message with success tag');
log(['error', 'blah'], 'message with error tag');
log(['obj'], {
  message: 'simple object'
});

log(['obj'], {
  message: 'simple object',
  user: '123',
  isAdmin: true,
  name: {
    first: 'James',
    last: 'Smith'
  }
});

const logNoTimestamp = Logr.createLogger({
  reporters: {
    consoleColor: {
      reporter: require('../'),
      options: {
        timestamp: false
      }
    }
  }
});

logNoTimestamp(['obj'], {
  message: 'simple object',
  user: '123',
  isAdmin: true,
  name: {
    first: 'James',
    last: 'Smith'
  }
});
