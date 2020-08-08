const moneyFormatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function formatMoney(value) {
    return moneyFormatter.format(value);
}

function formatMoneyPositiveNegative(value) {
    const money = moneyFormatter.format(value);

    if (value >= 0) {
        return `+${money}`;
    }

    return money;
}

function formatPercent(value) {
    if (!value) {
        return "";
    }
    return value.toFixed(2).replace(".", ",") + "%";
}

function leftPad(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || "0") + value;
}

export { formatMoney, formatPercent, formatMoneyPositiveNegative, leftPad };
