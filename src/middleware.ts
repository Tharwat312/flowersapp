import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// 1. Define base public paths WITHOUT locales
const publicBasePaths = [
    '/',
    '/login',
    '/register',
    '/about',
];


const handleI18nRouting = createMiddleware(routing);
export default function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Check if path is public
    const isPublicPage = publicBasePaths.some(basePath => {
        if (pathname === basePath) return true;
        return routing.locales.some(locale => {
            const localizedPath = `/${locale}${basePath === '/' ? '' : basePath}`;
            return pathname === localizedPath;
        });
    });

    if (isPublicPage) {
        return handleI18nRouting(req);
    }

    // Authentication check for protected routes
    const sessionToken = req.cookies.get('next-auth.session-token')?.value ||
        req.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!sessionToken) {
        // For API routes - return 401
        if (pathname.startsWith('/api')) {
            return NextResponse.json(
                { error: 'Unauthenticated' },
                { status: 401 }
            );
        }

        // For pages - redirect to home with query parameter
        const loginUrl = new URL('/', req.nextUrl.origin);
        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('showLogin', 'true');
        return NextResponse.redirect(loginUrl);
    }

    return handleI18nRouting(req);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};

