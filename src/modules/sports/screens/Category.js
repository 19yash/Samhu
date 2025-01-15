import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../components/table/Table';
import routeLink from '../../../constants/routeLink';
import { Img } from '../../event/styles/EventCard.style';
import images from '../../../images';
import Button from '../../components/button/Button';
import { useAuth } from '../../auth/hooks/useAuth';
import checkAuthorization from '../../../services/checkAuthorization';
import { action, entity } from '../../../constants/authorization';

const Category = () => {
  const { user } = useAuth();
  const { sportsId } = useParams();
  const navigate = useNavigate();
  const renderActions = (row) => {
    if (checkAuthorization(user, entity.Category, action.edit)) {
      return (
        <>
          <Img
            src={images.edit}
            onClick={(e) => {
              navigate(`${row.id}/edit`, {
                state: { mode: 'edit' },
              });
              e.stopPropagation();
            }}
          />
        </>
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
      columns={columns}
      api={`${routeLink.category}/`}
      filter={{
        sports_id: sportsId,
      }}
    />
  );
};

export default Category;
