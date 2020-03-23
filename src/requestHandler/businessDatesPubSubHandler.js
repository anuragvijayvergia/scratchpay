import { getBusinessDateWithDelaySchema } from './requestSchema/businessDatesAPISchema';
import { calculateDateDiff } from '../managers/dateManager';

const getBusinessDateWithDelay = (dateDelayObj) => {
  const { error, value } = getBusinessDateWithDelaySchema.validate(dateDelayObj);
  if (error) {
    // todo : Publish error

  } else {
    const output = calculateDateDiff(dateDelayObj.date, dateDelayObj.delay);
    // todo: publish output to appropriate channel
  }
};

exports.getBusinessDateWithDelay = getBusinessDateWithDelay;
