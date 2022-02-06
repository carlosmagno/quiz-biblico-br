var acessoColaborador = document.getElementById('Colaboradores');
if(localStorage.getItem('Colaborador')=='true'){
    //window.alert("ok")
acessoColaborador.style.display ="inline-block"
};

const BD_Perguntas =  firebase.database().ref().child('Perguntas')
const BD_Config = firebase.database().ref().child('Configurações')

var respondida=false;
var AltSelecionada=false;
var PerguntaAtual = null;
var j1=null;
var j2=null;
var Vez=null;

// Seleciona os elementos html "input type=text" e o select da página "Colaboradores" e armazena-os em variáveis.
var Categoria = document.getElementById('categoria')
var pergunta_colab = document.getElementById('pergunta')
var altA = document.getElementById('IaltA')
var altB = document.getElementById('IaltB')
var altC = document.getElementById('IaltC')
var altD = document.getElementById('IaltD')
var correta = document.getElementById('correta')
/*-------------------------------------------------------------*/
var questao;
var questoes;
var respostaValor;
var nP;
var UltimaPergunta;
var nExibicao;
var Data2;
var n2;
var equipe;
var Jogador;

function QuestaoPraEnviar(){
  questao = {
    Pergunta: pergunta_colab.value,
    Alternativa1: altA.value,
    Alternativa2: altB.value,
    Alternativa3: altC.value,
    Alternativa4: altD.value,
    Correta: correta.value
  };
  return questao;
};

function BtnPlay(){
  window.speechSynthesis.cancel();
  if(!JogoFinalizado==true){
  ExibirQuestao();
  DesmarcaBotoes();
}

}

function ApagaCampos(){
  pergunta_colab.value = ""
  altA.value = ""
  altB.value = ""
  altC.value = ""
  altD.value = ""
  correta.value = ""
}

function EnviarQuestao() {
  var categoria = Categoria.value //Armazena a categoria do jogo para cadastrar a pergunta
  QuestaoPraEnviar();
  var questaoid = BD_Perguntas.child(categoria).push().key; // Criando o ID da pergunta. 

  //Se algum dos campos está vazio não enviar a questão
  if(pergunta_colab.value==""||altA.value == ""||altB.value ==""||altC.value ==""||altD.value ==""||correta.value == ""){
      alert("Um ou mais campos estão vazios. Verifique por favor!")
  }else{

      //Executa a função de gravar os dados acima armazenados no banco de dados.
      BD_Perguntas.child(categoria).child(questaoid).update(questao)

      .then ( //Se não houver erros executa esse trecho>>>
        function() {
        ApagaCampos();
        window.alert ("Questão enviada com sucesso!")
      }) 
      .catch ( //Se não há erros executa esse trecho>>>
        function() {
        window.alert ("[ERRO] Algum problema aconteceu!")       
      })
  }
};
    
function ExibirQuestao(){
  AltSelecionada=false;
  var np = npergunta.innerText;
  //UltimaPergunta = 

    if(respondida==false && np!=''||JogoFinalizado==true) {
      console.log('responda a pergunta!!!')

    }else if(respondida==true||np=='') {
        respondida=false;
        DesmarcaBotoes()
        if (npergunta.innerText==""){
          nP = Number(localStorage.getItem("UltimaPergunta"))
          if(nP==localStorage.getItem(infocategoria.innerText)){
            nP=0;
          }
          UltimaPergunta = nP
          nExibicao=1
          //console.log(`bloco if executado`)
        }else {
          nP +=1
          UltimaPergunta = nP
          nExibicao+=1
          //console.log(`bloco else executado ${nP}`)
        }

        atualizaUltimaPergunta();

      if (np=='0'){
        n2 = 1
      }else {
        n2 = Number(np)+1
      }
      MudaCorAlternativas('black');

      var PerguntaDaVez = questoes[nP].Pergunta
      var Alt1 = questoes[nP].Alternativa1
      var Alt2 = questoes[nP].Alternativa2
      var Alt3 = questoes[nP].Alternativa3
      var Alt4 = questoes[nP].Alternativa4
      var correta = questoes[nP].Correta
      

      pergunta.innerText = PerguntaDaVez
      a.innerText="(A) "+ Alt1
      b.innerText="(B) "+ Alt2
      c.innerText="(C) "+ Alt3
      d.innerText="(D) "+ Alt4
      npergunta.innerText =  nExibicao
      resposta.innerText =  correta
      respostaValor = correta
      //console.log('resposta baixa do BD é',correta)
      AcessaBdJogadores();
      

    }
}


