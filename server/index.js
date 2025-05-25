const express = require('express') ;
const cors = require('cors');
const bodyParser = require('body-parser');
const explainRoute = require('./routes/explainRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/explain', explainRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));