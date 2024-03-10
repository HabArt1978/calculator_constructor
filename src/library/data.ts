import { createElement } from 'react'

import Display from '@/components/ConstructorContainer/BuildingBlocks/Display/Display'
import EqualButton from '@/components/ConstructorContainer/BuildingBlocks/EqualButton/EqualButton'
import MathOperators from '@/components/ConstructorContainer/BuildingBlocks/MathOperators/MathOperators'
import NumericBlock from '@/components/ConstructorContainer/BuildingBlocks/NumericBlock/NumericBlock'
import type { BlockContainerProp } from '@/redux/app/types'

export const buildingBlocksData: BlockContainerProp[] = [
  {
    block: {
      id: 'dragDisplayBlock',
      type: 'display',
    },
    children: createElement(Display),
  },
  {
    block: { id: 'dragMathOperatorsBlock', type: 'operators' },
    children: createElement(MathOperators),
  },
  {
    block: { id: 'dragNumericBlock', type: 'numeric' },
    children: createElement(NumericBlock),
  },
  {
    block: { id: 'dragEqualBlock', type: 'equal' },
    children: createElement(EqualButton),
  },
]

export const blocksIds = buildingBlocksData.map(block => block.block.id)
