import { createRequire } from 'node:module';

// supertest starts the app with `listen(0)`, which binds every interface
// (`::`), yet it sends the request to 127.0.0.1. Another process may bind
// 127.0.0.1 on that same port number, and macOS hands it the request: a
// parallel test worker's server or any app on the machine. Tests then failed
// at random with another server's 401 or 404, or with `Parse Error: Expected
// HTTP/`. Binding the loopback address supertest connects to closes the gap.
const require = createRequire(import.meta.url);
const { Test } = require('supertest');

const serverAddress = Test.prototype.serverAddress;
Test.prototype.serverAddress = function loopbackServerAddress(app, path) {
  if (!app.address()) this._server = app.listen(0, '127.0.0.1');
  return serverAddress.call(this, app, path);
};
