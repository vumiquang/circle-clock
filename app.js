const MONTH = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const DATE_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const HOUR = 24;

const clockEle = document.querySelector(".wrap-clock");
const monthParent = document.querySelector(".circle-month");
const dateParent = document.querySelector(".circle-date");
const hourParent = document.querySelector(".circle-hour");
const minuteParent = document.querySelector(".circle-minute");
const secondParent = document.querySelector(".circle-second");
const dayElement = document.querySelector(".year-day .day");
const yearElement = document.querySelector(".year-day .year");
function checkLeapYear(year) {
  return year % 4 == 0 && year % 100 != 0;
}

function generateArray(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i.toString().padStart(2, "0"));
  }
  return arr;
}

function generateTimeDom(parent, arr, type) {
  const gapDeg = Math.round(360 / arr.length);
  let html = "";
  arr.forEach((item, index) => {
    const eleHtml = `<div id="${type}-${index}" class="circle" style=" transform:rotateZ(${
      gapDeg * index
    }deg)">${item}</div>`;
    html += eleHtml;
  });
  parent.innerHTML = html;
}

function getDatePerMonth(date) {
  const month = date.getMonth();
  const isLeafYear = checkLeapYear(date.getFullYear());
  if (month == 1 && isLeafYear) return 29;
  return DATE_OF_MONTH[month];
}

function setActiveCircle(parent, currentValue, count, currentId) {
  const gapDeg = Math.round(360 / count);

  parent.style = `transform: rotateZ(${currentValue * -gapDeg}deg)`;
  const currentActiveEle = parent.querySelector(".active");
  if (currentActiveEle) currentActiveEle.classList.remove("active");
  const nextEle = document.getElementById(currentId);
  if (nextEle) nextEle.classList.add("active");
}

(function () {
  fitClock();
  const now = new Date();
  let currentMinute = now.getMinutes();
  let currentHour = now.getHours();
  let currentDate = now.getDate() - 1;
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();
  let currentDay = now.getDay();

  yearElement.innerHTML = currentYear;
  dayElement.innerHTML = DAYS[currentDay];
  generateTimeDom(monthParent, MONTH, "month");
  generateTimeDom(dateParent, generateArray(1, getDatePerMonth(now)), "date");
  generateTimeDom(hourParent, generateArray(0, 23), "hour");
  generateTimeDom(minuteParent, generateArray(0, 59), "minute");
  generateTimeDom(secondParent, generateArray(0, 59), "second");

  setActiveCircle(monthParent, currentMonth, 12, `month-${currentMonth}`);
  setActiveCircle(
    dateParent,
    currentDate,
    getDatePerMonth(now),
    `date-${currentDate}`
  );
  setActiveCircle(hourParent, currentHour, 24, `hour-${currentHour}`);
  setActiveCircle(minuteParent, currentMinute, 60, `minute-${currentMinute}`);
  setActiveCircle(
    secondParent,
    now.getSeconds(),
    60,
    `second-${now.getSeconds()}`
  );

  setInterval(() => {
    const currentTime = new Date();
    const newMinute = currentTime.getMinutes();
    const newHour = currentTime.getHours();
    const newDate = currentTime.getDate() - 1;
    const newMonth = currentTime.getMonth();
    const newYear = currentTime.getFullYear();
    const newDay = currentTime.getDay();

    setActiveCircle(
      secondParent,
      currentTime.getSeconds(),
      60,
      `second-${currentTime.getSeconds()}`
    );
    if (currentMinute != newMinute) {
      currentMinute = newMinute;
      setActiveCircle(
        minuteParent,
        currentMinute,
        60,
        `minute-${currentMinute}`
      );
    }
    if (currentHour != newHour) {
      currentHour = newHour;
      setActiveCircle(hourParent, currentHour, 24, `hour-${currentHour}`);
    }
    if (currentDate != newDate) {
      currentDate = newDate;
      setActiveCircle(
        dateParent,
        currentDate,
        getDatePerMonth(now),
        `date-${currentDate}`
      );
    }
    if (currentMonth != newMonth) {
      currentMonth = newMonth;
      setActiveCircle(monthParent, currentMonth, 12, `month-${currentMonth}`);
      generateTimeDom(
        dateParent,
        generateArray(1, getDatePerMonth(currentTime)),
        "date"
      );
    }
    if (newYear != currentYear) {
      currentYear = newYear;
      yearElement.innerHTML = currentYear;
    }
    if (newDay != currentDay) {
      currentDay = newDay;
      dayElement.innerHTML = DAYS[currentDay];
    }
  }, 1000);
})();

function fitClock() {
  const rect = clockEle.getBoundingClientRect();
  const minSize = rect.width < rect.height ? rect.width : rect.height;
  const scale = (minSize / 865).toFixed(1);
  clockEle.style = `transform: scale(${scale});`;
}
