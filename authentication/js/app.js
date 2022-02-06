var infologin2 = document.getElementById('infologin2')
var UserID = document.getElementById('UserID')
var textoID = document.getElementById('textoID')
var RefConfig = firebase.database().ref('/Configurações');
const Usuarios = firebase.database().ref('/Usuários');
const formcolab = document.getElementById("formcolab");
var Tempo = document.getElementById('tempo');  
var InfoTempo;
var ConfigVoz;

PreencheLogin();


function PreencheLogin (){
    infologin2.innerText = 'Você está logado como: '+ localStorage.getItem("email")
    UserID.innerText = localStorage.getItem("usuario")
    UserID.style.display="none"
    textoID.style.display="none"
}


function logout2() {

    //Faço logout do meu usuário (saio da aplicação)
    firebase.auth().signOut().then(() =>{
        //alert('Usuário deslogou!');
        //localStorage.removeItem("usuario")
        //localStorage.removeItem("email")
        localStorage.clear();
        // infologin2.innerText = 'Você precisa fazer login para ter acesso ao jogo';
        // var url = window.location +""
        // url = url + "/public/authentication/login.html");
})
};


// document.addEventListener("DOMContentLoaded", function () {
//     //Observa se há um usuário e mudanças na autenticação (login e logout)
//     firebase.auth().onAuthStateChanged((usuario) => {
//     if(usuario){
//         console.log('usuario', usuario.displayName);
//         currentUser = usuario;
//         infologin2.innerText = 'Você está logado como: '+usuario.email;
        
