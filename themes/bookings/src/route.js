import ClientPage from "./components/pages/ClientPage";
import Calendar from "./components/pages/Calendar";

const routes = [
    {path: '/', exact: true, name: 'Calendar', component: Calendar},
    {path: '/clients', exact: true, name: 'Client', component: ClientPage},
];

export default routes;