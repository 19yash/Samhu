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

const Table = ({ api, columns, data, filter }) => {
  const [tableData, setTableData] = useState([]);

  // If API is passed, fetch data from API
  useEffect(() => {
    if (api) {
      const fetchData = async () => {
        try {
          const response = await httpService.get(api, {
            filter,
          });
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

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>{col.header}</TableCell>
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
                  return <TableCell key={colIndex}>{cellData}</TableCell>;
                })}
              </TableRow>
            ))
          ) : (
            <TableRow key={0}>No Data Found</TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
