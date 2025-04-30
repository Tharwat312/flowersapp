type SearchParams = string | string[] | undefined;
declare type RouteProps = {
    params: {
        locale: 'en' | 'ar'
        id: string
    },
    searchParams: SearchParams
}