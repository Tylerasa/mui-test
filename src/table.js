import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SortableItem from "./sortable_item";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
    flex: 1,
};

export default function BasicTable(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <TableContainer component={Paper}>``
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
          <SortableContext
            id={id}
            items={items}
            strategy={rectSortingStrategy}
          >
        <TableBody  ref={setNodeRef}
                style={containerStyle}>
            {items.map((row, id) => (
              <TableRow
               
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}-{row.tableId}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
        </TableBody>
          </SortableContext>
      </Table>
    </TableContainer>
  );
}


import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
      
    </div>
  );
}
