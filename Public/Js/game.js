// window.addEventListener('load',()=>
// {
const closeGameInfoModal = document.getElementById("closeGameInfoModal");
closeGameInfoModal.addEventListener("click", () => {
  game.gamePaused = false;
  animate(0, 0);
});

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
canvas.width = 2096;
canvas.height = 786;
const controls = {
  lastUpdatedTime: 0,
  timeStamp: 0,
};
const airPollution = [
  {
    category: "air pollution",
    subCategory: "IndustrialWaste",
    image: "IndustrialWaste.png",
  },
  {
    category: "air pollution",
    subCategory: "fossilFuelBurning",
    image: "fossilFuelBurning.png",
  },
  {
    category: "air pollution",
    subCategory: "IndoorPollution",
    image: "IndoorPollution.png",
  },
  {
    category: "air pollution",
    subCategory: "forest Fire",
    image: "forestFires.png",
  },
  {
    category: "air pollution",
    subCategory: "transportation",
    image: "transportationPollution",
  },
];
const waterPollution = [
  {
    category: "air pollution",
    subCategory: "IndustrialWaste",
    image: "IndustrialWaste.png",
  },
  {
    category: "air pollution",
    subCategory: "fossilFuelBurning",
    image: "fossilFuelBurning.png",
  },
  {
    category: "air pollution",
    subCategory: "IndoorPollution",
    image: "IndoorPollution.png",
  },
  {
    category: "air pollution",
    subCategory: "forest Fire",
    image: "forestFires.png",
  },
  {
    category: "air pollution",
    subCategory: "transportation",
    image: "transportationPollution",
  },
];
const landPollution = [
  {
    category: "air pollution",
    subCategory: "IndustrialWaste",
    image: "IndustrialWaste.png",
  },
  {
    category: "air pollution",
    subCategory: "fossilFuelBurning",
    image: "fossilFuelBurning.png",
  },
  {
    category: "air pollution",
    subCategory: "IndoorPollution",
    image: "IndoorPollution.png",
  },
  {
    category: "air pollution",
    subCategory: "forest Fire",
    image: "forestFires.png",
  },
  {
    category: "air pollution",
    subCategory: "transportation",
    image: "transportationPollution",
  },
];

const landPollutionBackgroundImages = ["landPollutionBackGround.jpg"];
const airPollutionBackgroundImages = ["airPollutionBackGround.jpg"];
const waterPollutionBackgroundImages = ["waterPollutionBackGround.jpg"];
const typeHandler = (v) => {
  const selectElement = document.getElementById("categorySelection");
};
let serverInfoResponse = {
  question:
    "1. Which of the following is one of the secondary air pollutants among the following?",
  solutions: ["Ozone", "CO2", "CO", "PANs"],
  answer: "Ozone",
  answerIndex: 0,
  causes: ["Industrial Emission", "Construction and Demolition "],
  facts: [
    "Irritation in your eyes and throat",
    "Breathing issues",
    "At times can even lead to chronic illness",
    "The workers and personnel working on-site are exposed to these air pollutants everyday. These pollutants affect their health to a great extent as well",
  ],
  ref: "www.google.com",
};
const closeHandler = function () {
  let popUp = document.getElementById("popup");
  popUp.innerHTML = null;
  game.gamePaused = false;
  game.quizTimer = 0;
  lastUpdatedTime = 0;
  animate(0, 1);
};
const infoCloseHandler = function () {
  let popUp = document.getElementById("popup");
  popUp.innerHTML = null;
  game.gamePaused = false;
  lastUpdatedTime = 0;
  animate(0, 1);
};

const displayRandomInfo = () => {
  return fetch("http://localhost:7000/facts/random")
    .then((response) => response.json())
    .then((data) => {
      return `<div id="popup"><div id="blackOut"></div>
    <div id="overlay">
        <div class="overlayBody">
        <div class="card" id="card">
          <div class="card-header1">
             
            <img id="didYouKnowImage" src="./Img/DidYouKnow.png"></img>
           
          </div>
          <div class="card-body">
          <h4 class="text-info">${data.fact}</h4>
          <p>${data.description}.</p>
          
          </div>
          <div class="card-footer">
                <button onclick="{infoCloseHandler()}" type="button" id="cardbuttonclose" class="btn btn-secondary" >Close</button>
          </div>
        </div>                        
        </div>
    </div>
</div>`;
    })
    .catch((err) => console.log(err));
};

