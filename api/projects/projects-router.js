const express = require('express');

const { checkId, validateProject } = require('./projects-middleware');

const router = express.Router();

const Projects = require('./projects-model');

// GET (/)
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching projects' });
    })
});

// GET (/:id)
router.get('/:id', checkId, (req, res) => {
    res.json(req.project);
});

// POST (/)
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong posting this project' });
    })
});

// PUT (/:id)
router.put('/:id', checkId, validateProject, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Projects.update(id, changes)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong updating this project' });
    })
});

// DELETE (/:id)
router.delete('/:id', checkId, (req, res) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'project has been utterly destroyed' });
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong deleting this project' });
    })
});

//GET (/:id/actions)
router.get('/:id/actions', checkId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong getting the actions for this project' });
    })
});

module.exports = router;
