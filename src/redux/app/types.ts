import { Operator } from '@/library/calculator'

export type AppStateTypes = {
  activeBlock: ActiveBlock
  designBlocks: DesignBlocks
  droppableBlockPosition: DroppableBlockPosition
  activeStatus: ActiveStatus
  isAlertVisible: AlertVisible

  displayValue: DisplayValue
  firstDigit: Digit
  operator: Operator
  secondDigit: Digit
}

export type ActiveBlock = Block | null
export type DesignBlocks = Block[] | []

export interface BlockContainerProp {
  block: Block
  children: React.ReactNode
}

export interface Block {
  id: BlockId
  type: string
}

export type BlockId = string | number

export type DroppableBlockPosition = 'top' | 'bottom' | null

export type ActiveStatus = 'runtime' | 'constructor'

export type AlertVisible = boolean

export type DisplayValue = string

export type Digit = number | null
