let canvas = {
    height:400,
    width:400
}
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
        if ((_pos.py >= _arr[i][TOP] - con && _pos.py <= _arr[i][BOTTOM] + con && _pos.px >= _arr[i][LEFT] - con && _pos.px <= _arr[i][RIGHT] + con) || _pos.py <= con || _pos.py >= canvas.height - con || _pos.px <= con || _pos.px >= canvas.width - con) {
            collision = true;
            break;
        }
    }
    return collision;
}