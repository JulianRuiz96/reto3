var host = "http://localhost:8080/api";

function mostrarInformacionCli() {
    $.ajax({
        url: host + '/Client/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            tablaRespuestaCli(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}

$(document).ready(function () {
    mostrarInformacionCli();
})

function tablaRespuestaCli(items) {
    let myTableCli = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> EMAIL </th><th> FULL NAME </th><th> AGE </th>`;
    for (let i = 0; i < items.length; i++) {
        myTableCli += `<tr>`;
        myTableCli += `<td>${items[i].email}</td>`;
        myTableCli += `<td>${items[i].name}</td>`;
        myTableCli += `<td>${items[i].age}</td>`;
        myTableCli += `<td> <button class="btn-select" value="${items[i].idClient}" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableCli += `<td> <button class="btn-delete" value="${items[i].idClient}" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button></td>`;
        myTableCli += `</tr>`;
        
    }
    $("#resultadoCli").append(myTableCli);
    myTableCli = `</table>`;
    listeners()
}
function listeners(){
    $(".btn-select").on("click" , function(Event){
        $.ajax({
            url: host + '/Client/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuCli(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionCli(Event.target.value);
    })
}
// si estan dentro de js le creamos un listener, si esta en el html, se puede dejar fuera
$(".btn-create").on("click", function(){
    agregarInformacionCli();
})
$(".btn-update").on("click", function(){
    actualizarInformacionCli();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsCli();
})
function agregarInformacionCli() {
    console.log($("#idClient").val())
    $.ajax({
        type: "POST",
        url: host + '/Client/save',
        data: JSON.stringify({
            idClient: $("#idCli").val(),
            name: $("#nameCli").val(),
            email: $("#emailCli").val(),
            password: $("#passwordCli").val(),
            age: $("#ageCli").val(),
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoCli").empty();
        $("#idClient").val("");
        $("#nameCli").val("");
        $("#passwordCli").val("")
        $("#emailCli").val("");
        $("#ageCli").val("");
        mostrarInformacionCli();
        alert("Elementos de cliente agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuCli(respuesta) {
    $("#idCli").val(respuesta.idClient);
    $("#emailCli").val(respuesta.email);
    $("#nameCli").val(respuesta.name);
    $("#ageCli").val(respuesta.age);
}

function actualizarInformacionCli() {
    console.log( $("#idCli").val());
    $.ajax({
        method: 'PUT',
        url: host + '/Client/update',
        data: JSON.stringify({
            idClient: $("#idCli").val(),
            email: $("#emailCli").val(),
            password: $("#passwordCli").val(),
            name: $("#nameCli").val(),
            age: $("#ageCli").val(),
        }),
        contentType: "application/JSON"
    }).done(function (data) {
        console.log(data);
        $("#resultadoCli").empty();
        $("#idCli").val("");
        $("#emailCli").val("");
        $("#passwordCli").val();
        $("#nameCli").val("");
        $("#ageCli").val("");
        mostrarInformacionCli();
        alert("Elementos de cliente actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });
}

function borrarInformacionCli(id) {
    console.log(id);
    $.ajax({
        method: 'DELETE',
        url: host + '/Client/'+id,
        contentType: "application/json",
        success: function (data) {
            $("#resultadoCli").empty();
            alert("Elementos de cliente se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionCli();
        }
    });
}
function cleanInputsCli(){
    $("#idCli").val("");
    $("#emailCli").val("");
    $("#passwordCli").val();
    $("#nameCli").val("");
    $("#ageCli").val("");
}