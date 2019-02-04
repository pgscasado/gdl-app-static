document.body.style.margin = '0px';

let bg, bghd, logo;
let arr;
let deg;
let scl = 1,
    sclinc = 0;
let trsl;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  frameRate(30)
  bg = loadImage('https://i.imgur.com/mO2Z9js.png')
  bghd = loadImage('https://i.imgur.com/p8rQRDO.png')
  logo = loadImage('https://i.imgur.com/rOsAmod.png')
  canvas.parent('canvas')
  rectMode(CENTER)
  imageMode(CENTER)
  ellipseMode(CENTER)
  fill(0,0,0,0)
  trsl = { x: width/2, y: height/2 }
  arr = [
    {x: 279, y: 174 - 20, tx: 40+width/2 - 289, ty: 40+height/2 - 174 + 20},
    {x: 231, y: 160 - 10, tx: 40+width/2 - 238, ty: 40+height/2 - 159 + 20},
    {x: 178, y: 95, tx: 40+width/2 - 175, ty: 40+height/2 - 96 + 20},
    {x: 151, y: 107 - 10, tx: 40+width/2 - 149, ty: 40+height/2 - 103 + 20},
    {x: 85, y: 171 - 20, tx: 40+width/2 - 88, ty: 40+height/2 - 174 + 20},
    {x: 33, y: 330 - 30, tx: 40+width/2 - 46, ty: 40+height/2 - 327 + 20},
    {x: 151, y: 157 - 15, tx: 40+width/2 - 150, ty: 40+height/2 - 157 + 15},
    {x: 145, y: 206 - 20, tx: 40+width/2 - 148, ty: 40+height/2 - 200 + 20},
    {x: 189, y: 245 - 20, tx: 40+width/2 - 190, ty: 40+height/2 - 243 + 20},
    {x: 170, y: 300 - 20, tx: 40+width/2 - 169, ty: 40+height/2 - 301 + 20},
    {x: 223, y: 393 - 25, tx: 40+width/2 - 221, ty: 40+height/2 - 390 + 25},
    {x: 214, y: 454 - 40, tx: 40+width/2 - 218, ty: 40+height/2 - 449 + 40},
    {x: 227 + 20, y: 548, tx: 40+width/2 - 229 - 20, ty: 40+height/2 - 547 + 20}];
}

function mouseClicked() {
  if(scl >= 5.9) 
    sclinc = -.2
  else
  arr.forEach((o, idx) => {
    if(dist(o.x, o.y, mouseX, mouseY) < 20){
      console.log(idx, `, tx: ${mouseX}, ty: ${mouseY}, tx: ${40+width/2 - mouseX}, ty: ${40+height/2 - mouseY}`)
      sclinc = .2
      trsl = { x: o.tx, y: o.ty }
    }
  })
}

function draw() {
  imageMode(CENTER)
  scale(scl)
  translate(trsl.x, trsl.y)
  background(scl >= 1.1 ? bghd : bg)
  imageMode(CORNER)
  image(logo, width*-0.4 , height/2 - logo.height)
  scl += sclinc
  if(scl <= 1.1 || scl >= 5.9)
    sclinc = 0

  if(scl <= 1)
    trsl = { x: width/2, y: height/2 }
}