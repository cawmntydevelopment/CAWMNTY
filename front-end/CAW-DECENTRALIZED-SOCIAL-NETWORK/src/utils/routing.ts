import historyModule from "./history";
import routes from "../routing/routes";
import qsdef, {IParseOptions, IStringifyOptions} from "qs";
import {matchPath, useLocation, useNavigate as useRouterNavigate} from "react-router-dom";
import {_} from "./primary-utils";
import {Route} from "../routing/types";

export const qs = qsdef;
export const history = historyModule;

export function getPaths(): any {
    //TODO: bu fonksiyona nested routes desteği eklenmeli
    let paths: any = {};
    routes.map(route => {
        const {name, path} = route;
        paths[name] = path;
    });
    return paths;
}

export function getCurrentRoute() {
    const location = useLocation();
    const currentLocation = location.pathname;
    const currentRoute = _.findDeep(routes,
        // @ts-ignore
        (value: any, key: any, parentValue: any) => {
            return matchPath(parentValue, currentLocation)
        },
        {leavesOnly: true}
    );

    return currentRoute?.parent;
}

export function getRouteByName(name: string): Route {
    const foundRoute = _.findDeep(routes,
        (value: any, key: any, parentValue: any, context: any) => {
            return parentValue.name === name
        }
    );
    return (foundRoute?.parent as unknown as Route);
}

export function getPathByName(name: string, replace: { [x: string]: string } = {}) {
    const route = getRouteByName(name);
    let path = route.path;

    for (let parameter in replace) {
        if (parameter && replace && path) {
            path = path.replace(`:${parameter}`, replace[parameter]);
        }
    }

    return path;
}

export function getQueryString() {
    return location.search;
}

export function getQuery(options: IParseOptions = {}) {
    const queryString = getQueryString()
    let newQuery = qs.parse(queryString.substring(1), options);
    return newQuery;
}

export function makeQuery(query: { [x: string]: any }, options: IStringifyOptions = {}) {
    const newQuery = qs.stringify(query, options);
    return newQuery;
}

export function makeQueryRoute(uri: string, query: { [x: string]: any } = {}, options: IStringifyOptions = {}) {
    let queryRoute = uri

    if (!_.isEmpty(query)) {
        const queryString = makeQuery(query, options);
        queryRoute += "?" + queryString;
    }

    return queryRoute;
}

export function setQuery(query: { [x: string]: any }, uri = location.pathname, options: IStringifyOptions = {}) {
    const newQuery = makeQuery(query, options);
    history.push({pathname: uri, search: newQuery});
}

export function modifyQuery(query: { [x: string]: any }, options: IParseOptions = {}) {
    let newQuery = getQuery(options);
    // @ts-ignore
    newQuery = _.deepExtend(newQuery, query);
    setQuery(newQuery);
}

export function useNavigate() {
    const routerNavigate = useRouterNavigate();

    function navigator(
        routeName: string,
        routeReplace: { [x: string]: string } = {},
        query: { [x: string]: any } = {},
        queryOptions: IStringifyOptions = {},
        navigateOptions: { replace?: boolean; state?: any } = {}
    ) {
        const path = getPathByName(routeName, routeReplace);
        const pathWithQuery = makeQueryRoute(path, query, queryOptions);

        // @ts-ignore
        routerNavigate(pathWithQuery, navigateOptions);
    }

    return navigator;
}

