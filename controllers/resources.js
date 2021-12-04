const Resource = require('../models/resource');

const getAll = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getOne = async (req, res) => {
  try {
    const resource = await Resource.findOne({ name: req.params.name }).exec();
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  try {
    const resource = new Resource({
      name: req.body.name,
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.json(err).status(500);
  }
};

const update = async (req, res) => {
  try {
    const resource = await Resource.findOne({ name: req.params.name });
    resource.name = req.body.name;
    resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteOne = async (req, res) => {
  try {
    const resource = await Resource.findOne({ name: req.params.name }).exec();
    await resource.delete();
    res.json(resource);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
