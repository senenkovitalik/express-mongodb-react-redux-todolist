const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('../User');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

describe('User creation', () => {

  beforeEach(done => {
    User.deleteMany({}, err => {
      if (err) return done(err);
      done();
    });
  });

  it('should be invalid if username, email and password not provided', done => {
    const user = new User();
    user.validate(err => {
      expect(err).to.not.equal(null);
      done();
    });
  });

  it('should be invalid if password have wrong length', done => {
    const user = new User({
      username: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'short_p'
    });
    user.validate(err => {
      expect(err).to.not.equal(null);
    });

    const user2 = new User({
      username: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'very_long_long_long_password'
    });
    user2.validate(err => {
      expect(err).to.not.equal(null);
    });

    done();
  });

  it('should save new User without error', done => {
    const user = new User({
      username: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'normal_password'
    });
    const mustNotThrow = function () { user.save(err => {}); };
    expect(mustNotThrow).to.not.throw();
    done();
  });

  it('user password must be hashed', done => {
    const user = new User({
      username: 'John Doe',
      email: 'doe.john@gmail.com',
      password: 'normal_password'
    });

    user.save(() => {
      User.findOne({ 'email': 'doe.john@gmail.com'}, (err, saved_user) => {
        expect('normal_password').to.not.equal(saved_user.password);
        expect(saved_user.password.length).to.equal(60);
        done();
      });
    });
  });

  it('should return Error("User not found") if wrong email passed during auth', done => {
    const user = new User({
      username: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'normal_password'
    });

    user.save(err => {});

    User.authenticate('doe@gmail.com', 'wrong_password', (err) => {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal("User not found");
      done();
    });
  });

  it('should not pass any arguments if auth fails', done => {
    expect(null).to.equal({});
    done();
  });

  it('should pass null as first arg and User object as second arg to callback function if auth success', done => {
    expect(null).to.equal({});
    done();
  });
});