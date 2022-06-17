fetch(
  "https://api.rawg.io/api/games?key=d0f8b99e44f64b68bbccf0e0fcdce0c1&dates=2019-09-01,2019-09-30&platforms=18,1,7"
)
  .then((response) => response.json())
  .then(function (data) {
    let idContainerCard = document.getElementById("idContainerCard");

    let aux = 20;
    let count = 1;

    idContainerCard.textContent = ''; 

    for(const juegos of data.results){
      console.log(juegos);
      juegos.genres.push("");
      juegos.genres.push("");
      idContainerCard.innerHTML += `
      <div class="col-4">
      <div class="card" style="background-color: #303030; color: white">
          <img
            src='${juegos.background_image}'
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
                  ${juegos.name}
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
                  <h5 style="font-size: 15px">${juegos.released}</h5>
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
              <h5 style="font-size: 14px;">${juegos.genres[0].name}, ${juegos.genres[1].name}, ${juegos.genres[2].name}</h5>
                </div>
            </div>
  
          </div>
          </div>
          </div>
          `;

      count++;

    }

    
  })
  ;

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