import React, { useRef } from 'react';
import styles from "./DraggableCard.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  CHANGE_SELECTED_INGREDIENTS_ORDER,
  REMOVE_SELECTED_INGREDIENT
} from "../../services/actions/burgerConstructor";

function DraggableCard({ meal, index, localId }) {

  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
                             accept: 'cards',
                             hover: (item, monitor) => {

                               if (!ref.current) {
                                 return;
                               }
                               const dragIndex = item.index;
                               const hoverIndex = index;
                               // Don't replace items with themselves
                               if (dragIndex === hoverIndex) {
                                 return;
                               }
                               // Determine rectangle on screen
                               const hoverBoundingRect = ref.current?.getBoundingClientRect();
                               // Get vertical middle
                               const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                               // Determine mouse position
                               const clientOffset = monitor.getClientOffset();
                               // Get pixels to the top
                               const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                               // Only perform the move when the mouse has crossed half of the items height
                               // When dragging downwards, only move when the cursor is below 50%
                               // When dragging upwards, only move when the cursor is above 50%
                               // Dragging downwards
                               if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                                 return;
                               }
                               // Dragging upwards
                               if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                                 return;
                               }
                               dispatch({
                                          type: CHANGE_SELECTED_INGREDIENTS_ORDER,
                                          payload: { dragIndex, hoverIndex }
                                        })
                               item.index = hoverIndex;
                             }
                           })

  const [{ isDragging }, drag] = useDrag({
                                           type: 'cards',
                                           item: () => {
                                             return { index };
                                           },
                                           collect: (monitor) => ({
                                             isDragging: monitor.isDragging()
                                           })
                                         });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))

  const handleTrashIconClick = () => {
    dispatch({
               type: REMOVE_SELECTED_INGREDIENT,
               payload: { localId }
             })
  }
  return (
    <div className={styles.meal} key={localId} ref={ref} style={{ opacity }}>
      <div className="mr-2">
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        handleClose={handleTrashIconClick}
        text={meal?.name}
        price={meal?.price}
        thumbnail={meal?.image_mobile}
      />
    </div>
  );
}

export default DraggableCard;
