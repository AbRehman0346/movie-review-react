export const RoutePaths = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DISPLAY: "/display/:id",
  ADD_REVIEW: "/add",
  MANAGE: "/manage",
  UPDATE: "/update_review/:id",
  _UPDATE: "/update_review/",
};

export function Navigate_to(navigate, path, args = null) {
  if (path === RoutePaths.ROOT) {
    navigate(RoutePaths.ROOT);
  } else if (path === RoutePaths.ADD_REVIEW) {
    navigate(RoutePaths.ADD_REVIEW);
  } else if (path === RoutePaths.DISPLAY) {
    navigate(RoutePaths.DISPLAY);
  } else if (path === RoutePaths.UPDATE) {
    navigate(`${RoutePaths._UPDATE}${args}`);
  } else if (path === RoutePaths.MANAGE) {
    navigate(RoutePaths.MANAGE);
  } else if (path === RoutePaths.LOGIN) {
    navigate(RoutePaths.LOGIN);
  } else if (path === RoutePaths.REGISTER) {
    navigate(RoutePaths.REGISTER);
  } else {
    console.log("Navigation Failed...");
  }
}
