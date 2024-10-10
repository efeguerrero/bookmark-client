/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexImport } from "./routes/index";
import { Route as AppLayoutImport } from "./routes/app/_layout";
import { Route as authLayoutImport } from "./routes/(auth)/_layout";
import { Route as AppLayoutIndexImport } from "./routes/app/_layout.index";
import { Route as AppLayoutDisclaimerImport } from "./routes/app/_layout.disclaimer";
import { Route as AppLayoutGroupSlugImport } from "./routes/app/_layout.$groupSlug";
import { Route as authLayoutRegisterSplatImport } from "./routes/(auth)/_layout.register.$";
import { Route as authLayoutLoginSplatImport } from "./routes/(auth)/_layout.login.$";

// Create Virtual Routes

const AppImport = createFileRoute("/app")();
const authImport = createFileRoute("/(auth)")();

// Create/Update Routes

const AppRoute = AppImport.update({
  path: "/app",
  getParentRoute: () => rootRoute,
} as any);

const authRoute = authImport.update({
  id: "/(auth)",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const AppLayoutRoute = AppLayoutImport.update({
  id: "/_layout",
  getParentRoute: () => AppRoute,
} as any);

const authLayoutRoute = authLayoutImport.update({
  id: "/_layout",
  getParentRoute: () => authRoute,
} as any);

const AppLayoutIndexRoute = AppLayoutIndexImport.update({
  path: "/",
  getParentRoute: () => AppLayoutRoute,
} as any);

const AppLayoutDisclaimerRoute = AppLayoutDisclaimerImport.update({
  path: "/disclaimer",
  getParentRoute: () => AppLayoutRoute,
} as any);

const AppLayoutGroupSlugRoute = AppLayoutGroupSlugImport.update({
  path: "/$groupSlug",
  getParentRoute: () => AppLayoutRoute,
} as any);

const authLayoutRegisterSplatRoute = authLayoutRegisterSplatImport.update({
  path: "/register/$",
  getParentRoute: () => authLayoutRoute,
} as any);

const authLayoutLoginSplatRoute = authLayoutLoginSplatImport.update({
  path: "/login/$",
  getParentRoute: () => authLayoutRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/(auth)": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof authImport;
      parentRoute: typeof rootRoute;
    };
    "/(auth)/_layout": {
      id: "/_layout";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof authLayoutImport;
      parentRoute: typeof authRoute;
    };
    "/app": {
      id: "/app";
      path: "/app";
      fullPath: "/app";
      preLoaderRoute: typeof AppImport;
      parentRoute: typeof rootRoute;
    };
    "/app/_layout": {
      id: "/app/_layout";
      path: "/app";
      fullPath: "/app";
      preLoaderRoute: typeof AppLayoutImport;
      parentRoute: typeof AppRoute;
    };
    "/app/_layout/$groupSlug": {
      id: "/app/_layout/$groupSlug";
      path: "/$groupSlug";
      fullPath: "/app/$groupSlug";
      preLoaderRoute: typeof AppLayoutGroupSlugImport;
      parentRoute: typeof AppLayoutImport;
    };
    "/app/_layout/disclaimer": {
      id: "/app/_layout/disclaimer";
      path: "/disclaimer";
      fullPath: "/app/disclaimer";
      preLoaderRoute: typeof AppLayoutDisclaimerImport;
      parentRoute: typeof AppLayoutImport;
    };
    "/app/_layout/": {
      id: "/app/_layout/";
      path: "/";
      fullPath: "/app/";
      preLoaderRoute: typeof AppLayoutIndexImport;
      parentRoute: typeof AppLayoutImport;
    };
    "/(auth)/_layout/login/$": {
      id: "/_layout/login/$";
      path: "/login/$";
      fullPath: "/login/$";
      preLoaderRoute: typeof authLayoutLoginSplatImport;
      parentRoute: typeof authLayoutImport;
    };
    "/(auth)/_layout/register/$": {
      id: "/_layout/register/$";
      path: "/register/$";
      fullPath: "/register/$";
      preLoaderRoute: typeof authLayoutRegisterSplatImport;
      parentRoute: typeof authLayoutImport;
    };
  }
}

// Create and export the route tree

interface authLayoutRouteChildren {
  authLayoutLoginSplatRoute: typeof authLayoutLoginSplatRoute;
  authLayoutRegisterSplatRoute: typeof authLayoutRegisterSplatRoute;
}

const authLayoutRouteChildren: authLayoutRouteChildren = {
  authLayoutLoginSplatRoute: authLayoutLoginSplatRoute,
  authLayoutRegisterSplatRoute: authLayoutRegisterSplatRoute,
};

const authLayoutRouteWithChildren = authLayoutRoute._addFileChildren(
  authLayoutRouteChildren,
);

interface authRouteChildren {
  authLayoutRoute: typeof authLayoutRouteWithChildren;
}

const authRouteChildren: authRouteChildren = {
  authLayoutRoute: authLayoutRouteWithChildren,
};

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren);

