import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: payload}),
    login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout( async () => {
                const response = await UserService.getUsers()
                //@ts-ignore
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('некорректные логин или пароль'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            },1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Ошибка'))
        }
    },
    logout: (): any => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}