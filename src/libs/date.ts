import moment from "moment";

export const dateTimeFormat = (date: string | Date) => {
  return moment(date).format("LLL");
};

export const dateFormat = (date: string | Date) => {
  return moment(date).format("LL");
};

export default {
  dateFormat,
  dateTimeFormat,
};
