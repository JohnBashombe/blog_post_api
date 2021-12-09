import request from 'supertest';
import app from '../../app/app';
import db from '../../database/models/index';
import Token from '../../app/helpers/tokenUtils';

import {
  userData,
  blogData,
  expiredToken,
  blogDataUpdate,
} from '../mocks/dummyData';

let token;
beforeAll(async () => {
  const user = await db.User.create(userData);
  const { userId, username, email, phone } = user;
  token = Token.generate({
    userId,
    username,
    email,
    phone,
  });
  token = `Bearer ${token}`;
});

describe('Blog Functionalities', () => {
  it('Should create a blog post', (done) => {
    request(app)
      .post('/blog/create')
      .set('authorization', token)
      .send(blogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('blog created');
        expect(res.statusCode).toBe(201);
        done();
      });
  });

  it('Should not create a blog with an expired token', (done) => {
    request(app)
      .post('/blog/create')
      .set('authorization', expiredToken)
      .send(blogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('unauthorized user');
        expect(res.statusCode).toBe(401);
        done();
      });
  });

  it('Fetch all blog posts', (done) => {
    request(app)
      .get('/blog/posts')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('blog lists');
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('Fetch blog post by postId', (done) => {
    request(app)
      .get('/blog/post/1')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('Blog Details');
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('Update blog post by postId', (done) => {
    request(app)
      .put('/blog/post/1')
      .set('authorization', token)
      .send(blogDataUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('updated');
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('Delete blog post by postId', (done) => {
    request(app)
      .delete('/blog/post/1')
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('deleted');
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});

afterAll(async () => {
  await db.Blog.destroy({
    where: {},
    truncate: true,
  });
  await db.User.destroy({
    where: {},
    truncate: true,
  });
});
