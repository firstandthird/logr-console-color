const Logr = require('logr');

const log = Logr.createLogger({
  type: 'consoleColor',
  reporters: {
    consoleColor: {
      reporter: require('../')
    }
  }
});

log('text without tags');
log(['debug'], 'text with tag');
log(['warning'], 'text with warning tag');
log(['notice'], 'text with notice tag');
log(['success'], 'text with success tag');
log(['error', 'blah'], 'text with error tag');
log(['obj'], {
  text: 'simple object'
});

log(['obj'], {
  text: 'simple object',
  user: '123',
  isAdmin: true,
  name: {
    first: 'James',
    last: 'Smith'
  }
});


log(['obj'], {
  message: 'the message should be first and removed as a field from the obj',
  text: 'simple object',
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
  text: 'simple object',
  user: '123',
  isAdmin: true,
  name: {
    first: 'James',
    last: 'Smith'
  }
});

const logNoColor = Logr.createLogger({
  reporters: {
    consoleColor: {
      reporter: require('../'),
      options: {
        colors: false
      }
    }
  }
});
logNoColor(['error'], {
  text: 'test'
});

const logWithApp = Logr.createLogger({
  type: 'consoleColor',
  reporters: {
    consoleColor: {
      reporter: require('../'),
      options: {
        appColor: true
      }
    }
  }
});

logWithApp('text without tags');
logWithApp(['app1', 'debug'], 'text with tag');
logWithApp(['app1', 'warning'], 'text with warning tag');
logWithApp(['app2', 'notice'], 'text with notice tag');
logWithApp(['app3', 'success'], 'text with success tag');
