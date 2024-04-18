let img;
let vScale;
// Load the imacnvet
let tiles = [];
let board = [];
let col = 20;
let row = 10; // but they are twice as big
//let output;
let cnv;
let lasttouch = 0;
let mix = false;
function preload() {
  img = loadImage("jin2.png");
}

function setup() {
  cnv = createCanvas(800, 840);
  //let cx= windowWidth/2-width/2
  //cnv.position(cx,0)
  cnv.parent("sketch-holder");

  //output = select("#out");
  //output.parent('out')
  img.resize(800, 840);
  vScale = 40; // height will be 2*vScale
  // only need to make list onece
  makelist();

  doit();
}

function doit() {
  let newmap = "Mapping: ";
  if (mix === false) {
    background(55);
    // show simple board
    s2();

    for (let i = 0; i < board.length; i++) {
      newmap += i + " : " + i + " / ";
    }
  } else {
    // shuffle and show board
    background(55);
    shuffle(board, true);
    s3();

    for (let i = 0; i < board.length; i++) {
      newmap += i + " : " + board[i] + " / ";
    }
  }

  //output.html(newmap);
  print(newmap)
}

function makelist() {
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two becassue its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);
      if (x % 2 == 0) {
        let imgpt = img.get(x * vScale, y * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      } else {
        let imgpt = img.get(x * vScale, (y + 1) * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      }
      index++;
    }
  }
}

function s2() {
  // shows the tile index
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two because its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);

      if (x % 2 == 0) {
        image(
          tiles[index].img,
          x * vScale,
          y * vScale,
          vScale - 4,
          vScale * 2 - 4
        );
      } else {
        image(
          tiles[index].img,
          x * vScale,
          (y + 1) * vScale,
          vScale - 4,
          vScale * 2 - 4
        );
      }
      index++;
    }
  }
}

function s3() {
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two because its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);

      let tileIndex = board[index];
      let imgpt = tiles[tileIndex].img;

      if (x % 2 == 0) {
        image(imgpt, x * vScale, y * vScale, vScale - 4, vScale * 2 - 4);
      } else {
        image(imgpt, x * vScale, (y + 1) * vScale, vScale - 4, vScale * 2 - 4);
      }
      index++;
    }
  }
}

function touchStarted() {
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    /// toggle mix
    if (!mix) {
      mix = true;
      doit();
    } else {
      mix = false;
      doit();
    }
  }

  lasttouch = currenttime;
}

function mouseClicked() {
  touchStarted();
}