import {Api} from "../api"
import {ApisauceInstance} from "apisauce";
import {clearAuthData, saveAuthToken} from "../../../utils/auth/auth";
import {_} from "../../../utils/primary-utils";


export class AuthApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async login(phoneNumber: string, password: string): Promise<any> {
        clearAuthData();

        const response = await (this.api.apisauce as ApisauceInstance).post(
            "/login",
            {
                "phoneNumber": phoneNumber,
                "password": password
            },
            {
                transformRequest: [(data, headers) => {
                    delete headers.common["Authorization"];
                    return _.isEmpty(data) ? data : JSON.stringify(data);
                }]
            }
        )

        // @ts-ignore
        saveAuthToken(response.data.token);

        return response;
    }

    async register(phoneNumber: string, password: string): Promise<any> {
        let response = await (this.api.apisauce as ApisauceInstance).post(
            "/register",
            {phoneNumber, password},
            {
                transformRequest: [(data, headers) => {
                    delete headers.common["Authorization"];
                    return _.isEmpty(data) ? data : JSON.stringify(data);
                }]
            }
        )
        return response;
    }

    async logout(): Promise<any> {
        const response = await this.api.apisauce.post("/logout");
        this.api.store.logout();

        return response;
    }
}
