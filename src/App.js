import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./container";
import { Item } from "./sortable_item";
import DataTable from "./table";

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
};

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function App() {
  const [items, setItems] = useState({
    root: ["1", "2", "3"],
    container1: ["4", "5", "6"],
    container2: ["7", "8", "9"],
    container3: [],
  });
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function createData(id, name, calories, fat, carbs, protein, tableId) {
    return { id, name, calories, fat, carbs, protein, tableId };
  }

  const leftRows = [
    createData(11, "Frozen yoghurt", 159, 6.0, 24, 4.0, 1),
    createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3, 1),
    createData(3, "Eclair", 262, 16.0, 24, 6.0, 1),
    createData(4, "Cupcake", 305, 3.7, 67, 4.3, 1),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9, 1),
  ];

  const rightRows = [
    createData(6, "Water", 159, 6.0, 24, 4.0, 2),
    createData(7, "Ice", 237, 9.0, 37, 4.3, 2),
    createData(8, "Milk", 262, 16.0, 24, 6.0, 2),
    createData(9, "Cake", 305, 3.7, 67, 4.3, 2),
    createData(10, "Bread", 356, 16.0, 49, 3.9, 2),
  ];

  const allRows = [...leftRows, ...rightRows];
  const allTable = [
    {
      name: "left",
      id: 1,
      name: "right",
      id: 2,
    },
  ];

  const reOrder = (data) => {
    let { rowId, oldContainer, newContainer, oldIndex, newIndex } = data;
    console.log({ rowId, oldContainer, newContainer, oldIndex, newIndex });

    if(oldContainer !== newContainer){

    }

    // const pickedRow = allRows.findIndex((row) => row.id === rowId);
    // console.log("pickedRow", pickedRow);

    // var prevSectionIDs = [];
    // var preQuestionCount = 0;

    // // Adjust index sequences
    // const newTable = allRows.find((row) => row.name === newContainer);
    // const oldTable = allRows.find((row) => row.name === oldContainer);
    // console.log({ newRow, oldRow });






    // if(newSection){
    // 	prevSectionIDs = allRows
    // 		.filter(section => section.sequence < newSection.sequence)
    // 		.map((section) => section._id)
    // }

    // preQuestionCount = state.questions
    // 	.filter(question =>
    // 			prevSectionIDs.includes(question.data_form_section_id ?? ' ')
    // 	)
    // 	.filter(question => question._id !== state.questions[pickedRow]._id)
    // 	.length;
    // newIndex+= preQuestionCount;

    // if(oldSection){
    // 	prevSectionIDs = state.sections
    // 	.filter(section => section.sequence < oldSection.sequence)
    // 	.map((section) => section._id)
    // }
    // preQuestionCount = state.questions
    // 	.filter(question =>
    // 		prevSectionIDs.includes(question.data_form_section_id ?? ' ')
    // 	)
    // 	.length;
    // oldIndex+= preQuestionCount;

    // state.questions[pickedRow].sequence = newIndex + 1;

    // if(newIndex > oldIndex) {
    // 	state.questions
    // 		.filter(question => question.parent_question_id === state.questions[pickedRow].parent_question_id)
    // 		.toSorted((a, b) => a.sequence - b.sequence)
    // 		.filter(question => question._id !== state.questions[pickedRow]._id)
    // 		.filter(question => question.sequence < ((newIndex) + 2))
    // 		.map((question, index) => {
    // 			question.sequence = (index) + 1;
    // 			return question;
    // 		});
    // }
    // else {
    // 	state.questions
    // 	.filter(question => question.parent_question_id === state.questions[pickedRow].parent_question_id)
    // 	.toSorted((a, b) => a.sequence - b.sequence)
    // 	.filter(question => question._id !== state.questions[pickedRow]._id)
    // 	.filter(question => question.sequence > (newIndex))
    // 	.map((question, index) => {
    // 		question.sequence = (index + newIndex) + 2;
    // 		return question;
    // 	});
    // }

    // if(oldContainer !== newContainer) {
    // 	state.questions[pickedRow].data_form_section_id = newContainer;
    // }
  };

  return (
    <div className="" >
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={leftRows} />
        <Container id="container1" items={rightRows} />

        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    // console.log(
    //   "active", active
    // );
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      // setActiveDragQuestion(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable?.index ?? 0;
      console.log({ activeContainer, overContainer });

      let data = {
        rowId: active.id,
        oldContainer: activeContainer,
        newContainer: overContainer,
        oldIndex: activeIndex,
        newIndex: overIndex,
      };
      reOrder(data);
    }

    setActiveId(null);
  }
}
