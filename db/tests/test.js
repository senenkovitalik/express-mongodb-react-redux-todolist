const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('../User');
const {TaskList} = require('../TaskList');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

describe("User", () => {

  describe('Creation', () => {

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

  });

  describe('Authentication', () => {

    beforeEach(done => {
      User.deleteMany({}, err => {
        if (err) return done(err);
        done();
      });
    });

    it('should return Error("User not found") if wrong email passed during auth', done => {
      const user = new User({
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'normal_password'
      });

      user.save(err => {});

      User.authenticate('doe@gmail.com', 'normal_password', (err) => {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal("User not found");
        expect(err.status).to.equal(401);
        done();
      });
    });

    it('should not pass any arguments to callback function if auth fails', done => {
      const user = new User({
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'normal_password'
      });

      user.save(() => {
        User.authenticate('john.doe@gmail.com', 'wrong_password', function (err, user) {
          expect(err).to.be.undefined;
          expect(user).to.be.undefined;
          done();
        });
      });
    });

    it('should pass null and User object to callback function if auth success', done => {
      const user = new User({
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'normal_password'
      });

      user.save((err, s_user) => {
        User.authenticate('john.doe@gmail.com', 'normal_password', (err, r_user) => {
          expect(err).to.be.null;
          expect(r_user._doc).to.deep.equal(s_user._doc);
          done();
        });
      });
    });
  });

});

function clearTaskListCollection(done) {
  TaskList.deleteMany({}, err => {
    if (err) return done(err);
    done();
  });
}

describe("Task List", () => {

  describe("Creation", () => {

    beforeEach(done => clearTaskListCollection(done));

    it('should be invalid if list title not provided', done => {
      const list = new TaskList();
      list.validate(err => {
        expect(err.errors['title'].message).to.equal('Path `title` is required.');
        done();
      })
    });

    it('should be invalid if list title too long or too short', done => {
      const list_short = new TaskList({ title: "s" });
      list_short.validate(err => {
        expect(err.errors['title'].message).to.equal('Path `title` (`s`) is shorter than the minimum allowed length (3).');
      });

      const list_long = new TaskList({ title: "very_very_very_very_long_long_long_" });
      list_long.validate(err => {
        expect(err.errors['title'].message).to.equal('Path `title` (`very_very_very_very_long_long_long_`) is longer than the maximum allowed length (30).');
      });

      done();
    });

    it('should be invalid if list title not unique', done => {
      const list1 = new TaskList({ title: "Unique title" });
      list1.save(err => {
        const list2 = new TaskList({ title: "Unique title" });
        list2.save(err => {
          expect(err.name).to.equal('BulkWriteError');
          expect(err.message).to.equal('E11000 duplicate key error collection: test.tasklists index: title_1 dup key: { : "Unique title" }');
          done();
        });
      });
    });

    it('visibility filter should have default value `SHOW_ACTIVE`', done => {
      const list = new TaskList({ title: "List #1" });
      list.save((err, list) => {
        expect(list.visibility_filter).to.equal('SHOW_ACTIVE');
        done();
      });
    });

  });

  describe('Visibility filter', () => {

    beforeEach(done => clearTaskListCollection(done));

    it('change visibility filter to `SHOW_COMPLETED`', done => {
      const list = new TaskList({ title: "List #1" });
      list.save(err => {
        if (err) done(err);
          TaskList.findOneAndUpdate(
            { title: "List #1" },
            { 'visibility_filter': 'SHOW_COMPLETED'},
            { 'new': true },
            (err, result) => {
              expect(result.visibility_filter).to.equal('SHOW_COMPLETED');
              done();
            }
          );
      });
    });

  });

  describe('Tasks', () => {

    beforeEach(done => clearTaskListCollection(done));

    it('add new task', done => {
      const list = new TaskList({ title: "List #1" });
      list.save(err => {
        if (err) done(err);
        const task = {};
        TaskList.updateOne(
          { title: "List #1"},
          { tasks: { $push: task } },
          { 'runValidators': true },
          (err, result) => {
            if (err) done(err);
            console.log(err);
            console.log(result);
            done();
          }
        );
      });
    });

    // it('change task title', () => {
    //
    // });
    //
    // it('change task status', () => {
    //
    // });

  });

});