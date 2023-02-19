class collider {
    dir = [];

    checkCollision(doubleLayerArray: Hitbox[], weaponPosition: any, options=0) {

        //_arr- tablica dwuwymiarowa zawierająca wszystkie hitboxy w grze
        //_arr[nr przedmiotu][0=górna granica, 1=dolna, 2=lewa, 3=prawa]
        let _arr = doubleLayerArray;

        // pozycja przedmiotu który może wejść w kolizje
        let _pos = weaponPosition;
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
            if (typeof options != "number") {
                options = 0
            }
            const con = options;
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
    heroCollider(hero) {
        if (hero.dy < 12) {
            hero.dy = 12
        }
        if (hero.dx < 12) {
            hero.dx = 12
        }
        if (hero.dy > canvas.height - 12) {
            hero.dy = canvas.height - 12
        }
        if (hero.dx > canvas.width - 12) {
            hero.dx = canvas.width - 12
        }
    }

//wykrywa kolizję dowolnej postaci z dowolnym hitboxem:
    heroCollider2(doubleLayerArray:Hitbox[], hero, options) {
        this.heroCollider(hero);
        var _array = doubleLayerArray;
        var xCollision = [];
        var yCollision = [];

        if (typeof options != "number") {
            options = 0
        }
        var con = options;

        for (let i = 0; i < _array.length; i++) {
            if (hero.dy >= _array[i].top - con && hero.dy <= _array[i].bottom + con) {
                yCollision[i] = true
            }
            if (hero.dx >= _array[i].left - con && hero.dx <= _array[i].right + con) {
                xCollision[i] = true
            }
            if (yCollision[i] === true && xCollision[i] === true) {
                if ((this.dir)[i] === "left") {
                    hero.dx = _array[i].left - con
                } else if ((this.dir)[i] === "right") {
                    hero.dx = _array[i].right + con
                } else if ((this.dir)[i] === "top") {
                    hero.dy = _array[i].top - con
                } else if ((this.dir)[i] === "bottom") {
                    hero.dy = _array[i].bottom + con
                }
                break;
            } else {
                if (hero.dy <= _array[i].top - con && xCollision[i] === true) {
                    (this.dir)[i] = "top"
                } else if (hero.dy >= _array[i].bottom - con && xCollision[i] === true) {
                    (this.dir)[i] = "bottom"
                } else if (hero.dx <= _array[i].left - con && yCollision[i] === true) {
                    (this.dir)[i] = "left"
                } else if (hero.dx >= _array[i].right - con && yCollision[i] === true) {
                    (this.dir)[i] = "right"
                }
            }
        }
    }
}

export {collider}
