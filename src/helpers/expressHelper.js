const buildSuccess = (data) => {
  if (data) return { status: 'SUCCESS', data };
  return { status: 'SUCCESS' };
};

const sendApiResponse = (resObject, err, result, statusCode = 200) => {
  if (!err) {
    resObject.status(statusCode).jsonp(buildSuccess(result));
  } else {
    resObject.status(statusCode).jsonp({ errorMessage: err });
  }
};

exports.sendApiResponse = sendApiResponse;