interface AppLayoutRouteChildren {
  AppLayoutGroupSlugRoute: typeof AppLayoutGroupSlugRoute;
  AppLayoutDisclaimerRoute: typeof AppLayoutDisclaimerRoute;
  AppLayoutIndexRoute: typeof AppLayoutIndexRoute;
}

const AppLayoutRouteChildren: AppLayoutRouteChildren = {
  AppLayoutGroupSlugRoute: AppLayoutGroupSlugRoute,
  AppLayoutDisclaimerRoute: AppLayoutDisclaimerRoute,
  AppLayoutIndexRoute: AppLayoutIndexRoute,
};

const AppLayoutRouteWithChildren = AppLayoutRoute._addFileChildren(
  AppLayoutRouteChildren,
);

interface AppRouteChildren {
  AppLayoutRoute: typeof AppLayoutRouteWithChildren;
}

const AppRouteChildren: AppRouteChildren = {
  AppLayoutRoute: AppLayoutRouteWithChildren,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof authLayoutRouteWithChildren;
  "/app": typeof AppLayoutRouteWithChildren;
  "/app/$groupSlug": typeof AppLayoutGroupSlugRoute;
  "/app/disclaimer": typeof AppLayoutDisclaimerRoute;
  "/app/": typeof AppLayoutIndexRoute;
  "/login/$": typeof authLayoutLoginSplatRoute;
  "/register/$": typeof authLayoutRegisterSplatRoute;
}

export interface FileRoutesByTo {
  "/": typeof authLayoutRouteWithChildren;
  "/app": typeof AppLayoutIndexRoute;
  "/app/$groupSlug": typeof AppLayoutGroupSlugRoute;
  "/app/disclaimer": typeof AppLayoutDisclaimerRoute;
  "/login/$": typeof authLayoutLoginSplatRoute;
  "/register/$": typeof authLayoutRegisterSplatRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof authRouteWithChildren;
  "/_layout": typeof authLayoutRouteWithChildren;
  "/app": typeof AppRouteWithChildren;
  "/app/_layout": typeof AppLayoutRouteWithChildren;
  "/app/_layout/$groupSlug": typeof AppLayoutGroupSlugRoute;
  "/app/_layout/disclaimer": typeof AppLayoutDisclaimerRoute;
  "/app/_layout/": typeof AppLayoutIndexRoute;
  "/_layout/login/$": typeof authLayoutLoginSplatRoute;
  "/_layout/register/$": typeof authLayoutRegisterSplatRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/app"
    | "/app/$groupSlug"
    | "/app/disclaimer"
    | "/app/"
    | "/login/$"
    | "/register/$";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/app"
    | "/app/$groupSlug"
    | "/app/disclaimer"
    | "/login/$"
    | "/register/$";
  id:
    | "__root__"
    | "/"
    | "/_layout"
    | "/app"
    | "/app/_layout"
    | "/app/_layout/$groupSlug"
    | "/app/_layout/disclaimer"
    | "/app/_layout/"
    | "/_layout/login/$"
    | "/_layout/register/$";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  authRoute: typeof authRouteWithChildren;
  AppRoute: typeof AppRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authRoute: authRouteWithChildren,
  AppRoute: AppRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/",
        "/app"
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
        "/_layout/login/$",
        "/_layout/register/$"
      ]
    },
    "/app": {
      "filePath": "app",
      "children": [
        "/app/_layout"
      ]
    },
    "/app/_layout": {
      "filePath": "app/_layout.tsx",
      "parent": "/app",
      "children": [
        "/app/_layout/$groupSlug",
        "/app/_layout/disclaimer",
        "/app/_layout/"
      ]
    },
    "/app/_layout/$groupSlug": {
      "filePath": "app/_layout.$groupSlug.tsx",
      "parent": "/app/_layout"
    },
    "/app/_layout/disclaimer": {
      "filePath": "app/_layout.disclaimer.tsx",
      "parent": "/app/_layout"
    },
    "/app/_layout/": {
      "filePath": "app/_layout.index.tsx",
      "parent": "/app/_layout"
    },
    "/_layout/login/$": {
      "filePath": "(auth)/_layout.login.$.tsx",
      "parent": "/_layout"
    },
    "/_layout/register/$": {
      "filePath": "(auth)/_layout.register.$.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
