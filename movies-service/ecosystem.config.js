module.exports = {
  apps : [{
    name: 'movie-microservice',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }]
};
