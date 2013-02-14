var Board;
var xsize = 10;
var ysize = 10;

var dead = 0;
var alive = 1;

function assert(truthity) {
    if (! truthity) {
        debugger;
    }
}

function BoardObj(Board) {
    this.Board = Board;
}
BoardObj.prototype = {
    get: function(x, y) {
        return BoardGet(this.Board, x, y)
    },
    set: function(x, y, val) {
        var coords = NormCoord(this.Board, x, y);
        this.Board[coords[0]][coords[1]] = val;
    }
}

function BoardGet(Board, x, y) {
    // does the wrapping aronud the map stuff
    var coords = NormCoord(Board, x, y);
    var rx = coords[0];
    var ry = coords[1];
    return Board[rx][ry];
}

function NormCoord(Board, x, y) {
    // returns normalized coordinates

    assert(x !== undefined);
    assert(y !== undefined);

    if (x >= xsize || x < 0) {
        x = x % xsize;
        if (x < 0) {
            // modulus in javascript can be negative weirdly
            x = x + xsize;
        }

    }
    if (y >= ysize || y < 0) {
        y = y % ysize;
        if (y < 0) {
            y = y + ysize;
        }
    }
    assert(x >= 0 && x < xsize);
    assert(y >= 0 && y < ysize);
    return [x,y];
}


function Neighbors(BoardO, x, y)
{
    var n = 0
    var ax, ay;
    for(var dx=-1;dx < 1; ++dx) {
	for(var dy=-1;dy < 1; ++dy) {
	    ax = x+dx;
    	    ay = y+dy;
            console.log('neighbor',ax,ay);
    	    if(BoardO.get(ax,ay)==alive) ++n;
        }
    }
    return n;
}

function Kill(BoardO,x,y)
{
    if(BoardO.get(x,y) == alive)
	BoardO.set(x,y,dead);
}

function MakeLive(BoardO,x,y)
{
    if(BoardO.get(x,y) == dead)
	BoardO.set(x,y,alive);
}

function NextStep(BoardO)
{
    for(var x = 0; x <= xsize; ++x) {
	for(var y = 0; y <= ysize; ++y) {
	    n = Neighbors(BoardO,x,y);
	    if(n=3) MakeLive(BoardO,x,y);
	    if((n<2)||(n>3)) Kill(BoardO,x,y);
	}
    }
}

function DrawBoard(BoardO)
{
    var Text = "";
    for(var y = 0; y < ysize; ++y)
    {
	for(var x = 0; x < xsize; ++x)
	    Text += BoardO.get(x,y)==alive ? "o":"_";
	Text += "<br/>";
    }
    document.getElementById("board").innerHTML = Text;
}

function Main()
{
    // *** Change this variable to choose a different baord setup from below
    var BoardSetup = "blinker";
    
    var Board = new Array(xsize);
    for(var x = 0; x < xsize; ++x)
    {
	Board[x] = new Array(ysize);
	for(var y = 0; y < ysize; ++y)
	    Board[x][y] = 0;
    }
    
    if(BoardSetup == "blinker")
    {
	Board[1][0] = 1;
	Board[1][1] = 1;
	Board[1][2] = 1;
    }
    else if(BoardSetup == "glider")
    {
	Board[2][0] = 1;
	Board[2][1] = 1;
	Board[2][2] = 1;
	Board[1][2] = 1;
	Board[0][1] = 1;
    }
    else if(BoardSetup == "flower")
    {
        Board[4][6] = 1;
        Board[5][6] = 1;
        Board[6][6] = 1;
        Board[7][6] = 1;
        Board[8][6] = 1;
        Board[9][6] = 1;
        Board[10][6] = 1;
        Board[4][7] = 1;
        Board[6][7] = 1;
        Board[8][7] = 1;
        Board[10][7] = 1;
        Board[4][8] = 1;
        Board[5][8] = 1;
        Board[6][8] = 1;
        Board[7][8] = 1;
        Board[8][8] = 1;
        Board[9][8] = 1;
        Board[10][8] = 1;
    }

    var BoardO = new BoardObj(Board);
    window.BoardO = BoardO
    DrawBoard(BoardO);
}


function click_next() {
    debugger;
    NextStep(BoardO);
    DrawBoard(BoardO)
}
