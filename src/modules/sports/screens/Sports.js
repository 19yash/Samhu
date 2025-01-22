import React from 'react';
import Table from '../../components/table/Table';
import { Outlet, useNavigate } from 'react-router-dom';
import routeLink from '../../../constants/routeLink';
import Button from '../../components/button/Button';
import images from '../../../images';
import checkAuthorization from '../../../services/checkAuthorization';
import { useAuth } from '../../auth/hooks/useAuth';
import { action, entity } from '../../../constants/authorization';

const Sports = () => {
  console.log('hello logging');
  const { user } = useAuth();
  const navigate = useNavigate();
  const columns = [
    {
      header: 'Sports Name',
      render: (row) => {
        return `${row.sports_name}`;
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
    <>
      <Table
        headerActions={[
          ...(checkAuthorization(user, entity.Sports, action.create)
            ? [
                <Button
                  text="Add New Sport"
                  onClick={() => {
                    navigate('add-sports');
                  }}
                  icon={images.plus}
                  iconPosition="start"
                />,
              ]
            : []),
        ]}
        api={routeLink.sports}
        onPress={(row) => {
          navigate(`${row.id}/categories`, {
            sportsId: row.id,
          });
        }}
        columns={columns}
      />
    </>
  );
};

export default Sports;
