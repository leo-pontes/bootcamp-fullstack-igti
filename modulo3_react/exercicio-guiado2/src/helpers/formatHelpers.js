const formatter = Intl.NumberFormat("pt-BR");

const formatNumber = (value) => formatter.format(value);

export {formatNumber};