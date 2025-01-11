import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import { Img } from '../../event/styles/EventCard.style';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../../images';
import Button from '../../components/button/Button';

const Category = () => {
  const { state } = useLocation();
  const { sportsId } = state || {};
  const navigate = useNavigate();
  const renderActions = () => {
    return (
      <>
        <Img
          src={images.edit}
          onClick={() => {
            navigate('edit', {
              mode: 'edit',
            });
          }}
        />
      </>
    );
  };
  const data = [
    {
      name: 'U19',
      // participants: '2',
      min_age: 'NA',
      max_age: '19',
      weight: 'NA',
      gender: 'NA',
    },
    {
      name: 'U22',
      // participants: '2',
      min_age: 'NA',
      max_age: '22',
      weight: 'NA',
      gender: 'Male',
    },
    {
      name: 'U22',
      // participants: '2',
      min_age: 'NA',
      max_age: '22',
      weight: 'NA',
      gender: 'Female',
    },
  ];
  const columns = [
    {
      header: 'Name',
      field: 'name',
    },
    // {
    //   header: 'Participants',
    //   field: 'participants',
    // },
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
      render: renderActions,
    },
  ];
  return (
    <Table
      headerActions={[
        <Button
          text="Add New Category"
          onClick={() => {
            navigate('add-category');
          }}
          icon={images.plus}
          iconPosition="start"
        />,
      ]}
      filter={JSON.stringify({ sport: sportsId })}
      columns={columns}
      // api={routeLink.category}
      data={data}
    />
  );
};

export default Category;
