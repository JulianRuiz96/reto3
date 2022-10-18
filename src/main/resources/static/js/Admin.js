var host = "http://localhost:8080/api";

function mostrarInformacionAdmin() {
    $.ajax({
        url: host + '/Admin/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            tablaRespuestaAdmin(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}

$(document).ready(function () {
    mostrarInformacionAdmin();
})

function tablaRespuestaAdmin(items) {
    let myTableAdmin = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'> <th scope='col'>  FULL NAME </th><th> EMAIL </th>`;
    for (let i = 0; i < items.length; i++) {
        myTableAdmin += `<tr>`;
        myTableAdmin += `<td>${items[i].name}</td>`;
        myTableAdmin += `<td>${items[i].email}</td>`;
        myTableAdmin += `<td> <button class="btn-select" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;" >Change</button></td>`;
        myTableAdmin += `<td> <button class="btn-delete" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;" >Delete</button></td>`;
        myTableAdmin += `</tr>`;
    }
    $("#resultadoAdmin").append(myTableAdmin);
    myTableAdmin = `</table>`;
    listeners();
}
function listeners(){
    $(".btn-select").on("click", function(Event){
        $.ajax({
            url: host + '/Admin/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuAdmin(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionAdmin(Event.target.value);
    })  
}
$(".btn-create").on("click", function(){
    agregarInformacionAdmin();
})
$(".btn-update").on("click", function(){
    actualizarInformacionAdmin();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsAdmin();
})
function agregarInformacionAdmin() {
    
    $.ajax({
        type: "POST",
        url: host + '/Admin/save',
        data: JSON.stringify({
            id: $("#idAdmin").val(),
            name: $("#nameAdmin").val(),
            email: $("#emailAdmin").val(),
            password: $("#passwordAdmin").val(),
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoAdmin").empty();
        $("#idAdmin").val("");
        $("#nameAdmin").val("");
        $("#emailAdmin").val("");
        $("#passwordAdmin").val("");
        mostrarInformacionAdmin();
        alert("Elementos de administrador agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuAdmin(respuesta) {
    $("#idAdmin").val(respuesta.id);
    $("#nameAdmin").val(respuesta.name);
    $("#emailAdmin").val(respuesta.email);
}

function actualizarInformacionAdmin() {
    console.log($("#idAdmin").val())
    $.ajax({
        method: 'PUT',
        url: host + '/Admin/update',
        data: JSON.stringify({
            id: $("#idAdmin").val(),
            name: $("#nameAdmin").val(),
            email: $("#emailAdmin").val(),
            password: $("#passwordAdmin").val(),
        }),
        contentType: "application/JSON"
    }).done(function (data) {
        console.log(data);
        $("#resultadoAdmin").empty();
        $("#emailAdmin").val("");
        $("#passwordAdmin").val("");
        $("#nameAdmin").val("");
        $("#ageAdmin").val("");
        mostrarInformacionAdmin();
        alert("Elementos de administrador actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });
}

function borrarInformacionAdmin(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Admin/' + id,
        contentType: "application/json",
        success: function (data) {
            $("#resultadoAdmin").empty();
            alert("Elementos de administrador se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionAdmin();
        }
    });
    
}
function cleanInputsAdmin(){
    $("#emailAdmin").val("");
    $("#passwordAdmin").val("");
    $("#nameAdmin").val("");
    $("#ageAdmin").val("");
}