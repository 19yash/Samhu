import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from '../services/httpService';
import Loader from '../modules/components/Loader';
import Modal from '../modules/components/modal';
import { Container } from './UserDetails.style';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`/user/${userId}`, {});
      setUser(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, [userId]);
  if (loading) {
    return <Loader />;
  }
  let columns = [
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
    {
      header: 'Address',
      field: 'address',
    },
  ];

  if (user?.role === 'Host') {
    columns = [
      ...columns,
      {
        header: 'Organisation Name',
        field: 'organisation_name',
      },
      {
        header: 'Account Number',
        field: 'account_number',
      },
      {
        header: 'Bank Name',
        field: 'bank_name',
      },
      {
        header: 'IFSC Code',
        field: 'ifsc_code',
      },
      {
        header: 'Account Holder Name',
        field: 'account_holder_name',
      },
    ];
  } else if (user?.role === 'Participant') {
    columns = [
      ...columns,
      {
        header: 'Age',
        field: 'age',
      },
      {
        header: 'Gender',
        field: 'gender',
      },
      {
        header: 'School/College Name',
        field: 'school_or_college',
      },
    ];
  }
  return (
    <Modal>
      <Container>
        {columns.map((column) => {
          return (
            <div key={column.field}>
              <div>
                <strong>{column.header}</strong>:
              </div>{' '}
              {user[column.field] || '--'}
            </div>
          );
        })}
      </Container>
    </Modal>
  );
};

export default UserDetails;
