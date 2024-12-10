import Category from '../screens/Category';
import CategoryForm from '../screens/CategoryForm';
import SportsForm from '../screens/SportsForm';

const SportsRoute = [
  {
    name: 'Add Sports',
    path: '/sports/add-sports',
    element: <SportsForm />,
  },
  {
    name: 'Sports Categories',
    path: '/sports/categories',
    element: <Category />,
  },
  {
    name: 'Edit Category',
    path: '/sports/categories/edit',
    element: <CategoryForm />,
  },
];

export default SportsRoute;
