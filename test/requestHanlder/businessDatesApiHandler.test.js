import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/index';

chai.should();
const { expect } = chai;

chai.use(chaiHttp);
describe('GET /api/v1/businessDates/getBusinessDateWithDelay', () => {
  it('it should return next business date after the delay ', (done) => {
    const successObject = {
      status: 'SUCCESS',
      data: {
        businessDate: '2018-12-17T00:00:00Z',
        totalDays: 4,
        holidayDays: 0,
        weekendDays: 1,
      },
    };
    chai.request(server)
      .get('/api/v1/businessDates/getBusinessDateWithDelay?date=2018-12-12T10:10:10Z&delay=3')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(successObject);
        done();
      });
  });
  it('it should return next business date after the delay ', (done) => {
    const returnObject = {
      errorMessage: '"date" must be a valid date',
    };
    chai.request(server)
      .get('/api/v1/businessDates/getBusinessDateWithDelay?date=&delay=3')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).to.deep.equal(returnObject);
        done();
      });
  });
});
