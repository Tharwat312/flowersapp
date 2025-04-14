import { Route } from "next";
declare type SearchParams = string | string[] | undefined;
declare RouteProps = {
    params: {
        locale: 'en' | 'ar'
    },
    searchParams: SearchParams
}