function atualizaUltimaPergunta(){
  
  var UserID = document.getElementById('UserID').innerText;
  var refCat = localStorage.getItem('categoria')
  BD_Config.child(UserID).child('UltimaPergunta').child(refCat).set(UltimaPergunta).then(()=>{
      //console.log(UltimaPergunta)
      //alert("Ultima pergunta salva com sucesso!");
  });
  localStorage.setItem("UltimaPergunta", UltimaPergunta)
}
 function AcessaBdJogadores(){


    BD_Config.child(UserID.innerText).once('value').then(snapshot => {
      
      Data2 = snapshot.val();
      
      AlternaJogadores();
      MostraMsgPainel();
      PlayAuto();
      

    }).catch(
      function() {
        console.log("algum erro aconteceu, " )
      }
    )
 };

function AlternaJogadores(){
  if (iequipe1.style.backgroundColor=='rgb(78, 78, 252)'){
    vez = 2;
  }else{vez=1};

  if(vez==1){

    switch(j1){

      case null:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog1;
        j1=Data2.Eq1Jog1;
      break
      //if(respondida==true){}
      case Data2.Eq1Jog1:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog2
        j1=Data2.Eq1Jog2
      break

      case Data2.Eq1Jog2:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog3
        j1=Data2.Eq1Jog3
      break

      case Data2.Eq1Jog3:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog4
        j1=Data2.Eq1Jog4
      break

      case Data2.Eq1Jog4:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog5
        j1=Data2.Eq1Jog5
      break

      case Data2.Eq1Jog5:
        LimparJogadores();
        jogador1.innerText = Data2.Eq1Jog1;
        j1=Data2.Eq1Jog1;
      break
      
      default: console.log("Jogador 1 não selecionado");
    
    }
    equipe = NomeEq1.innerText;
   Jogador = j1 //jogador1.innerText;
   NomeEq1.style.backgroundColor='rgb(78, 78, 252)'
   NomeEq2.style.backgroundColor='rgb(55, 55, 55)'

  }else if(vez==2){
    switch(j2){

      case null:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog1;
        j2=Data2.Eq2Jog1;
      break

      case Data2.Eq2Jog1:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog2
        j2=Data2.Eq2Jog2
      break

      case Data2.Eq2Jog2:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog3
        j2=Data2.Eq2Jog3
      break

      case Data2.Eq2Jog3:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog4
        j2=Data2.Eq2Jog4
      break

      case  Data2.Eq2Jog4:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog5
        j2=Data2.Eq2Jog5
      break

      case Data2.Eq2Jog5:
        LimparJogadores();
        jogador2.innerText = Data2.Eq2Jog1;
        j2=Data2.Eq2Jog1;
      break

      default: "Jogador 2 não selecionado"
    }
    // jogador2.innerText = Data2.j2.value
    equipe = NomeEq2.innerText;
    Jogador = j2//jogador2.innerText;
    NomeEq2.style.backgroundColor='rgb(78, 78, 252)'
    NomeEq1.style.backgroundColor='rgb(55, 55, 55)'

  }
//return equipe,Jogador
};

function MostraMsgPainel(){

  var Msg = ' Esta é a última pergunta!'
  if(TotalPerguntas.innerText==n2) {
    painelmsg.innerText=`Equipe ${equipe} - Atenção ${Jogador}!` +Msg
    //console.log("buscando erro no if na ultima pergunta..")
    //SelecionaJogador(J1);

  }else{
    painelmsg.innerText=`Equipe ${equipe} - Atenção ${Jogador}!`
    //SelecionaJogador(J1);
    //console.log("buscando erro no if..")
  }
};

function DesmarcaBotoes(){
  var botoes = document.getElementsByName("resposta");
  for(var i=0;i<botoes.length;i++)
  botoes[i].checked = false;
};

function MudaCorAlternativas(cor){
      
  var respostaUser = document.querySelector('input[name="resposta"]').value;
  respostaUser = null;

  var alternativaA = document.getElementById('pA');
  alternativaA.style.backgroundColor=cor

  var alternativaB = document.getElementById('pB');
  alternativaB.style.backgroundColor=cor

  var alternativaC = document.getElementById('pC');
  alternativaC.style.backgroundColor=cor

  var alternativaD = document.getElementById('pD');
  alternativaD.style.backgroundColor=cor
};

