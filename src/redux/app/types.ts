export type AppStateTypes = {
  activeBlock: ActiveBlock
  designBlocks: DesignBlocks
  droppableBlockPosition: DroppableBlockPosition
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
