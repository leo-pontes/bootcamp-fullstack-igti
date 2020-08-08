const formatter = Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
const formatterCurrency = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
});

const format = (value) => formatter.format(value);
const formatCurrency = (value) => formatterCurrency.format(value);

export { format, formatCurrency };
