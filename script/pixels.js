// Credit : "Visit me at sweaverD.com!"
// Web : https://codepen.io/sweaver2112/pen/pMPEVN

var svg = document.getElementsByTagName("svg")[0]
var body = document.getElementsByTagName("body")[0]
var g = svg.querySelector("g")
var WIDTH, COLS, ROWS, TOTAL, CENTERX, CENTERY
var gridIsBuilding = false

var activeGrids = []
var currentUUID = 0

function setWindowValues(){
    minFactor = Math.min(svg.clientWidth, svg.clientHeight)
    WIDTH = minFactor > 1200 ? 65 : minFactor > 950 ? 55 : minFactor > 750 ? 45 : 35
    COLS = Math.floor(svg.clientWidth / WIDTH)
    ROWS = Math.floor(svg.clientHeight / WIDTH)
    TOTAL = (COLS + 1) * (ROWS + 1)
    CENTERX = Math.floor(COLS / 2)
    CENTERY = Math.floor(ROWS / 2)
}

var themes = {
    "Raindrops": {
        key: "Raindrops",
        /*see pen details for image credits*/
        base: "rgba(0, 0, 0, 0)",
        solid1: "rgba(50, 50, 50, 0.75)",
        func: rainDrops
    }
}

async function buildGrid(doDelay = true) {
    setWindowValues()
    if(doDelay) await delay(2000)
    let theme = themes["Raindrops"]
    g.innerHTML = ''
    g.style = ''
    g.style.fill = theme.base
    body.className = theme.className || ""

    buildBoxes(theme.base, 15)
    activeGrids = []
    theme.func(currentUUID)
    currentUUID = currentUUID + 1
}

body.onload = () => buildGrid(false)

addEventListener("resize", (event) => {
    buildGrid(false)
});

async function rainDrops(uuid) {

    activeGrids.push(uuid)
    console.log(activeGrids)

    let rain = themes["Raindrops"]
    
    for (let i = 0; i <= COLS; i++) {

        if (Math.random() > 0.2) continue
        let time = (Math.random() * 100) + 100
        colIterator(i, time)
    }
    await delay(2000)
    for (let i = 0; i <= COLS; i++) {
        if (Math.random() > 0.2) continue
        let time = (Math.random() * 100) + 100
        colIterator(i, time)
    }

    async function colIterator(start, time) {
        //iterators gonna iterate
        if(gridIsBuilding) return false;

        if (!activeGrids.includes(uuid)) return false

        for (var pos = 0; pos <= ROWS; pos++) {
            if (pos == ROWS) {
                colIterator(start, time)
            }

            try {
                let target = getTarget(pos, start)
                target.setAttribute("fill", rain.solid1)
                await delay(time)
                target.setAttribute("fill", rain.base)
            } catch (error) {
                return false
            }
        }
    }
}

function buildBoxes(color, gutter) {
    gutter = gutter === undefined ? 1 : gutter
    for (var col = 0; col <= COLS; col++) {
        for (var row = 0; row <= ROWS; row++) {
            let x = WIDTH * col
            let y = WIDTH * row
            drawSquare(row, col, x, y, WIDTH - gutter, WIDTH - gutter, color)
        }
    }
}

function drawSquare(row, col, x, y, w, h, color) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", x)
    rect.setAttribute("y", y)
    rect.setAttribute("row", row)
    rect.setAttribute("col", col)
    rect.setAttribute("width", w)
    rect.setAttribute("height", h)
    g.appendChild(rect)

}

function getTarget(row, col) {
    return document.querySelector(`rect[col='${col}'][row='${row}']`)
}

function delay(ms) {
    return new Promise(done => setTimeout(() => {
        done()
    }, ms))
}