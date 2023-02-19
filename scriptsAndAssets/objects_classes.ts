type CanvasRender = (ctx:Object, ...options:[unknown]) => void;
type Hitbox = {top:number, bottom:number, left:number, right:number};//[top, bottom, left, right]
class Weapon {
    src:string | CanvasRender;
    sourceCoordinates:{sx:number, sy:number, sw:number, sh:number};
    position:{dx:number, dy:number, rotation:number};

}
class Obstacle {
    src:string | CanvasRender;
    sourceCoordinates:{sx:number|null, sy:number|null, sw:number, sh:number};
    position:{dx:number, dy:number, rotation:number};
    hitbox:Hitbox;
}

