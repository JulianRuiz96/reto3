var host = "http://localhost:8080/api";

function mostrarInformacionCat() {
    $.ajax({
        url: host + '/Category/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            tableRespuestaCat(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}
$(document).ready(function () {
    mostrarInformacionCat();
})

function tableRespuestaCat(items) {
    let myTableCat = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> CATEGORY </th><th> DESCRIPTION </th><th> BOAT </th>`;
    for (let i = 0; i < items.length; i++) {
        myTableCat += `<tr>`;
        myTableCat += `<td>${items[i].name}</td>`;
        myTableCat += `<td>${items[i].description}</td>`;
        if (items[i].boats[0] != null) { myTableCat += `<td>${items[i].boats[0]["name"]}</td>`;} else{ myTableCat += `<td>    </td>`;}
        myTableCat += `<td> <button class="btn-select" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableCat += `<td> <button class="btn-delete" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button></td>`;
        myTableCat += `</tr>`;
    }
    $("#resultadoCat").append(myTableCat);
    myTableCat = `</table>`;
    listeners();
}

function listeners(){
    $(".btn-select").on("click" , function(Event){
        $.ajax({
            url: host + '/Category/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuCat(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionCat(Event.target.value);
    })
}
// si estan dentro de js le creamos un listener, si esta en el html, se puede dejar fuera
$(".btn-create").on("click", function(){
    agregarInformacionCat();
})
$(".btn-update").on("click", function(){
    actualizarInformacionCat();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsCat();
})
function agregarInformacionCat() {
    $.ajax({
        type: "POST",
        url: host + "/Category/save",
        data: JSON.stringify({
            id: $("#idCat").val(),
            name: $("#nameCat").val(),
            description: $("#description").val(),
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoCat").empty();
        $("#nameCat").val("");
        $("#description").val("");
        mostrarInformacionCat();
        alert("Elementos de Category agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuCat(respuesta) {
    $("#idCat").val(respuesta.id);
    $("#nameCat").val(respuesta.name);
    $("#description").val(respuesta.description);
}

function actualizarInformacionCat() {

    $.ajax({
        method: 'PUT',
        url: host + '/Category/update',
        data: JSON.stringify({
            id: $("#idCat").val(),
            name: $("#nameCat").val(),
            description: $("#description").val(),
        }),
        contentType: "application/JSON",
    }).done(function (data) {
        console.log(data);
        $("#resultadoCat").empty();
        $("#nameCat").val("");
        $("#boat").val("");
        $("#description").val("");
        mostrarInformacionCat();
        alert("Elementos de Category actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });

}

function borrarInformacionCat(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Category/' + id,
        contentType: "application/JSON",
        success: function (data) {
            console.log(data);
            $("#resultadoCat").empty();
            alert("Elementos de Category se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionCat();
        }
    });
}
function cleanInputsCat(){
    $("#nameCat").val("");
    $("#boat").val("");
    $("#description").val("");
}