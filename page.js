let g = document.getElementById("main");
canvas.width = g.clientWidth;
canvas.height = g.clientWidth;
let ctx = canvas.getContext("2d");

let state = {
    n: 10,
    gridSize: 104,
    vsStart: [[0]],
    vs: [[]],
    maxPaths: 0,
    maxPathsSquare: 0,
    maxPages: 0,
    curPage: 0,
}

state.vs = state.vsStart;
for (let g = 0; g < state.n - 1; g++) {
    state.vs = generateNext(state.vs);
}
state.maxPaths =  Math.floor(state.gridSize / (2 + state.n));
state.maxPathsSquare = state.maxPaths * state.maxPaths;
state.maxPages = Math.ceil(state.vs.length / (state.maxPathsSquare));

document.addEventListener('keydown', function(event) {
    if (event.key === "d") {
        if (state.curPage < state.maxPages - 1) {
            state.curPage += 1;
        }
    } else if (event.key === "a") {
        if (state.curPage > 0) {
            state.curPage -= 1;
        }
    }
    draw(ctx, state.gridSize, state.vs, state.curPage * state.maxPathsSquare);
    document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;
});

document.getElementById("pageBtn").addEventListener("click", () => {
    const rawInput = document.getElementById("pageInput").value;
    const targetPage = parseInt(rawInput.trim(), 10);
    if (0 < targetPage && targetPage < state.maxPages) {
        state.curPage = targetPage - 1;
        draw(ctx, state.gridSize, state.vs, state.curPage * state.maxPathsSquare);
        document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;
        document.getElementById("pageInfo").textContent = `Jumped to page ${targetPage}`;
    } else {
        document.getElementById("pageInfo").textContent = `Outside page bounds`;
    }
});

document.getElementById("searchBtn").addEventListener("click", () => {
    const rawInput = document.getElementById("searchInput").value;
    const finalArray = rawInput.split(',').map(item => parseInt(item.trim(), 10));
    
    if (finalArray.length == state.n) {
        let sIndex = searchByTargetVec(finalArray, state.vs);
        if (sIndex >= 0) {
            // find correct page and position
            state.curPage = Math.floor(sIndex / (state.maxPathsSquare));
            let nthPath = sIndex % (state.maxPathsSquare);
            let nthPathRow = Math.floor(nthPath / state.maxPaths);
            let nthPathCol = nthPath % state.maxPaths;

            // change to correct page
            draw(ctx, state.gridSize, state.vs, state.curPage * state.maxPathsSquare);
            document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;

            drawBox(ctx, canvas.width / state.gridSize, state.n, nthPathCol, nthPathRow);
            document.getElementById("searchInfo").textContent = `Sequence found! :D`;
        } else {
            document.getElementById("searchInfo").textContent = `Sequence not found... :P`;
        }
    } else {
        document.getElementById("searchInfo").textContent = `Sequence should have ${state.n} numbers`;
    }
});

document.getElementById("nBtn").addEventListener("click", () => {
    const rawInput = document.getElementById("nInput").value;
    const newN = parseInt(rawInput.trim(), 10);

    if (newN != state.n) {
        state = updateStateN(state, newN);
    }
    draw(ctx, state.gridSize, state.vs, 0);
    document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;
    document.getElementById("nInfo").textContent = `n = ${state.n}`;
});

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = g.clientWidth;
        canvas.height = g.clientWidth;
        draw(ctx, state.gridSize, state.vs, 0);
        document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;
        document.getElementById("nInfo").textContent = `n = ${state.n}`;
    }, 200);
});

draw(ctx, state.gridSize, state.vs, 0);
document.getElementById("curpage").textContent = `Page: (${state.curPage + 1} / ${state.maxPages})`;
document.getElementById("nInfo").textContent = `n = ${state.n}`;
