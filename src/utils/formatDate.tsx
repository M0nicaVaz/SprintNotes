type formatDateType = 'short' | 'default';

const shortMonths = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function formatDate(
  date: string | Date,
  type: formatDateType = 'default'
) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const monthArr = type === 'short' ? shortMonths : months;
  const month = monthArr[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedTime = dateObj.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = `${day} de ${month} de ${year} - ${formattedTime}`;

  return formattedDate;
}
