import {RouteProps} from "react-router-dom";

export interface Route {
    path: string,
    name: string,
    element: any,
    isProtected?: boolean,
    index?: boolean,
    caseSensitive?: boolean,
    location?:any,
    icon?: any,
    title?: {
        head?: string | undefined,
        toolbar?: string | undefined,
        sidebar?: string | undefined,
        footer?: string | undefined,
        homepage?: string | undefined,
        [x: string]: string | undefined;
    },
    children?: Route[],
    isAnimated?: boolean,
    motion?: {
        animations?: {
            initial: { [x: string]: any },
            animate: { [x: string]: any },
            exit: { [x: string]: any },
        },
        transition?: { [x: string]: any }
    }
}

export interface CustomRouteInterface extends RouteProps {
    route: Route,
    [x: string]: any,
}
