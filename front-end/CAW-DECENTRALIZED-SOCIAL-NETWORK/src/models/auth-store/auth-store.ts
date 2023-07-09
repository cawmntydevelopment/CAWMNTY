import {flow, getParent, Instance, SnapshotOut, types} from "mobx-state-tree"
import {RootStore, withEnvironment} from ".."
import {getPathByName, history} from "../../utils/routing";


export function logoutRedirect() {
    const location = history.location;
    if (["/login", "/register"].includes(location.pathname)) return // TODO: login ve register rotaları buraya girilmeli
    // @ts-ignore
    const {from} = location.state || {from: {pathname: getPathByName("home")}};
    history.replace(from);
}

/**
 * AuthStore model.
 */
// prettier-ignore
// @ts-ignore
export const AuthStoreModel = types.model("AuthStore").props({}).extend(withEnvironment)
    .actions((self) => ({
        login: flow(function* () {
        }),
        logout: flow(function* () {
            const rootStore: RootStore = getParent(self);
            return yield rootStore.logout();
        }),
    }))

/**
 * The AuthStore instance.
 */
export interface AuthStore extends Instance<typeof AuthStoreModel> {
}

/**
 * The data of a AuthStore.
 */
export interface AuthStoreSnapshot extends SnapshotOut<typeof AuthStoreModel> {
}

// @ts-ignore
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
