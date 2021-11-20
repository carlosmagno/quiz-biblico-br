# Briefing para definição de detalhes do Projeto

## LocalStorage e RealTime DataBase- Fluxo de gravação

1 - Página Login

* No retorno da promessa de Login _loginEmail()_, autenticação bem sucedida:
    Grava no LocalStorage:
        -Email do usuário
        -Uid do usuaário

* No retorno da promessa de Logoff:
    Remove do LocalStorage:
        - TUDO!!!
        -Email do usuário
        -Uid do usuaário