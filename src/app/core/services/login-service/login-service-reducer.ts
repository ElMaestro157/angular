import { Action, ActionReducer } from '@ngrx/store';

export const STORE_USER = '[AUTH] Store user';
export const UNLOAD_USER = '[AUTH] Unload user';

class LoginAction implements Action {
  type: string;

  constructor(public payload?: LoginStore) { }
}

export interface LoginStore {
  name: string;
  token: string;
}

const initialState: LoginStore = {
  name: null,
  token: null
};

export const reducer: ActionReducer<LoginStore, LoginAction> = (state = initialState, action: LoginAction): LoginStore => {
  switch (action.type) {
    case STORE_USER:
      return action.payload;

    case UNLOAD_USER:
      state.name = null;
      state.token = null;
      return state;

    default:
      return state;
  }
};
