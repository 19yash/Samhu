import React from 'react';
import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import images from '../../../images';
import { Img } from '../styles/participantTable.style';
import { borderBottom, fontSize, padding } from '@mui/system';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { modes } from '../../../constants/formConstants';
const ParticaipantsTable = ({ category }) => {
  const navigate = useNavigate();
  // const members = [
  //   {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: '4o3yL@example.com',
  //     phoneNumber: '1234567890',
  //   },
  //   {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: '4o3yL@example.com',
  //     phoneNumber: '1234567890',
  //   },
  //   {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: '4o3yL@example.com',
  //     phoneNumber: '1234567890',
  //   },
  //   {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: '4o3yL@example.com',
  //     phoneNumber: '1234567890',
  //   },
  // ];
  // let data = [];
  // if (category.is_team_sport) {
  //   data = [
  //     {
  //       team_name: 'Mumbai Indians',
  //       members: members,
  //     },
  //     {
  //       team_name: 'Mumbai Indians',
  //       members: members,
  //     },
  //     {
  //       team_name: 'Mumbai Indians',
  //       members: members,
  //     },
  //     {
  //       team_name: 'Mumbai Indians',
  //       members: members,
  //     },
  //   ];
  // } else {
  //   data = [...members];
  // }
  let columns = [];
  if (!category?.is_team_sport) {
    columns = [
      {
        header: 'Name',
        render: (row) => {
          return `${row?.participant_details?.name}`;
        },
      },
      {
        header: 'Email',
        render: (row) => {
          return `${row?.participant_details?.email}`;
        },
      },
      {
        header: 'Phone Number',
        render: (row) => {
          return `${row?.participant_details?.phone_number}`;
        },
      },
      {
        header: 'Actions',
        render: (row) => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <Img
                src={images.edit}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`edit-participant/${row.id}`, {});
                }}
              />
              <Img src={images.trash} />
            </div>
          );
        },
      },
    ];
  } else {
    columns = [
      {
        header: 'Teams Details',
        render: (row) => {
          return renderTeam(row);
        },
      },
    ];
  }

  const MembersTableCoumns = [
    {
      header: 'Name',
      render: (row) => {
        return `${row.name}`;
      },
    },
    { header: 'Email', field: 'email' },
    { header: 'Phone Number', field: 'phoneNumber' },
  ];

  const renderTeam = (row) => {
    return (
      <Table
        columns={MembersTableCoumns}
        headerActions={[
          <Button
            style={{ padding: '0.2rem', fontSize: '12px' }}
            text={'Edit'}
            onClick={(e) => {
              console.log('edit');
              e.stopPropagation();
              navigate(`edit-participant/${row.id}`, {
                state: {
                  mode: modes.edit,
                },
              });
            }}
          />,
        ]}
        title={row.team_name}
        data={row?.members}
      />
    );
  };
  return (
    <Table
      api={`/event/participate`}
      filter={{ category_id: category.id }}
      styles={{
        headerCell: {
          borderBottom: '0px',
          fontSize: '16px',
        },
        bodyCell: {
          borderBottom: '0px',
        },
        lastCell: {
          borderBottom: '0px',
        },
      }}
      columns={columns}
      // data={data}
    />
  );
};

export default ParticaipantsTable;
