var gui = require('nw.gui');
var server = require('./server')


server.startServer();
gui.Window.open('http://localhost:8080/', {
    position: 'center',
    width: 1410,
    height: 700,
    show: true
});