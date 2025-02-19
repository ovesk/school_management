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
// import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Paginaion
  // const [currentPage, setcurrentPage] = useState(1);
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(data.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://127.0.0.1:8000/api/finance/receipt/') 
      .then((response) => {
        console.log(response.data.results); 
        setData(response.data.results); 
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((err) => {
        console.error(err); 
        setError('Failed to fetch data'); 
      });
  }, []);

  console.log(data);
  
  const handleNext = () => {
    if (nextPage) {
        axios
            .get(nextPage)
            .then((response) => {
                console.log(response.data.results);
                setData(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage((prev) => prev + 1);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch data');
            });
    }
};

  const handlePrev = () => {
    if (prevPage) {
        axios
            .get(prevPage)
            .then((response) => {
                console.log(response.data.results);
                setData(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage((prev) => prev - 1);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch data');
            });
    }
};

  // let defaultData = tableData;
  const columns = [
    columnHelper.accessor('recipient_name', {
      id: 'recipient_name',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          NAME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('amount', {
      id: 'amount',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Amount
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('transaction_date', {
      id: 'transaction_date',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Date of Transaction
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('billing_address', {
      id: 'billing_address',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Billing Address
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Description
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()} 
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('organization', {
      id: 'organization',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Organization
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
  ];
  // const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  if (data.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <><Card
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
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
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
        </Table>
    {/* Pagination Controls */}
    <div style={{ marginTop: "10px", textAlign: "center" }}>
                <div style={{}}>
                  <button onClick={handlePrev} disabled={!prevPage}>
                    Prev
                </button>
                <span style={{ margin: "0 10px" }}>{currentPage}</span>
                <button onClick={handleNext} disabled={!nextPage}>
                    Next
                </button>
                </div>
            </div>
      </Box>
    </Card>
      </>
  );
}
