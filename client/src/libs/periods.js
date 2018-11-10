export const periods = (function() {

  // ########## Constants ##########

  const TODAY = "TODAY";
  const TOMORROW = "TOMORROW";
  const END_OF_WEEK = "END_OF_WEEK";
  const NEXT_WEEK = "NEXT_WEEK";
  const END_OF_MONTH = "END_OF_MONTH";
  const NEXT_MONTH = "NEXT_MONTH";

  const _days = {
    0: 31,
    1: new Date().getUTCFullYear() % 4 ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
  };

  // ########## Period ##########

  function Period(name, date) {
    this.name = name;
    this.start = new Date(date);
    this.end = new Date(date);
  }

  Period.prototype.setStartEndTime = function() {
    this.start.setHours(0);
    this.start.setMinutes(0);
    this.start.setSeconds(0);
    this.start.setMilliseconds(0);
    this.end.setHours(23);
    this.end.setMinutes(59);
    this.end.setSeconds(59);
    this.end.setMilliseconds(999);

    return this;
  };

  Period.prototype.print = function() {
    console.log(this.name);
    console.log(this.start instanceof Date ? this.start.toLocaleString() : null);
    console.log(this.start instanceof Date ? this.end.toLocaleString() : null);
    console.log("");
  };

  //  ########## Periods ##########

  let now          = null;
  let monthes      = null;
  let currentMonth = 0;
  let today        = null;
  let tomorrow     = null;
  let end_of_week  = null;
  let next_week    = null;
  let end_of_month = null;
  let next_month   = null;

  function _getToday() {
    today = new Period(TODAY, now);
    today.setStartEndTime();
  }

  function _getTomorrow() {
    tomorrow = new Period(TOMORROW, now);
    const nextDay = today.start.getDate() + 1;

    tomorrow.start.setDate(nextDay);
    tomorrow.end.setDate(nextDay);

    tomorrow.setStartEndTime();

    // tomorrow may be at new month
    _computeCurrentMonth(tomorrow.start);
    _computeCurrentWeek(tomorrow.start);
  }

  function _getEndOfWeek() {
    end_of_week = new Period(END_OF_WEEK, now);

    const month = monthes[currentMonth];
    const week = month.week;
    const currentWeek = month.weeks[week];

    // Are tomorrow end of week?
    if (tomorrow.start.getDate() === currentWeek.end) {
      // end of week
      end_of_week.start = null;
      end_of_week.end = null;
    } else {
      // not end of week
      const nextDay = tomorrow.start.getDate() + 1;
      end_of_week.start.setDate(nextDay);
      end_of_week.end.setDate(currentWeek.end);
      end_of_week.setStartEndTime();
    }
  }

  function _getNextWeek() {
    next_week = new Period(NEXT_WEEK, now);

    // Need to do something with it
    const month = monthes[currentMonth];
    const week = month.week;
    const currentWeek = month.weeks[week];

    const prop = parseInt(week) + 1;

    if (month.weeks[prop]) {
      // we have next week!!!
      next_week.start.setDate(month.weeks[prop].start);
      next_week.end.setDate(month.weeks[prop].end);
      next_week.setStartEndTime();
    } else {
      next_week.start = null;
      next_week.end = null;
    }
  }

  function _getEndOfMonth() {
    end_of_month = new Period(END_OF_MONTH, now);

    // Need to do something with it
    const month = monthes[currentMonth];
    const week = month.week;
    const currentWeek = month.weeks[week];

    let i = parseInt(week) + 2;
    let first = null;
    let last = null;

    while(month.weeks[i]) {
      if (!first) {
        first = month.weeks[i];
      }
      last = month.weeks[i];
      i++;
    }

    if (first === null) {
      end_of_month.start = null;
      end_of_month.end = null;
    } else {
      end_of_month.start.setDate(first.start);
      end_of_month.end.setDate(last.end);
      end_of_month.setStartEndTime();
    }
  }

  function _getNextMonth() {
    next_month = new Period(NEXT_MONTH, now);

    const { month: nextMonthNumber, days } = monthes[parseInt(currentMonth) + 1];

    next_month.start.setMonth(nextMonthNumber);
    next_month.start.setDate(1);

    next_month.end.setMonth(nextMonthNumber);
    next_month.end.setDate(days);

    next_month.setStartEndTime();
  }

  function _convert(day) {
    const mapping = {
      0: 6,
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5
    };

    return mapping[day];
  }

  function _computeWeeks(now) {
    const weeks = {};
    const n = new Date(now);
    let end = false;
    let i = 0;

    while (!end) {
      const date = n.getUTCDate();
      const month = n.getUTCMonth();
      const day = n.getUTCDay();
      const currentWeek = null;

      if (date < _days[month]) {
        let delta = 6 - _convert(day);

        if (date + delta > _days[month]) {
          delta = _days[month] - date;
          end = true;
        }

        weeks[i] = { start: date, end: date + delta };
        n.setUTCDate(date + delta + 1);
        i++;
      } else {
        weeks[i] = { start: date, end: date };
        end = true;
      }
    }

    return weeks;
  }

  function _computeMonthes(date) {

    const d = new Date(date);
    const monthes = {};

    for(let i = 0; i <= 2; i++) {
      const month = d.getMonth();
      const dys = _days[month];
      const weeks = _computeWeeks(d);

      Object.assign(monthes, {
        [i]: {
          month,
          days: dys,
          weeks
        }
      });

      d.setDate(1);
      d.setMonth(month + 1);
    }

    return monthes;
  }

  function _computeCurrentMonth(date) {
    const month = date.getMonth();

    for(let i in monthes) {
      if (monthes[i].month === month) {
        currentMonth = i;
      }
    }
  }

  function _computeCurrentWeek(date) {
    const d = new Date(date);

    const weeks = monthes[currentMonth].weeks;

    for(let i in weeks) {
      if (d.getDate() >= weeks[i].start && d.getDate() <= weeks[i].end) {
        Object.assign(monthes[currentMonth], {
          week: i
        });
      }
    }
  }

  // todo check how much times func calls
  function create(date) {

    // if (now !== null) {
    //   console.log("Periods already created.");
    //   return;
    // }

    now = date === undefined
      ? new Date()
      : new Date(date);

    monthes = _computeMonthes(now);
  }

  function computePeriods() {
    _getToday();
    _getTomorrow();
    _getEndOfWeek();
    _getNextWeek();
    _getEndOfMonth();
    _getNextMonth();

    return {
      today,
      tomorrow,
      end_of_week,
      next_week,
      end_of_month,
      next_month
    }
  }

  return {
    create,
    computePeriods
  }
})();
