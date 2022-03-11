var DenonCommands,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = DenonCommands = (function() {
  function DenonCommands(dcon) {
    this.dcon = dcon;
    this.cursor = bind(this.cursor, this);
    this.search = bind(this.search, this);
    this.info = bind(this.info, this);
    this.prev = bind(this.prev, this);
    this.next = bind(this.next, this);
    this.stop = bind(this.stop, this);
    this.pause = bind(this.pause, this);
    this.play = bind(this.play, this);
    this.input = bind(this.input, this);
    this.power = bind(this.power, this);
    this.mute = bind(this.mute, this);
    this.volume = bind(this.volume, this);
  }

  DenonCommands.prototype.volume = function(vol) {
    if (vol == null) {
      vol = "?";
    }
    return this.dcon.send("MV", vol);
  };

  DenonCommands.prototype.mute = function(toggle) {
    if (toggle == null) {
      toggle = "?";
    }
    return this.dcon.send("MU", toggle.toUpperCase());
  };

  DenonCommands.prototype.power = function(toggle) {
    if (toggle == null) {
      toggle = "?";
    }
    if (typeof toggle === 'boolean') {
      toggle = toggle === true ? "ON" : "OFF";
    }
    return this.dcon.send("ZM", toggle.toUpperCase());
  };

  DenonCommands.prototype.input = function(value) {
    if (value == null) {
      value = "?";
    }
    return this.dcon.send("SI", value.toUpperCase());
  };

  DenonCommands.prototype.play = function() {
    return this.dcon.send("NS", "9A");
  };

  DenonCommands.prototype.pause = function() {
    return this.dcon.send("NS", "9B");
  };

  DenonCommands.prototype.stop = function() {
    return this.dcon.send("NS", "9C");
  };

  DenonCommands.prototype.next = function() {
    return this.dcon.send("NS", "9D");
  };

  DenonCommands.prototype.prev = function() {
    return this.dcon.send("NS", "9E");
  };

  DenonCommands.prototype.info = function() {
    return this.dcon.send("NSE");
  };

  DenonCommands.prototype.search = function(query) {
    return this.dcon.send("NSD", query);
  };

  DenonCommands.prototype.cursor = function(dir) {
    var code;
    switch (dir.toUpperCase()) {
      case 'UP':
        code = 90;
        break;
      case 'DOWN':
        code = 91;
        break;
      case 'LEFT':
        code = 92;
        break;
      case 'RIGHT':
        code = 93;
        break;
      case 'ENTER':
        code = 94;
    }
    return this.dcon.send("NS", code);
  };

  return DenonCommands;

})();
