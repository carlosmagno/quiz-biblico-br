var msgNaoColaborador = document.getElementById("msgNaoColaborador")



VerificaColaborador();

function VerificaColaborador(){
  if(localStorage.getItem("Colaborador")=='true') {
      
      if(formcolab){
      msgNaoColaborador.style.display="none";
      formcolab.style.display = "block";
      }
  } else {
      

      if(msgNaoColaborador){
      msgNaoColaborador.style.color = "red";
      msgNaoColaborador.style.backgroundColor = "yellow";
      msgNaoColaborador.innerText = "Você não pode enviar questões pois não tem acesso de colaborador!";
      }
      //alert('Você não pode enviar questões pois não tem acesso de colaborador!');
  };
};

const referenciabd1 = {};

/*Função anônima. Tudo o que for colocado aqui dentro não é exibido no navegador de outros usuários.
  Isso é muito importante se queremos proteger os dados ou o nosso código*/
(function(){
      
      //Esta função é responsável por buscar as questões no banco de dados de acordo com as configurações feitas pelo usuário.
      function listarcategorias (){

        //Remove todos os elementos filhos do select antes de adicionar a lista atualizada
        var listacategorias = document.getElementById("categoria")

        var n = 0
        while (listacategorias.firstChild) {
        listacategorias.removeChild(listacategorias.firstChild)
        }

        //Define o caminho em que será feita a leitura
        var RecebeLista = firebase.database().ref('/Categorias/');

        //Captura ou "tira uma foto instantanea" de todos os nós (e seus conteúdos) dentro do caminho
          RecebeLista.once('value', (snapshot) => {

            /*Armazena o número de nós secundários dentro do snapshot do nó principal capturado. Útil para tratar as perguntas
            depois individualmente */
            //var ncategorias = snapshot.numChildren()

              //(Laço de repetição) Para cada elemento filho dentro do snapshot..
              snapshot.forEach ((childSnapshot) => {
                  //var childKey = childSnapshot.key; //vai receber e armazenar numa variável a key (ID) do elemento (nó) filho
                  var childData = childSnapshot.val(); //vai receber e armazenar numa variável o valor ou conteúdo inteiro do elemento (nó) filho
                  
                  // A partir daqui decidir como tratar as questões recebidas
                  /*console.log(nquestoes)
                  console.log(childKey)
                  console.log(childData)
                  */
                  n = n+1
                  let iten = document.createElement('option')
                  //let iten2 = document.createElement('option')
                  iten.text = childData.Categoria

                  //iten2.text = childKey
                  listacategorias.appendChild(iten)
                  //lista.appendChild(iten2)
                  // Fim do código.
              });
              Categoria.value = localStorage.getItem("categoria")
          });

      }
   
 //Esta função é responsável por buscar as questões no banco de dados de acordo com as configurações feitas pelo usuário.
 function contarperguntas (){

  //Remove todos os elementos filhos do select antes de adicionar a lista atualizada
  var contagemperguntas = document.getElementById("contagemperguntas")
  var NumPerguntas = document.getElementById("NumPerguntas")
  var n = 0
  while (contagemperguntas.firstChild) {
    contagemperguntas.removeChild(contagemperguntas.firstChild)
  }

  //Define o caminho em que será feita a leitura
  var ContaPerguntas = firebase.database().ref('/Perguntas/');

  //Captura ou "tira uma foto instantanea" de todos os nós (e seus conteúdos) dentro do caminho
  ContaPerguntas.once('value', (snapshot) => {

      /*Armazena o número de nós secundários dentro do snapshot do nó principal capturado. Útil para tratar as perguntas
      depois individualmente */
      var nperguntas = snapshot.numChildren()
      //var total = nperguntas.childSnapshot.numChildren()

        //(Laço de repetição) Para cada elemento filho dentro do snapshot..
        snapshot.forEach ((childSnapshot) => {
            var childKey = childSnapshot.key; //vai receber e armazenar numa variável a key (ID) do elemento (nó) filho
            var childData = childSnapshot.val(); //vai receber e armazenar numa variável o valor ou conteúdo inteiro do elemento (nó) filho
            var nPerCat = childSnapshot.numChildren()
            var ntotal = 0
            // A partir daqui decidir como tratar as questões recebidas
            /*console.log(nquestoes)
            console.log(childKey)
            console.log(childData)
            */
            
            let iten = document.createElement('option')
            //let iten2 = document.createElement('option')
            iten.text = `${childKey}: ${nPerCat}`
            localStorage.setItem(childKey,nPerCat);
            //iten2.text = childKey
            contagemperguntas.appendChild(iten)
            //lista.appendChild(iten2)
            // Fim do código.
        });
        //NumPerguntas.innerText=`Total de Perguntas por Categoria`;
    });

}

  //Cria as chamadas externas para as funções que estão protegidas dentro da função anônima
   referenciabd1.listar = listarcategorias;
   referenciabd1.contar = contarperguntas;


}) () ;

function salvarCountPerguntasStorage(categoria, total_perguntas){
  localStorage.setItem(categoria,total_perguntas)

}
window.onload = referenciabd1.listar()
window.onload = referenciabd1.contar()



