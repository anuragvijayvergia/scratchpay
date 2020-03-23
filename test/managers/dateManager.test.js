import chai from 'chai';
import moment from 'moment';
import * as dateManager from '../../src/managers/dateManager';

const { expect } = chai;

it('check calculate date diff', () => {
  const outputObject = {
    businessDate: '2018-12-17T00:00:00Z',
    totalDays: 4,
    holidayDays: 0,
    weekendDays: 1,
  };
  const response = dateManager.calculateDateDiff('2018-12-12T10:10:10Z', 3);
  expect(response).to.deep.equal(outputObject);
});

it('check calculate business with holiday', () => {
  const fucnOutput = dateManager.calcucateBusinessDaysWithHolidays(moment('25-12-2018', 'DD-MM-YYYY'), 20);
  expect(fucnOutput.diff(moment('23-01-2019', 'DD-MM-YYYY'), 'days')).to.equal(0);
});

it('check calculate business without holiday', () => {
  const fucnOutput = dateManager.calculateBusinessDaysWithoutHolidays(moment('25-12-2018', 'DD-MM-YYYY'), 20);
  expect(fucnOutput.diff(moment('22-01-2019', 'DD-MM-YYYY'), 'days')).to.equal(0);
});
