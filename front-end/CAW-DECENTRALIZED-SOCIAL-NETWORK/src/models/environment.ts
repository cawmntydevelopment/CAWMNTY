import {Api} from "../services/api"
import {RootStore} from "./root-store/root-store";


/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
    /**
     * Our api.
     */
    api: Api
    /**
     * Our mobx-state-tree-store.
     */
    store!: RootStore

    constructor() {
        // create each service
        this.api = new Api()
    }

    async setup() {
        // allow each service to setup
        await this.api.setup()
    }

    setStore(store: RootStore) {
        this.store = store
        this.api.setStore(store)
    }
}
