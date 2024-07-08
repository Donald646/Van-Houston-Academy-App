import moment from "moment-timezone";

export const formatDate = (timestampz) => {
  // Parse the input timestamp as UTC and convert to local timezone
  const date = moment.utc(timestampz).local();
  return date.format("MMMM DD, YYYY • h:mm A");
};
