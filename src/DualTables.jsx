import React, { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import { DraggableTableRow } from "./DraggableTableRow";
import { StaticTableRow } from "./StaticTableRow";

export function DualTables({
  columns,
  dataLeft,
  dataRight,
  setDataLeft,
  setDataRight,
  rightColumns
  
}) {
  const [activeId, setActiveId] = useState();
  const itemsLeft = useMemo(() => dataLeft?.map(({ id }) => id), [dataLeft]);
  const itemsRight = useMemo(() => dataRight?.map(({ id }) => id), [dataRight]);

  const {
    getTableProps: getLeftTableProps,
    getTableBodyProps: getLeftTableBodyProps,
    headerGroups: leftHeaderGroups,
    rows: leftRows,
    prepareRow: prepareLeftRow,
  } = useTable({
    columns,
    data: dataLeft,
  });

  const {
    getTableProps: getRightTableProps,
    getTableBodyProps: getRightTableBodyProps,
    headerGroups: rightHeaderGroups,
    rows: rightRows,
    prepareRow: prepareRightRow,
  } = useTable({
    columns: rightColumns,
    data: dataRight,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }



function handleDragEnd(event) {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable?.index ?? 0;
  
      console.log({
        activeContainer,
        overContainer,
        activeIndex,
        overIndex,
      });
  
      if (overContainer !== activeContainer) {
        let movedItem;
        if (activeContainer === "left") {
          movedItem = dataLeft.find((item) => item.id === active.id);
          setDataLeft((prevDataLeft) =>
            prevDataLeft.filter((item) => item.id !== active.id)
          );
        } else {
          movedItem = dataRight.find((item) => item.id === active.id);
          setDataRight((prevDataRight) =>
            prevDataRight.filter((item) => item.id !== active.id)
          );
        }
  
        if (overContainer === "right") {
          setDataRight((prevDataRight) => [
            ...prevDataRight.slice(0, overIndex),
            movedItem,
            ...prevDataRight.slice(overIndex),
          ]);
        } else {
          setDataLeft((prevDataLeft) => [
            ...prevDataLeft.slice(0, overIndex),
            movedItem,
            ...prevDataLeft.slice(overIndex),
          ]);
        }
      } else {
        // Handle sorting within the same container as before
        if (overContainer === "right") {
          setDataRight((data) => {
            const oldIndex = itemsRight.indexOf(active.id);
            const newIndex = itemsRight.indexOf(over.id);
            return arrayMove(data, oldIndex, newIndex);
          });
        } else {
          setDataLeft((data) => {
            const oldIndex = itemsLeft.indexOf(active.id);
            const newIndex = itemsLeft.indexOf(over.id);
            return arrayMove(data, oldIndex, newIndex);
          });
        }
      }
    }
  
    setActiveId(null);
  }
  
  

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    console.log("activeId", activeId);
    const allRows = activeId.startsWith("left") ? leftRows : rightRows;
    const row = allRows.find(({ original }) => original.id === activeId);
    console.log("=====>", row);
    return row;
  }, [activeId, leftRows, rightRows]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      //   modifiers={[restrictToVerticalAxis]}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <table {...getLeftTableProps()}>
            <thead>
              {leftHeaderGroups.map((headerGroup) => (
                <tr>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <SortableContext
              id="left"
              items={itemsLeft}
              strategy={verticalListSortingStrategy}
            >
              <tbody {...getLeftTableBodyProps()}>
                {leftRows.map((row) => {
                  prepareLeftRow(row);
                  return (
                    <DraggableTableRow
                      key={`left-${row.original.id}`}
                      row={row}
                      id={`left-${row.original.id}`}
                    />
                  );
                })}
              </tbody>
            </SortableContext>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <table {...getRightTableProps()}>
            <thead>
              {rightHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <SortableContext
              id="right"
              items={itemsRight}
              strategy={verticalListSortingStrategy}
            >
              <tbody {...getRightTableBodyProps()}>
                {rightRows.map((row) => {
                  prepareRightRow(row);
                  return (
                    <DraggableTableRow
                      key={`right-${row.original.id}`}
                      row={row}
                      id={`right-${row.original.id}`}
                    />
                  );
                })}
              </tbody>
            </SortableContext>
          </table>
        </div>
      </div>
      <DragOverlay>
        {activeId && (
          <table style={{ width: "100%" }}>
            <tbody>
              <StaticTableRow row={selectedRow} />
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
