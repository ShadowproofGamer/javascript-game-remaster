type CanvasRender = (ctx:Object, ...options:[unknown]) => void;
type Hitbox = {top:number, bottom:number, left:number, right:number};
// @ts-ignore
type Keybinds = Map<string, boolean>;

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

export {CanvasRender, Hitbox, Weapon, Obstacle};