import Category from '../screens/Category';
import CategoryForm from '../screens/CategoryForm';
import React from 'react';

const SportsRoute = [
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
