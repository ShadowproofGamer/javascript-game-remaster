namespace collider {
    var dir = [];

    function checkCollision(doubleLayerArray, weaponPosition, options=0) {

        //_arr- tablica dwuwymiarowa zawierająca wszystkie hitboxy w grze
        //_arr[nr przedmiotu][0=górna granica, 1=dolna, 2=lewa, 3=prawa]
        var _arr = doubleLayerArray;

        // pozycja przedmiotu który może wejść w kolizje
        var _pos = weaponPosition;
        var collision = false;
        const TOP = 0;
        const BOTTOM = 1;
        const LEFT = 2;
        const RIGHT = 3;
        for (var i = 0; i < _arr.length; i++) {
            /*
            sprawdza czy mieczyk nie wleciał w jakiś przedmiot lub nie wyleciał z ekranu
            _pos.dy>_arr[i][0]-mieczyk wlatuje w jakiś przedmiot od góry
            _pos.dy<_arr[i][1]-mieczyk wlatuje w jakiś przedmiot od dołu
            _pos.dx>_arr[i][2]-mieczyk wlatuje w jakiś przedmiot od lewej
            _pos.dx<_arr[i][3]-mieczyk wlatuje w jakiś przedmiot od prawej
            pos.py<=0||pos.py>canvas.height||pos.px<0||pos.px>canvas.width -mieczyk wylatuje z ekranu
            i -numer przedmiotu w tablicy
             */
            if (typeof options != "number") {
                options = 0
            }
            const con = options;
            if ((_pos.py >= _arr[i][TOP] - con && _pos.py <= _arr[i][BOTTOM] + con && _pos.px >= _arr[i][LEFT] - con && _pos.px <= _arr[i][RIGHT] + con) || _pos.py <= 0 + con || _pos.py >= canvas.height - con || _pos.px <= 0 + con || _pos.px >= canvas.width - con) {
                collision = true;
                break;
            }
        }
        return collision;
    }

//wykrywa kolizje bohatera z granicą płótna:
    function heroCollider(hero) {
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
    function heroCollider2(doubleLayerArray, hero, options) {
        heroCollider(hero);
        var TOP = 0;
        var BOTTOM = 1;
        var LEFT = 2;
        var RIGHT = 3;
        var _array = doubleLayerArray;
        var xCollision = [];
        var yCollision = [];

        if (typeof options != "number") {
            options = 0
        }
        var con = options;

        for (var i = 0; i < _array.length; i++) {
            if (hero.dy >= _array[i][TOP] - con && hero.dy <= _array[i][BOTTOM] + con) {
                yCollision[i] = true
            }
            if (hero.dx >= _array[i][LEFT] - con && hero.dx <= _array[i][RIGHT] + con) {
                xCollision[i] = true
            }
            if (yCollision[i] === true && xCollision[i] === true) {
                if (dir[i] === "left") {
                    hero.dx = _array[i][LEFT] - con
                } else if (dir[i] === "right") {
                    hero.dx = _array[i][RIGHT] + con
                } else if (dir[i] === "top") {
                    hero.dy = _array[i][TOP] - con
                } else if (dir[i] === "bottom") {
                    hero.dy = _array[i][BOTTOM] + con
                }
                break;
            } else {
                if (hero.dy <= _array[i][TOP] - con && xCollision[i] === true) {
                    dir[i] = "top"
                } else if (hero.dy >= _array[i][BOTTOM] - con && xCollision[i] === true) {
                    dir[i] = "bottom"
                } else if (hero.dx <= _array[i][LEFT] - con && yCollision[i] === true) {
                    dir[i] = "left"
                } else if (hero.dx >= _array[i][RIGHT] - con && yCollision[i] === true) {
                    dir[i] = "right"
                }
            }
        }
    }
}

export {collider}
