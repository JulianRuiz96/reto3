var host = "http://localhost:8080/api";

function mostrarInformacionRes() {
    $.ajax({
        url: host + '/Reservation/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            tablaRespuestaRes(respuesta);
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
    $.ajax({
        url: host + '/Score/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            $('#score').empty();
            llenarSco(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}
function llenarBot(items) {
    $('#boat').append(`<option>  </option>`);
    for (let k = 0; k < items.length; k++) {
        var a = $('#boat').append(`<option value="${items[k].id}">${items[k].name}</option>`);
    }
}
function llenarCli(items) {
    $('#client').append(`<option>  </option>`);
    for (let l = 0; l < items.length; l++) {
        $('#client').append(`<option value="${items[l].idClient}">${items[l].name}</option>`);
    }
}
function llenarSco(items) {
    $('#score').append(`<option>  </option>`);
    for (let s = 0; s < items.length; s++) {
        $('#score').append(`<option value="${items[s].id}">${items[s].score}</option>`);
    }
}

$(document).ready(function () {
    mostrarInformacionRes();
})

function tablaRespuestaRes(items) {
    console.log(items[1]);
    let myTableRes = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> ID RESERVATION </th><th>START DATE</th><th>DEVOLUTION DATE</th><th>STATUS</th><th>BOAT</th><th>ID CLIENT</th><th>FULL NAME</th><th>EMAIL</th><th>SCORE</th>`;
    for (let i = 0; i < items.length; i++) {
        myTableRes += `<tr>`;
        myTableRes += `<td>${items[i].idReservation}</td>`;
        if (items[i].startDate != null) { myTableRes += `<td>${items[i].startDate.slice(0, 10)}</td>`;} else { myTableRes += `<td>    </td>`;}
        if (items[i].devolutionDate != null) { myTableRes += `<td>${items[i].devolutionDate.slice(0, 10)}</td>`;} else { myTableRes += `<td>    </td>`;}
        myTableRes += `<td>${items[i].status}</td>`;
        if (items[i].boat != null) { myTableRes += `<td>${items[i].boat["name"]}</td>`;} else { myTableRes += `<td>    </td>`;}
        if (items[i].client != null) {
            myTableRes += `<td>${items[i].client["idClient"]}</td>`;
            myTableRes += `<td>${items[i].client["name"]}</td>`;
            myTableRes += `<td>${items[i].client["email"]}</td>`;
        } else { myTableRes += `<td>    </td>`}
        if (items[i].score != null) { myTableRes += `<td>${items[i].score["score"]}</td>`;} else { myTableRes += `<td>   </td>`;}

        myTableRes += `<td> <button class="btn-select" value="${items[i].idReservation}" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableRes += `<td> <button class="btn-delete" value="${items[i].idReservation}" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button>`;
        myTableRes += `</tr>`;
    }
    $("#resultadoRes").append(myTableRes);
    myTableRes = `</table>`;
    $("#startDate").val(new Date().toISOString().slice(0, 10));
    listeners();
}
function listeners(){
    $(".btn-select").on("click", function(Event){
        $.ajax({
            url: host + '/Reservation/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuRes(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionRes(Event.target.value)
    })   
}
$(".btn-create").on("click", function(){
    agregarInformacionRes();
})
$(".btn-update").on("click", function(){
    actualizarInformacionRes();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsRes();
})
function agregarInformacionRes() {
    $.ajax({
        type: "POST",
        url: host + "/Reservation/save",
        data: JSON.stringify({
            idReservation: $("#idRes").val(),
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            boat: { id: $("#boat").val() },
            client: { idClient: $("#client").val() },
            score: {id: $("#score").val()},
        }),
        contentType: "application/json"
    }).done(function (data) {
        console.log(data)
        $("#resultadoRes").empty();
        $("#idREs").val("");
        $("#startDate").val(new Date().toISOString().slice(0, 10));
        $("#devolutionDate").val("");
        $("#status").val("");
        $("#client").val("");
        $("#boat").val("");
        $("#score").val("");
        mostrarInformacionRes();
        alert("Elementos de mensaje agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió Agregar primero Scores");
    });
}

function finishActuRes(respuesta) {
    $("#idRes").val(respuesta.idReservation);
    $("#startDate").val(respuesta.startDate.slice(0, 10));
    $("#devolutionDate").val(respuesta.devolutionDate.slice(0 , 10));
    $("#status").val(respuesta.status);
}

function actualizarInformacionRes() {
    $.ajax({
        method: 'PUT',
        url: host + '/Reservation/update',
        data: JSON.stringify({
            idReservation: $("#idRes").val(),
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            boat: { id: $("#boat").val() },
            client: { idClient: $("#client").val() },
            score: {id: $("#score").val()},
        }),
        contentType: "application/JSON"
    }).done(function (data) {
        $("#resultadoRes").empty();
        $("#idREs").val("");
        $("#startDate").val(new Date().toISOString().slice(0, 10));
        $("#devolutionDate").val("");
        $("#status").val("");
        $("#client").val("");
        $("#boat").val("");
        $("#score").val("");
        mostrarInformacionRes();
        alert("Elementos de mensaje actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió Agregar primero Scores");
    });
}

function borrarInformacionRes(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Reservation/' + id,
        contentType: "application/json",
        success: function (data) {
            $("#resultadoRes").empty();
            alert("Elementos de mensaje se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal delete");
        }, complete: function () {
            mostrarInformacionRes();
        }
    });
}

function cleanInputsRes(){
    $("#idREs").val("");
    $("#startDate").val(new Date().toISOString().slice(0, 10));
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#client").val("");
    $("#boat").val("");
    $("#score").val("");
}
   