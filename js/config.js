/**-----------------------------------------------------------------------
 * Criando a referencia a ser usadas na página "Configurações" do jogo
 */
//  var acessoColaborador = document.getElementById('Colaboradores');
//  acessoColaborador.style.display ="inline-block"
//window.onload=function(){
//     var acessoColaborador = document.getElementById('Colaboradores');
//     if(localStorage.getItem('Colaborador')=='true'){
//         //window.alert("ok")
//     acessoColaborador.style.display ="inline-block"
//    };
//};
var RefConfig = firebase.database().ref('/Configurações');


/**-----------------------------------------------------------------------
 * Definindo no escopo geral as variáveis de todos os elementos DOM 
 * existentes na página
 */



//Dados da Equipe 1
var NomeEq1 = document.getElementById('NomeEquipe1');
var Eq1Jog1 = document.getElementById('Eq1Jogador1');
var Eq1Jog2 = document.getElementById('Eq1Jogador2');
var Eq1Jog3 = document.getElementById('Eq1Jogador3');
var Eq1Jog4 = document.getElementById('Eq1Jogador4');
var Eq1Jog5 = document.getElementById('Eq1Jogador5');

//Dados da Equipe 2
var NomeEq2 = document.getElementById('NomeEquipe2');
var Eq2Jog1 = document.getElementById('Eq2Jogador1');
var Eq2Jog2 = document.getElementById('Eq2Jogador2');
var Eq2Jog3 = document.getElementById('Eq2Jogador3');
var Eq2Jog4 = document.getElementById('Eq2Jogador4');
var Eq2Jog5 = document.getElementById('Eq2Jogador5');

//Configurações da partida
var Categoria = document.getElementById('categoria');
var Tempo = document.getElementById('tempo');
var Pontos = document.getElementById('pontos');
var TotalPerguntas = document.getElementById('totalperguntas');
var ModoVoz = document.getElementById("ConfigVoz");
var UltimaAlteracaoBD = document.getElementById("UltimaAlteracaoBD");

//var ConfigVoz;
 if(localStorage.getItem("categoria")){
    RecuperarConfigLocalStorage();
 }
//Botões da página
var btnSalvar = document.getElementById('btnSalvar');
var btnOrdemPerguntas = document.getElementById("btnOrdemPerguntas");
btnSalvar.addEventListener('click', salvar);
btnOrdemPerguntas.addEventListener('click', AlterarOrdemQuestoes);
btnOrdemPerguntas.addEventListener('mousemove',MudarTexto) ;
btnOrdemPerguntas.addEventListener('mouseout',MudarTexto2) ;
/** ------------------------------------------------------------
 * Funções para comunicação com  o Realtime Database do Firebase
 */
