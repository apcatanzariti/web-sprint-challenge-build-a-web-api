const Actions = require('./actions-model');

const checkId = async (req, res, next) => {
    try {
      const action = await Actions.get(req.params.id)
      if (!action) {
        res.status(404).json({
          message: `action with id ${req.params.id} does not exist`
        });
      } else {
        req.action = action;
        next();
      }
    } catch {
        res.status(500).json({ message: 'something went wrong checking the Id...' });
    }
  }
  
  const validateAction = (req, res, next) => {
    if (!req.body.description || !req.body.notes.trim()) {
      res.status(422).json({
        message: 'all fields must be filled out',
      })
    } else {
      next()
    }
  }
  
  module.exports = {
    checkId,
    validateAction,
  }