import React from 'react';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import routeLink from '../../../constants/routeLink';
import Button from '../../components/button/Button';
import images from '../../../images';
import checkAuthorization from '../../../services/checkAuthorization';
import { useAuth } from '../../auth/hooks/useAuth';
import { action, entity } from '../../../constants/authorization';
import { Img } from '../../event/styles/EventCard.style';

const Sports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const columns = [
    {
      header: 'Sports Name',
      render: (row) => {
        return `${row.sports_name}`;
      },
    },
    ...(user.role === 'Admin'
      ? [
          {
            render: (row) => {
              console.log('🚀 ~ Sports ~ row:', row);
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: '1rem',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('edit');
                    navigate(`${row.id}/edit`, {
                      state: { mode: 'edit', sport: row },
                    });
                  }}
                >
                  <Img src={images.edit} />
                </div>
              );
            },
          },
        ]
      : []),
    // {
    //   header: 'Number Of Categories',
    //   field: 'categories',
    // },
    // {
    //   header: 'Active Sports',
    //   field: 'activeEvents',
    // },
  ];

  return (
    <>
      <Table
        title={'Sports Details'}
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
        styles={{
          headerCell: {
            textAlign: 'start',
          },
          bodyCell: {
            textAlign: 'start',
          },
          lastCell: {
            textAlign: 'start',
          },
        }}
        api={routeLink.sports}
        onPress={(row) => {
          navigate(`${row.id}/categories`, {
            state: { sportsId: row.id, sport: row },
          });
        }}
        columns={columns}
      />
    </>
  );
};

export default Sports;
