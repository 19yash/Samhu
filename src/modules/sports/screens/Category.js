import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import images from '../../../images';
import Button from '../../components/button/Button';
import { useAuth } from '../../auth/hooks/useAuth';
import checkAuthorization from '../../../services/checkAuthorization';
import { action, entity } from '../../../constants/authorization';
import { Img } from '../../event/styles/participantTable.style';

const Category = () => {
  const { user } = useAuth();
  const { sportsId } = useParams();
  const { state } = useLocation();
  const { sport } = state || {};
  const navigate = useNavigate();
  const renderActions = (row) => {
    if (checkAuthorization(user, entity.Category, action.edit)) {
      return (
        <Img
          src={images.edit}
          onClick={(e) => {
            navigate(`${row.id}/edit`, {
              state: { mode: 'edit' },
            });
            e.stopPropagation();
          }}
        />
      );
    }
  };
  const columns = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Min Age',
      field: 'min_age',
    },
    {
      header: 'Max Age',
      field: 'max_age',
    },
    {
      header: 'Weight',
      field: 'weight',
    },
    {
      header: 'Gender',
      field: 'gender',
    },
    {
      header: 'Actions',
      render: renderActions,
    },
  ];
  return (
    <Table
      headerActions={[
        ...(checkAuthorization(user, entity.Category, action.create)
          ? [
              <Button
                text="Add New Category"
                onClick={() => {
                  navigate('add-category');
                }}
                icon={images.plus}
                iconPosition="start"
              />,
            ]
          : []),
      ]}
      title={`${sport?.sports_name ? sport.sports_name : ''} Categories`}
      columns={columns}
      api={`${routeLink.category}/`}
      filter={{
        sports_id: sportsId,
      }}
    />
  );
};

export default Category;
