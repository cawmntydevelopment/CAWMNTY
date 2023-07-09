import React from 'react';
// @ts-ignore
import {DndProvider} from 'react-dnd';
// @ts-ignore
import {HTML5Backend} from 'react-dnd-html5-backend';

//const DNDManager = createDragDropManager(HTML5Backend);
export const GlobalDndContext = (props: { children: any; }) => {
    //const manager = useRef(DNDManager);
    // the following line solve the problem only with key property
    return <DndProvider backend={HTML5Backend} key={1}>{props.children}</DndProvider>
}

export default GlobalDndContext;
