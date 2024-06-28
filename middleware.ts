export { default } from "next-auth/middleware"

export const config= {
    matcher: [
        '/dashboard/history',
        '/dashboard/content/:slug'
    ]
}