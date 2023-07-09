import {ApisauceInstance, create} from "apisauce"
import {ApiConfig, DEFAULT_API_CONFIG} from "./api-config"
import {CharacterApi} from "./collections/character-api";
import {loadAuthToken} from "../../utils/auth/auth";
import {AuthApi} from "./collections/auth-api";
import {RootStore} from "../../models";

/**
 * Manages all requests to the API.
 */
export class Api {
    /**
     * The underlying apisauce instance which performs the requests.
     */
    apisauce!: ApisauceInstance

    /**
     * Configurable options.
     */
    config: ApiConfig

    /**
     * Root mobx-state-tree store.
     */
    store!: RootStore

    /**
     * Creates the api.
     *
     * @param config The configuration to use.
     */
    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
    }

    /**
     * Sets up the API.  This will be called during the bootup
     * sequence and will happen before the first React component
     * is mounted.
     *
     * Be as quick as possible in here.
     */
    setup() {
        // construct the apisauce instance
        const apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        })

        apisauce.addAsyncRequestTransform(request => async () => {
            const authToken = await loadAuthToken()
            if (!authToken) return
            request.headers["Authorization"] = "Token " + authToken
        })

        this.apisauce = apisauce
    }

    setStore(store: RootStore) {
        this.store = store

        const apisauce = this.apisauce
        const rootStore = this.store

        apisauce.axiosInstance.interceptors.request.use(
            (config: any) => {
                config.baseURL = this.config.url;
                config.headers["Content-Type"] = "application/json";
                config.headers.common["X-Requested-With"] = "XMLHttpRequest";
                const token = loadAuthToken();
                if (token) {
                    config.headers.common["Authorization"] = "Bearer " + token;
                }

                return config;
            },
            (error: any) => {
                Promise.reject(error);
            }
        );

        apisauce.axiosInstance.interceptors.response.use((response) => {
                return response;
            },
            function (error) {
                if (error.response !== undefined && error?.response?.status === 401 && error?.response?.statusText === "Unauthorized") {
                    rootStore.logout()
                }

                return Promise.reject(error);
            });
        this.apisauce = apisauce
    }

    get characters() {
        return new CharacterApi(this)
    }

    get auth() {
        return new AuthApi(this)
    }
}
