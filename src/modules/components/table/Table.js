// import React, { useEffect, useState } from 'react';
// import {
//   Table as MuiTable,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
// } from '@mui/material';
// import httpService from '../../../services/httpService';
// import { Actions, TableHeader, Title } from './table.style';
// import Loader from '../Loader';

// const Table = ({
//   api,
//   columns,
//   data,
//   filter = {},
//   styles = {},
//   headerActions = [],
//   onPress,
//   title,
// }) => {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     if (api) {
//       const fetchData = async () => {
//         try {
//           const response = await httpService.get(api, { ...filter });
//           setTableData(response?.data?.length ? response.data : []);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     } else if (data) {
//       setTableData(data);
//       setLoading(false);
//     }
//   }, [api, data, columns]);

//   const defaultStyles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '16px',
//       backgroundColor: '#fff',
//       border: '1px solid #e5e5ea',
//       padding: '16px',
//       borderRadius: '8px',
//       // maxHeight: '400px',
//     },
//     tableContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%',
//     },
//     tableHeader: {
//       display: 'block',
//       backgroundColor: '#f5f5f5',
//     },
//     tableBody: {
//       display: 'block',
//       // overflowY: 'auto',
//       // maxHeight: '300px',
//       width: '100%',
//     },
//     table: { width: '100%', tableLayout: 'fixed' },
//     headerCell: {
//       fontWeight: 'bold',
//       padding: '8px',
//       textAlign: 'center',
//     },
//     tableCell: {
//       flex: '1',
//     },
//     bodyCell: {
//       padding: '8px',
//       textAlign: 'center',
//     },
//     lastCell: {
//       padding: '8px',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//   };

//   const tableStyles = {
//     container: { ...defaultStyles.container, ...styles?.container },
//     tableContainer: {
//       ...defaultStyles.tableContainer,
//       ...styles?.tableContainer,
//     },
//     tableHeader: { ...defaultStyles.tableHeader, ...styles?.tableHeader },
//     tableBody: { ...defaultStyles.tableBody, ...styles?.tableBody },
//     table: { ...defaultStyles.table, ...styles?.table },
//     headerCell: { ...defaultStyles.headerCell, ...styles?.headerCell },
//     bodyCell: { ...defaultStyles.bodyCell, ...styles?.bodyCell },
//     lastCell: { ...defaultStyles.lastCell, ...styles?.lastCell },
//     tableCell: { ...defaultStyles.tableCell, ...styles?.tableCell },
//   };

//   return (
//     <Box sx={tableStyles.container}>
//       {(title || headerActions.length > 0) && (
//         <TableHeader>
//           {title && <Title>{title}</Title>}
//           <Actions>
//             {headerActions.map((action) =>
//               typeof action === 'function' ? action() : action
//             )}
//           </Actions>
//         </TableHeader>
//       )}

//       <TableContainer component={Paper} sx={tableStyles.tableContainer}>
//         <MuiTable sx={tableStyles.table} stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((col, index) => (
//                 <TableCell key={index} sx={tableStyles.headerCell}>
//                   {col.header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           {/* Scrollable Table Body */}
//           <TableBody sx={tableStyles.tableBody}>
//             {loading ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   sx={{ textAlign: 'center' }}
//                 >
//                   <Loader />
//                 </TableCell>
//               </TableRow>
//             ) : tableData.length > 0 ? (
//               tableData.map((row, rowIndex) => (
//                 <TableRow
//                   key={rowIndex}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onPress && onPress(row);
//                   }}
//                   sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
//                 >
//                   {columns.map((col, colIndex) => {
//                     const cellData = col?.render
//                       ? col.render(row)
//                       : row[col.field];
//                     return (
//                       <TableCell
//                         key={colIndex}
//                         sx={{
//                           ...(rowIndex === tableData.length - 1
//                             ? tableStyles.lastCell
//                             : tableStyles.bodyCell),
//                           ...tableStyles.tableCell,
//                         }}
//                       >
//                         {cellData}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} sx={tableStyles.bodyCell}>
//                   No Data Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </MuiTable>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Table;

import React, { useEffect, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
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
  key,
}) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (api) {
      const fetchData = async () => {
        try {
          const response = await httpService.get(api, { ...filter });
          setTableData(response?.data?.length ? response.data : []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (data) {
      setTableData(data);
      setLoading(false);
    }
  }, [api, key]);

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      {(title || headerActions.length > 0) && (
        <TableHeader style={{ padding: '0.5rem' }}>
          {title && <Title>{title}</Title>}
          <Actions>
            {headerActions.map((action) =>
              typeof action === 'function' ? action() : action
            )}
          </Actions>
        </TableHeader>
      )}

      <TableContainer component={Paper}>
        <MuiTable sx={{ width: '100%', tableLayout: 'fixed' }} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: 'center' }}
                >
                  <Loader />
                </TableCell>
              </TableRow>
            ) : tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPress && onPress(row);
                  }}
                >
                  {columns.map((col, colIndex) => {
                    const cellData = col?.render
                      ? col.render(row)
                      : row[col.field];
                    return (
                      <TableCell
                        key={colIndex}
                        sx={{ textAlign: 'center', wordWrap: 'break-word' }}
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
                  colSpan={columns.length}
                  sx={{ textAlign: 'center' }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
