import app from './Server';
const port = Number(process.env.PORT || 8080);
app.listen(port, 'localhost', () => {
  console.log(`Port ${port} opening!`);
});
