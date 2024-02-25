import moment from "moment";

export const dateTimeFormat = (date: string | Date) => {
  return moment(date).format("LLL");
};
