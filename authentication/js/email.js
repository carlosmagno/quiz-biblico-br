var currentUser;
var usuario;
var currentemail;
var infologin = document.getElementById('infologin')
var statuslogin = document.getElementById('statuslogin')
var mensagem;

function logout() {
    //Faço logout do meu usuário (saio da aplicação)
    firebase.auth().signOut().then(() =>{
        alert('Usuário deslogou!');
        infologin.innerText = 'Você precisa fazer login para ter acesso ao jogo';
})
};

function SalvaUsuarioStorage(){
    localStorage.setItem("usuario",usuario)
    localStorage.setItem("email",currentemail)
}

//Criando as referencias principais do banco de dados realtime do firebase para os dados que quero trabalhar
const Usuarios = firebase.database().ref('/Usuários');

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    statuslogin.innerText =""
    //Crio o usuário com e-mail e senha
    firebase.auth().createUserWithEmailAndPassword(email,senha).then(currentUser =>{
        console.log('usuario', currentUser.user);
        //console.log('Uid', currentUser.user.uid);
        //console.log('Email', currentUser.user.email);
        
        infologin.innerText = 'Você está logado como: ' +currentUser.user.email
        
        //alert('Usuário criado e logado');
        //colocar aqui o quero que aconteça quando o usuário estiver logado, como talvez redirecionar pra outra página
        usuario=currentUser.user.uid;
        currentemail=currentUser.user.email
        SalvaUsuarioStorage();
      
        //Cria um nó em Usuários e salva os dados do novo usuário
        Usuarios.once('value').then(snapshot =>{
            //console.log(snapshot.numChildren());  
            var n = snapshot.numChildren();
            n=n+1;
            
        //Objeto que representa as informações do novo usuário a ser gravado no banco de dados

            var NovoUsuario = {
                Numero:n,
                Email:email,
                Colaborador:false,
                DisplayName:"",
                Uid:usuario,
            };
            //console.log(NovoUsuario);
            Usuarios.child(usuario).set(NovoUsuario);
            console.log('Novo Usuario criado no BD');
            //////rrrrrr
            window.location.replace("../../");
        });

    }).catch(error =>{
        console.log('error', error);
            if(error.code=='auth/weak-password'){
                mensagem = 'A senha deve ter pelo menos 6 caracteres.'
            }else if(error.code=='auth/email-already-in-use'){
                mensagem ="O endereço de e-mail já está sendo usado por outra conta."
            };
            statuslogin.innerText = mensagem
    });
};

/**
 * Função para login
 */
function loginEmail() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    statuslogin.innerText =""
    //Faço login e autentico o usuário com e-mail e senha
    firebase.auth().signInWithEmailAndPassword(email,senha).then(currentUser =>{
        console.log('usuario', currentUser);
        usuario=currentUser.user.uid;
        currentemail=currentUser.user.email
        SalvaUsuarioStorage();
     ///////rrrrrrrrr
       window.location.replace("../../");

    }).catch(error =>{
        
        console.log('error', error);
        console.log('error', error.code);
        console.log('error', error.message);
        if(error.code=="auth/wrong-password"){
           mensagem = 'Senha inválida. Verifique a senha e tente novamente.'
        }else if(error.code=='auth/user-not-found'){
            mensagem = 'Não há usuário registrado com este e-mail. Verifique o e-mail e tente novamente.'
        } else if(error.code=='auth/network-request-failed'){
            mensagem = 'Ocorreu um erro de rede. Verifique sua conexão com a internet.'
        }
        else if(error.code=='auth/invalid-email'){
            mensagem = 'O endereço de e-mail não é válido.'
        }
        else if(error.code=='auth/too-many-requests'){
            mensagem = 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.'
        }
        
        statuslogin.innerText = mensagem
    }); 
}


/**
 * Listener de dom ready
 */

document.addEventListener("DOMContentLoaded", function () {
    //Observa se há um usuário e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged((currentUser) => {
        //usuario = currentUser;
    if(currentUser){
        //console.log('displayName: ', currentUser.displayName);
        //console.log('Uid: ', currentUser.uid);
       // console.log('Email do Usuário: ', currentUser.email);
        
        infologin.innerText = 'Você está logado como: '+currentUser.email;
        SalvaUsuarioStorage();
        /////rrrrrrr
        //window.location.replace("../");
        //window.location.replace("https://carlosmagno.github.io/quiz-biblico/");
        //Quando o conteudo for carregado se for um usuário logado posso usar esse código para exibir o conteudo especifico
    }else {
        infologin.innerText = 'Você precisa fazer login para ter acesso ao jogo!'
        //console.log('não há usuários logados!');
    }
        
    });
    //Vai pegar dados do usuário
    //currentUser = firebase.auth().currentUser;
    //console.log('currentUser', currentUser)
    // if(currentUser) {
    //     console.log('currentUser', currentUser);
    //     //Método para update de usuarios criados no auth()
    //     currentUser.updateProfile ({
    //         displayName:"Carlos Magno",
    //         photoURL: "minha url de foto"
    //     });

    //     console.log('currentUser', currentUser.displayName);
    //     // currentUser.updateEmail('meunovoemail@hotmail.com');
    //     // currentUser.updatePassword('123456');
    //     // currentUser.updatePhoneNumber('+558199607-1091')

    // }

});

/**
 * Deleta um usuário
 */

function deletaUsuario (){
    if(currentUser) {
        currentUser.delete().then(()=>{
            alert('usuario excluido')
        });
    }
};