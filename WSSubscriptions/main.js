const express = require('express');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter')
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

require('./configs/database')

app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.listen(8000);