
var IdUser = localStorage.getItem("usuario")
var refScoring = firebase.database().ref().child('Scoring').child(IdUser);
window.onload = function() {
    getScoringDataBase()
    //setScoring([getScoringPartida("Misael Viana", 100), getScoringPartida("Misael Bacry", 200)])
    //setScoring([getScoringPartida(localStorage.getItem("Vencedor"), localStorage.getItem("Perdedor"),localStorage.getItem("PtVencedor"),localStorage.getItem("PtPerdedor"))])
};


function setScoring(scoringPartida) {
    var resultado = BaixarMenorScore(scoringPartida.PontosVencedor);

    if(resultado){
        scoringLista.forEach(scoring => {
            //console.log(scoring)
            refScoring.child(refScoring.push().key).set(scoring);
        });
    }
};

function BaixarMenorScore(scoreVencedor){
    //baixando
    var menorValorBD = 300;
    var qtdScores = 7;

    return menorValorBD < scoreVencedor || qtdScores <= 9;
}


//var scScore;
//var scJogador;
var scDataPartida;
var scVencedor;
var scPerdedor;
var pontosVencedor;
var pontosPerdedor;
var nLinha = 0;

function getScoringDataBase2() {
    console.log(1);
    refScoring.once('value').then(snap=>{
        //var dados = snap.val()
        snap.forEach ((childSnapshot) => {
            var childData = childSnapshot.val();
            //console.log("dados: ", childData);
            scDataPartida = childData.DataPartida;
            scVencedor = childData.Vencedor;
            scPerdedor = childData.Perdedor;
            pontosVencedor = childData.PontosVencedor ;
            pontosPerdedor = childData. PontosPerdedor;
            nLinha +=1;
            //scJogador = childData.Jogador;
            //scScore = childData.Score;
            ExibeDadoScore();
            //return childData;
        });
        //console.log("dados: ", dados);
        //console.log("array: ", dados);
        //return snap.val();
        
    });

};

var arrayScore=[]
function getScoringDataBase() {
    
    refScoring.orderByChild('PontosVencedor').once('value').then(snap=>{
        
        snap.forEach ((childSnapshot) => {
            var childData = childSnapshot.val();
            arrayScore.push(childData)
            scDataPartida = childData.DataPartida;
            scVencedor = childData.Vencedor;
            scPerdedor = childData.Perdedor;
            pontosVencedor = childData.PontosVencedor ;
            pontosPerdedor = childData. PontosPerdedor;
            nLinha +=1;

            //ExibeDadoScore();

        });
        console.log("array: ", arrayScore);
        inverteArray();
        
    });

};
var arrayInvertido=[]
function inverteArray(){
    arrayInvertido = arrayScore.reverse()
    
    //console.log("array invertido: ", arrayScore);
    arrayInvertido.forEach((iten,index) => {
        //console.log(iten);
        if (index<10){
            ExibeDadoScore(iten, index)
            
        }

    })
}

function ExibeDadoScore(iten,index){
    
    if(location.href.endsWith('score/')||location.href.endsWith('score')){
        const divScore = document.getElementById('TextoPgScore')
        var spanN = document.createElement('span')
        var spanData = document.createElement('span') 
        var spanVencedor= document.createElement('span')
        var spanX= document.createElement('span')
        var spanPontosVencedor = document.createElement('span') 
        var spanPontosPerdedor = document.createElement('span') 
        var spanPerdedor= document.createElement('span')

        spanN.classList.add("Nlinha","spanTexto")
        spanData.classList.add("spanData","spanTexto")
        spanVencedor.classList.add("spanVencedor","spanTexto")
        spanPontosVencedor.classList.add("spanPontosVencedor","spanTexto")
        spanX.classList.add("spanX","spanTexto")
        spanPontosPerdedor.classList.add("spanPontosPerdedor","spanTexto")
        spanPerdedor.classList.add("spanPerdedor","spanTexto")

        spanN.innerText =  `${index + 1}º` /*`${nLinha}:`;*/ 
        spanData.innerText = iten.DataPartida;//scDataPartida;
        spanVencedor.innerText = iten.Vencedor;
        spanPontosVencedor.innerText = iten.PontosVencedor
        spanX.innerText = "X"
        spanPontosPerdedor.innerText = iten.PontosPerdedor
        spanPerdedor.innerText = iten.Perdedor

        var novalinha = document.createElement('p')
        novalinha.appendChild(spanN)
        novalinha.appendChild(spanData)
        novalinha.appendChild(spanVencedor)
        novalinha.appendChild(spanPontosVencedor)
        novalinha.appendChild(spanX)
        novalinha.appendChild(spanPontosPerdedor)
        novalinha.appendChild(spanPerdedor)
        //novalinha.innerHTML =  spanN.innerText + spanData.innerText + spanVencedor.innerText
        //novalinha.innerText = scDataPartida + " " + scJogador + " " + scScore
        //novalinha.textContent = `${nLinha}º)    ${scDataPartida}    ${scVencedor}    ${pontosVencedor}     X     ${pontosPerdedor}    ${scPerdedor}`
        divScore.appendChild(novalinha)
    }
}

function getScoringPartida(Vencedor, Perdedor, PtVencedor, PtPerdedor){
    var data = new Date();
    //var hoje;
    var dia= data.getDate().toString().padStart(2, '0')
    var mes  = (data.getMonth()+1).toString().padStart(2, '0')
    // if(dia<10){
    //     hoje = "0"+ dia
    // }

    // var mes= data.getDate();
    // if(dia<10){
    //     dia="0"+ Text(data.getDate()) 
    // }
    return {
        //Jogador: nomeJogador,
        Perdedor: Perdedor,
        Vencedor: Vencedor,
        PontosPerdedor: PtPerdedor,
        PontosVencedor: PtVencedor,
        //Score: score,
        DataPartida: `${dia}/${mes}/${data.getFullYear()}`
    }
}




