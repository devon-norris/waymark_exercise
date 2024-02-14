import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useAppContext } from '../appContext'
import StateCard from './StateCard'
import { reorderList } from '../helpers'

export default function StateCardList() {
  const { selectedStates, setSelectedStates } = useAppContext()

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return
    }

    setSelectedStates(reorderList({ list: selectedStates, startIndex: source.index, endIndex: destination.index }))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="stateList">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '32px' }}
          >
            {selectedStates.map((stateCode, index) => (
              <Draggable key={stateCode} draggableId={stateCode} index={index}>
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <StateCard stateCode={stateCode} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
