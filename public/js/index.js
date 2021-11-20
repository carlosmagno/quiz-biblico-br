painelmsg.innerText="Baixando Questões!" 
/** Ações no evento de carregamento da página
 */
//  var acessoColaborador = document.getElementById('Colaboradores');
//  if(localStorage.getItem('Colaborador')=='true'){
//      //window.alert("ok")
//  acessoColaborador.style.display ="inline-block"
// };
window.onload = function() {
    //Escutando evento clique no botão de tempo
    bt2.addEventListener("click", time);
    PreencheInfoPartida()
};

var n;
var interval = 1000;  
var contador;
var JogoFinalizado;
//var UltimaPerguntaChamada;

function pegavalores(){
    n = parseInt(InfoTempo,10); 
};

function time(){
    return new Promise ((resolve,reject)=>{
        if(painelmsg.innerText==""||painelmsg.innerText=="O tempo acabou. Qual é a sua resposta?"||respondida==true){
            //Não faz nada se o painel estiver vazio ou se o tempo tiver acabado.
        }else {
            pegavalores();
            contador = setInterval(contasegundos,interval);              
        }
    });
}

function parar() {
    clearInterval(contador);
    
}

function contasegundos(){

    if (n==0){
        
        painelmsg.innerText='0'
        painelmsg.innerText=`O tempo acabou. Qual é a sua resposta?`;
        painel.style.backgroundColor='orange';
        painelmsg.style.color='white';
        parar(contador);
        pegavalores();
        bt2.addEventListener("click", time);
        
            if(ConfigVoz==true) {
                Voz(painelmsg.innerText);
            };

    }else{
        n=n-1;
        painelmsg.innerText=`Tempo: ${n}`;
        bt2.removeEventListener("click", time);
    };

};
var PtVencedor;
var PtPerdedor;
var Vencedor;
var Perdedor;

function ChamaFimJogo() {

    Pt1 = +PontosEq1.innerText;
    Pt2 = +PontosEq2.innerText;
    let Msg = ""
    if (Pt1> Pt2) {
        PtVencedor=Pt1;
        PtPerdedor=Pt2;
        Vencedor=NomeEq1.innerText;
        Perdedor=NomeEq2.innerText;
        Msg = "Parabéns Equipe " +NomeEq1.innerText + ". Vocês venceram!"
    }else if(Pt2>Pt1){
        PtVencedor=Pt2;
        PtPerdedor=Pt1;
        Vencedor=NomeEq2.innerText;
        Perdedor=NomeEq1.innerText;
        Msg = "Parabéns Equipe " +NomeEq2.innerText + ". Vocês venceram!"
    }else if (Pt1==Pt2){
        PtVencedor=Pt1;
        PtPerdedor=Pt2;
        Vencedor=NomeEq1.innerText;
        Perdedor=NomeEq2.innerText;
        Msg = "Empate!"
    }

    localStorage.setItem("PtVencedor", PtVencedor)
    localStorage.setItem("PtPerdedor", PtPerdedor)
    localStorage.setItem("Vencedor", Vencedor)
    localStorage.setItem("Perdedor", Perdedor)

//tirei daqui o  código
    painelmsg.innerText="Fim de Jogo. " + Msg

    if(ConfigVoz==true) {
        Voz(painelmsg.innerText);
    }    

    JogoFinalizado = true;

};

function gravaScoreLocal(){
    setScoring([getScoringPartida(localStorage.getItem("Vencedor"), localStorage.getItem("Perdedor"),Number(localStorage.getItem("PtVencedor")),Number(localStorage.getItem("PtPerdedor")))])
    //Colocar aqui chamada da página score
    // var url = window.location + "";
    // url = url.replace("index.html","");
    // var newUrl = url.split('public/')[0];
    // location.href = newUrl + 'public/score.html';
}

function LimparPartida(){
    window.speechSynthesis.cancel();
    JogoFinalizado =false;

    pergunta.innerText = "Pergunta"
    a.innerText="(A)"
    b.innerText="(B)"
    c.innerText="(C)"
    d.innerText="(D)"
    npergunta.innerText = ""
    resposta.innerText =  ""
    PontosEq1.innerText = ""
    PontosEq2.innerText = ""
    Jogador1.innerText = ""
    Jogador2.innerText = ""
    painelmsg.innerText=""
    np=0
    MudaCorAlternativas('black');
    DesmarcaBotoes();
}
/** Vozes em Português da API Web Speech
 * Microsoft Maria - Portuguese (Brazil)
 * Microsoft Daniel - Portuguese (Brazil)
 */

/**Funções Comando de voz 
 */
// Definindo constantes e variáveis
const voices = window.speechSynthesis?.getVoices();
const ptVoice = voices?.find((voice) => /pt-BR/.test(voice.lang));
var utterance;

function Voz(texto){
    utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'pt-BR' // língua a pronunciar
    utterance.voice = ptVoice // voz defina acima
    utterance.rate =  1// velocidade de fala
    utterance.text = texto
    window.speechSynthesis.speak(utterance)
}

function falar(){
    var amISpeaking = window.speechSynthesis.speaking;
    if (amISpeaking==true) {

    }else{
        if(!(painelmsg.innerText==""||painelmsg.innerText=="Pronto!"||painelmsg.innerText=="Baixando Questões!")) {
            Voz(painelmsg.innerText);
            Voz('A pergunta é ' + pergunta.innerText);
            Voz('As alternativas são:' + a.innerText + b.innerText + c.innerText + d.innerText);
        }
    }
};

function PlayAuto(){
   if(ConfigVoz==true) {
        falar();
        Voz('Tempo. ')
        utterance.onend = function (event) { time()}
        
    }
};

