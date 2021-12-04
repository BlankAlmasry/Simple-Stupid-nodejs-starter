const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Resource = require('../models/resource');
require('dotenv').config();

describe('resources api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should find and return a all resource on /resources', () => request(app)
    .get('/resources')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
        }),
      ]));
    }));
  it('should return a resource when fetched by his ip /resources/:id ', () => {
    const resource = new Resource({
      name: 'test101',
    });
    return resource.save()
      .then(() => request(app)
        .get(`/resources/${resource.name}`)
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
          }));
        }));
  });
  it('should return 404 if a resource didn\'t exist get /resources/:id', () => request(app)
    .get('/resources/5e9f8f9f9f9f9f9f9f9f9f9')
    .expect(404));

  it('should return 201 if resource created on post /resources', async () => {
    const resourcesCount = await Resource.countDocuments({});
    const req = await request(app)
      .post('/resources')
      .send({
        name: 'test101',
      });
    expect(req.statusCode).toBe(201);
    expect(req.body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      name: 'test101',
    }));
    const currentResourcesCount = await Resource.countDocuments({});
    expect(currentResourcesCount).toBe(resourcesCount + 1);
  });

  it('should update a post on patch /resources/:id', () => {
    const resource = new Resource({
      name: 'test101',
    });
    return resource.save()
      .then(() => request(app)
        .patch(`/resources/${resource.name}`)
        .send({
          name: 'test102',
        })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: 'test102',
          }));
        }));
  });

  it('should delete a post on delete /resources/:id', () => {
    const resource = new Resource({
      name: (Math.random() + 1).toString(36).substring(7),
    });
    return resource.save()
      .then(() => request(app)
        .delete(`/resources/${resource.name}`)
        .then(async (res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: resource.name,
          }));
          expect(await Resource.findOne({ name: resource.name })).toBe(null);
        }));
  });
});
