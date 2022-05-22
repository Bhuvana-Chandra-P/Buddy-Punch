exports.date = function calculateDate(objectDate) {
  let eventDate = objectDate;
  var date = eventDate.getUTCDate();
  var month = eventDate.getUTCMonth() + 1;
  var year = eventDate.getUTCFullYear();
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var dateList = date + "-" + month + "-" + year;
  return dateList;
};
exports.time = function calculateTime(objectTime) {
  if (objectTime != null) {
    let eventTime = objectTime;
    var hours = eventTime.getUTCHours();
    var minutes = eventTime.getUTCMinutes();
    var seconds = eventTime.getUTCSeconds();
    minutes = minutes+30;
    if(minutes >= 60)
    {
      hours += 6;
      minutes = 60-minutes;
    }
    else{
      hours += 5;
    }

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var timeList = hours + ":" + minutes + ":" + seconds;
  } else {
    var timeList = null;
  }
  return timeList;
};
