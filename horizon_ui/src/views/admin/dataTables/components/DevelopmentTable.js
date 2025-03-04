'use client';
/* eslint-disable */

import {
  Box,
  Flex,
  // Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  // HStack
} from '@chakra-ui/react';
// import {
//   PaginationNextTrigger,
//   PaginationPageText,
//   PaginationPrevTrigger,
//   PaginationRoot,
// } from "@/components/ui/pagination";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import $ from "jquery";
// import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// Assets

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function ComplexTable(props) {
  // const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [data, setData] = useState([]); // State to hold API data
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]); // Holds API data
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchAllData = async () => {
        let allResults = [];
        let url = "http://127.0.0.1:8000/api/finance/receipt/";
        
        try {
            while (url) {
                const response = await axios.get(url);
                allResults = [...allResults, ...response.data.results]; 
                url = response.data.next; 
            }
            setTableData(allResults); 
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data");
        }
    };

    fetchAllData();
}, []);



  // console.log(data);
  useEffect(() => {
    if (tableData.length > 0 && tableRef.current) {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy(); 
        }

        $(tableRef.current).DataTable({
            order: [[2, 'desc']],
            paging: true,
            searching: true,
            ordering: true,
            responsive: true,
            pageLength: 10, 
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
        });
    }
}, [tableData]);

  
//   const handleNext = () => {
//     if (nextPage) {
//         axios
//             .get(nextPage)
//             .then((response) => {
//                 console.log(response.data.results);
//                 setData(response.data.results);
//                 setNextPage(response.data.next);
//                 setPrevPage(response.data.previous);
//                 setCurrentPage((prev) => prev + 1);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError('Failed to fetch data');
//             });
//     }
// };

//   const handlePrev = () => {
//     if (prevPage) {
//         axios
//             .get(prevPage)
//             .then((response) => {
//                 console.log(response.data.results);
//                 setData(response.data.results);
//                 setNextPage(response.data.next);
//                 setPrevPage(response.data.previous);
//                 setCurrentPage((prev) => prev - 1);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError('Failed to fetch data');
//             });
//     }
// };

  // let defaultData = tableData;
  // const columns = [
  //   columnHelper.accessor('recipient_name', {
  //     id: 'recipient_name',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         NAME
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Flex align="center">
  //         <Text color={textColor} fontSize="sm" fontWeight="700">
  //           {info.getValue()}
  //         </Text>
  //       </Flex>
  //     ),
  //   }),
  //   columnHelper.accessor('amount', {
  //     id: 'amount',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         Amount
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Flex align="center">
  //         <Text color={textColor} fontSize="sm" fontWeight="700">
  //           {info.getValue()}
  //         </Text>
  //       </Flex>
  //     ),
  //   }),
  //   columnHelper.accessor('transaction_date', {
  //     id: 'transaction_date',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         Date of Transaction
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Text color={textColor} fontSize="sm" fontWeight="700">
  //         {info.getValue()}
  //       </Text>
  //     ),
  //   }),
  //   columnHelper.accessor('billing_address', {
  //     id: 'billing_address',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         Billing Address
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Flex align="center">
  //         <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
  //           {info.getValue()}
  //         </Text>
  //       </Flex>
  //     ),
  //   }),
  //   columnHelper.accessor('description', {
  //     id: 'description',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         Description
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Flex align="center">
  //         <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
  //           {info.getValue()} 
  //         </Text>
  //       </Flex>
  //     ),
  //   }),
  //   columnHelper.accessor('organization', {
  //     id: 'organization',
  //     header: () => (
  //       <Text
  //         justifyContent="space-between"
  //         align="center"
  //         fontSize={{ sm: '10px', lg: '12px' }}
  //         color="gray.400"
  //       >
  //         Organization
  //       </Text>
  //     ),
  //     cell: (info) => (
  //       <Flex align="center">
  //         <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
  //           {info.getValue()}
  //         </Text>
  //       </Flex>
  //     ),
  //   }),
  // ];
  // const [data, setData] = React.useState(() => [...defaultData]);
  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     sorting,
  //   },
  //   onSortingChange: setSorting,
  //   getCoreRowModel: getCoreRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   debugTable: true,
  // });

  // if (error) {
  //   return <Text color="red">Error: {error}</Text>;
  // }

  // if (data.length === 0) {
  //   return <Text>No data available</Text>;
  // }

  return (
    <>
    <Card
      flexDirection="column"
      w="200%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Organzation Data
        </Text>
        <Menu />
      </Flex>
      <Box
      m="3"
      >
        {/* <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      // onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table> */}
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Billing Address</th>
              <th>Description</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user) => (
              <tr key={user.id}>
                <td>{user.recipient_name}</td>
                <td>{user.amount}</td>
                <td>{user.transaction_date}</td>
                <td>{user.billing_address}</td>
                <td>{user.description}</td>
                <td>{user.organization}</td>
              </tr>
            ))}
          </tbody>
        </table>
    {/* Pagination Controls */}
    {/* <div style={{ marginTop: "10px", textAlign: "center" }}>
                <div style={{}}>
                  <button onClick={handlePrev} disabled={!prevPage}>
                    Prev
                </button>
                <span style={{ margin: "0 10px" }}>{currentPage}</span>
                <button onClick={handleNext} disabled={!nextPage}>
                    Next
                </button>
                </div>
            </div> */}
      </Box>
    </Card>
      </>
  );
}
