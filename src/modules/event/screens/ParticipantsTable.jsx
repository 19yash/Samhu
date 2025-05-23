import React from 'react';
import Table from '../../components/table/Table';
import images from '../../../images';
import { Img } from '../styles/participantTable.style';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { modes } from '../../../constants/formConstants';
const ParticaipantsTable = ({ category, event }) => {
  const navigate = useNavigate();
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
        header: 'Role',
        render: (row) => {
          return `${row?.participant_details?.role}`;
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
    { header: 'Phone Number', field: 'phone' },
  ];

  const renderTeam = (row) => {
    return (
      <Table
        columns={MembersTableCoumns}
        styles={{
          container: {
            border: 'none',
          },
        }}
        headerActions={[
          <Button
            style={{ padding: '0.2rem', fontSize: '12px' }}
            text={'Edit'}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`edit-participant/${row.id}`, {
                state: {
                  mode: modes.edit,
                  event: event,
                  is_team_sport: category?.is_team_sport,
                  participants_in_team: category?.participants_in_team,
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
      key={`${category.id}`}
      api={`/event/participants`}
      filter={{ category_id: category.id, event_id: event?.id }}
      styles={{
        container: {
          border: 'none',
        },
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
    />
  );
};

export default ParticaipantsTable;
