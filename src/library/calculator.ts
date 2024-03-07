export enum Operator {
  Sum = 'sum',
  Sub = 'sub',
  Div = 'div',
  Mul = 'mul',
}

/**
 * @returns Результат вычисления
 *
 * @throws {Error} Если операция не поддерживается
 */
export function calculate(a: number, b: number, op: Operator): number {
  switch (op) {
    case Operator.Sum:
      return a + b
    case Operator.Sub:
      return a - b
    case Operator.Mul:
      return a * b
    case Operator.Div:
      return a / b
    default:
      throw new Error(`Операция "${op}" не поддерживается`)
  }
}
