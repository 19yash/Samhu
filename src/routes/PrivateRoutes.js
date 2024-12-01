import DasboardRoutes from '../modules/dashboard/routes/Dashboard.routes';
import EventRoutes from '../modules/event/routes/Event.route';
import SportsRoute from '../modules/sports/routes/SportsRoute';

// name path visible ,element
const privateRoutes = [...DasboardRoutes, ...EventRoutes, ...SportsRoute];

export default privateRoutes;
