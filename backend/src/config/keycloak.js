const session = require("express-session");
const Keycloak = require("keycloak-connect");

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: "tailorshop",
  "auth-server-url": "http://keycloak:8080",
  "ssl-required": "external",
  resource: "tailorshop-api",
  "bearer-only": true,
  "confidential-port": 0,
  credentials: {
    secret: "1Fow7h1F09OwInEfsadRDnhFlKAs6RfF"
  }
});

module.exports = {
  keycloak,
  memoryStore
};