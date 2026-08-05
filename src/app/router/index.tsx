import { createBrowserRouter, RouteObject } from 'react-router-dom';

// Import module routes
import { dashboardRoutes } from '../../modules/dashboard';
import { propertiesRoutes } from '../../modules/properties';
import { projectsRoutes } from '../../modules/projects';
import { requestsRoutes } from '../../modules/requests';
import { leadsRoutes } from '../../modules/leads';
import { contactsRoutes } from '../../modules/contacts';
import { emailsRoutes } from '../../modules/emails';
import { agendaRoutes } from '../../modules/agenda';
import { activitiesRoutes } from '../../modules/activities';
import { reportsRoutes } from '../../modules/reports';
import { agentsRoutes } from '../../modules/agents';
import { agencyRoutes } from '../../modules/agency';
import { billingRoutes } from '../../modules/billing';
import { settingsRoutes } from '../../modules/settings';
import { authRoutes } from '../../modules/auth';

// Temporary layouts until they are fully migrated
// import { AppLayout } from '../layouts/AppLayout';
// import { AuthLayout } from '../layouts/AuthLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    // element: <AppLayout />,
    children: [
      ...dashboardRoutes,
      ...propertiesRoutes,
      ...projectsRoutes,
      ...requestsRoutes,
      ...leadsRoutes,
      ...contactsRoutes,
      ...emailsRoutes,
      ...agendaRoutes,
      ...activitiesRoutes,
      ...reportsRoutes,
      ...agentsRoutes,
      ...agencyRoutes,
      ...billingRoutes,
      ...settingsRoutes,
    ],
  },
  {
    path: '/auth',
    // element: <AuthLayout />,
    children: [
      ...authRoutes,
    ]
  }
];

export const router = createBrowserRouter(routes);
