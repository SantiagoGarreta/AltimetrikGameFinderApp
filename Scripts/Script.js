fetch(
  "https://api.rawg.io/api/games?key=d0f8b99e44f64b68bbccf0e0fcdce0c1&dates=2019-09-01,2019-09-30&platforms=18,1,7"
)
  .then((response) => response.json())
  .then(function (data) {
    let idContainerCard = document.getElementById("idContainerCard");

    let aux = 20;
    let count = 1;

    let gameList = [];

    for (const games of data.results) {
      gameList.push(games.name);
    }

    function autocomplete(inp, arr) {
      var currentFocus;

      inp.addEventListener("input", function (e) {
        var a,
          b,
          i,
          val = this.value;

        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");

            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);

            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

            b.addEventListener("click", function (e) {
              inp.value = this.getElementsByTagName("input")[0].value;

              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });

      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;

          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;

          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;

        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }

    autocomplete(document.getElementById("idSearch"), gameList);

    idContainerCard.textContent = "";

    for (games of data.results) {
      games.genres.push("");
      games.genres.push("");

      idContainerCard.innerHTML += `
      <div class="col-4">
      <div class="card" style="background-color: #303030; color: white">
          <img
            src='${games.background_image}'
            alt="Background"
            class="main__gameImages"
            style='height:250px'
          />
          <div class="container">
            <div class="row">
              <div class="col-8 gameName">
                <p
                  class="main__gameCard--title mt-2"
                  style="font-size: 25px; font-weight: bold; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                >
                  ${games.name}
                </p>
              </div>
              <div class="col-4 mt-2" style="font-size: 20px">
                <p
                  style="
                    text-align: right;
                    margin: 10px;
                    color: rgb(5, 182, 5);
                  "
                >
                  #${count}
                </p>
              </div>
            </div>
          
            <div class="row" style="justify-content: center">
              <div class="col-4" style="color: rgb(133, 131, 131)">
                <h5
                  class="main__gameCard--releaseText"
                  style="font-size: 15px"
                >
                  Release date:
                </h5>
              </div>
              <div class="col-4 classGener">
                  <h5 style="font-size: 15px">${games.released}</h5>
                </div>
              <div class="col">
                <div style="margin-left: 23px">
                  <i class="fa-brands fa-playstation"></i>
                  <i class="fa-brands fa-xbox"></i>
                  <i class="fa-brands fa-windows"></i>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-4" style="color: rgb(133, 131, 131)">
                <h5
                  class="main__gameCard--genresText"
                  style="font-size: 15px"
                >
                  Genres:
                </h5>
              </div>
              <div class="col classGener" style= " text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              <h5 style="font-size: 14px;">${games.genres[0].name}, ${games.genres[1].name}, ${games.genres[2].name}</h5>
                </div>
            </div>
  
          </div>
          </div>
          </div>
          `;

      count++;
    }
  });

//funcion que deberia mostrar unicamente los resultados que contengan el contenido del buscador Search.

function myFunction() {
  var input, filter, section, div, h1, i;
  input = document.getElementById("idSearch");
  filter = input.value.toString().toUpperCase();
  section = document.getElementById("idContainerCard");
  div = section.getElementsByClassName("card");

  for (i = 0; i < div.length; i++) {
    h1 = games.name;
    if (h1) {
      var palabrasEnFiltro = filter.split(" ");
      var hallado = 0;
      for (var filtro of palabrasEnFiltro) {
        if (h1.innerHTML.toString().toUpperCase().indexOf(filtro) > -1) {
          hallado++;
        }
      }

      if (hallado === palabrasEnFiltro.length) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }
}

/* let search;

    function getvalues (){
    search = document.getElementById("idSearch").value;
    alert(search)
    }
    var filterButton = document.getElementById('idBut');
    filterButton.addEventListener("keyup", getvalues, false);
    function filterByName(){
    for (games of data.results.filter(function (game){

      return game.name == search;
    })) {
      console.log(games);
      games.genres.push("");
      games.genres.push("");

      idContainerCard.innerHTML += `
      <div class="col-4">
      <div class="card" style="background-color: #303030; color: white">
          <img
            src='${games.background_image}'
            alt="Background"
            class="main__gameImages"
            style='height:250px'
          />
          <div class="container">
            <div class="row">
              <div class="col-8 gameName">
                <p
                  class="main__gameCard--title mt-2"
                  style="font-size: 25px; font-weight: bold; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                >
                  ${games.name}
                </p>
              </div>
              <div class="col-4 mt-2" style="font-size: 20px">
                <p
                  style="
                    text-align: right;
                    margin: 10px;
                    color: rgb(5, 182, 5);
                  "
                >
                  #${count}
                </p>
              </div>
            </div>
          
            <div class="row" style="justify-content: center">
              <div class="col-4" style="color: rgb(133, 131, 131)">
                <h5
                  class="main__gameCard--releaseText"
                  style="font-size: 15px"
                >
                  Release date:
                </h5>
              </div>
              <div class="col-4 classGener">
                  <h5 style="font-size: 15px">${games.released}</h5>
                </div>
              <div class="col">
                <div style="margin-left: 23px">
                  <i class="fa-brands fa-playstation"></i>
                  <i class="fa-brands fa-xbox"></i>
                  <i class="fa-brands fa-windows"></i>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-4" style="color: rgb(133, 131, 131)">
                <h5
                  class="main__gameCard--genresText"
                  style="font-size: 15px"
                >
                  Genres:
                </h5>
              </div>
              <div class="col classGener" style= " text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              <h5 style="font-size: 14px;">${games.genres[0].name}, ${games.genres[1].name}, ${games.genres[2].name}</h5>
                </div>
            </div>
  
          </div>
          </div>
          </div>
          `;
    }
  }

  });*/

// document.getElementById('IDmain__mainText').innerHTML = "<p>new content</p>";

/*
elemSearch.onkeyup = function(){
    let search = this.value.toLowerCase();
    document.querySelectorAll('#idContainerCard').forEach(function(tr){
      let find = false;
      tr.querySelectorAll('.gameName').forEach(function(e){
        if(e.innerHTML.toLowerCase().indexOf(search) >= 0){
          find = true;
        }
      });
      if(find){
        tr.style.display = '';
      }else{
        tr.style.display = 'none';
      }
    })
  }
*/
