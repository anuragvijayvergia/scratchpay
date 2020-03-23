import Joi from '@hapi/joi';

const getBusinessDateWithDelaySchema = Joi.object({
  date: Joi.date().required(),
  delay: Joi.number().required(),
});

export {
  getBusinessDateWithDelaySchema,
};
