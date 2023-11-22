import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./sortable_item";
import DataTable from "./table";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1
};

export default function Container(props) {
  const { id, items } = props;


  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
        <DataTable id={id} items={items} />

      {/* <div ref={setNodeRef} style={containerStyle}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div> */}
    </SortableContext>
  );
}
