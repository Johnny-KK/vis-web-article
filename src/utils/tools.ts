import moment from 'moment';

export function timeFormatter(time: string): string {
  return moment(time).format('YYYY-MM-DD');
}
