export function renderTime(date) {
  const currentDate = new Date();
  const newDate = new Date(date);
  const splitNewDate = newDate.toString().split(' ')
  const numberOfDays = currentDate.getDay() - newDate.getDay();
  const word = numberOfDays === 0
    ? 'Сегодня'
    : numberOfDays === 1
      ? 'Вчера'
      : `${numberOfDays} дня назад`
  // Wed Aug 18 2021 01:13:48 GMT+0300 (Moscow Standard Time)
  return `${word}, ${splitNewDate[4]} i-${splitNewDate[5].slice(-8, 6)}`
}
