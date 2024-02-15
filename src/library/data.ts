import React from 'react'

import Display from '@/components/ConstructorContainer/BuildingBlocks/Display/Display'
import MathOperators from '@/components/ConstructorContainer/BuildingBlocks/MathOperators/MathOperators'
import NumericBlock from '@/components/ConstructorContainer/BuildingBlocks/NumericBlock/NumericBlock'
import EqualButton from '@/components/ConstructorContainer/BuildingBlocks/EqualButton/EqualButton'

import type { BlockContainerProp } from '@/redux/app/types'

export const buildingBlocksData: BlockContainerProp[] = [
  {
    block: {
      id: 'dragDisplayBlock',
      type: 'display',
    },
    children: React.createElement(Display),
  },
  {
    block: { id: 'dragMathOperatorsBlock', type: 'operators' },
    children: React.createElement(MathOperators),
  },
  {
    block: { id: 'dragNumericBlock', type: 'numeric' },
    children: React.createElement(NumericBlock),
  },
  {
    block: { id: 'dragEqualBlock', type: 'equal' },
    children: React.createElement(EqualButton),
  },
]
