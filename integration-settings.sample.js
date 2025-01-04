/* eslint-disable @typescript-eslint/no-require-imports -- configuration file */
'use strict';

/*
 * This is a sample configuration for integration tests
 *
 * Copy this file to <project_root>/integration-settings.js and configure it.
 */

/**
 *
 * If your machine has a fixed IP address facing the outside world
 *
 * 1) Open the configured port (temporarily)
 * $ firewall-cmd --zone=public --add-port=3344/tcp
 *
 * If your machine doesn't have a fixed IP address, get a remote server (VPS)
 * with a fixed IP and forward the port of the local notifications server.
 *
 * 1) On the remote server, set this option in /etc/ssh/sshd_config
 *   GatewayPorts clientspecified
 *
 * 2) Reverse forward the port of your machine to the http port of your remote server.
 * $ ssh remote-user@my-remote-server -R 0.0.0.0:3344:localhost:3344
 *
 * 3) Open the port (temporarily) on the remote server.
 * [remote-user@my-remote-server ~]$ firewall-cmd --zone=public --add-port=3344/tcp
 *
 * 4) Use the domain of your remote server as endpoint. Alternatively, find the
 *    external IP address of your remote server and use it as the endpoint.
 * [remote-user@my-remote-server ~]$ ip address
 *
 */

const { URL } = require('url');

const port = 3344;
const endpoint = `http://external-ip-address-or-domain:${port}`;

/** @type {import('./test/integration/settings').SettingsIntegration} */
const settings = {
  notificationServer: {
    port
  },
  redirectData: {
    merchantURL: new URL('/notification', endpoint).toString(),
    successURL: new URL('/success', endpoint).toString(),
    errorURL: new URL('/error', endpoint).toString()
  },
  threeDS: {
    methodURL: new URL('/notification-3ds-method', endpoint).toString(),
    challengeV1URL: new URL('/post-challenge-v1', endpoint).toString(),
    challengeV2URL: new URL('/post-challenge-v2', endpoint).toString()
  }
};

module.exports = settings;
