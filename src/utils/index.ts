export const inputFormatValue = (number: Number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const currencyValue = (value: any) => {
  value = value * 100;
  value = String(value).replace(/\D/g, "");

  value = Number(value) / 100;

  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
};

export const dateFormatValue = (date: Date) => {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

export const formatNumberInArray = (selectedNumber: number[]) => {
  const crescs = (cr1: number, cr2: number) => {
    return cr1 - cr2;
  };

  const crescResult = [...selectedNumber];

  const numberResult = crescResult.sort(crescs);

  const formateNumbers = (numbers: number[]) => numbers.join(", ");

  return formateNumbers(numberResult);
};

export const formatNumberApiResponse = (selectedNumber: any[]) => {
  const crescs = (cr1: number, cr2: number) => {
    return cr1 - cr2;
  };

  const crescResult = [...selectedNumber];

  const numberResult = crescResult.sort(crescs);

  const formateNumbers = (numbers: any) => numbers.replace(/["]+/g, "");

  return numberResult;
};
