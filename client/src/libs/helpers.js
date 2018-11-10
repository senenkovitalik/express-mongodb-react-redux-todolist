import { VisibilityFilter } from "../redux/actions";

export const filter_func = visibility_filter => task => {
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