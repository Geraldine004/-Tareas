$(document).ready(function(){
    $("#botonBuscar").click(function (e) {
        e.preventDefault();
        var nPokemon = $("#inputSearch").val().toLowerCase();
        if (nPokemon) {
          findPokemon(nPokemon);
        }
    
    });

    $("#botonLimpiar").click(function (e) {
        e.preventDefault();
        $("#infoPokemon").empty();
        $('#inputSearch').val('');
    });

    function findPokemon(pokemon){
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
            dataType: "json",
            success: function (data){
                renderPokeData(data)
            }
        })
    }

    function renderPokeData(data) {
        let div = $("<div></div>");
        div.addClass("poke card");
    
        let name = $("<h3></h3>");
        name.addClass("nameCard");
        name.append(data.id + " " + data.name.toUpperCase());
        div.append(name);
    
        let img = $("<img></img>");
        img.attr("src", data.sprites.other["official-artwork"].front_default);
        img.addClass("imgCard");
        div.append(img);
    
        let body = $("<div></div>");
        body.addClass("tipo");
    
        var pokeType = data.types;
        var tipos = '';
        pokeType.forEach(function (type) {
          if (pokeType.length > 1 && !pokeType.length.last) {
            tipos += `${type['type']['name']} - `.toUpperCase();
          } else {
            tipos += `${type['type']['name']}`.toUpperCase();
          }
    
        })

        body.append(`<div>Tipo: ${tipos}<div>`);
        div.append(body);
    
        $('#infoPokemon').append(div);
      }

})