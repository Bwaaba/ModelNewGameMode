var Konva = require('konva');
var stage = new Konva.Stage({
    container: 'responsive-canvas',
    width:screen.width,
    height:100
  });

var layer = new Konva.Layer();
var recwitharrow = 200;
var recheightarrow = 100;
var rightnosearrow = 40;
var leftnosearrow = 40;
var decstage = -125; // le canvas ne commence pas au point  0,0 de la fenêtre on ceci permet d'avoir x = 0 = x' -125  


var complexText = makecomplextype(decstage+recwitharrow/2,30,"Rules",25,'black',300);

var  complexText2 = makecomplextype(recwitharrow*1.5+decstage,30,"Graphics",25,'black',300);

var complexText3 = makecomplextype(recwitharrow*2.5+decstage,30,"Operators",25,'black',300);

var complexText4 = makecomplextype(recwitharrow*3.5+decstage,30,"Custom",25,'black',300);


// permet juste de mettre dans le canvas du texte
function makecomplextype(px,py,txt,fsize,color,w){

    return new Konva.Text({
              x: px,
              y: py,
              text:
                txt,
              fontSize: fsize,
              fontFamily: 'Calibri',
              fill: color,
              width: w,
              padding: 20,
              align: 'center'
            });
  }


  function makeArrow(tabpoints,color,borderColor,sizeBorder){
    return new Konva.Line({
  points: tabpoints,
  fill: color,
  stroke: borderColor,
  strokeWidth:sizeBorder,
  closed: true,
  tension: 0.0
});
}