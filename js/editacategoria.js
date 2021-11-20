const referenciabd2 = {};

/*Função anônima. Tudo o que for colocado aqui dentro não é exibido no navegador de outros usuários.
  Isso é muito importante se queremos proteger os dados ou o nosso código*/
(function(){
    //Esta função é responsável por enviar as questões criadas pelos usuários colaboradores para o banco de dados.
    function enviarcategoria() {

        // Seleciona os elementos html "input type=text" da página "Colaboradores" e armazena-os em variáveis.
        var categoria = document.getElementById('categoria')

        /*-------------------------------------------------------------*/

        /*Cria a objeto/vetor "questão" que vai armazenar todos os valores (conteúdo) das variáveis criadas acima
        e atribuir cada um deles aos campos correspondentes do banco de dados. */
        //var Numerador = 1
        var novacategoria = {
        Categoria: categoria.value,

        };
      
        // Criando o ID da pergunta. Child refere-se ao nó principal do banco de dados. Esse método Push cria uma chave "enorme".
        var categoriaid = firebase.database().ref().child('Categorias').push().key;
        
      
        // Definindo que no caminho em referencia, dentro do nó criado com o ID específico acima, será recebido o vetor "questao".
        var updates = {};
        updates['/Categorias/' + categoriaid] = novacategoria;
       
        //Executa a função de gravar os dados acima armazenados no banco de dados.
        return firebase.database().ref().update(updates)


        //Tratamento de erros para retorno da função...
        //Se não houver erros executa esse trecho>>>
        .then (
          function() {
          //Apaga o conteúdo dos campos do formulário
          categoria.value = ""
          //Confirma para o usuário que os dados foram enviados
          window.alert ("Categoria enviada com sucesso!")
        
        }) 
        //Se não erros executa esse trecho>>>
        .catch (
          function() {
          window.alert ("[ERRO] Algum problema aconteceu!")
        
        })
        ;
        // Fim do tratamento de erros
      }
      
      

      
   
  //Cria as chamadas externas para as funções que estão protegidas dentro da função anônima
   referenciabd2.enviarcat = enviarcategoria;
  


}) () ;


