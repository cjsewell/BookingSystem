import ClientPage from "./components/pages/ClientPage";
import CalendarPage from "./components/pages/CalendarPage";

const routes = [
    {path: '/', exact: true, name: 'Calendar', component: CalendarPage},
    {path: '/clients', exact: true, name: 'Client', component: ClientPage},
];

export default routes;