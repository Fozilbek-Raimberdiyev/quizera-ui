const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabt",
];
export function toDDMMYY(date) {
  let data = new Date(date);
  return `${data.getDate()}-${
    data.getMonth() < 10 ? "0" + (data.getMonth() + 1) : data.getMonth()
  }-${data.getFullYear()}`;
}

export function minusTwoDates(decreasing, separable) {
  let decreasingDate = new Date(decreasing);
  let separableDate = new Date(separable);
  return `${
    decreasingDate.getFullYear() - separableDate.getFullYear() == 0
      ? ""
      : decreasingDate.getFullYear() - separableDate.getFullYear() + " yil"
  } ${
    decreasingDate.getMonth() - separableDate.getMonth() == 0
      ? ""
      : (decreasingDate.getMonth() - separableDate.getMonth() + " oy")
  }   ${decreasingDate.getDate() - separableDate.getDate()}  kun`;
}
