module.exports = {
  apps : [{
    name: 'cinema-catelog-microservice',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }]
};
