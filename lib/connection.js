var DenonConnection,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = DenonConnection = (function() {
  function DenonConnection() {
    this.send = bind(this.send, this);
    this.response = bind(this.response, this);
    this.connect = bind(this.connect, this);
    this.socket = new (require('net')).Socket({
      allowHalfOpen: true
    });
    this.socket.setTimeout(250);
    this.socket.setEncoding('utf8');
    this.connected = false;
    this.queue = [];
  }

  DenonConnection.prototype.connect = function(host, port, cb) {
    this.host = host;
    this.port = port != null ? port : 23;
    if (this.connected) {
      return cb();
    }
    return this.socket.connect(this.port, this.host, (function(_this) {
      return function() {
        _this.connected = true;
        setInterval(function() {
          var cmd;
          cmd = _this.queue.shift();
          if (cmd) {
            return _this.socket.write(cmd);
          }
        }, 1000);
        return cb();
      };
    })(this));
  };

  DenonConnection.prototype.response = function(cb) {
    var commands;
    commands = {
      power: /^PW([A-Z]+)/,
      volume: /^MV([0-9]+)/,
      mute: /^MU([A-Z]+)/,
      input: /^SI(.+)/,
      info: /^NSE/
    };
    return this.socket.on("data", (function(_this) {
      return function(buffer) {
        var cmd, data, found, i, len, line, match, parts, regex, rows, splitted;
        data = buffer.toString().trim();
        found = null;
        for (cmd in commands) {
          regex = commands[cmd];
          if (match = data.match(regex)) {
            found = {
              match: match,
              command: cmd
            };
            break;
          }
        }
        if (found) {
          switch (found.command) {
            case 'info':
              rows = {};
              splitted = match.input.trim().split(/\r/);
              for (i = 0, len = splitted.length; i < len; i++) {
                line = splitted[i];
                parts = line.match(/^NSE([0-9])(.*)/);
                if (parts && parts[1] && parts[2]) {
                  rows[parts[1]] = parts[2].toString();
                }
              }
              return cb(found.command, rows, match);
            default:
              return cb(found.command, match[1], match);
          }
        }
      };
    })(this));
  };

  DenonConnection.prototype.send = function(command, param) {
    if (param == null) {
      param = "";
    }
    return this.queue.push("" + command + param + "\r");
  };

  return DenonConnection;

})();