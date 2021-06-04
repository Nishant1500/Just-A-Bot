  var forever = require('forever-monitor'); // Watch The Bot For A Long Time

  var child = new (forever.Monitor)('index.js', {
    max: 3,
    silent: false,
    minUptime: 86400000,
    killTree: true,
    spinSleepTime: 1000,
    args: []
  });

  child.on('exit', function () {
    console.log('index.js has exited after 3 restarts');
  });
  
  child.on('start', function (proccess) {
    console.log('Starting Bot | PID : ' + proccess.pid)
  })
  
  child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

  child.start();
