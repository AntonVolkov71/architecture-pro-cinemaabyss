export type PaymentsType = {
  id: number
  user_id: number
  payment_id: number
  status: string
  amount: number
  method_type: string
  timestamp: Date
}

export type PaymentsCreateDto = Omit<PaymentsType, 'id'>
