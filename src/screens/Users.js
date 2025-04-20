import { useNavigate } from 'react-router-dom';
import routeLink from '../constants/routeLink';
import Table from '../modules/components/table/Table';

const Users = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Email',
      field: 'email',
    },
    {
      header: 'Phone Number',
      field: 'phone_number',
    },
    {
      header: 'Role',
      field: 'role',
    },
  ];
  return (
    <Table
      title={'Users Details'}
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
      api={`${routeLink.user}all/Host`}
      onPress={(row) => {
        navigate(`users-details/${row.id}`, {});
      }}
      columns={columns}
    />
  );
};

export default Users;
