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
    path: '/sports/:sportsId/categories',
    element: <Category />,
  },
  {
    name: 'Add Category',
    path: '/sports/:sportsId/categories/add-category',
    element: <CategoryForm />,
  },
  {
    name: 'Edit Category',
    path: '/sports/:sportsId/categories/:categoryId/edit',
    element: <CategoryForm />,
  },
];

export default SportsRoute;
