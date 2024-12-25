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
import { Actions } from './table.style';

const Table = ({
  api,
  columns,
  data,
  filter,
  styles = {},
  headerActions = [],
}) => {
  const [tableData, setTableData] = useState([]);

  // If API is passed, fetch data from API
  useEffect(() => {
    console.log('called');
    if (api) {
      const fetchData = async () => {
        try {
          const response = await httpService.get(api, {
            filter,
          });
          console.log('🚀 ~ fetchData ~ response:', response);
          if (response?.data && response.data.length) {
            const result = response.data;
            setTableData(result);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else if (data) {
      setTableData(data); // Use provided data if no API is given
    }
  }, [api, data]);

  const defaultStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flex: '1',
    },
    tableContainer: { backgroundColor: '#fff' },
    actions: {},
    table: {},
    headerCell: {
      fontWeight: 'bold',
      backgroundColor: '#e5e5ea',
      color: '#697887',
      padding: '8px',
    },
    bodyCell: {
      color: '#000',
      padding: '8px',
    },
  };

  // Merge default styles with custom styles
  const tableStyles = {
    container: { ...defaultStyles.container, ...styles?.container },
    table: { ...defaultStyles.table, ...styles?.table },
    headerCell: { ...defaultStyles.headerCell, ...styles?.headerCell },
    bodyCell: { ...defaultStyles.bodyCell, ...styles?.bodyCell },
  };

  return (
    <div style={tableStyles?.container}>
      <Actions style={tableStyles?.Actions}>
        {headerActions.map((action) =>
          typeof action === 'function' ? action() : action
        )}
      </Actions>
      <TableContainer component={Paper} sx={tableStyles?.tableContainer}>
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
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const cellData = col?.render
                      ? col.render(row)
                      : row[col.field];
                    return (
                      <TableCell key={colIndex} sx={tableStyles?.bodyCell}>
                        {cellData}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan={columns.length} sx={tableStyles?.bodyCell}>
                  {'No Data Found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default Table;
