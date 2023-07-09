import {flow, Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from ".."
import {createAuthStoreDefaultModel, logoutRedirect} from "../auth-store/auth-store";
import {clearAuthData} from "../../utils/auth/auth";


/**
 * A RootStore model.
 */
// prettier-ignore
// @ts-ignore
export const RootStoreModel = types.model("RootStore").props({
    auth: createAuthStoreDefaultModel(),
}).extend(withEnvironment)
    .actions((self) => ({
        logout: flow(function* () {
            try {
                const apiResponse = yield self.environment.api.auth.logout();

                if (apiResponse.status === 200) {
                    // TODO: auth store silme işlemleri burada gerçekleştirilmeli
                    clearAuthData();
                    logoutRedirect();

                    return true;
                } else {
                    return false
                }
            } catch (error) {
                //console.error(error)
                return false;
            }
        })
    }))

/**
 * The RootStore instance.
 */
// @ts-ignore
export interface RootStore extends Instance<typeof RootStoreModel> {
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {
}

