// Getters
export const GET_USER = 'auth-user/GET_USER';
export const GET_IS_AUTHENTICATED = 'auth-user/GET_IS_AUTHENTICATED';

export const GET_REST_LIST = 'restaurants/GET_REST_LIST';
export const GET_MENU = 'restaurants/GET_MENU';
export const GET_FILTERED_REST = 'restaurants/GET_FILTERED_REST';
export const GET_FILTERS = 'restaurants/GET_FILTERS';
export const GET_PARAM = 'restaurants/GET_PARAM';

export const GET_BASKET_STATUS = 'basket/GET_BASKET_STATUS';
export const GET_STICKY_BASKET = 'basket/GET_STICKY_BASKET';
export const GET_BASKET = 'basket/GET_BASKET';
export const GET_ORDER = 'basket/GET_ORDER';

export const GET_SHOW_ORDERS = 'account/GET_SHOW_ORDERS';

//Mutations
export const MUTATE_AUTH_USER = 'auth-user/MUTATE_AUTH_USER';
export const MUTATE_STORE_USER = 'auth-user/MUTATE_STORE_USER';
export const MUTATE_CLEAR_AUTH_DATA = 'auth-user/MUTATE_CLEAR_AUTH_DATA';

export const MUTATE_SELECT_FILTER = 'restaurants/MUTATE_SELECT_FILTER';
export const MUTATE_PARAM = 'restaurants/MUTATE_PARAM';

export const MUTATE_OPEN_BASKET = 'basket/MUTATE_OPEN_BASKET';
export const MUTATE_ADD_TO_BASKET = 'basket/MUTATE_ADD_TO_BASKET';
export const MUTATE_CLEAN_BASKET = 'basket/MUTATE_CLEAN_BASKET';
export const MUTATE_ADD_ORDER = 'basket/MUTATE_ADD_ORDER';

export const MUTATE_SHOW_ORDERS = 'account/MUTATE_SHOW_ORDERS';

//Actions
export const ACT_SET_LOGOUT_TIMER = 'auth-user/ACT_SET_LOGOUT_TIMER';
export const ACT_SIGN_UP = 'auth-user/ACT_SIGN_UP';
export const ACT_LOGIN = 'auth-user/ACT_LOGIN';
export const ACT_TRY_AUTO_LOGIN = 'auth-user/ACT_TRY_AUTO_LOGIN';
export const ACT_LOGOUT = 'auth-user/ACT_LOGOUT';
export const ACT_STORE_USER = 'auth-user/ACT_STORE_USER';
export const ACT_FETCH_USER = 'auth-user/ACT_FETCH_USER';

export const ACT_SELECT_FILTER = 'restaurants/ACT_SELECT_FILTER';
export const ACT_GET_FILTERED_DATA = 'restaurants/ACT_GET_FILTERED_DATA';
export const ACT_PARAM = 'restaurants/ACT_PARAM';

export const ACT_OPEN_BASKET = 'basket/ACT_OPEN_BASKET';
export const ACT_ADD_TO_BASKET = 'basket/ACT_ADD_TO_BASKET';
export const ACT_CLEAN_BASKET = 'basket/ACT_CLEAN_BASKET';
export const ACT_ADD_ORDER = 'basket/ACT_ADD_ORDER';
export const ACT_BASKET_TO_DB = 'basket/ACT_BASKET_TO_DB';

export const ACT_SHOW_ORDERS = 'account/ACT_SHOW_ORDERS';