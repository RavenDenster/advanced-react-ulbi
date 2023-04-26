import { AuthActionCreators } from "./auth/action-creator";
import { EventActionCreators } from "./event/actions-creator";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}