function BuscarQuestoes (){
  var categoria = localStorage.getItem("categoria")

  //painelmsg.innerText="Baixando Questões!" 

  //Captura o snapshot do nó
  BD_Perguntas.child(categoria).on('value', (snapshot) => {
    var nquestoes = snapshot.numChildren()
    questoes = []
      //(Laço de repetição) Para cada elemento filho dentro do snapshot..
      snapshot.forEach ((childSnapshot) => {
          //var childKey = childSnapshot.key; //vai receber e armazenar numa variável a key (ID) do elemento (nó) filho
          var childData = childSnapshot.val(); //vai receber e armazenar numa variável o valor ou conteúdo inteiro do elemento (nó) filho

          questoes.push(childData)
          //console.log(questoes)
      })
      SortearQuestoes();
      painelmsg.innerText="Pronto!"  
  })  
};
function SortearQuestoes(){
  var ordem = Number(localStorage.getItem('OrdemPerguntas'));
  var argument = "";

    switch(ordem){

    case 1:
      argument="Alternativa1"
    break

    case 2:
      argument="Alternativa2"
    break

    case 3:
      argument="Alternativa3"
    break

    case 4:
      argument="Alternativa4"
    break

    case 5:
      argument="Pergunta"
    break

    default: console.log("tudo certo")
    }
  
    questoes.sort(function(a,b){
      if(a[argument] <b[argument]){
        return -1;
      }else {
        return true;
      }
    });
    //console.log("testando o sorteio de perguntas: ",questoes);
};

function AlterarOrdemQuestoes(){

  //var data = new Date()
  var data = new Date()
  var DataHora;
  var hora = data.getHours()
  var minutos = data.getMinutes()
  var mes= (data.getMonth()+1)

  if(hora<10) {hora="0"+hora}
  if(minutos<10) {minutos="0"+minutos}
  if(mes<10) {mes="0"+mes}
  DataHora = data.getDate() + "/" + mes + "/" + data.getFullYear() + " - " + hora + ":" + minutos
  console.log(DataHora)

  var OrdemPerguntasBDLocal = Number(localStorage.getItem('OrdemPerguntas'));
  OrdemPerguntasBDLocal+=1
  if(OrdemPerguntasBDLocal>5){
    OrdemPerguntasBDLocal=1
  }
  localStorage.setItem('OrdemPerguntas',OrdemPerguntasBDLocal);
  localStorage.setItem('UltimaAlteracaoBD',"Alteração: "+DataHora); 
  var configuracoes={
    OrdemPerguntas:OrdemPerguntasBDLocal,
    UltimaAlteracaoBD: "Alteração: "+ DataHora
  }
  var UserID = document.getElementById('UserID').innerText;
  RefConfig.child(UserID).update(configuracoes).then(()=>{
 
    alert("Ordem das perguntas alteradas!");
  });
  UltimaAlteracaoBD.value = localStorage.getItem('UltimaAlteracaoBD')
};

function LimparJogadores(){
  jogador1.innerText="";
  jogador2.innerText="";

};

