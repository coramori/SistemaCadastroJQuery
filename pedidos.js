const verificaAcesso = () => {
  if (localStorage.getItem(LOGADO) == 'true') {
    console.log('Logado');
    window.location.href = 'pedidos.html';
    return true;
  } else {
    console.log('Deslogado');
    window.location.href = 'login.html';
    return false;
  }
};

const limpaCampos = () => {
  $;
};
