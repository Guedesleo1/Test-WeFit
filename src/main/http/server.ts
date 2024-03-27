import app from './app';

const port =  process.env.PORT || 4568;

app.listen(port, () => { console.log(`Server is running on port ${port}`); });