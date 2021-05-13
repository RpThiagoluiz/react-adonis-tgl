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

export const crescentArrayNumbers = (selectedNumber: any) => {
  const crescs = (cr1: any, cr2: any) => {
    return cr1 - cr2;
  };

  const crescResult = [...selectedNumber];

  return crescResult.sort(crescs);
};
