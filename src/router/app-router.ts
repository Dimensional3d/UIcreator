export type AppRoute = 'home' | 'settings';

const DEFAULT_ROUTE: AppRoute = 'home';

export function getCurrentRoute(): AppRoute {
  const hash = window.location.hash.replace('#/', '') as AppRoute;

  if (hash === 'home' || hash === 'settings') {
    return hash;
  }

  return DEFAULT_ROUTE;
}

export function goTo(route: AppRoute) {
  window.location.hash = `/${route}`;
}
