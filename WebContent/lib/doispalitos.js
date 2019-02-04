let tampa, caixa, fosforo, fosforosSprite = [], papel, papelOffset = 0, fosforoAnim = [], animx = 0, animy = 0, last; 
let fogo = [], fogoc = 0;
let contos;
let offset = 0, offsetinc = 0, angle = 0;
let fosforos = [], selecionado;
let noaction, start;
let step = [], frameCount = 0;
let fade = 0, exitOffset = 0;

function preload () {
  contos = loadJSON('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/doispalitos.json')
  TypeRaTitle = loadFont('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/fonts/3_Type-Ra.ttf')
  TypeRaText = loadFont('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/fonts/5_Type-Ra.ttf')
}

function setup () {
  let canvas = createCanvas(windowWidth, windowHeight)
  frameRate(30)
  angleMode(DEGREES)
  canvas.parent('canvas')
  tampa = loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/images/tampa.png')
  caixa = loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/images/caixa.png')
  papel = loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/images/papel.png')
  for (let index = 19; index < 25; index++) {
    fogo.push(loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/images/fogo/'+index+'.png'))
  }
  for (let index = 23; index < 93; index+=3) {
    fosforosSprite.push(loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/images/'+index+'.png'))
  }
  fosforo = fosforosSprite[0]
  for (let index = 0; index < 53; index++) {
    fosforoAnim.push(loadImage('https://raw.githubusercontent.com/pgscasado/gdl-app-static/master/doispalitos/fosforo-anim/resize/frame_'+pad(index,2)+'_delay-0.04s.png'))
  }
  console.log(contos[0])
  console.log(fogo)
  for (let index = 0; index < 20; index++) {
    fosforos.push({
      x: width/2,
      y: Math.floor(Math.random()*(353-235+1)+235),
      conto: contos[index]
    })
  }
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function isClickingOn (box) {
  return  mouseX >= box.x-box.width/2 && 
          mouseX < box.x+box.width/2 &&
          mouseY >= box.y-box.height/2 &&
          mouseY < box.y+box.height/2
}

function mouseClicked () {
  if(!noaction){
    if (isClickingOn({ ...tampa, x: (width/2 - offset), y: height/2 }))
      offsetinc = offset == 0 ? 4 : -4

    if (fosforos.length < 1 && isClickingOn({ ...caixa, x: (width/2 + offset), y: height/2 }))
      offsetinc = offset == 0 ? 4 : -4 
    
    if (offsetinc == 0 && offset >= 59.9)
      fosforos.every((o,idx) => {
        let tmp = { x: o.x, y: o.y, width: fosforo.width*2, height: fosforo.height*2 }
        if (isClickingOn(tmp)) {
          console.log(o)
          selecionado = {...o, x: o.x + offset, initx: o.x + offset, inity: o.y, angle: 0}
          animx = width/2
          animy = height/2+56
          step = []
          fogoc = 0
          last = undefined
          exitOffset = 0
          fade = 0
          frameCount = 0
          fosforos = fosforos.filter((v,i) => i != idx)
          noaction = true
          return false
        }
        return true
      })
  }
  console.log(fosforos)
}

function breakIfHigherThan(max, string){
  if(width/2 - offset + papelOffset+textWidth(string) > max){
    return splitValue(string, string.indexOf(' ', 15)).join('\n')
  }
  return string
}

function splitValue(value, index) {
  return [value.substring(0, index), value.substring(index)];
}

function draw () {
  background(255)
  imageMode(CENTER)
  image(caixa, width/2 + offset, height/2)
  fosforos.forEach((o)=>{
    image(fosforo, o.x + offset, o.y)
  })
  image(papel, width/2 - offset + papelOffset, height/2, caixa.width, caixa.height)
  if(selecionado){
    fill(0)
    textFont(TypeRaTitle)
    text(breakIfHigherThan(width/2+offset+caixa.width/2 ,selecionado.conto.titulo)||'', 
      width/4 - offset + papelOffset + papel.width/5, 
      height/2 - papel.height/3)
    textFont(TypeRaText)
    text(breakIfHigherThan(29 ,selecionado.conto.linha1)||'', 
      width/4 - offset + papelOffset + papel.width/5, 
      height/2 - papel.height/5)
    text(breakIfHigherThan(29 ,selecionado.conto.linha2)||'', 
      width/4 - offset + papelOffset + papel.width/5, 
      height/2)
    text(breakIfHigherThan(29 ,selecionado.conto.linha3)||'', 
      width/4 - offset + papelOffset + papel.width/5, 
      height/2 + papel.height/5)
    if(!step[0] && selecionado.x < selecionado.initx+30){
      selecionado.x += 2
      if(selecionado.x >= selecionado.initx+30)
        step.push('done')
    }
    if(!step[1] && selecionado.x > selecionado.initx+17){
      if(selecionado.angle > -90)
        selecionado.angle -= 2
      selecionado.x += 2
      if(selecionado.y > height/2)
        selecionado.y--
      if(selecionado.y < height/2)
        selecionado.y++
      if(selecionado.angle <= -90)
        step.push('done')
    }
    if(!step[2] && step[1] && frameCount < 53){
      image(fosforoAnim[frameCount], animx, animy, fosforoAnim[0].width, fosforoAnim[0].height+40)
      if(width/2 - offset + papelOffset < caixa.width + offset + 10)
        papelOffset+= 5
      if(frameCount > 36)
        animx+=2
      if(frameCount > 51){
        step.push('done')
        frameCount = 0
      }
      frameCount++
    }
    if(!step[3] && step[2]){
      push()
        translate(width/2-caixa.width/2-offset-15, height/2)
        rotate(-90)
        image(fosforosSprite[frameCount], 0,0)
        tint(255,122-(122*fade))
        image(fogo[fogoc], ((fosforosSprite[0].width/2)/(-1*Math.floor(fosforosSprite.length/frameCount)))+fosforosSprite[0].width/2, 0, fogo[fogoc].width/2, fogo[fogoc].height/2)
      pop()
      fogoc = (fogoc + 1) % fogo.length
      if(frameCount < fosforosSprite.length-1 && (!last || millis()-last > 100)){
        frameCount++
        last = millis()
      }
      if(frameCount >= fosforosSprite.length-1 && fade<1)
        fade+=0.1
      if(fade >= 1){
        step.push('done')
        last = millis()
      }
    }
    if(!step[4] && step[3]){
      if(millis()-last > 3000){
        exitOffset+=5
        if(papelOffset>0)
        papelOffset-=5
      }
      push()
        translate(width/2-caixa.width/2-offset-15, height/2+exitOffset)
        rotate(-90)
        image(fosforosSprite[fosforosSprite.length-1], 0,0)
      pop()
      if((height/2+exitOffset+fosforosSprite[0].width/2) > height)
        step.push('done')
    }
    if(!step[5] && step[4]){
      noaction = false
      step.push('done')
    }
    
    push()
      translate(selecionado.x, selecionado.y)
      rotate(selecionado.angle)
      if(!step[1])
        image(fosforo, 0, 0)
    pop()
  }
  image(tampa, width/2 - offset, height/2)
  offset += offsetinc
  if(offset <= 0.1 || offset >= 59.9)
    offsetinc = 0
}