function atualizaUltimaPerguntaAposResposta(){
  var UserID = document.getElementById('UserID').innerText;
  var refCat = localStorage.getItem('categoria')

  if(UltimaPergunta==localStorage.getItem(refCat)){
    UltimaPergunta=0;
  }else{
    UltimaPergunta += 1
  }
  //console.log("testando nova função",UltimaPergunta)
  BD_Config.child(UserID).child('UltimaPergunta').child(refCat).set(UltimaPergunta).then(()=>{
      //console.log(UltimaPergunta)
      //alert("Ultima pergunta salva com sucesso!");
  });
  localStorage.setItem("UltimaPergunta", UltimaPergunta)
}
  function VerificaResposta() {

    
    parar(contador);
    window.speechSynthesis.cancel();
    respondida = false;
    var npergunta = document.getElementById('npergunta')
    var n2= Number(npergunta.innerText)

  if(AltSelecionada==true){
    respondida = true;
    respostaUser = null;
    console.log("pergunta já respondida!!!")
  }else if(n2==0){
    console.log("Começe o jogo, clique no botão play!!!")
  }else{
    //Pegar valor do option button e fazer função aqui
    atualizaUltimaPerguntaAposResposta();
   

    //var selecao = document.querySelector('input[name="resposta"]:checked');
    var respostaUser = document.querySelector('input[name="resposta"]:checked').value;
    var pontos = document.getElementById('pontos').innerText;
    //console.log(pontos);
    var pontos = Number(pontos);
    //console.log(pontos);
    
    npergunta.innerText = n2
    //console.log(npergunta.innerText)
    //console.log( typeof(n2))
    //console.log('A resposta baixa do BD foi', respostaValor)
    //console.log('A resposta do usuário foi ',respostaUser)
    
    const n = respostaUser;
    switch(n) {
      case 'A':
        var selecao= document.getElementById('pA')
      break
      case 'B':
        var selecao= document.getElementById('pB')
      break
      case 'C':
        var selecao= document.getElementById('pC')
      break
      case 'D':
        var selecao= document.getElementById('pD')
      break
  
      default:
        console.log('nada a falar');
  };

    if ( respostaValor== respostaUser) {
      //console.log('Resposta Certa!')
      painelmsg.innerText = "Parabéns! A sua resposta está certa."
      painel.style.backgroundColor='rgb(78, 78, 252)';
      selecao.style.backgroundColor = 'green';
  
        if (iequipe1.style.backgroundColor=='rgb(78, 78, 252)'){
          PontosEq1.innerText = +PontosEq1.innerText+pontos;
        }else{
          PontosEq2.innerText = +PontosEq2.innerText+pontos;
        };
        if(ConfigVoz==true) {
                
          Voz(painelmsg.innerText);
      }
    }else {
      //console.log('Resposta Errada!')
      painelmsg.innerText = "Que pena! A sua resposta está errada."
      painel.style.backgroundColor='rgb(78, 78, 252)';
      //PontosEq1 = Number(-10)
      selecao.style.backgroundColor = 'red';
      if(ConfigVoz==true) {
                
        Voz(painelmsg.innerText);
    }
    };


    respondida = true;
    AltSelecionada = true;
    //console.log(respondida);
    //console.log(AltSelecionada);
    
    if(TotalPerguntas.innerText==n2) {
      ChamaFimJogo();
      JogoFinalizado = true;
      gravaScoreLocal();
    }  
    return respondida, AltSelecionada;
  };

};
function NovaEnviarQuestao() {

  var UserID = document.getElementById('infologin2');
  //Armazena a categoria do jogo para cadastrar a pergunta
  var categoria = document.getElementById('categoria').value

  // Seleciona os elementos html "input type=text" da página "Colaboradores" e armazena-os em variáveis.
  var pergunta = document.getElementById('pergunta')
  var altA = document.getElementById('IaltA')
  var altB = document.getElementById('IaltB')
  var altC = document.getElementById('IaltC')
  var altD = document.getElementById('IaltD')
  var correta = document.getElementById('correta')
  /*-------------------------------------------------------------*/

  /*Cria a objeto "questão" que vai armazenar todos os valores (conteúdo) das variáveis criadas acima
  e atribuir cada um deles aos campos correspondentes do banco de dados. */
  var questao = {
    Pergunta: pergunta.value,
    Alternativa1: altA.value,
    Alternativa2: altB.value,
    Alternativa3: altC.value,
    Alternativa4: altD.value,
    Correta: correta.value,
    Usuario: UserID.innerText
  };

  // Criando o ID da pergunta. Child refere-se ao nó principal do banco de dados.
  const Ref= firebase.database().ref().child('Perguntas/' + categoria);

  Ref.once('value').then(snapshot =>{
    console.log(snapshot.numChildren());  
    var n = snapshot.numChildren();
    n=n+1;

  Ref.child(n).set(questao)

  //Tratamento de erros para retorno da função...
  //Se não houver erros executa esse trecho>>>
  .then (
    function() {
    //Apaga o conteúdo dos campos do formulário
    pergunta.value = ""
    altA.value = ""
    altB.value = ""
    altC.value = ""
    altD.value = ""
    correta.value = ""
    //Confirma para o usuário que os dados foram enviados
    window.alert ("Questão enviada com sucesso!")
  
  }) 
  //Se não há erros executa esse trecho>>>
  .catch (
    function() {
    window.alert ("[ERRO] Algum problema aconteceu!")
  
  })
  ;
  // Fim do tratamento de erros
});
}
  

