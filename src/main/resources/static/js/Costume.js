var host = "http://localhost:8080/api";

function mostrarInformacionCos() {
    $.ajax({
        url: host + '/Costume/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            tableRespuestaBot(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
    $.ajax({
        url: host + '/Category/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            $('#category').empty();
            llenarSelectCat(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}
function llenarSelectCat(items){
    $('#category').append(`<option>  </option>`);
    for (let j = 0; j < items.length; j++) {
        let a= $('#category').append(`<option value="${items[j].id}"">${items[j].name}</option>`);
    }
     
}

$("#category").on('change', function(){
    console.log($("#category").val());
})
$(document).ready(function () { 
    mostrarInformacionBot();
})

function tableRespuestaCos(items) {
    let myTableBot = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> FULL NAME </th><th> DEPARTMENT </th><th> YEAR </th><th> DESCRIPTION </th><th> CATEGORY</th>`;
    for (let i = 0; i < items.length; i++) {
        myTableBot += `<tr>`;
        myTableBot += `<td>${items[i].name}</td>`;
        myTableBot += `<td>${items[i].brand}</td>`;
        myTableBot += `<td>${items[i].year}</td>`;
        myTableBot += `<td>${items[i].description}</td>`;
        if (items[i].category != null) { myTableBot += `<td>${items[i].category["name"]}</td>`;}else{ myTableBot += `<td>    </td>`;}
        myTableBot += `<td> <button class="btn-select" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableBot += `<td> <button class="btn-delete" value="${items[i].id}" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button></td>`;
        myTableBot += `</tr>`;
    }
    $("#resultadoCos").append(myTableBot);
    myTableBot = `</table>`;
    listeners();
}
function listeners(){
    $(".btn-select").on("click" , function(Event){
        $.ajax({
            url: host + '/Boat/'+ Event.target.value,
            type: 'GET',
            dataType: "JSON",
            success: function (respuesta) {
                finishActuBot(respuesta);
            }, error: function (e) {
                console.log(e);
                alert("Algo salió mal");
            }
        });
    })
    $(".btn-delete").on("click", function(Event){
        borrarInformacionBot(Event.target.value);
    })
}
// si estan dentro de js le creamos un listener, si esta en el html, se puede dejar fuera
$(".btn-create").on("click", function(){
    agregarInformacionBot();
})
$(".btn-update").on("click", function(){
    actualizarInformacionBot();
})
$(".btn-back").on("click", function(){
    location.href='index.html'
})
$(".btn-clean").on("click", function(){
    cleanInputsBot();
})
function agregarInformacionBot() {
    $.ajax({
        type: "POST",
        url: host + "/Boat/save",
        data: JSON.stringify({
            id: $("#idBot").val(),
            year: $("#year").val(),
            brand: $("#brand").val(),
            name: $("#nameBot").val(),
            description: $("#description").val(),
            category: {id :$("#category").val()},
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoCos").empty();
        $("#idCos").val("");
        $("#category").val("");
        $("#year").val("");
        $("#brand").val("");
        $("#nameBot").val("");
        $("#description").val("");
        mostrarInformacionBot();
        alert("Elementos de boats agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuBot(respuesta) {
    $("#idBot").val(respuesta.id),
    $("#nameBot").val(respuesta.name);
    $("#brand").val(respuesta.brand);
    $("#year").val(respuesta.year);
    $("#description").val(respuesta.description);
}

function actualizarInformacionBot() {
    $.ajax({
        method: 'PUT',
        url: host + '/Boat/update',
        data: JSON.stringify({
            id: $("#idBot").val(),
            year: $("#year").val(),
            brand: $("#brand").val(),
            name: $("#nameBot").val(),
            description: $("#description").val(),
            category: {id :$("#category").val()},
        }),
        contentType: "application/JSON",
    }).done(function (data) {
        $("#resultadoBot").empty();
        $("#year").val("");
        $("#brand").val("");
        $("#nameBot").val("");
        $("#category").val("");
        $("#description").val("")
        mostrarInformacionBot();
        alert("Elementos de boat actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });

}

function borrarInformacionBot(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Boat/' + id,
        contentType: "application/JSON",
        success: function (data) {
            console.log(data);
            $("#resultadoBot").empty();
            alert("Elementos de se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionBot();
        }
    });
}
function cleanInputsBot(){
    $("#year").val("");
    $("#brand").val("");
    $("#nameBot").val("");
    $("#category").val("");
    $("#description").val("")
}
