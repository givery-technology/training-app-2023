import dayjs from 'dayjs';

export function formatDateTime(date?: string) {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
}