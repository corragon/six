export const DateOnly = function(date) {
  date = date ? date : new Date();
  date.setHours(0,0,0,0);
  return date;
}