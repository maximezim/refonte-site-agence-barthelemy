module.exports = {
  apps: [
    {
      name: 'refonte-site-agence-barthelemy',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};