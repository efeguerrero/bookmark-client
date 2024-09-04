/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as authLayoutImport } from './routes/(auth)/_layout'
import { Route as authLayoutRegisterImport } from './routes/(auth)/_layout.register'
import { Route as authLayoutLoginImport } from './routes/(auth)/_layout.login'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authLayoutRoute = authLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => authRoute,
} as any)

const authLayoutRegisterRoute = authLayoutRegisterImport.update({
  path: '/register',
  getParentRoute: () => authLayoutRoute,
} as any)

const authLayoutLoginRoute = authLayoutLoginImport.update({
  path: '/login',
  getParentRoute: () => authLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_layout': {
      id: '/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authLayoutImport
      parentRoute: typeof authRoute
    }
    '/(auth)/_layout/login': {
      id: '/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLayoutLoginImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/register': {
      id: '/_layout/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authLayoutRegisterImport
      parentRoute: typeof authLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  authRoute: authRoute.addChildren({
    authLayoutRoute: authLayoutRoute.addChildren({
      authLayoutLoginRoute,
      authLayoutRegisterRoute,
    }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/"
      ]
    },
    "/": {
      "filePath": "(auth)",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "(auth)/_layout.tsx",
      "parent": "/",
      "children": [
        "/_layout/login",
        "/_layout/register"
      ]
    },
    "/_layout/login": {
      "filePath": "(auth)/_layout.login.tsx",
      "parent": "/_layout"
    },
    "/_layout/register": {
      "filePath": "(auth)/_layout.register.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
