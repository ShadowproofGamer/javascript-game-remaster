let hitboxObjects;

function hitboxInit(object){
    var _x = hitboxArray.push([object.dy, object.dy + object.sh, object.dx, object.dx + object.sw]);
    hitboxObjects[_x] = object;
}