export default class Utilits {
  formatDate = (value) => {
    const date = new Date(value);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${monthNames[month]} ${day}, ${year} `;
  };
}
