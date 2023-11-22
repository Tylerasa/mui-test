import React from "react";
import styled from "styled-components";

import makeData from "./makeData";
import { Table } from "./Table";
import { DualTables } from "./DualTables";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Visits",
        accessor: "visits"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Profile Progress",
        accessor: "progress"
      }
    ],
    []
  );

  const rightColumns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Description",
        accessor: "description"
      },
    ],
    []
  );
  

  const [dataLeft, setDataLeft] = React.useState([
    {
      "id": "left-row0",
      "firstName": "Johnn17295",
      "lastName": "Doe",
      "age": 27,
      "visits": 76,
      "progress": 61,
      "status": "relationship",
      description: "left desc 1"

    },
    {
      "id": "left-row1",
      "firstName": "Johnn74888",
      "lastName": "Doe",
      "age": 16,
      "visits": 64,
      "progress": 83,
      "status": "single",
      description: "left desc 2"

    },
    {
      "id": "left-row2",
      "firstName": "Johnn52002",
      "lastName": "Doe",
      "age": 9,
      "visits": 19,
      "progress": 40,
      "status": "single",
      description: "left desc 3"

    },
  ]
  );
  const [dataRight, setDataRight] = React.useState([
    {
      "id": "1",
      "firstName": "Johnn90184",
      "lastName": "Doe",
      "age": 24,
      "visits": 81,
      "progress": 47,
      "status": "complicated",
      description: "desc 2"

    },
    {
      "id": "2",
      "firstName": "Johnn36361",
      "lastName": "Doe",
      "age": 15,
      "visits": 35,
      "progress": 73,
      "status": "single",
      description: "desc 2"
    },
    {
      "id": "3",
      "firstName": "Johnn66268",
      "lastName": "Doe",
      "age": 19,
      "visits": 5,
      "progress": 92,
      "status": "complicated",
      description: "desc 3"

    },
  ]
  );
  return (
    <Styles>
      <DualTables columns={columns} rightColumns={rightColumns} dataLeft={dataLeft} dataRight={dataRight} setDataLeft={setDataLeft} setDataRight={setDataRight}/>
    </Styles>
  );
}

export default App;