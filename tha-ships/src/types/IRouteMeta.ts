import { RouteMeta } from 'vue-router';

export interface IRouteMeta extends RouteMeta {
    allowAnonymous: boolean;
    noLayout: boolean;
    pageTitle: string;
    showInNavigation: boolean;
}