//Função para salvar as configurações da partida no banco de dados
function salvar() {
    if((Categoria.value||Tempo.value||NomeEq1.value||Eq1Jog1.value||Eq1Jog2.value||Eq1Jog3.value|| Eq1Jog4.value||Eq1Jog5.value||Eq2Jog1.value||Eq2Jog2.value||Eq2Jog3.value||Eq2Jog4.value||Eq2Jog5.value!="")&&(Pontos.value||TotalPerguntas.value!=0)){
        SalvarLocalStorage();
        if(ModoVoz.innerText=="Ativado"){
            ConfigVoz=true;
        }else if(ModoVoz.innerText=="Desativado"){
            ConfigVoz=false;
        };
    
        var configuracoes = {
            Categoria: Categoria.value,
            Tempo: Tempo.value,
            Pontos: Pontos.value,
            TotalPerguntas:TotalPerguntas.value,
            ModoVoz:ModoVoz.value,

            NomeEq1: NomeEq1.value,
            Eq1Jog1: Eq1Jog1.value,
            Eq1Jog2: Eq1Jog2.value,
            Eq1Jog3: Eq1Jog3.value,
            Eq1Jog4: Eq1Jog4.value,
            Eq1Jog5: Eq1Jog5.value,

            NomeEq2: NomeEq2.value,
            Eq2Jog1: Eq2Jog1.value,
            Eq2Jog2: Eq2Jog2.value,
            Eq2Jog3: Eq2Jog3.value,
            Eq2Jog4: Eq2Jog4.value,
            Eq2Jog5: Eq2Jog5.value,   


        };

    
        var UserID = document.getElementById('UserID').innerText;
        RefConfig.child(UserID).update(configuracoes).then(()=>{
            alert("Dados salvos com sucesso!");
        });
        atualizaUltimaPergunta2();
        // //Adaptar o código para salavar ultima pergunta
    // var refCat = localStorage.getItem('categoria')
    // BD_Config.child(UserID).child('UltimaPergunta').child(refCat).set(UltimaPergunta).then(()=>{
    //     console.log(UltimaPergunta)
    //     //alert("Ultima pergunta salva com sucesso!");
    // });

    //return Categoria.value,TotalPerguntas.value
    }else{
        alert("Todos os campos devem ser preenchidos!");
    }
};
function MudarTexto(){
    btnOrdemPerguntas.innerText="Sortear Perguntas?"
}
function MudarTexto2(){
    btnOrdemPerguntas.innerText="Ordem Perguntas:";
}
function atualizaUltimaPergunta2(){
    var UltimaP = 0
    var UserID = document.getElementById('UserID').innerText;
    var refCat = Categoria.value
    BD_Config.child(UserID).child('UltimaPergunta').child(refCat).set(UltimaP).then(()=>{
        console.log(UltimaP)
        //alert("Ultima pergunta salva com sucesso!");
    });
    localStorage.setItem("UltimaPergunta", UltimaP)
  }
function RecuperarConfigLocalStorage(){
    Categoria.value = localStorage.getItem("categoria")
    Tempo.value = localStorage.getItem("tempo")
    Pontos.value = localStorage.getItem("pontos")
    TotalPerguntas.value = localStorage.getItem("TotalPerguntas")
    UltimaAlteracaoBD.value = localStorage.getItem("UltimaAlteracaoBD");

    ModoVoz.value = localStorage.getItem("ModoVoz")

    NomeEq1.value = localStorage.getItem("NomeEq1")
    Eq1Jog1.value = localStorage.getItem("Eq1Jog1")
    Eq1Jog2.value = localStorage.getItem("Eq1Jog2")
    Eq1Jog3.value = localStorage.getItem("Eq1Jog3")
    Eq1Jog4.value = localStorage.getItem("Eq1Jog4")
    Eq1Jog5.value = localStorage.getItem("Eq1Jog5");

    NomeEq2.value = localStorage.getItem("NomeEq2")
    Eq2Jog1.value = localStorage.getItem("Eq2Jog1")
    Eq2Jog2.value = localStorage.getItem("Eq2Jog2")
    Eq2Jog3.value = localStorage.getItem("Eq2Jog3")
    Eq2Jog4.value = localStorage.getItem("Eq2Jog4")
    Eq2Jog5.value = localStorage.getItem("Eq2Jog5")
}

function avaliaNumPerguntas(){
    var categoria = Categoria.value;
    var ValorStorage = Number(localStorage.getItem(categoria));
    var numero = Number(TotalPerguntas.value);
    console.log('função disparada pelo evento')
    if(numero>ValorStorage){
        alert("Ops. Esta categoria tem apenas "+ValorStorage+" perguntas disponíveis.")
        TotalPerguntas.value = ""
    }

}

TotalPerguntas.addEventListener('change',avaliaNumPerguntas);

Categoria.addEventListener('change',function(){
    TotalPerguntas.value="";
});



//document.onload=LerDadosBanco();

//Criando as referencias principais do banco de dados realtime do firebase para os dados que quero trabalhar
//const Configuracoes = firebase.database().ref('Configurações');

// Configuracoes.child(UserID).once('value').then(snapshot =>{
//         console.log(snapshot.numChildren());  
//         var n = snapshot.numChildren();
//         n=n+1;
        
//     //Objeto que representa as informações do novo usuário

//         var NovoUsuario = {
//             Numero:n,
//             Email:email,
//             Colaborador:false,
//             DisplayName:"",
//             Uid:usuario,
//         };
//         console.log(NovoUsuario);
//         //Usuarios.child(n).set(NovoUsuario);
//         //window.location.replace("/./index.html");
//     });