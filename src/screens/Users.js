import { useAuth } from '../modules/auth/hooks/useAuth';
import { action, entity } from '../constants/authorization';
import checkAuthorization from '../services/checkAuthorization';
import Button from '../modules/components/button/Button';
import { useNavigate } from 'react-router-dom';
import images from '../images';
import routeLink from '../constants/routeLink';
import Table from '../modules/components/table/Table';

const Users = () => {
  const { user } = useAuth();
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
  const data = [
    {
      id: '6759bc619cf3ab72136f2fbe',
      name: 'yash',
      role: 'Admin',
      organisation_name: 'Samhu',
      email: 'yashgupta19082000@gmail.com',
      phone_number: '8700075409',
      address: 'Faridabad',
      age: 21,
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
      data={data}
      api={`${routeLink.user}all/Host`}
      // api={`${routeLink.user}all/Host`}
      onPress={(row) => {
        navigate(`users-details/${row.id}`, {});
      }}
      columns={columns}
    />
  );
};

export default Users;
