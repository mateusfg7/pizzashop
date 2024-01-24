import { api } from '~/lib/axios'

export interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/profile')

  return response.data
}
