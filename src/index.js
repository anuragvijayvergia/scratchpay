import express from 'express';
import pino from 'express-pino-logger';
import bodyParser from 'body-parser';
import postal from 'postal';
import * as businessDatesApiHandler from './requestHandler/businessDatesApiHandler';
import * as businessDatesPubSubHandler from './requestHandler/businessDatesPubSubHandler';

const app = express();
const pinoLogger = pino();
const apiRouterV1 = express.Router();
app.use(pinoLogger);


apiRouterV1.use((req, res, next) => {
  /**
     * Interface to add security validation like JWT token verification
     */
  next();
});

apiRouterV1.get('/businessDates/getBusinessDateWithDelay', businessDatesApiHandler.getBusinessDateWithDelay);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use('/api/v1', apiRouterV1);

postal.subscribe({
  channel: 'BankWire',
  topic: 'businessDates',
  callback(data, envelope) {
    businessDatesPubSubHandler.getBusinessDateWithDelay(data);
  },
});


/**
 * test post api to publish test data on pub sub
 */

app.post('/test', (req, res) => {
  postal.publish({
    channel: 'BankWire',
    topic: 'businessDates',
    data: {
      date: '2018-12-12T10:10:10Z',
      delay: 20,
    },
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Mail - RESTful API running on http://localhost:3000');
});

module.exports = app;
