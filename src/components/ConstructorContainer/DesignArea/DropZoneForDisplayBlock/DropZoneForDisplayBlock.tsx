// import { useSortable } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

import useStateSelectors from '@/redux/app/stateSelectors'
import { getBlockContainerForDesignArea } from '@/library/utils'

import type { Block } from '@/redux/app/types'

interface DropZoneForDisplayBlockProps {
  block: Block
}
export default function DropZoneForDisplayBlock({
  block,
}: DropZoneForDisplayBlockProps) {
  const { activeStatus } = useStateSelectors()

  const { setNodeRef } = useDroppable({
    id: block.id,
  })

  return (
    <div ref={activeStatus === 'constructor' ? setNodeRef : null}>
      {getBlockContainerForDesignArea(block.id)}
    </div>
  )
}
