export enum MenuType {
    MAIN,
    ADMIN
}

export interface RouteInfo {
    path: string;
    title: string;
    menuType: MenuType
}

export const ROUTES: RouteInfo[] = [
    { path: '/account/timetables', title: 'Timetables', menuType: MenuType.MAIN },
    { path: '/account/clients', title: 'Clients', menuType: MenuType.MAIN },
    { path: '/account/profile', title: 'Profile', menuType: MenuType.MAIN },
    { path: '/account/users', title: 'Users', menuType: MenuType.ADMIN },
    { path: '/account/treatments', title: 'Treatments', menuType: MenuType.ADMIN },
    { path: '/account/insurances', title: 'Insurances', menuType: MenuType.ADMIN },
    { path: '/account/pricings', title: 'Pricings', menuType: MenuType.ADMIN },
];
