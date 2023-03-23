class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("careo1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("carro2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    // C38 TA
    fuels = new Group();
    powerCoins = new Group();

    // Adicione o sprite de combustível ao jogo
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adicione o sprite de moeda ao jogo
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
  }

  // C38 TA
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reiniciar o Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

  }

  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        // C38  SA
        if (index === player.index) {
          stroke(10);
          //Utilize o código ' fill("red");' para definir uma bolinha vermelha abaixo do carro que você está controlando
          ???
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          
          // Altere a posição da câmera na direção y
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;

        }
      }

      /
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
      this.handlePlayerControls();

      drawSprites();
    }
  }

  handleFuel(index) {
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      
      collected.remove();
    });
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      collected.remove();
    });
  }

handleResetButton() {
  /*Na linha 32 do form.js, você utilizou uma função que é utilizada 
  quando o botão for clicado
  Faça o mesmo com a linha abaixo */
  this.resetButton.???(() => {
    database.ref("/").set({
      playerCount: 0,
      /* Na linha acima, você definiu que a contagem de jogadores para 0
      Faça o mesmo com o gameState e também defina ele para 0 */
      players: {}
    });
    //Utilize o código 'window.location.reload();', pois ele recarrega a página
    //??
  });
}
handlePlayerControls() {
  /*Utilize o código 'keyIsDown', pois ele significa 'pressionar para baixa*/
  if (???(UP_ARROW)) {
    player.positionY += 10;
    player.update();
  }

  if (???(LEFT_ARROW) && player.positionX > width / 3 - 50) {
    player.positionX -= 5;
    player.update();
  }
 
  if (???(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
   /* Na linha 166 e 167, foi programado que...
   a posição do player no eixo x irá mudar para +5
   e o jogador aparecerá nessa nova posição
   
   Faça o mesmo quando você pressiona a tecla para direita
   Lembrando que para direita o número é positivo*/
    ???
  }
}
}
