import request from 'supertest';
import app from '../../app/app';
import db from '../../database/models/index';

import {
  userData,
  userDataLogin,
  userDataFakeUsername,
  userDataFakePassword,
  userDataExistingEmail,
  userDataExistingPhone,
} from '../mocks/dummyData';

describe('User Functionalities', () => {
  it('Should create a user in the database', (done) => {
    request(app)
      .post('/user/auth/signup')
      .send(userData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('created');
        expect(res.statusCode).toBe(201);
        done();
      });
  });

  it('Should not create a user with the same username in the database', (done) => {
    request(app)
      .post('/user/auth/signup')
      .send(userData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('Username taken already');
        expect(res.statusCode).toBe(409);
        done();
      });
  });

  it('Should not create a user with the same email in the database', (done) => {
    request(app)
      .post('/user/auth/signup')
      .send(userDataExistingEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('Email taken already');
        expect(res.statusCode).toBe(409);
        done();
      });
  });

  it('Should not create a user with the same phone number in the database', (done) => {
    request(app)
      .post('/user/auth/signup')
      .send(userDataExistingPhone)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('Phone taken already');
        expect(res.statusCode).toBe(409);
        done();
      });
  });

  it('Should loggin the user in the system with usename and password', (done) => {
    request(app)
      .get('/user/auth/signin')
      .send(userDataLogin)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('success');
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('Should not loggin the user with a fake username', (done) => {
    request(app)
      .get('/user/auth/signin')
      .send(userDataFakeUsername)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('wrong username or password');
        expect(res.statusCode).toBe(409);
        done();
      });
  });

  it('Should not loggin the user with a fake password', (done) => {
    request(app)
      .get('/user/auth/signin')
      .send(userDataFakePassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toEqual('wrong username or password');
        expect(res.statusCode).toBe(409);
        done();
      });
  });
});

afterAll(async () => {
  await db.User.destroy({
    where: {},
    truncate: true,
  });
});
