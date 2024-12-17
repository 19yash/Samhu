import React from 'react';
import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import { Img } from '../styles/EventCard.style';
import images from '../../../images';
const ParticaipantsTable = () => {
  const data = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: '4o3yL@example.com',
      phoneNumber: '1234567890',
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: '4o3yL@example.com',
      phoneNumber: '1234567890',
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: '4o3yL@example.com',
      phoneNumber: '1234567890',
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: '4o3yL@example.com',
      phoneNumber: '1234567890',
    },
  ];
  const columns = [
    {
      header: 'Name',
      render: (row) => {
        return `${row?.first_name} ${row?.last_name}`;
      },
    },
    { header: 'Email', field: 'email' },
    { header: 'Phone Number', field: 'phoneNumber' },
    {
      render: () => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Img src={images.edit} />
            <Img src={images.trash} />
          </div>
        );
      },
    },
  ];
  return <Table api={routeLink.participants} columns={columns} data={data} />;
};

export default ParticaipantsTable;