const getInfoHtml = (causes, facts, reference) => {
  return `<div>
  <div id="blackOut"></div>
  <div id="overlay">
    <div class="overlayBody">
      <div class="card info">
       
      <div class="card-body">
          ${
            facts
              ? `<div class="causes">
          <p class="card-header" id="areaOfConcern">Area Of Concern</p>
          <ul class="overLayList">` +
                giveListElement(causes) +
                `</ul>
          </div>`
              : ""
          }
          ${
            causes
              ? `<div class="facts">
          <p class="card-header" id="concernImpact">Impact</p>
          <ul class="overLayList">${giveListElement(facts)}</ul>
          </div>`
              : ""
          }
          ${
            reference
              ? `<div class="card-header" id="concernReference">References</div>
          <div id="concernReferenceText">${reference}</div>`
              : ""
          }
          </div>
      </div>
      <div id="closeElement">
     
      <button onclick="{infoCloseHandler()}" type="button" id="cardbuttonclose1" class="btn btn-secondary" >Close</button>
      </div>
    </div>
  </div>
</div>`;
};

// const getQuizHtml = () => {
//   let serverInfoResponse={}
//   return fetch("http://localhost:7000/test")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//         serverInfoResponse = data
//       return `<div id="blackOut"></div>
//                     <div id="overlay" >
//                         <div class="overlayBody">
//                             <div id="response"></div>
//                             <div class="questionField">
//                                 <div>Question</div>
//                                 <div class="question">${data.question}?</div>
//                             </div>
//                             <div class="solutionField">
//                                 <div class="solutionQuestion">Please select the possible solution</div>
//                                 ${giveListElement(data,'solutionQuestion')}
//                             </div>
//                             <div id="nextElement">
//                             </div>
//                         </div>
//                     </div>`;
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// };
const getQuizHtml = () => {
  let serverInfoResponse = {};
  return fetch("http://localhost:7000/test")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      serverInfoResponse = data;
      return `<div id="blackOut"></div>
      <div id="overlay">
      <div class="overlayBody">
      <div class="card" id="card" style="width: 100%;">
        <div class="card-header"  id="">
        <span>
        <img id="QuestionImg" src="./Img/QuestionMark.jfif"></img> <h4>${
          data.question
        }?</h4></span>
        
        </div>
        <div class="card-body w-100">
          <div class="list-group">
          ${giveListElement(data, "solutionQuestion")}
          </div>
        </div>
        <div class="card-footer" id="nextElement">
        </div>
      </div>                        
      </div>
  </div>
                    </div>`;
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const giveListElement = (array, requiredFor) => {
  var htmlElement = ``;
  if (requiredFor === "solutionQuestion") {
    for (let index = 0; index < array.solutions.length; index++) {
      htmlElement += ` <button id="s${index}" onClick={verifyAnswer(${array.solutions.indexOf(
        array.answer
      )},${index})}  type="button" style="border-radius: 20px;" class="list-group-item list-group-item-action   text-info" >${
        array.solutions[index]
      }</button>`;
      // htmlElement += `<p id="s${index}" onClick={verifyAnswer(${array.solutions.indexOf(array.answer)},${index})} class="solution">${array.solutions[index]}</p>`;
    }
  } else {
    for (let index = 0; index < array.length; index++) {
      htmlElement += `<li>${array[index]}</li>`;
    }
  }
  return htmlElement;
};

const onRedirectToNextElementHandler = () => {
  let popUp = document.getElementById("popup");
  popUp.innerHTML = displayInfo();
};
const removeAlert = () => {
  setTimeout(() => {
    const alertElement = document.getElementById("alert");
    alertElement.innerHTML = null;
    console.log("removed");
  }, 2000);
};
const verifyAnswer = (answerIndex, selectedIndex) => {
  const getNextElement = () => {
    return `<img id="LearnMoreImg" src="./Img/LearnMore.png" onClick={onRedirectToNextElementHandler()}></img>`;
  };
  const nextElement = document.getElementById("nextElement");
  const answerElement = document.getElementById(`s${answerIndex}`);
  const selectedElement = document.getElementById(`s${selectedIndex}`);
  // const responseElement = document.getElementById("response");
  const alertElement = document.getElementById("alert");
  if (+answerIndex === +selectedIndex) {
    if (game.gameLife < game.gameLifeMax) {
      game.gameLife++;
      game.gameScore++;
    }
    alertElement.innerHTML = `<div class="alert alert-success" role="alert">
    <i class="fa fa-thumbs-up"></i>That's Correct!
    </div>`;
    removeAlert();

    // responseElement.innerHTML = `<h3 class="text-success" >Hurray :) u Guessed it correctly</h3>`
    answerElement.setAttribute("style", "background-color: rgb(188, 226, 130)");
  } else {
    if (game.gameLife >= 2) {
      game.gameLife--;
    } else {
      game.gameEnd = true;
    }
    alertElement.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa fa-thumbs-down"></i>That's Incorrect! Please Try again.</div>`;
    //responseElement.innerHTML = `<h3 class="text-danger" >Sorry :( u answered it Incorrectly</h3>`
    removeAlert();
    answerElement.setAttribute("style", "background-color: rgb(188, 226, 130)");
    selectedElement.setAttribute(
      "style",
      "background-color:salmon;color:white"
    );
  }
  game.quizTimer = 0;
  lastUpdatedTime = 0;
  nextElement.innerHTML = getNextElement();
};

const displayInfo = () => {
  let serverInfoResponse = {
    question:
      "1. Which of the following is one of the secondary air pollutants among the following?",
    solutions: ["Ozone", "CO2", "CO", "PANs"],
    answer: "Ozone",
    answerIndex: 0,
    causes: ["Industrial Emission", "Construction and Demolition "],
    facts: [
      "Irritation in your eyes and throat",
      "Breathing issues",
      "At times can even lead to chronic illness",
      "The workers and personnel working on-site are exposed to these air pollutants everyday. These pollutants affect their health to a great extent as well",
    ],
    ref: "www.google.com",
  };
  return getInfoHtml(
    serverInfoResponse.causes,
    serverInfoResponse.facts,
    serverInfoResponse.ref
  );
};
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
          this.game.keys.space.pressed = true;
          this.game.shotSound.Play();
          break;
        case 37: //arrow left
          this.game.keys.left.pressed = true;
          this.game.player.currentSprite =
            this.game.player.sprites.runningLeftSprint;
          break;
        case 38: //arrow up
          if (this.game.player.velocity.y === 0)
            this.game.keys.up.pressed = true;
          //is.game.player.velocity.y -= this.game.player.speed
          break;
        case 39: //arrow right
          this.game.keys.right.pressed = true;
          this.game.player.currentSprite =
            this.game.player.sprites.runningRightSprint;
          break;
        case 80: //p-paused
          this.game.gamePaused = true;
          break;
        case 85: //u-unpaused
          this.game.gamePaused = false;
          animate(0, 0);
          break;
      }
      // if (
      //   [37,38,39].includes(e.keyCode)  &&
      //   this.game.keys.indexOf(e.keyCode) === -1
      // )
      //   this.game.keys.push(e.keyCode);
      // if (e.key === " ") this.game.player.shootProjectile();
    });
    window.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 32:
          this.game.keys.space.pressed = false;
          break;
        case 37: //arrow left
          this.game.keys.left.pressed = false;
          this.game.player.currentSprite =
            this.game.player.sprites.standingLeftSprint;
          break;
        case 38: //arrow up
          this.game.keys.up.pressed = false;
          //this.game.player.velocity.y += this.game.player.speed
          break;
        case 39: //arrow right
          this.game.keys.right.pressed = false;
          this.game.player.currentSprite =
            this.game.player.sprites.standingRightSprint;
          break;
      }
      // {
      //     console.log(this.game.keys)
      //     this.game.keys.splice(this.game.keys.indexOf(e.keyCode), 1);
      //     // if(e.keyCode===38)
      //     // {
      //     //     if(this.game.player.position.y+this.game.player.height+this.game.player.velocity.y<=this.game.width)
      //     //     {
      //     //         this.game.player.velocity.y = this.game.player.speed
      //     //     }
      //     // }
      //     console.log(this.game.keys)
      // }
    });
  }
}
class Platform {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    let image = new Image(this.width, this.height);
    image.src = "http://localhost:7000/Img/Screenshot 2023-04-17 000822.png";
    this.image = image;
  }
  update() {
    this.position.x -= 3;
  }
  draw(context) {
    // context.fillStyle='white'
    // context.fillRect(this.position.x,this.position.y,this.width,this.height)
    this.update();
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Bird {
  constructor(game, x, y) {
    this.game = game;
    this.position = {
      x: x,
      y: y,
    };
    this.width = 141;
    this.height = 124;
    let image = new Image(this.width, this.height);
    image.src = "http://localhost:7000/Img/raven.png";
    this.image = image;
    this.frames = 0;
    this.dropDownItem = null;
    this.droppedItemPlaced = false;
  }
  update() {
    this.position.x -= 3;
    this.frames++;
    if (this.frames > 6) this.frames = 0;
  }
  draw(context) {
    // context.fillStyle='white'
    // context.fillRect(this.position.x,this.position.y,this.width,this.height)
    this.update();
    context.drawImage(
      this.image,
      271 * this.frames,
      0,
      271,
      194,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Layer {
  constructor(game, image, speedModifier, width, height) {
    this.game = game;
    this.position = {
      x: 0,
      y: 0,
    };
    this.image = image;
    this.width = width ?? this.game.width;
    this.height = height ?? this.game.height;
    this.speedModifier = speedModifier;
  }
  update() {
    if (this.position.x < -this.width) this.position.x = 0;
    this.position.x -= this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.position.x + this.width,
      this.position.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.position.x + this.width - 10,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Background {
  constructor(game) {
    this.game = game;
    // const bg1 = document.getElementById("bg1")
    let bg1 = new Image();
    bg1.src = "http://localhost:7000/Img/forest-layer-1.png"; //"http://localhost:7000/Img/layer-1.png";
    let bg2 = new Image();
    bg2.src = "http://localhost:7000/Img/forest-layer-2.png"; //"http://localhost:7000/Img/layer-2.png";
    let bg3 = new Image();
    bg3.src = "http://localhost:7000/Img/forest-layer-3.png"; //"http://localhost:7000/Img/layer-3.png";
    let bg4 = new Image();
    bg4.src = "http://localhost:7000/Img/forest-layer-4.png"; //"http://localhost:7000/Img/layer-4.png";
    let bg5 = new Image();
    bg5.src = "http://localhost:7000/Img/forest-layer-5.png"; //"http://localhost:7000/Img/layer-5.png";
    this.game.layers.push(new Layer(this.game, bg1, 1, 2400, this.height));
    this.game.layers.push(new Layer(this.game, bg2, 2, 2400, this.height));
    this.game.layers.push(new Layer(this.game, bg3, 1, 2400, this.height));
    this.game.layers.push(new Layer(this.game, bg4, 3, 2400, this.height));
    this.game.layers.push(new Layer(this.game, bg5, 2, 2400, this.height));
  }
  update() {
    this.game.layers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.game.layers.forEach((layer) => layer.draw(context));
  }
}
class PowerUp {
  constructor(game, x, y) {
    this.game = game;
    this.position = {
      x: x,
      y: y,
    };
    this.width = 100;
    this.height = 100;
    let image = new Image(this.width, this, this.height);
    //image.src = `http://localhost:7000/Img/Screenshot 2023-04-17 103733.png`
    image.src = `http://localhost:7000/Img/${
      airPollution[getRandomIntInclusive(0, 3)].image
    }`; //"http://localhost:7000/Img/fossilFuelBurning.png"
    this.image = image;
    this.frames = 0;
  }
  update() {
    this.position.x -= 2;
    this.frames++;
    if (this.frames >= 7) this.frames = 0;
  }
  draw(context) {
    this.update();
    // context.beginPath()
    // context.arc(this.position.x,this.position.y,30,0,Math.PI*2)
    // context.fillStyle = 'salmon'
    // context.fill()
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class PlayerProjectile {
  constructor(game) {
    this.game = game;
    this.width = 10;
    this.height = 20;
    let image = new Image();
    image.src = "http://localhost:7000/Img/boom.png";
    this.image = image;
  }
  draw(context) {
    context.fillStyle = "red";
    for (let i = 0; i < this.game.currentNoOfProjectiles; i++) {
      // context.fillRect(this.game.width -200  + 10 * (i + 3), 20, 7, 30);
      context.drawImage(
        this.image,
        0,
        0,
        100,
        90,
        this.game.width - 420 + 20 * (i + 3),
        20,
        25,
        25
      );
    }
  }
}
class PlayerLife {
  constructor(game) {
    this.game = game;
    this.width = 10;
    this.height = 20;
    let image = new Image();
    image.src = "http://localhost:7000/Img/heart.png";
    this.image = image;
  }
  draw(context) {
    // context.fillStyle = "yellow";
    for (let i = 0; i < this.game.gameLife; i++) {
      // context.fillRect(10 * (i + 5), 40, 7, 30);
      context.drawImage(this.image, 20 * (i + 3), 40, 20, 20);
    }
  }
}
class PlayerScore {
  constructor(game) {
    this.game = game;
  }
  draw(context) {
    context.save();
    context.fillStyle = "white";
    context.font = "25px Arial";
    context.fillText(`Game Score: ${this.game.gameScore}`, 50, 25);
    context.restore();
  }
}
class Enemy {
  constructor(
    game,
    image,
    maxframes,
    speedModifier,
    position = { x, y },
    size = { width, height },
    cropSize = { width, height }
  ) {
    this.game = game;
    this.image = image;
    this.position = position;
    this.width = size.width;
    this.height = size.height;
    this.speedModifier = speedModifier;
    this.frames = 0;
    this.maxframes = maxframes;
    this.cropSize = cropSize;
  }
  update() {
    this.position.x -= 1 * this.speedModifier;
    this.frames++;
    if (this.frames >= this.maxframes) this.frames = 0;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.cropSize.width * this.frames,
      0,
      this.cropSize.width,
      this.cropSize.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Zombie extends Enemy {
  constructor(game, x, y, speedModifier) {
    let image = new Image();
    image.src = "http://localhost:7000/Img/enemy_zombie.png";
    super(
      game,
      image,
      8,
      speedModifier,
      { x: x, y: y },
      { width: 86, height: 140 },
      { width: 292, height: 410 }
    );
  }
  draw(context) {
    super.update();
    super.draw(context);
  }
}
class Player {
  constructor(game) {
    this.game = game;
    this.width = 66;
    this.height = 120;
    this.gravity = 1;
    this.position = {
      x: 50,
      y: 40,
      //y:this.game.height-this.height
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 4;
    this.sprites = {
      standingRightSprint: {
        getImage: () => {
          let image = new Image();
          image.src = "http://localhost:7000/Img/spriteStandRight.png";
          return image;
        },
        width: 66,
        cropWidth: 177,
        direction: "right",
      },
      runningRightSprint: {
        getImage: () => {
          let image = new Image();
          image.src = "http://localhost:7000/Img/spriteRunRight.png";
          return image;
        },
        width: 127.8,
        cropWidth: 340,
        direction: "right",
      },
      standingLeftSprint: {
        getImage: () => {
          let image = new Image();
          image.src = "http://localhost:7000/Img/spriteStandLeft.png";
          return image;
        },
        width: 66,
        cropWidth: 177,
        direction: "left",
      },
      runningLeftSprint: {
        getImage: () => {
          let image = new Image();
          image.src = "http://localhost:7000/Img/spriteRunLeft.png";
          return image;
        },
        width: 127.8,
        cropWidth: 340,
        direction: "left",
      },
    };
    this.currentSprite = this.sprites.runningRightSprint;
    this.frames = 0;
  }
  update(deltaTime) {
    this.game.quizTimer += deltaTime;
    //x dir movement
    if (
      this.game.keys.right.pressed &&
      this.position.x < this.game.width * 0.85
    ) {
      this.velocity.x = this.speed;
    } else if (this.game.keys.left.pressed && this.position.x >= 10) {
      this.velocity.x = -this.speed;
    } else {
      this.velocity.x = 0;
    }

    //y dir movement
    if (
      this.game.keys.up.pressed &&
      this.position.y >= this.game.width / 5 &&
      this.velocity.y === 0
    )
      this.velocity.y = -20;
    else if (
      !this.game.keys.up.pressed &&
      this.position.y + this.height + this.velocity.y <=
        this.game.height - this.velocity.y - 130
    )
      this.velocity.y += this.gravity;
    else {
      if (
        this.position.y + this.height + this.velocity.y <=
        this.game.height - this.velocity.y - 130
      )
        this.velocity.y += +this.gravity;
      else this.velocity.y = 0;
    }

    // else
    //     this.position.y +=this.velocity.y;
    // if(this.game.keys.includes(38)&& this.position.y>this.game.height*0.091)
    // {
    //     this.velocity.y = -this.speed;
    // }
    // else if (this.game.keys.includes(39) && (this.position.x+this.width)  <= 800)
    // this.velocity.x = +this.speed;
    // else if (this.game.keys.includes(37) && (this.position.x) >= 50)
    // {
    //     this.velocity.x = -this.speed;
    // }
    // else
    // {
    //     if(this.position.y+this.height+this.velocity.y<=this.game.height*0.90)
    //     {
    //         this.velocity.y = +this.speed
    //     }
    //     else
    //     {
    //         this.velocity.y = 0
    //     }
    //     this.velocity.x = 0
    // }

    //detecting platform collision and controlling jump(y-corr)
    this.game.platforms.forEach((platform) => {
      if (
        this.position.y + this.height + this.velocity.y >=
          platform.position.y &&
        this.position.x + this.width >= platform.position.x &&
        this.position.x <= platform.position.x + platform.width &&
        platform.position.y + platform.height > this.position.y + this.height
      ) {
        this.velocity.y = 0;
        if (
          this.game.keys.up.pressed &&
          this.position.y + this.velocity.y >= 20
        )
          this.velocity.y -= this.speed;
      }
      //controlling platform with right left arrows speed

      // if(this.game.keys.right.pressed)
      // {
      //     platform.position.x -= this.speed
      // }
      // if(this.game.keys.left.pressed)
      // {
      //     platform.position.x += this.speed
      // }
    });

    //detecting powerUps collision
    // this.game.powerUps.forEach((powerUp) => {
    //   if (
    //     this.position.y + this.height >= powerUp.position.y &&
    //     this.position.x + this.width >= powerUp.position.x &&
    //     this.position.x <= powerUp.position.x + powerUp.width &&
    //     powerUp.position.y + powerUp.height > this.position.y + this.height
    //   ) {
    //     let popUp = document.getElementById("popup");
    //     getQuizHtml()
    //       .then((data) => {
    //         this.game.gamePaused = true;
    //         popUp.innerHTML = data;
    //       })
    //       .catch((err) => console.log(err));
    //     this.quizTimer = 0;

    //     this.game.powerUps.splice(this.game.powerUps.indexOf(powerUp), 1);
    //   }
    // });
    this.position.x += this.velocity.x;
    //this.position.x -=0.5999;
    this.position.y += this.velocity.y;

    //updating frames
    this.frames++;
    if (this.frames > 28) this.frames = 0;

    this.game.lastProjectileFiredTimer += deltaTime;
    // console.log(deltaTime)
    //shooting projectiles
    if (
      this.game.keys.space.pressed &&
      this.game.currentNoOfProjectiles > 0 &&
      this.game.lastProjectileFiredTimer >
        this.game.allowedToFioreProjectileInterval
    ) {
      this.game.projectiles.push(
        new shootProjectile(this.game, this.speed + 3)
      );
      this.game.currentNoOfProjectiles--;
      this.game.lastProjectileFiredTimer = 0;
    }
    //detecting player collision with the zombies
    for (let i = 0; i < this.game.zombies.length; i++) {
      let zombie = this.game.zombies[i];
      // console.log(`Player:`,this.position,`width:${this.width}\theight:${this.height}`)
      // console.log('zombie:',zombie.position,`width:${zombie.width}\theight:${zombie.height}`)
      if (
        this.position.y + this.height >= zombie.position.y &&
        (this.position.y >= zombie.position.y ||
          this.position.y + this.height <= zombie.position.y + zombie.height) &&
        this.position.x + this.width <= zombie.position.x + zombie.width &&
        this.position.x + this.width >= zombie.position.x
        // (this.position.y + this.height + this.velocity.y >= zombie.position.y &&
        // zombie.position.y + zombie.height > this.position.y + this.height) &&
        // (this.position.x  >= zombie.position.x ||
        // this.position.x <= zombie.position.x + zombie.width+zombie.speedModifier  )

        // this.position.x >= zombie.position.x
        //  &&
        // this.position.x + this.width + this.velocity.x <= (zombie.position.x + zombie.width)
        //  &&
        // this.position.y  >= zombie.position.y &&
        // this.position.y+this.height+this.velocity.y<(zombie.position.y+zombie.height)
      ) {
        console.log("collided");
        this.game.zombies.splice(i, 1);
        if (this.game.gameLife >= 2) {
          this.game.gameLife--;
        } else {
          this.game.gameEnd = true;
        }
        break;
      }
    }
    //detecting collosion with DropItems
    this.game.dropItems.forEach((dropItem) => {
      if (
        this.position.y + this.height - 30 <=
          dropItem.position.y + dropItem.width &&
        this.position.y + this.height - 30 >= dropItem.position.y &&
        this.position.x + this.width >= dropItem.position.x &&
        this.position.x <= dropItem.position.x + dropItem.width
        // && dropItem.position.y + dropItem.height > this.position.y + this.height
      ) {
        this.velocity.y = 0;
        console.log("standing");
        let popUp = document.getElementById("popup");
        if (this.game.quizTimer > this.game.quizInterval) {
          getQuizHtml()
            .then((data) => {
              this.game.gamePaused = true;
              lastUpdatedTime = 0;
              popUp.innerHTML = data;
            })
            .catch((err) => console.log(err));
          this.game.quizTimer = 0;
        } else {
          displayRandomInfo()
            .then((data) => {
              lastUpdatedTime = 0;
              this.game.gamePaused = true;
              popUp.innerHTML = data;
            })
            .catch((err) => console.log(err));
        }
        this.game.dropItems.splice(this.game.dropItems.indexOf(dropItem), 1);
      }
    });
  }
  draw(context) {
    // context.fillStyle = 'red'
    // context.fillRect(this.position.x,this.position.y,this.width,this.height)
    context.drawImage(
      this.currentSprite.getImage(),
      this.currentSprite.cropWidth * this.frames,
      0,
      this.currentSprite.cropWidth,
      400,
      this.position.x,
      this.position.y,
      this.currentSprite.width,
      this.height
    );
  }
}
class shootProjectile {
  constructor(game, projectileSpeed, width, height) {
    this.game = game;
    this.position = { ...this.game.player.position };
    this.projectileSpeed = projectileSpeed;
    let image = new Image();
    image.src = "http://localhost:7000/Img/fire.png";
    this.image = image;
    this.width = width ?? 100;
    this.height = height ?? 90;
  }
  update() {
    this.position.x += this.projectileSpeed;
  }
  draw(context) {
    // context.fillStyle="red"
    // context.fillRect(this.position.x,this.position.y,20,7)
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class DropItem {
  constructor(game, width, height, position = { x, y }) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.position = { ...position };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 3;
    let image = new Image();
    image.src = "http://localhost:7000/Img/player.png";
    this.image = image;
    this.frames = 0;
  }
  update() {
    if (this.position.y + this.height < this.game.height - 120) {
      this.velocity.y += this.gravity;
      this.position.y = this.velocity.y;
    } else {
      this.velocity.y = 0;
      this.position.x -= 3;
    }
    //frames
    this.frames++;
    if (this.frames >= 7) this.frames = 0;
  }
  draw(context) {
    // context.beginPath()
    // context.arc(this.position.x,this.position.y,30,0,Math.PI*2)
    // context.fillStyle = 'salmon'
    // context.fill()
    // context.fillRect(this.position.x,this.position.y,this.width,this.height)
    context.drawImage(
      this.image,
      100 * this.frames,
      547.8,
      100,
      91.3,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class GameSound {
  constructor(game, type) {
    this.game = game;
    this.sound = document.getElementById(type);
  }
  Play() {
    this.sound.currentTime = 0;
    this.sound.play();
  }
}
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.platforms = [new Platform(this, 10, this.height, this.width, 400)]; //new Platform(this,30,400),new Platform(this,440,300)
    this.keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
      up: {
        pressed: false,
      },
      space: {
        pressed: false,
      },
    };
    this.speed = 1;
    this.layers = [];
    this.backGround = new Background(this);
    this.platformTimer = 0;
    this.platformInterval = 4000;
    this.maxNoOfPlatforms = 5000;
    this.powerUpTimer = 0;
    this.powerUpInterval = 2; //(1000* getRandomIntInclusive(8,12));
    this.powerUps = [];
    this.gamePaused = true;
    this.quizTimer = 0;
    this.quizInterval = 20000;
    this.gameLife = 3;
    this.gameLifeMax = 10;
    this.gameInterval = 10;
    this.gameTimer = 0;
    this.gameScore = 0;
    this.playerLife = new PlayerLife(this);
    this.playerScore = new PlayerScore(this);
    this.gameEnd = false;
    this.birds = [];
    this.maxNoOfBirds = 10;
    this.birdsTimer = 0;
    this.birdsInterval = 3000;
    this.maxNoOfZombies = 8;
    this.zoombieTimer = 0;
    this.zoombieInterval = getRandomIntInclusive(8000, 10000);
    this.zombies = [];
    this.projectiles = [];
    this.currentNoOfProjectiles = 10;
    this.maxNoOfProjectiles = 15;
    this.projectileRecoveryTimer = 0;
    this.projectileRecoveryInterval = 600;
    this.dropItems = [];
    this.dropItemsInterval = 4000;
    this.dropItemsTimer = 0;
    this.maxDropDowns = 1;
    this.lastProjectileFiredTimer = 0;
    this.allowedToFioreProjectileInterval = 400;
    this.playerProjectile = new PlayerProjectile(this);
    this.shotSound = new GameSound(this, "shot");
    this.dropSound = new GameSound(this, "drop");
    this.hitSound = new GameSound(this, "hit");
  }
  update(deltaTime) {
    this.backGround.update();
    this.player.update(deltaTime);

    //projectiles
    this.projectileRecoveryTimer += deltaTime;
    if (this.projectileRecoveryTimer > this.projectileRecoveryInterval) {
      if (this.currentNoOfProjectiles < this.maxNoOfProjectiles)
        this.currentNoOfProjectiles++;
      this.projectileRecoveryTimer = 0;
    }
    this.projectiles.forEach((projectile) => projectile.update());

    //updating enemeies timer
    this.zoombieTimer += deltaTime;
    if (
      this.zoombieTimer > this.zoombieInterval &&
      this.zombies.length < this.maxNoOfZombies
    ) {
      // console.log(this.zoombieTimer,this.zoombieInterval ,this.zombies.length, this.maxNoOfZombies)
      // this.zombies=[]
      for (
        let i = 0;
        i < getRandomIntInclusive(1, this.maxNoOfZombies - this.zombies.length);
        i++
      )
        this.zombies.push(
          new Zombie(
            this,
            this.player.position.x +
              getRandomIntInclusive(this.width, this.width + this.width / 2),
            this.height - 270,
            getRandomIntInclusive(2, 5)
          )
        );
      this.zoombieTimer = 0;
    } else {
      this.zombies = this.zombies.filter(
        (zombie) => !(zombie.position.x < -this.width)
      );
    }

    //checking for the projectile which are out of screen

    //detecting projectiles collision
    for (let i = 0; i < this.projectiles.length; i++) {
      let projectile = this.projectiles[i];
      for (let j = 0; j < this.zombies.length; j++) {
        let zombie = this.zombies[j];
        if (
          projectile.position.y + projectile.height >= zombie.position.y &&
          (projectile.position.y >= zombie.position.y ||
            projectile.position.y + projectile.height <=
              zombie.position.y + zombie.height) &&
          projectile.position.x + projectile.width <=
            zombie.position.x + zombie.width &&
          projectile.position.x + projectile.width >= zombie.position.x
        ) {
          this.hitSound.Play();
          //http://localhost:7000/Img/boom.png
          this.projectiles.splice(i, 1);
          this.zombies.splice(j, 1);
          let image = new Image();
          image.src = "http://localhost:7000/Img/boom.png";
          for (let f = 0; f < 5; f++) {
            ctx.drawImage(
              image,
              100 * f,
              0,
              100,
              90,
              zombie.position.x,
              Math.floor(zombie.position.y + zombie.width / 2),
              100,
              90
            );
          }
          break;
        }
      }
    }

    //updating platform timer

    this.platformTimer += deltaTime;
    if (this.platformTimer > this.platformInterval) {
      let randomWidth = getRandomIntInclusive(200, 300);
      let randomHeight = getRandomIntInclusive(30, 60);
      // this.platforms.push(new Platform(this.game,getRandomIntInclusive(this.width,this.width*2),this.height-randomHeight,randomWidth,randomHeight))
      this.platforms.push(
        new Platform(
          this.game,
          getRandomIntInclusive(this.width, this.width * 2),
          getRandomIntInclusive(50, this.height * 0.7),
          getRandomIntInclusive(200, 400),
          getRandomIntInclusive(30, 60)
        )
      );
      this.maxNoOfPlatforms--;
      this.platformTimer = 0;
    }

    //updating powerup timer
    this.powerUpTimer += deltaTime;
    if (this.powerUpTimer > this.powerUpInterval && this.powerUps.length <= 1) {
      this.powerUps.push(
        new PowerUp(
          this.game,
          getRandomIntInclusive(this.width, this.width + this.width * 0.4),
          getRandomIntInclusive(50, this.height * 0.6)
        )
      );
      this.powerUpTimer = 0;
    } else {
      this.powerUps = this.powerUps.filter(
        (powerUp) => !(powerUp.position.x < -this.width / 2)
      );
    }

    //updating birds timer
    this.birdsTimer += deltaTime;
    if (
      this.birdsTimer > this.birdsInterval &&
      this.birds.length < this.maxNoOfBirds
    ) {
      this.birds.push(
        new Bird(
          this.game,
          getRandomIntInclusive(this.width, this.width * 2),
          getRandomIntInclusive(50, this.height * 0.34)
        )
      );
      this.birdsTimer = 0;
    } else {
      this.birds = this.birds.filter(
        (bird) => !(bird.position.x < -this.width)
      );
    }

    //dropitems
    this.dropItemsTimer += deltaTime;
    let dropDownBirdsAvailable = this.birds.filter(
      (bird) =>
        bird.position.x >=
          this.player.position.x + getRandomIntInclusive(50, 600) &&
        bird.position.x <= this.player.position.x + 600 &&
        !bird.dropDownBirdsAvailable
    );
    if (
      this.dropItemsTimer > this.dropItemsInterval &&
      dropDownBirdsAvailable.length > 0 &&
      this.dropItems.length <= this.maxDropDowns
    ) {
      let selectedBird =
        dropDownBirdsAvailable[
          getRandomIntInclusive(0, dropDownBirdsAvailable.length - 1)
        ];
      selectedBird.droppedItemPlaced = true;
      this.dropItems.push(
        new DropItem(this, 120, 120, {
          x: selectedBird.position.x,
          y: selectedBird.position.y + 2 * selectedBird.height,
        })
      );
      this.dropSound.Play();
      this.dropItemsTimer = 0;
    }
    this.dropItems.forEach((dropItem) => {
      dropItem.update();
    });
    this.dropItems = this.dropItems.filter(
      (dropItem) => !(dropItem.position.x < -(this.player.position.x + 2000))
    );

    //updating quiz timer

    // if(this.quizTimer>this.quizInterval && !this.gamePaused)
    // {

    //     console.log(this.quizTimer)
    //     let popUp = document.getElementById("popup")
    //     getQuizHtml().then(data=>
    //         {
    //             this.gamePaused=true
    //             popUp.innerHTML = data
    //         })
    //         .catch(err=>console.log(err))
    //         this.quizTimer = 0
    // }
    // this.quizTimer += deltaTime
  }
  draw(context) {
    this.backGround.draw(context);
    this.playerLife.draw(context);
    this.playerProjectile.draw(context);
    //powerUp operation
    // this.powerUps.forEach((powerUp) => powerUp.draw(context));

    // //platform operation
    // this.platforms.forEach((platform) => platform.draw(context));

    //birds
    this.birds.forEach((bird) => bird.draw(context));

    //dropDown Item
    this.dropItems.forEach((dropItem) => dropItem.draw(context));

    //zombies
    this.zombies.forEach((enemy) => enemy.draw(context));

    //projectiles
    this.projectiles.forEach((projectile) => projectile.draw(context));

    this.gameTimer = 0;
    if (this.gameEnd === true) {
      console.log("end");
      this.gamePaused = true;
      context.save();
      context.font = "45px Arial";
      context.fillText(
        "Game Over :(",
        Math.floor(this.width / 2 - 100),
        Math.floor(this.height / 2)
      );
      context.restore();
    }

    //player score
    this.playerScore.draw(context);
    this.player.draw(context);
  }
}

game = new Game(canvas.width, canvas.height);
//animation render
let lastUpdatedTime = 0;
const animate = (timeStamp, userTimeStamp) => {
  if (!(userTimeStamp && userTimeStamp != 0)) controls.timeStamp = timeStamp;
  else controls.timeStamp += 3000;
  let deltaTime =
    userTimeStamp && userTimeStamp != 0
      ? userTimeStamp
      : timeStamp - lastUpdatedTime;
  lastUpdatedTime =
    userTimeStamp && userTimeStamp != 0 ? controls.timeStamp : timeStamp;
  // console.log(timeStamp,deltaTime,lastUpdatedTime)
  if (!game.gamePaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
};
// globalAnimateElement = animate
animate(0, 0);

// })
