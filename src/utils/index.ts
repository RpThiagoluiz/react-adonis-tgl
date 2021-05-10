export const inputFormatValue = (number: Number) => {
  return number < 10 ? `0${number}` : number;
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
