import api from "../axios"
import { ENDPOINTS } from "../endpoints"

export const PropertyService = {
  getAll() {
    return api.get(ENDPOINTS.PROPERTIES)
  },

  getById(id: string) {
    return api.get(`${ENDPOINTS.PROPERTIES}/${id}`)
  },

  create(data: any) {
    return api.post(ENDPOINTS.PROPERTIES, data)
  },

  update(id: string, data: any) {
    return api.put(`${ENDPOINTS.PROPERTIES}/${id}`, data)
  },

  delete(id: string) {
    return api.delete(`${ENDPOINTS.PROPERTIES}/${id}`)
  },
}