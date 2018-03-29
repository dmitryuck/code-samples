import { Category, Country, User } from '../../glob';

export interface AppRootState {
    router: any;
    appState: AppState;
    authState: AuthState;
}

export interface AppState {
    location: any;
    config: any;
    isBrowser: boolean;
    countries: Country[];
    categories: Category[]
}

export interface AuthState {
    user: User;
    showAuth: boolean;
}
