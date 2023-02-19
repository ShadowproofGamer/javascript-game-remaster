// @ts-ignore
let keysPressed:Keybinds = new Map<string, boolean>();

function init() {
    canvas = initFullScreenCanvas("mainCanvas");
    imageManager = new ImageManager("assets/boss_bee.png");
    imageManager.load(FilesToLoad, onLoaded, onProgress);
    initListeners();
    heroMove();

}

function onProgress(loaded, total, key, path, success) {
    if (success) {
        // Pasek postępu
        console.log("wczytano " + loaded + " z " + total + " obrazków");
        console.log(key+" : "+path);
    } else {
        // Obsługa błędów
        console.log("BŁĄD: nie wczytano obrazka " + path);
    }
}
function onLoaded() {
    console.log("Załadowano wszystkie obrazki");
    dungeon = imageManager.get("dungeon");
    epicweapon = imageManager.get("epicweapon");
    fantasyweapon = imageManager.get("fantasyweapon");
    sword.object = dungeon;
    repaint(canvas);
}


function initFullScreenCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    canvas.width  = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}





var initListeners = function(){
    addEventListener("keydown", function(e:KeyboardEvent){
        keysPressed.set(e.key, true);
        //console.log(e.which);
        //console.log(sword.rotation);
    });
    addEventListener("keyup", function(e:KeyboardEvent){
        keysPressed.set(e.key, false);
    });
}
type keyBinds = { top:string, bottom:string, left:string, right:string, rotLeft:string, rotRight:string, fire:string, other?:string[] }
var heroMove = function(
    controls:keyBinds = {
    top:"ArrowUp", bottom:"ArrowDown", left:"ArrowLeft", right:"ArrowRight", rotLeft:"q", rotRight:"e", fire:" "
}){
    if(keysPressed.get(controls.left)){sword.dx -= 2}
    if(keysPressed.get(controls.top)){sword.dy -= 2}
    if(keysPressed.get(controls.right)){sword.dx += 2}
    if(keysPressed.get(controls.bottom)){sword.dy += 2}
    if(keysPressed.get(controls.rotLeft)){sword.rotation -= 6}
    if(keysPressed.get(controls.rotRight)){sword.rotation += 6}
    if(keysPressed.get(controls.fire)){shotLaunched=true}
    //if(keysPressed.get(controls.pause)){repaint(canvas)}
    requestAnimationFrame(<FrameRequestCallback>arguments.callee);

}