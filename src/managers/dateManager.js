import moment from 'moment-business-days';
import fs from 'fs';
import path from 'path';

const holidayJsonPath = '../data/holidays.json';
const holidayJson = JSON.parse(fs.readFileSync(path.join(__dirname, holidayJsonPath), 'utf-8'));
const holidayArr = holidayJson['2018'].concat(holidayJson['2019']);

moment.updateLocale('holiday', {
  holidays: holidayArr,
  holidayFormat: 'DD-MM-YYYY',
});

moment.updateLocale('none', {
  holidays: [],
  holidayFormat: 'DD-MM-YYYY',
});

const calculateBusinessDaysWithoutHolidays = (date, delay) => {
  const dt = moment(date).locale('none');
  return dt.businessAdd(delay);
};

const calcucateBusinessDaysWithHolidays = (date, delay) => {
  const dt = moment(date).locale('holiday');
  return dt.businessAdd(delay);
};

const calculateDateDiff = (startDate, delay) => {
  const useDate = moment(startDate).utc();
  const dateWithDelay = moment(useDate).add(delay, 'days');
  const dateBusiness = calculateBusinessDaysWithoutHolidays(useDate, delay);
  const dateBusinessWithHoliday = calcucateBusinessDaysWithHolidays(useDate, delay);
  const numberOfWeekend = dateBusiness.diff(dateWithDelay, 'days');
  const numberOfHolidays = dateBusinessWithHoliday.diff(dateBusiness, 'days');
  const totalDays = dateBusinessWithHoliday.diff(useDate, 'days');
  return {
    businessDate: dateBusinessWithHoliday.utc().format(),
    totalDays,
    holidayDays: numberOfHolidays,
    weekendDays: numberOfWeekend,
  };
};

export {
  calculateBusinessDaysWithoutHolidays,
  calcucateBusinessDaysWithHolidays,
  calculateDateDiff,
};
