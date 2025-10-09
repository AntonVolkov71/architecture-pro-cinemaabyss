export type MockPaymentsType = {
  id: number
  user_id: number
  payment_id: number
  status: string
  amount: number
  method_type: string
  timestamp: Date
}

export type MockPaymentsCreateDto = Omit<MockPaymentsType, 'id'>

export const mockPayments: MockPaymentsType[] = []
