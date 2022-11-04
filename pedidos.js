const LISTA_PEDIDOS = "lista_pedidos";
var listaPedidos = new Array();

$(document).ready(() => {
    limpaCampos();
  
    $("#salvar").click((e) => salvarPedido());
  
    listarPedidos();
  });

 const verificaAcesso = () => {
    if (localStorage.getItem(LOGADO) == 'true') {
        console.log('Logado');
        window.location.href = 'pedidos.html'
        return true;
      } else {
        console.log('Deslogado');
        window.location.href = 'login.html'
        return false;
      }  
}

const regEventClickTr = () => {
    $("tr").click((e) => {
        let tr = $(e.target.parentElement);
        let regLinha = tr.find("td");
        let tdId = regLinha[0];
        $("#id").val($(tdId).html());
        $("#modelo").val($(regLinha[1]).html());
        $("#nome-personagem").val($(regLinha[2]).html());
        $("#descricao").val($(regLinha[3]).html());
      });
}

const salvarPedido = () => {
    let id = $("#id");
    let email = $("#email");
    let modelo = $("#modelo");
    let nomePersonagem = $("#nome-personagem");
    let descricao= $("#descricao");
    let tamLista = listaPedidos == null ? 0 : listaPedidos.length;
    let pedido
    
    if (listaPedidos == null) {
        listaPedidos = new Array();
      }
      
  
      pedido = { id: 0, 
          email: email.val(),
          modelo: modelo.val(), 
          nomePersonagem: nomePersonagem.val(), 
          descricao: descricao.val()};
          
      if (id.val() !== "") {
          var i = listaPedidos.findIndex((pedido) => pedido.id === id.val());
          pedido.id = id.val();
          listaPedidos.splice(i,1,pedido);
      } else {
          let idInsert = tamLista + 1;
          pedido.id = idInsert;
          listaPedidos.push(pedido);
    }
  
    setJsonItem(LISTA_PEDIDOS, listaPedidos);
    listarPedidos();
    limpaCampos();
  };

  const listarPedidos = () => {
    var listaHTML = $("#lista-pedidos");
    listaHTML.html("");
    listaPedidos = new Array();
    listaPedidos = getJsonItem(LISTA_PEDIDOS);
  
    if (listaPedidos == null || listaPedidos.length <= 0) return;
  
    listaPedidos.forEach((c) => {
      var linha = document.createElement("tr");
      var colId = document.createElement("td");
      var colModelo = document.createElement("td");
      var colNomePersonagem = document.createElement("td");
      var colDescricao = document.createElement("td");
      var colActions = document.createElement("td");
      $(colActions).html(`<div class="d-flex">
          <button onclick="removeItemList(${c.id});" 
          class="btn btn-sm btn-danger">&times;</button>
      </div>`);
  
      $(colId).html(c.id);
      $(colModelo).html(c.modelo);
      $(colNomePersonagem).html(c.nomePersonagem);
      $(colDescricao).html(c.descricao);
      $(linha).append(colId).append(colModelo).append(colNomePersonagem).append(colDescricao).append(colActions);
      listaHTML.append(linha);
    });
  
    regEventClickTr();
  };
  const removeItemList = (id) => {
    var i = listaPedidos.findIndex((pedido) => pedido.id === id);
    listaPedidos.splice(i, 1);
  
    setJsonItem(LISTA_PEDIDOS, listaPedidos);
    listarPedidos();
  };

const limpaCampos = () =>{
    $("#email").val("");
    $("#modelo").val("");
    $("#nome-personagem").val("");
    $("#descricao").val("");
}