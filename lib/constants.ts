export const PROTECTED_PAGE_ROUTES = new Set(["/protected"]);
export const AUTH_PAGE_ROUTES = new Set(["/login", "register"]);
export const OPEN_PAGE_ROUTES = new Set(["/"]);
export const VALID_PAGE_ROUTES = new Set([
  ...PROTECTED_PAGE_ROUTES,
  ...AUTH_PAGE_ROUTES,
  ...OPEN_PAGE_ROUTES,
]);
