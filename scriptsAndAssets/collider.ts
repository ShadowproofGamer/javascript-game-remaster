import {CanvasRender, Hitbox, Weapon, Obstacle} from "./objects_classes";

class collider {
    dir = [];
    constructor() {

    }
    public checkCollision(doubleLayerArray: Hitbox[], weaponPosition: any, canvas:HTMLCanvasElement|{height:number, width:number} = {height:144, width:144},  tolerance:number =0 ) {

        //_arr- tablica dwuwymiarowa zawierająca wszystkie hitboxy w grze
        //_arr[nr przedmiotu][0=górna granica, 1=dolna, 2=lewa, 3=prawa]
        let _arr = doubleLayerArray;

        // pozycja przedmiotu który może wejść w kolizje
        const _pos = weaponPosition;
        let collision = false;
        for (let i = 0; i < _arr.length; i++) {
            /*
            sprawdza czy mieczyk nie wleciał w jakiś przedmiot lub nie wyleciał z ekranu
            _pos.dy>_arr[i].top -mieczyk wlatuje w jakiś przedmiot od góry
            _pos.dy<_arr[i].bottom -mieczyk wlatuje w jakiś przedmiot od dołu
            _pos.dx>_arr[i].left -mieczyk wlatuje w jakiś przedmiot od lewej
            _pos.dx<_arr[i].right -mieczyk wlatuje w jakiś przedmiot od prawej
            pos.py<=0||pos.py>canvas.height||pos.px<0||pos.px>canvas.width -mieczyk wylatuje z ekranu
            i -numer przedmiotu w tablicy
             */
            if (typeof tolerance != "number") {
                tolerance = 0
            }
            const con = tolerance;
            if (
                (_pos.py >= _arr[i].top - con && _pos.py <= _arr[i].bottom + con && _pos.px >= _arr[i].left - con && _pos.px <= _arr[i].right + con)
                || _pos.py <= con
                || _pos.py >= canvas.height - con
                || _pos.px <= con
                || _pos.px >= canvas.width - con
            ) {
                collision = true;
                break;
            }
        }
        return collision;
    }

//wykrywa kolizje bohatera z granicą płótna:
    public heroCollider(hero, canvas:HTMLCanvasElement|{height:number, width:number} = {height:144, width:144}, tolerance:number =12) {
        if (hero.dy < tolerance) {
            hero.dy = tolerance
        }
        if (hero.dx < tolerance) {
            hero.dx = tolerance
        }
        if (hero.dy > canvas.height - tolerance) {
            hero.dy = canvas.height - tolerance
        }
        if (hero.dx > canvas.width - tolerance) {
            hero.dx = canvas.width - tolerance
        }
        new HTMLCanvasElement().getContext("2d")
    }

//wykrywa kolizję dowolnej postaci z dowolnym hitboxem:
    public heroCollider2(doubleLayerArray:Hitbox[], hero, tolerance:number =0) {
        this.heroCollider(hero);
        const _array = doubleLayerArray;
        let xCollision = [];
        let yCollision = [];

        for (let i = 0; i < _array.length; i++) {
            if (hero.dy >= _array[i].top - tolerance && hero.dy <= _array[i].bottom + tolerance) {
                yCollision[i] = true
            }
            if (hero.dx >= _array[i].left - tolerance && hero.dx <= _array[i].right + tolerance) {
                xCollision[i] = true
            }
            if (yCollision[i] === true && xCollision[i] === true) {
                if ((this.dir)[i] === "left") {
                    hero.dx = _array[i].left - tolerance
                } else if ((this.dir)[i] === "right") {
                    hero.dx = _array[i].right + tolerance
                } else if ((this.dir)[i] === "top") {
                    hero.dy = _array[i].top - tolerance
                } else if ((this.dir)[i] === "bottom") {
                    hero.dy = _array[i].bottom + tolerance
                }
                break;
            } else {
                if (hero.dy <= _array[i].top - tolerance && xCollision[i] === true) {
                    (this.dir)[i] = "top"
                } else if (hero.dy >= _array[i].bottom - tolerance && xCollision[i] === true) {
                    (this.dir)[i] = "bottom"
                } else if (hero.dx <= _array[i].left - tolerance && yCollision[i] === true) {
                    (this.dir)[i] = "left"
                } else if (hero.dx >= _array[i].right - tolerance && yCollision[i] === true) {
                    (this.dir)[i] = "right"
                }
            }
        }
    }
}

export {collider}
