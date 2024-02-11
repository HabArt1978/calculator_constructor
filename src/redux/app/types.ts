export type AppStateTypes = {
  activeBlock: ActiveBlock
}

export type ActiveBlock = {
  id: number | string
  type: string
} | null
