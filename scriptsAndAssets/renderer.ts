var tOrig = Date.now();
var animsDone = 0;
var t = Date.now()-tOrig;
var renderHook;
var currentLength = 0;
var preMove = false;

function repaint(){
    //t = Date.now() - tOrig;
    //animsDone++;
    var ctx = canvas.getContext('2d');
    var weapon = sword;
    var hero = sword;

    //czyszczenie płótna:
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    heroRenderer(hero, ctx);

    heroCollider2(hitboxArray, hero, 11);

    showHitbox(hitboxArray, ctx);
    if(shotLaunched === false){
        //pobiera dane żeby poprawnie obsłużyć ewentualny strzał:
        pos = {
            dx:weapon.dx,
            dy:weapon.dy,
            px:weapon.dx,
            py:weapon.dy,
            rotation:weapon.rotation
        };
        weaponRenderer(weapon, ctx);
    }
    if(shotLaunched === true){
        ctx.save();
        //ustala położenie x i y broni
        pos.py = pos.dy+Math.cos(((pos.rotation+180)/180)*Math.PI)*currentLength;
        pos.px = pos.dx+Math.sin((pos.rotation/180)*Math.PI)*currentLength;
        weaponRenderer(weapon, ctx, pos);
        ctx.restore();
        //test collidera:
        //console.log(checkCollision(hitboxArray, pos));
        var collided = checkCollision(hitboxArray, pos, 10);

        if(collided === false){
            currentLength += 7;
            if (currentLength>=300){currentLength=300; collided = true}
            //test currentLength:
            //console.log(currentLength);
        }
        //ustala czy broń jest dostatecznie blisko gracza
        if(collided === true){
            if(Math.abs(pos.py-sword.dy) <= 20){
                if(Math.abs(pos.px-sword.dx) <= 20){
                    /* ![testowe] stos wywołań do kontroli pozycji podnoszącego broń bohatera, do pozycji broni:
                    console.log("sdx: "+sword.dx);
                    console.log("sdy: "+sword.dy);
                    console.log("dx: "+pos.dx);
                    console.log("dy: "+pos.dy);
                    console.log("px: "+pos.px);
                    console.log("py: "+pos.py);
                     */
                    //powoduje powrót broni do ręki właściciela:
                    shotLaunched = false;
                    currentLength=0;
                }
            }
        }

    }



    // [!testowe] wypisuje watrość t i animsDone
    //console.log("czas: "+t+ " liczba animacji: "+ animsDone);
    renderHook = requestAnimationFrame(arguments.callee);
    if(keysPressed[80]){cancelAnimationFrame(renderHook)}
}



//rysuje koło (bohatera):
function heroRenderer(hero, ctx, fill, stroke){
    ctx.fillStyle = fill || "orange";
    ctx.strokeStyle = stroke || "black";
    ctx.arc(hero.dx,hero.dy,12,0,360,false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hero.dx,hero.dy,300,0,360,false);
    ctx.stroke();
}
//dla testów kotwiczki mieczyka
function testPoint(cords, ctx, fill){
    ctx.beginPath();
    ctx.fillStyle = fill || "red";
    ctx.arc(cords.dx, cords.dy,2,0,360,false);
    ctx.fill();
    ctx.stroke();
}
//rysuje mieczyk u gracza z właściwym obrotem:
function weaponRenderer(weapon, ctx, trans){
    if(!trans){
        trans = weapon;
        trans.px = weapon.dx;
        trans.py = weapon.dy;
    }
    ctx.save();
    ctx.translate(trans.px, trans.py);
    ctx.rotate((trans.rotation/180)*Math.PI);
    ctx.drawImage(weapon.object,weapon.sx,weapon.sy,weapon.sw,weapon.sh,0-(weapon.sw/2),0-weapon.sh,weapon.sw,weapon.sh);
    ctx.restore();
}
//function objectRenderer(){}
//pokazuje hitboxy:
function showHitbox(hitboxArray, ctx){
    var _hit = hitboxArray;
    //console.log(_hit);
    for(var i=0;i<_hit.length;i++){
        var x = _hit[i][2];
        var y = _hit[i][0];
        var width = _hit[i][3] - _hit[i][2];
        var height = _hit[i][1] - _hit[i][0];
        //renderuje hitbox na płótnie:
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, width, height);
        ctx.fill();
    }
}