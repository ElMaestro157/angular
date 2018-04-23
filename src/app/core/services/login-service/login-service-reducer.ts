import { Action, ActionReducer } from '@ngrx/store';

import { User } from '../../entities';

export const STORE_USER = '[AUTH] Store user';
export const UNLOAD_USER = '[AUTH] Unload user';

class LoginAction implements Action {
  type: string;

  constructor(public payload?: User) { }
}

export const reducer: ActionReducer<User, LoginAction> = (state = null, action: LoginAction): User => {
  switch (action.type) {
    case STORE_USER:
      return action.payload;

    case UNLOAD_USER:
      state = null;
      return state;

    default:
      return state;
  }
};
