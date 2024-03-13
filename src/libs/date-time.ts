import moment from "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");

export const getDate = (date: string | Date = new Date()) => {
  return moment(date).utc().toDate();
};

export const getDateTimeFormat = (date: string | Date) => {
  return moment(date).format("LLL");
};

export const getDateFormat = (date: string | Date) => {
  return moment(date).format("LL");
};

export const getIDFormatDate = () => {
  return moment().format("YYMMDD");
};

export default {
  getDate,
  getDateFormat,
  getDateTimeFormat,
  getIDFormatDate,
};
