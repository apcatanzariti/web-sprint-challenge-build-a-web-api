const express = require('express');

const { checkId, validateAction } = require('./actions-middleware');

const router = express.Router();

const Actions = require('./actions-model');

// GET (/)
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching actions' });
    })
});

// GET (/:id)
router.get('/:id', checkId, (req, res) => {
    res.json(req.action);
});

// POST (/)
router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong posting this action, or the project does not exist' });
    })
});

// PUT (/:id)
router.put('/:id', checkId, validateAction, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Actions.update(id, changes)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong when updating this action' });
    })
});

// DELETE (/:id)
router.delete('/:id', checkId, (req, res) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'this action has been obliterated' });
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong when deleting this action' });
    })
});

module.exports = router;