import { useSortable } from '@dnd-kit/sortable'

import useStateSelectors from '@/redux/app/stateSelectors'
import type { BlockContainerProp } from '@/redux/app/types'

import BlockDropPositionIndicator from '@/components/ConstructorContainer/DesignArea/BlockDropPositionIndicator/BlockDropPositionIndicator'

import styles from './blockContainerForDesignArea.module.scss'

export default function BlockContainerForDesignArea({
  block,
  children,
}: BlockContainerProp) {
  const { activeStatus } = useStateSelectors()

  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: block.id,
    data: {
      type: block.type,
      block,
    },
  })

  const blockContainerStyles = [
    styles.blockContainerForDesignArea,
    activeStatus === 'runtime' && styles['blockContainerForDesignArea--active'],
  ]

  const unitInnerContainerStyles = [
    styles.unitInnerContainerForDesignArea,
    activeStatus === 'runtime' &&
      styles['unitInnerContainerForDesignArea--active'],
  ]

  return (
    <>
      {activeStatus === 'constructor' ? (
        <div
          className={blockContainerStyles.join(' ')}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          {isOver && <BlockDropPositionIndicator />}

          <div
            className={unitInnerContainerStyles.join(' ')}
            style={
              block.type === ('display' || 'equal')
                ? { justifyContent: 'center', alignItems: 'center' }
                : block.type === 'operators'
                  ? { justifyContent: 'space-between', alignItems: 'center' }
                  : block.type === 'numeric'
                    ? { flexWrap: 'wrap', justifyContent: 'space-between' }
                    : {}
            }
          >
            {children}
          </div>
        </div>
      ) : (
        <div className={blockContainerStyles.join(' ')}>
          <div
            className={unitInnerContainerStyles.join(' ')}
            style={
              block.type === ('display' || 'equal')
                ? { justifyContent: 'center', alignItems: 'center' }
                : block.type === 'operators'
                  ? { justifyContent: 'space-between', alignItems: 'center' }
                  : block.type === 'numeric'
                    ? { flexWrap: 'wrap', justifyContent: 'space-between' }
                    : {}
            }
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
