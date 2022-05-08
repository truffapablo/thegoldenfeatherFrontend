import moment from "moment";

export const convertDate = (date, format = 'DD-MM-YYYY') => {
    const dbdate = moment(date).utc().format(format)
    return dbdate;
}