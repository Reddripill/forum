export const capitalizeFirstLetter = (str: string) => {
   const capitalizedFirstLetter = str.charAt(0).toUpperCase();
   return capitalizedFirstLetter + str.slice(1);
};
