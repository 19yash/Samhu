import React from 'react';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import routeLink from '../../../constants/routeLink';
import Button from '../../components/button/Button';
import images from '../../../images';

const Sports = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: 'Football',
      categories: 5,
      activeEvents: 14,
      _id: 1,
    },
    {
      name: 'Cricket',
      categories: 5,
      activeEvents: 14,
      _id: 2,
    },
    {
      name: 'Basketball',
      categories: 5,
      activeEvents: 14,
      _id: 3,
    },
    {
      name: 'Kabadi',
      categories: 5,
      activeEvents: 14,
      _id: 4,
    },
  ];
  const columns = [
    {
      header: 'Sports Name',
      render: (row) => {
        console.log('🚀 ~ Sports ~ row:', row);
        return `${row.name}`;
      },
    },
    {
      header: 'Number Of Categories',
      field: 'categories',
    },
    {
      header: 'Active Sports',
      field: 'activeEvents',
    },
  ];

  return (
    <Table
      headerActions={[
        <Button
          text="Add New Sport"
          onClick={() => {
            navigate('add-sports');
          }}
          icon={images.plus}
          iconPosition="start"
        />,
      ]}
      api={routeLink.sports}
      //   filter
      onPress={(row) => {
        navigate(`categories`, {
          sportsId: row._id,
        });
      }}
      columns={columns}
      data={data}
    />
  );
};

export default Sports;
