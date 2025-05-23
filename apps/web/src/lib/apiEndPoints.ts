import Env from "./env";

export const BACKEND_URL = Env.BACKEND_URL;

export const REGISTER_URL = BACKEND_URL + "/api/register";

export const LOGIN_URL = BACKEND_URL + "/api/login";

export const CHECK_CREDENTIALS_URL = BACKEND_URL + "/api/check/login";

export const USER_URL = BACKEND_URL + "/api/user";

export const CLASH_URL = BACKEND_URL + "/api/clash";

export const CLASH_ITEMS_URL = BACKEND_URL + "/api/clash/items";