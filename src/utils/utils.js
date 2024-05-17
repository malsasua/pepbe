export const dateInYyyyMmDdHhMm = (d) => {
  return (
    (d.getDate().toString().length == 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    "-" +
    ((d.getMonth() + 1).toString().length == 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "-" +
    d.getFullYear().toString() +
    " " +
    (d.getHours().toString().length == 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
      ? (parseInt(d.getMinutes() / 5) * 5).toString()
      : "0" + (parseInt(d.getMinutes() / 5) * 5).toString())
  );
};
