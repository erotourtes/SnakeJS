class EventEmitter {
  events = {};

  on(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    const event = this.events[eventName];
    if (!event) return;

    event.forEach((cb) => cb(...args));
  }
}

export default EventEmitter;
