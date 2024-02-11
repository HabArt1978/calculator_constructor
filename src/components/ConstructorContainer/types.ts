export interface BlockContainerProp {
  block: Block
  children: React.ReactNode
}

export interface Block {
  id: number | string
  type: string
}
