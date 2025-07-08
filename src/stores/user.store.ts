import type { User } from '@/types/user.type';
import {
  getItem as localGetItem,
  removeItem as localRemoveItem,
  setItem as localSetItem,
} from '@/utilities/local-storage';
import {
  getItem as sessionGetItem,
  removeItem as sessionRemoveItem,
  setItem as sessionSetItem,
} from '@/utilities/session-storage';
import { create } from 'zustand';

type UserStoreState = { user: User | null };

type UserStoreActions = {
  setUser: (nextUser: UserStoreState['user']) => void;
};

type UserStore = UserStoreState & UserStoreActions;

function getStoredUser() {
  const isAccountSaved = localGetItem<boolean>('IS_ACCOUNT_SAVED');
  if (isAccountSaved) {
    return localGetItem<User>('USER');
  }
  return sessionGetItem<User>('USER');
}

export const useUserStore = create<UserStore>((set) => ({
  user: getStoredUser(),
  setUser: (nextUser) => {
    if (!nextUser) {
      localRemoveItem('USER');
      sessionRemoveItem('USER');
      return set(() => ({ user: null }));
    }
    const isAccountSaved = localGetItem<boolean>('IS_ACCOUNT_SAVED');
    if (isAccountSaved) {
      localSetItem('USER', nextUser);
    } else {
      sessionSetItem('USER', nextUser);
    }
    set(() => ({ user: nextUser }));
  },
}));
