var host = "http://localhost:8080/api";

function mostrarInformacionMes() {
    $.ajax({
        url: host + '/Message/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            tablaRespuestaMes(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
    $.ajax({
        url: host + '/Boat/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            $('#boat').empty();
            llenarBot(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
    $.ajax({
        url: host + '/Client/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            $('#client').empty();
            llenarCli(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}
function llenarBot(items){
    $('#boat').append(`<option>  </option>`);
    for (let k = 0; k < items.length; k++) {
       var a = $('#boat').append(`<option value="${items[k].id}">${items[k].name}</option>`);
    }
}
function llenarCli(items){
    $('#client').append(`<option>  </option>`);
    for (let l = 0; l < items.length; l++) {
        $('#client').append(`<option value="${items[l].idClient}">${items[l].name}</option>`);
    } 
}

$(document).ready(function () {
    mostrarInformacionMes();
})

function tablaRespuestaMes(items) {
    console.log(items[0])
    let myTableMes = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> MESSAGE </th><th>BOAT</th><th>CLIENT</th>`;
    for (let i = 0; i < items.length; i++) {
        myTableMes += `<tr>`;
        myTableMes += `<td>${items[i].messageText}</td>`;
        if (items[i].boat != null) { myTableMes += `<td>${items[i].boat["name"]}</td>`;}else{myTableMes += `<td>    </td>`;}
        if (items[i].client != null ) { myTableMes += `<td>${items[i].client["name"]}</td>`;} else{myTableMes += `<td>    </td>`;}
        myTableMes += `<td> <button class="btn-select" value="${items[i].idMessage}" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableMes += `<td> <button class="btn-delete" value="${items[i].idMessage}" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button>`;
        myTableMes += `</tr>`;
    }
    $("#resultadoMes").append(myTableMes);
    myTableMes = `</table>`;
    listeners();
}
function listeners(){
    $(".btn-select").on("click" , function(Event){
        $.ajax({
            url: host + '/Message/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuMes(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionMes(Event.target.value);
    })
}
// si estan dentro de js le creamos un listener, si esta en el html, se puede dejar fuera
$(".btn-create").on("click", function(){
    agregarInformacionMes();
})
$(".btn-update").on("click", function(){
    actualizarInformacionMes();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsMes();
})
function agregarInformacionMes() {
    $.ajax({
        type: "POST",
        url: host + "/Message/save",
        data: JSON.stringify({
            idMessage: $("#idMes").val(),
            messageText: $("#messageText").val(),
            client: {idClient: $("#client").val()},
            boat: {id: $("#boat").val()},
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoMes").empty();
        $("#idMes").val("");
        $("#messageText").val("");
        $("#client").val("");
        $("#boat").val("");
        mostrarInformacionMes();
        alert("Elementos de mensaje agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuMes(respuesta) {
    $("#idMes").val(respuesta.idMessage);
    $("#messageText").val(respuesta.messageText);
}

function actualizarInformacionMes() {
    $.ajax({
        method: 'PUT',
        url: host + '/Message/update',
        data: JSON.stringify({
            idMessage: $("#idMes").val(),
            messageText: $("#messageText").val(),
            client: {idClient: $("#client").val()},
            boat: {id: $("#boat").val()},
        }),
        contentType: "application/JSON"
    }).done(function (data) {
        $("#resultadoMes").empty();
        $("#idMes").val("");
        $("#messageText").val("");
        $("#client").val("");
        $("#boat").val("");
        mostrarInformacionMes();
        alert("Elementos de mensaje actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });
}

function borrarInformacionMes(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Message/' + id,
        contentType: "application/json",
        success: function (data) {
            $("#resultadoMes").empty();
            alert("Elementos de mensaje se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionMes();
        }
    });
}

function cleanInputsMes(){
    $("#idMes").val("");
    $("#messageText").val("");
    $("#client").val("");
    $("#boat").val("");
}