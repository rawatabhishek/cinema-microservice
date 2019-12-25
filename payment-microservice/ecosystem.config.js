module.exports = {
  apps : [{
    name: 'payment-microservice',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }]
};
