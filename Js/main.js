$(document).ready(function(){
    var color;
    var matrizDatos;
    var matrizEstados;
    var cantFilas;
    var cantColum;
    var cantMinas;

    iniciarTablero();
    iniciarMatriz(); 
});

function detalles(){
    $(".fila:even p:even").css("background-color", "#a2d149");
    $(".fila:even p:odd").css("background-color", "#aad751");
    $(".fila:odd p:odd").css("background-color", "#a2d149");
    $(".fila:odd p:even").css("background-color", "#aad751");

    $("p").hover(function(){
        color = $(this).css("background-color");
        $(this).click(function(){
            if(matrizEstados[posicionFila($(this).attr("id"))][posicionColum($(this).attr("id"))] == 0){
                validar(posicionFila($(this).attr("id")), posicionColum($(this).attr("id")));
                color = $(this).css("background-color");
            }
            $(this).css("background-color", "#E1CBB4");
        });

        if(matrizEstados[posicionFila($(this).attr("id"))][posicionColum($(this).attr("id"))] == 1){
            $(this).css("background-color", "#E1CBB4");
        }else{
            $(this).css("background-color", "#bee17d");
        }
      },
      function(){
        $(this).css("background-color", color);
    });
}

function iniciarTablero(){
    cantFilas = $(":root").css("--cantFilas");
    cantColum = $(":root").css("--cantColum");

    for(let i = 0; i < cantFilas; i++){
        $(".tablero").append("<div class = 'fila' id = '" + i + "'></div>");
        for(let j = 0; j < cantColum; j++){
            $("#" + i).append("<p id = '" + i + "-" + j +"'></p>");
        }
    }

    detalles();
}

function iniciarMatriz(){
    matrizEstados = new Array();
    matrizDatos = new Array();
    for(let i = 0; i < cantFilas; i++){
        matrizEstados [i] = new Array();
        matrizDatos [i] = new Array();
        for(let j = 0; j < cantColum; j++){
            matrizEstados [i][j] = 0;
            matrizDatos [i][j] = 0;
        }
    }

    colocarMinas();
}

function colocarMinas(){
    cantMinas = $(":root").css("--cantMinas");
    let i = 0;
    let colum;
    let fila;

    do{
        fila = Math.floor(Math.random() * (cantFilas));
        colum = Math.floor(Math.random() * (cantColum));

        if(matrizDatos[fila][colum] == 0){
            matrizDatos[fila][colum] = "X";
            i++;
        }
    }while(i < cantMinas)

    for(i = 0; i < cantFilas; i++) {
        for(let j = 0; j < cantColum; j++) {
            if(matrizDatos[i][j] == "X"){
                for(let k = -1; k <= 1; k++){
                    for (let l = -1; l <= 1; l++){
                        if(k == 0 && l == 0){
                            continue;
                        }
                        let f = eval(parseInt(i) + parseInt(k));
                        let c = eval(parseInt(j) + parseInt(l));
                        if(f < 0 || c < 0 || f > cantFilas - 1 || c > cantColum - 1){
                            continue;
                        }
                        
                        if(matrizDatos[f][c] != "X"){
                            matrizDatos[f][c]++;
                        }
                    }
                }
            }
        }
    }
}

function posicionColum(id){
    for(let i = id.length; i > 0; i--){
        if(id.substring(i - 1, i) == "-"){
            return id.substring(i, id.length);
        }
    }
}

function posicionFila(id){
    for(let i = 0, j = id.length - 1; i < j; i++){
        if(id.substring(i, i + 1) == "-"){
            return id.substring(0, i);
        }
    }
}

function validar(posFila, posColum){
    if(matrizEstados[posFila][posColum] == 0){
        if(matrizDatos[posFila][posColum] == 0){
            ceros(posFila, posColum);
        }else{
            if(matrizDatos[posFila][posColum] == "X"){
                juegoPerdido();
            }else{
                mostrar(posFila, posColum);
            }
        }
    }
}

function mostrar(posFila, posColum, color = 0){
    if(color == 0){
        if((posFila % 2 == 0 && posColum % 2 == 0) || (posFila % 2 != 0 && posColum % 2 != 0)){
            $("#" + posFila + "-" + posColum).fadeOut(100).css("background-color", "#D7B899").fadeIn(100);
        }else{
            $("#" + posFila + "-" + posColum).fadeOut(100).css("background-color", "#E4C29F").fadeIn(100);
        }
    }else{
        if(matrizDatos[posFila][posColum] == "X"){
            $("#" + posFila + "-" + posColum).fadeOut(100).css("background-color", color).fadeIn(100);
        }
    }

    if(matrizDatos[posFila][posColum] != 0){
        if(matrizDatos[posFila][posColum] == "X"){
            $("#" + posFila + "-" + posColum).append('<div class="mina"><i class="fas fa-bomb"></i></div>');
        }else{
            if(color == 0){
                $("#" + posFila + "-" + posColum).text(matrizDatos[posFila][posColum]);
            }
        }
    }
    matrizEstados[posFila][posColum] = 1;
}

function ceros(i, j, m = 0){
    for(let k = -1; k <= 1; k++){
        for (let l = -1; l <= 1; l++){
            if(k == 0 && l == 0){
                continue;
            }
            let f = eval(parseInt(i) + parseInt(k));
            let c = eval(parseInt(j) + parseInt(l));
            if(f < 0 || c < 0 || f > cantFilas - 1 || c > cantColum - 1){
                continue;
            }
            
            if(matrizEstados[f][c] == 0){
                mostrar(f, c);
                if(matrizDatos[f][c] == 0){
                    ceros(f, c);
                }
            }
        }
    }
}

function juegoPerdido(){
    $(".contenedor").css("background-color", "red");
    for (let i = 0; i < cantFilas; i++) {
        for (let j = 0; j < cantColum; j++) {
            mostrar(i, j, "#ff0000");
        }
        
    }
}