import React from 'react';
import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import images from '../../../images';
import { Img } from '../styles/participantTable.style';
import { borderBottom, fontSize, padding } from '@mui/system';
import Button from '../../components/button/Button';
const ParticaipantsTable = ({ category }) => {
  console.log('🚀 ~ ParticaipantsTable ~ category:', category);
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
          return `${row?.first_name} ${row?.last_name}`;
        },
      },
      { header: 'Email', field: 'email' },
      { header: 'Phone Number', field: 'phoneNumber' },
      {
        header: 'Actions',
        render: () => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <Img src={images.edit} />
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
        return `${row?.first_name} ${row?.last_name}`;
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
            onClick={() => {
              console.log('edit');
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
