import { useDroppable } from '@dnd-kit/core'

import useDesignAreaDnd from '@/hooks/dnd/useDesignAreaDnd'
import useStateSelectors from '@/redux/app/stateSelectors'
import type { Block } from '@/redux/app/types'

interface DropZoneForDisplayBlockProps {
  block: Block
}
export default function DropZoneForDisplayBlock({
  block,
}: DropZoneForDisplayBlockProps) {
  const { activeStatus } = useStateSelectors()
  const { getBlockContainerForDesignArea } = useDesignAreaDnd()

  const { setNodeRef } = useDroppable({
    id: block.id,
  })

  return (
    <div ref={activeStatus === 'constructor' ? setNodeRef : null}>
      {getBlockContainerForDesignArea(block.id)}
    </div>
  )
}
