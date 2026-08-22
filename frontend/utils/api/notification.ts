import { api } from './api';

export const markNotificationAsRead = async (id: number) => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
};
