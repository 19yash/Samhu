import React, { useEffect, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import httpService from '../../../services/httpService';
import { Actions, TableHeader, Title } from './table.style';
import Loader from '../Loader';

const Table = ({
  api,
  columns,
  data,
  filter = {},
  styles = {},
  headerActions = [],
  onPress,
  title,
}) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  // If API is passed, fetch data from API
  useEffect(() => {
    if (api) {
      const fetchData = async () => {
        try {
          const response = await httpService.get(api, {
            ...filter,
          });
          if (response?.data && response.data.length) {
            const result = response.data;
            setTableData(result);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (data) {
      setTableData(data); // Use provided data if no API is given
      setLoading(false);
    }
  }, [api, data]);

  const defaultStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flex: '1',
      backgroundColor: '#fff',
      border: '1px solid #e5e5ea',
      padding: '0.5rem',
      borderRadius: '8px',
    },
    tableContainer: {},
    actions: {},
    table: {},
    headerCell: {
      fontWeight: 'bold',
      // backgroundColor: '#e5e5ea',
      // color: '#697887',
      padding: '8px',
      border: '0px',
      borderBottom: '1px solid #e5e5ea',
      fontSize: '14px',
      textAlign: 'center',
    },
    bodyCell: {
      color: '#000',
      padding: '8px',
      border: '0px',
      borderBottom: '1px solid #e5e5ea',
      fontSize: '14px',
      textAlign: 'center',
    },
    lastCell: {
      color: '#000',
      padding: '8px',
      border: '0px',
      fontSize: '14px',
      textAlign: 'center',
    },
  };

  // Merge default styles with custom styles
  const tableStyles = {
    container: { ...defaultStyles.container, ...styles?.container },
    tableContainer: {
      ...defaultStyles.tableContainer,
      ...styles?.tableContainer,
    },
    table: { ...defaultStyles.table, ...styles?.table },
    headerCell: { ...defaultStyles.headerCell, ...styles?.headerCell },
    bodyCell: { ...defaultStyles.bodyCell, ...styles?.bodyCell },
    lastCell: {
      ...defaultStyles.lastCell,
      ...styles?.lastCell,
    },
  };

  return (
    <div style={tableStyles?.container}>
      {(title || headerActions.length > 0) && (
        <TableHeader>
          {title && <Title>{title}</Title>}{' '}
          <Actions style={tableStyles?.Actions}>
            {headerActions.map((action) =>
              typeof action === 'function' ? action() : action
            )}
          </Actions>
        </TableHeader>
      )}
      {/* component={Paper} */}
      <TableContainer sx={tableStyles?.tableContainer}>
        <MuiTable sx={tableStyles?.table}>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} sx={tableStyles?.headerCell}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow rowSpan={columns.length}>
                <TableCell colspan={columns.length}>
                  <Loader />{' '}
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              (tableData.length > 0 ? (
                tableData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!onPress) return;
                      onPress(row);
                    }}
                  >
                    {columns.map((col, colIndex) => {
                      const cellData = col?.render
                        ? col.render(row)
                        : row[col.field];
                      return (
                        <TableCell
                          key={colIndex}
                          sx={
                            rowIndex === tableData.length - 1
                              ? tableStyles.lastCell
                              : tableStyles?.bodyCell
                          }
                        >
                          {cellData}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colspan={columns.length}
                    sx={tableStyles?.bodyCell}
                  >
                    {'No Data Found'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default Table;