//         //window.location.replace("https://carlosmagno.github.io/quiz-biblico/");
//         //Quando o conteudo for carregado se for um usuário logado posso usar esse código para exibir o conteudo especifico
//     }else {
//         infologin2.innerText = 'Você precisa fazer login para ter acesso ao jogo!'
//         window.location.replace("/public/authentication/login.html")
//         console.log('não há usuários logados!');
//     }
//     })
// });
//var InfoTempo;
    //Observa se há um usuário e mudanças na autenticação (login e logout)

    
    firebase.auth().onAuthStateChanged((currentUser) => {


        //infologin2.innerText = 'Você está logado como: '+ localStorage.setItem("email")
        //UserID.innerText = localStorage.getItem("usuario")

        if(currentUser){
            //localStorage.setItem("usuario",currentUser.uid)
            //localStorage.setItem("email",currentUser.email)
             //Mudando idioma do firebase
      /* firebase.auth().languageCode = "pt";
       if(!currentUser.emailVerified){
           currentUser.sendEmailVerification().then(()=>{
               alert("E-mail de verificação enviado!")
           })
       }; */
            PreencheLogin();

           // console.log('dislplayName: ', currentUser.displayName);
            //currentUser = usuario;
            //infologin2.innerText = 'Você está logado como: '+currentUser.email;
            var uid = currentUser.uid;
            //console.log(uid)
            //UserID.innerText = uid
            //LerDadosBanco();

            Usuarios.child(uid).once('value').then(snapshot =>{
                var dados = snapshot.val();
        
                localStorage.setItem("Colaborador",dados.Colaborador)
                //VerificaColaborador();
        
                //console.log(NovoUsuario);
                //Usuarios.child(usuario).set(NovoUsuario);
                //window.location.replace("/./index.html");
            });

            var url = window.location +""
            RefConfig.child(uid).once('value',(snapshot)=>{
                //console.log(snapshot.val().Categoria)

                if( snapshot.val()){
                    var dados = snapshot.val();
                    
                }else{
                    console.log('não há configurações deste usuário')
                    //document.getElementById('painelmsg').innerText="Verifique as configurações!"
                }
                
   

                if (url.endsWith('configuracoes')){
                    // Categoria.value = dados.Categoria;
                    // Tempo.value = dados.Tempo;
                    // Pontos.value = dados.Pontos;
                    // TotalPerguntas.value = dados.TotalPerguntas;

                    // ModoVoz.value = dados.ModoVoz;

                    if (dados.ModoVoz == "Ativado"){
                        ConfigVoz=true;
                    }else if(dados.ModoVoz == "Desativado"){
                        
                        ConfigVoz=false;
                    };
                    

                    // NomeEq1.value = dados.NomeEq1;
                    // Eq1Jog1.value = dados.Eq1Jog1;
                    // Eq1Jog2.value = dados.Eq1Jog2;
                    // Eq1Jog3.value = dados.Eq1Jog3;
                    // Eq1Jog4.value = dados.Eq1Jog4;
                    // Eq1Jog5.value = dados.Eq1Jog5;

                    // NomeEq2.value = dados.NomeEq2;
                    // Eq2Jog1.value = dados.Eq2Jog1;
                    // Eq2Jog2.value = dados.Eq2Jog2;
                    // Eq2Jog3.value = dados.Eq2Jog3;
                    // Eq2Jog4.value = dados.Eq2Jog4;
                    // Eq2Jog5.value = dados.Eq2Jog5;
                } /*else if (url.endsWith('index')|| url.endsWith('quiz-biblico'))*/
                else if (!url.endsWith('score')){
                    DB_SalvarLocalStorage(dados)
    
                        PreencheInfoPartida();
                  
                    
                    try {

                        UltimaPergunta = dados.UltimaPergunta[dados.Categoria]
                        // console.log(dados.Categoria)
                        // console.log(UltimaPergunta)
                        BuscarQuestoes();
                        // if(localStorage.getItem('categoria')){

                        // }else{
                           
                        // }
                    }
                    finally{}
                    //infologin2.innerText = 'Você está logado como: '+ localStorage.getItem("email")
                   // UserID.innerText = localStorage.getItem("usuario")
                    // localStorage.setItem("categoria",dados.Categoria)
                    // localStorage.setItem("tempo",dados.Tempo)
                    // localStorage.setItem("pontos",dados.Pontos)
                    // localStorage.setItem("TotalPerguntas",dados.TotalPerguntas)
                    // localStorage.setItem("NomeEq1",dados.NomeEq1)
                    // localStorage.setItem("NomeEq2",dados.NomeEq2)
                    

                    // infocategoria.innerText = dados.Categoria;
                    // NomeEq1.innerText = dados.NomeEq1;
                    // NomeEq2.innerText = dados.NomeEq2;
                    // Pontos.innerText = dados.Pontos;
                    // Tempo.innerText= dados.Tempo;
                    // InfoTempo =dados.Tempo;
                    // TotalPerguntas.innerText= dados.TotalPerguntas;
                    //console.log('estou aqui', Tempo.innerText);
                    //console.log(typeof(Tempo.innerText));

                    if (dados.ModoVoz == "Ativado"){
                        ConfigVoz=true;
                        //console.log(ConfigVoz)
                    }else if(dados.ModoVoz == "Desativado"){
                        
                        ConfigVoz=false;
                        //console.log(ConfigVoz)
                    };

                    
                    
                }
                //alert(dados.Categoria);
            });
            if (url.endsWith('colaboradores')){

                    Usuarios.child(uid).once('value').then(snapshot =>{
                        var dados = snapshot.val();

                        localStorage.setItem("Colaborador",dados.Colaborador)
                        VerificaColaborador();

                        //console.log(NovoUsuario);
                        //Usuarios.child(usuario).set(NovoUsuario);
                        //window.location.replace("/./index.html");
                    });
                }
            //window.location.replace("https://carlosmagno.github.io/quiz-biblico/");
            //Quando o conteudo for carregado se for um usuário logado posso usar esse código para exibir o conteudo especifico
        }else {
            //infologin2.innerText = 'Você precisa fazer login para ter acesso ao jogo!'
            //var url = window.location + "";
            //var url = url.replace("../");
            //var newUrl = url.split('/')[0];

           // location.href = newUrl + 'authentication/login';
            location.href = '../../authentication/login';
            console.log('não há usuários logados!');

        }
    });

    
