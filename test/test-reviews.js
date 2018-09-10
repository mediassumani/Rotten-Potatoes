const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

// SAMPLE data to test EDIT, UPDATE, DELETE ROUTES
const sampleReview = {
  "title": "The most amazing Marvel movie",
   "movie-title": "Thor Ragnarock",
   "description": "Thor and loki was well displayed in the moview"
}

chai.use(chaiHttp);

describe('Reviews', () => {

  // TEST ROUTE : INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
      .get('/')
      .end( (err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

    // TEST ROUTE : NEW
    it('should display new form on /reviews/new GET', (done) => {
      chai.request(server)
        .get(`/reviews/new`)
        .end( (err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        })
    });

    // TEST ROUTE : CREATE
    it('should return a new created review post on /reviews POST', (done) => {
      chai.request(server)
        .post(`/reviews`)
        .end( (err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });

    // TEST ROUTE : SHOW
    it('should display  created /reviews/:id GET', (done) => {
      let review = new Review(sampleReview);
      review.save( (err, data) => {
        chai.request(server)
          .get(`/reviews/${data._id}`)
          .end( (err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });
    });

    // TEST ROUTE : EDIT
    it('should give the user the ability to edit a review /reviews/:id GET', (done) => {
      let review = new Review(sampleReview);
      review.save( (err, data) => {
        chai.request(server)
          .get(`/reviews/${data._id}/edit`)
          .end( (err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          })
      })
    })

    // TEST ROUTE : UPDATE
    it('should update the edited review /reviews/:id PUT', (done) => {
      let review = new Review(sampleReview);
      review.save( (err, data) => {
        chai.request(server)
          .put(`/reviews/${data._id}?_method=PUT`)
          .send({'title': 'updating title'})
          .end( (err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          })

      })
    })

    // TEST ROUTE : DELETE
});
