import Login from "../pages/Login";
import Event from "../pages/Event"

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteName {
    LOGIN = '/login',
    EVENT = '/dates'
}

export const publicRoutes: IRoute[] = [
    {path: RouteName.LOGIN, element: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteName.EVENT, element: Event}
]

