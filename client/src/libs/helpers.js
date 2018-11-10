import { VisibilityFilter } from "../redux/actions";
import { periods } from "./periods";

function filterByDate(ps, tasks, period) {

  let start, end, condition;

  switch (period) {
    case 'missed':
      start = ps.today.start;
      condition = (start, end, dueDate) => dueDate.getTime() < start.getTime();
      break;
    case 'later':
      end = ps.next_month.end;
      condition = (start, end, dueDate) => dueDate.getTime() > end.getTime();
      break;
    default:
      start = ps[period].start;
      end = ps[period].end;
      condition = (start, end, dueDate) => {
        return start && end
          ? dueDate.getTime() >= start.getTime() && dueDate.getTime() <= end.getTime()
          : false;
      }
  }

  return tasks.filter(t => {
    const dueDate = new Date(t.dueDate);

    return !isNaN(dueDate.getTime())
      ? condition(start, end, dueDate)
      : false;
  });
}

export function createTasksObject(tasks) {
  periods.create(new Date());
  const ps = periods.computePeriods();
  const p = {
    0: {
      name: 'Missed',
      tasks: []
    },
    1: {
      name: 'Today',
      tasks: []
    },
    2: {
      name: 'Tomorrow',
      tasks: []
    },
    3: {
      name: 'End of Week',
      tasks: []
    },
    4: {
      name: 'Next Week',
      tasks: []
    },
    5: {
      name: 'End of Month',
      tasks: []
    },
    6: {
      name: 'Next Month',
      tasks: []
    },
    7: {
      name: 'Later',
      tasks: []
    },
    8: {
      name: 'Without date',
      tasks: []
    },
  };

  p['0'].tasks = filterByDate(ps, tasks, 'missed');
  p["1"].tasks = filterByDate(ps, tasks, 'today');
  p["2"].tasks = filterByDate(ps, tasks, 'tomorrow');
  p["3"].tasks = filterByDate(ps, tasks, 'end_of_week');
  p["4"].tasks = filterByDate(ps, tasks, 'next_week');
  p["5"].tasks = filterByDate(ps, tasks, 'end_of_month');
  p["6"].tasks = filterByDate(ps, tasks, 'next_week');
  p["7"].tasks = filterByDate(ps, tasks, 'later');
  // Maybe I'll fix this. In future. Maybe)
  p["8"].tasks = tasks.filter(t => t.dueDate === "null");

  return p;
}

export const apply_visibility_filter = (tasks, visibility_filter) =>
  tasks.filter(filter_func(visibility_filter));

const filter_func = visibility_filter => task => {
  if (!visibility_filter) {
    return false;
  }

  switch (visibility_filter) {
    case VisibilityFilter.SHOW_ACTIVE:
      return !task.completed;
    case VisibilityFilter.SHOW_COMPLETED:
      return task.completed;
    default:
      return true;
  }
};