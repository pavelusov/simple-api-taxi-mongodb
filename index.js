const app = require('./server/app');

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log('Running app with port %s', PORT);
});
