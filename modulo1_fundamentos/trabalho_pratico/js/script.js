var rangeVermelho = document.getElementById("rangeVermelho");
var rangeVerde = document.getElementById("rangeVerde");
var rangeAzul = document.getElementById("rangeAzul");

var inputVermelho = document.getElementById("idVermelho");
var inputVerde = document.getElementById("idVerde");
var inputAzul = document.getElementById("idAzul");

window.addEventListener("load", start);

function start() {
  function alteraCorQuadrado() {
    var quadrado = document.getElementById("rectangle");
    quadrado.style.backgroundColor =
      "rgb(" +
      inputVermelho.value +
      ", " +
      inputVerde.value +
      ", " +
      inputAzul.value +
      ")";
  }
  function alteraRangeVermelho(event) {
    inputVermelho.value = event.target.value;
    alteraCorQuadrado();
  }
  function alteraRangeVerde(event) {
    inputVerde.value = event.target.value;
    alteraCorQuadrado();
  }
  function alteraRangeAzul(event) {
    inputAzul.value = event.target.value;
    alteraCorQuadrado();
  }

  rangeVermelho.addEventListener("change", alteraRangeVermelho);
  rangeVerde.addEventListener("change", alteraRangeVerde);
  rangeAzul.addEventListener("change", alteraRangeAzul);
}
