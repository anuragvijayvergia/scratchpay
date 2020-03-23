import { getBusinessDateWithDelaySchema } from './requestSchema/businessDatesAPISchema';
import { sendApiResponse } from '../helpers/expressHelper';
import { calculateDateDiff } from '../managers/dateManager';

const getBusinessDateWithDelay = (req, res) => {
  const { error, value } = getBusinessDateWithDelaySchema.validate(req.query);
  if (error) {
    const { message } = error.details[0];
    sendApiResponse(res, message, null, 400);
  } else {
    const output = calculateDateDiff(value.date, value.delay);
    sendApiResponse(res, null, output);
  }
};

exports.getBusinessDateWithDelay = getBusinessDateWithDelay;
