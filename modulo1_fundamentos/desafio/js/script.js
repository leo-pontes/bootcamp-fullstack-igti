let txtBusca = null;
let btnBusca = null;
let espacoListaPessoas = null;
let spnUsuarios = null;
let spnMasculino = null;
let spnFeminino = null;
let spnSomaIdade = null;
let spnMediaIdade = null;
let countUsuarios = 0;
let countMasculino = 0;
let countFeminino = 0;
let countSomaIdade = 0;
let countMediaIdade = 0;
let listaPessoas = [];
let listaPessoasFiltrada = [];
let numberFormat = null;

window.addEventListener("load", () => {
  txtBusca = document.querySelector("#txtBusca");
  btnBusca = document.querySelector("#btnBusca");
  espacoListaPessoas = document.querySelector("#tabPeople");

  numberFormat = Intl.NumberFormat("pt-BR");

  spnUsuarios = document.querySelector("#countUsers");
  spnMasculino = document.querySelector("#totMasculino");
  spnFeminino = document.querySelector("#totFeminino");
  spnSomaIdade = document.querySelector("#sumIdade");
  spnMediaIdade = document.querySelector("#medIdade");

  btnBusca.addEventListener("click", btnBuscarClick);

  txtBusca.addEventListener("keyup", (event) => {
    if (event.code === "Enter") btnBuscarClick();
  });

  fetchPeople();
});

const fetchPeople = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );

  const json = await res.json();

  listaPessoas = json.results.map((c) => {
    const { gender, name, picture, dob } = c;
    return {
      genero: gender === "female" ? "Feminino" : "Masculino",
      nome: `${name.first} ${name.last}`,
      idade: dob.age,
      foto: picture.medium // prettier-ignore
    };
  });
};

const btnBuscarClick = () => {
  if (txtBusca.value === "") {
    listaPessoasFiltrada = [];
  } else {
    listaPessoasFiltrada = listaPessoas.filter((item) =>
      item.nome.toLowerCase().includes(txtBusca.value.toLowerCase())
    );
  }

  render();
};

const render = () => {
  renderList();
  renderValues();
};

const renderList = () => {
  let peopleHTML = "<div>";

  listaPessoasFiltrada.forEach((c) => {
    const { nome, idade, foto } = c;
    const personHTML = `
        <div class="person">            
            <div>
                <img src="${foto}" alt="${nome}">
            </div>
            <div>
                <ul>
                    <li>${nome}</li>
                    <li>${idade} anos</li>
                </ul>
            </div>
        </div>    
    `;

    peopleHTML += personHTML;
  });

  peopleHTML += "</div>";

  espacoListaPessoas.innerHTML = peopleHTML;
};

const renderValues = () => {
  countUsuarios = listaPessoasFiltrada.length;

  if (countUsuarios > 0) {
    listaPessoasFiltrada.forEach((item) => {
      if (item.genero === "Masculino") countMasculino += 1;
    });

    listaPessoasFiltrada.forEach((item) => {
      if (item.genero === "Feminino") countFeminino += 1;
    });

    countSomaIdade = listaPessoasFiltrada.reduce((acc, curr) => acc += curr.idade, 0); //prettier-ignore
    countMediaIdade = countSomaIdade / countUsuarios;

    spnUsuarios.textContent = formatNumber(countUsuarios);
    spnMasculino.textContent = formatNumber(countMasculino);
    spnFeminino.textContent = formatNumber(countFeminino);
    spnSomaIdade.textContent = formatNumber(countSomaIdade);
    spnMediaIdade.textContent = formatNumber(countMediaIdade);
  } else {
    spnUsuarios.textContent = 0;
    spnMasculino.textContent = 0;
    spnFeminino.textContent = 0;
    spnSomaIdade.textContent = 0;
    spnMediaIdade.textContent = 0;
  }
};

const formatNumber = (number) => numberFormat.format(number);
