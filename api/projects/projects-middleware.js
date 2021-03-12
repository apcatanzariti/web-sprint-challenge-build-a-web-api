const Projects = require('./projects-model');

const checkId = async (req, res, next) => {
    try {
      const project = await Projects.get(req.params.id)
      if (!project) {
        res.status(404).json({
          message: `project with id ${req.params.id} does not exist`
        });
      } else {
        req.project = project;
        next();
      }
    } catch {
      res.status(500).json({ message: 'something went wrong checking the Id...' });
    }
  }
  
  const validateProject = (req, res, next) => {
    if (!req.body.name || !req.body.description.trim()) {
      res.status(422).json({
        message: 'all fields must be filled out',
      })
    } else {
      next()
    }
  }
  
  module.exports = {
    checkId,
    validateProject,
  }