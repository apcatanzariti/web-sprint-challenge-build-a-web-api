const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Do NOT `server.listen()` inside this file!

server.use('*', (req, res) => {
    res.send(`I'm working!`);
});

module.exports = server;