function SalvarLocalStorage(){
    
    localStorage.setItem("categoria",Categoria.value)
    localStorage.setItem("tempo",Tempo.value)
    localStorage.setItem("pontos",Pontos.value)
    localStorage.setItem("TotalPerguntas",TotalPerguntas.value)
    localStorage.setItem("ModoVoz",ModoVoz.value)
    localStorage.setItem("UltimaPergunta", "0")

    //localStorage.setItem("UltimaAlteracaoBD",UltimaAlteracaoBD)
    //localStorage.setItem("OrdemPerguntas",OrdemPerguntas)

    localStorage.setItem("NomeEq1",NomeEq1.value)
    localStorage.setItem("Eq1Jog1",Eq1Jog1.value )
    localStorage.setItem("Eq1Jog2",Eq1Jog2.value )
    localStorage.setItem("Eq1Jog3",Eq1Jog3.value)
    localStorage.setItem("Eq1Jog4",Eq1Jog4.value)
    localStorage.setItem("Eq1Jog5",Eq1Jog5.value)

    localStorage.setItem("NomeEq2",NomeEq2.value)
    localStorage.setItem("Eq2Jog1",Eq2Jog1.value)
    localStorage.setItem("Eq2Jog2",Eq2Jog2.value)
    localStorage.setItem("Eq2Jog3",Eq2Jog3.value)   
    localStorage.setItem("Eq2Jog4",Eq2Jog4.value)
    localStorage.setItem("Eq2Jog5",Eq2Jog5.value)   


}

function DB_SalvarLocalStorage(dadosDB){
    
    //if(dadosDB==undefined||dadosDB.Categoria&&dadosDB.Tempo&&dadosDB.Pontos&&dadosDB.TotalPerguntas&&dadosDB.NomeEq1&&dadosDB.NomeEq2){
        localStorage.setItem("categoria",dadosDB.Categoria)
        localStorage.setItem("tempo",dadosDB.Tempo)
        localStorage.setItem("pontos",dadosDB.Pontos)
        localStorage.setItem("TotalPerguntas",dadosDB.TotalPerguntas)
        localStorage.setItem("ModoVoz",dadosDB.ModoVoz)
        if(dadosDB.UltimaPergunta[dadosDB.Categoria]){
        localStorage.setItem("UltimaPergunta", dadosDB.UltimaPergunta[dadosDB.Categoria])
        }       

        localStorage.setItem("UltimaAlteracaoBD",dadosDB.UltimaAlteracaoBD)
        localStorage.setItem("OrdemPerguntas",dadosDB.OrdemPerguntas)

        localStorage.setItem("NomeEq1",dadosDB.NomeEq1)
        localStorage.setItem("Eq1Jog1",dadosDB.Eq1Jog1)
        localStorage.setItem("Eq1Jog2",dadosDB.Eq1Jog2)
        localStorage.setItem("Eq1Jog3",dadosDB.Eq1Jog3)
        localStorage.setItem("Eq1Jog4",dadosDB.Eq1Jog4)
        localStorage.setItem("Eq1Jog5",dadosDB.Eq1Jog5)

        localStorage.setItem("NomeEq2",dadosDB.NomeEq2)
        localStorage.setItem("Eq2Jog1",dadosDB.Eq2Jog1)
        localStorage.setItem("Eq2Jog2",dadosDB.Eq2Jog2)
        localStorage.setItem("Eq2Jog3",dadosDB.Eq2Jog3)   
        localStorage.setItem("Eq2Jog4",dadosDB.Eq2Jog4)
        localStorage.setItem("Eq2Jog5",dadosDB.Eq2Jog5)  
    //} else{
        //document.getElementById('painelmsg').innerText="Verifique as configurações"
    //}    

}

function PreencheInfoPartida(){
          
    infocategoria.innerText = localStorage.getItem("categoria")
    Tempo.innerText= localStorage.getItem("tempo")
    InfoTempo =Number(localStorage.getItem("tempo"))
    Pontos.innerText = localStorage.getItem("pontos")
    TotalPerguntas.innerText= localStorage.getItem("TotalPerguntas")
    NomeEq1.innerText = localStorage.getItem("NomeEq1")
    NomeEq2.innerText = localStorage.getItem("NomeEq2")
}


    // console.log('estou aqui', Tempo.innerText);
    // function LerDadosBanco(){
    //     var UserID = document.getElementById('UserID').innerText;
    //     RefConfig.child(uid).once('value',(snapshot)=>{
    //         var dados = snapshot.val();
    //         alert(dados);
    //     });
    // }