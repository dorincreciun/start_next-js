export const APP_ROUTES = {
    ROOT: "/",
} as const

export type AppRoutes = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
