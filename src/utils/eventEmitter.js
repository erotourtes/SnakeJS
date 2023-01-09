class EventEmitter {
  events = {};

  on(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach((cb) => cb(...args));
  }
}

export default EventEmitter;
