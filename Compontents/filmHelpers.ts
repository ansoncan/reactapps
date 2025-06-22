import { Film } from './navigation';

export const extractValidYears = (films: Film[]): number[] => {
  return films
    .map(film => {
      if (film.year) {
        const parsedYear = parseInt(film.year, 10);
        return isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2099 ? null : parsedYear;
      }
      return null;
    })
    .filter((year): year is number => year !== null);
};

export const handleMonthSelection = (month: number, currentMonths: number[]): number[] => {
  return currentMonths.includes(month)
    ? currentMonths.filter(m => m !== month)
    : [...currentMonths, month];
};
