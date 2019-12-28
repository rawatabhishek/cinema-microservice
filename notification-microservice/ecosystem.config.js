module.exports = {
  apps : [{
    name: 'booking-microservice',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }]
};
