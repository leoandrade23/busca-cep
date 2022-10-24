const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

let searchField = qS("#searchField");
let button = qS("#searchButton");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  let search = searchField.value.replace(/[^0-9]/g, "");
  if (search != "" && search.length == 8) {
    let url = `https://viacep.com.br/ws/${search}/json/`;
    let results = await fetch(url);
    let json = await results.json();
    if (json.erro != true) {
      clearResult();
      showResult(json);
    } else {
      clearResult();
      showWarning("Digite um CEP Válido");
    }
  } else {
    clearResult();
    showWarning("Digite um CEP");
  }
});

showResult = (json) => {
  qS(".cep").innerHTML = `CEP: ${json.cep}`;
  qS(".endereco").innerHTML = `Endereço: ${json.logradouro} - ${json.bairro}`;
  qS(".cidade").innerHTML = `Cidade: ${json.localidade} - ${json.uf}`;
  qS(".result").style.display = "flex";
};

clearResult = () => {
  qS(".result").style.display = "none";
  qS(".warning").style.display = "none";
};

showWarning = (msg) => {
  qS(".warning").style.display = "flex";
  qS(".warning").innerHTML = msg;
};
