let gridSize = 104;
//let vsStart = [
//    [0,1,2],
//    [0,1,1],
//    [0,0,1],
//    [0,1,0],
//    [0,0,0]
//];
let vsStart = [
    [0],
];
let vs = generateNext(vsStart);
for (let g = 0; g < 12; g++) {
    vs = generateNext(vs);
}
let n = vs[0]?.length;
let maxPaths = Math.floor(gridSize / (2 + n)) | 0;
let maxPages = Math.ceil(vs.length / (maxPaths * maxPaths));

let curPage = 0;
let g = document.getElementById("main");
canvas.width = g.clientWidth;
canvas.height = g.clientWidth;
let ctx = canvas.getContext("2d");
document.addEventListener('keydown', function(event) {
    if (event.key === "d") {
        if (curPage < maxPages - 1) {
            curPage += 1;
        }
    } else if (event.key === "a") {
        if (curPage > 0) {
            curPage -= 1;
        }
    }
    draw(ctx, gridSize, vs, curPage * maxPaths * maxPaths);
    document.getElementById("curpage").textContent = `Page: (${curPage + 1} / ${maxPages})`;
});

const pageBtn = document.getElementById("pageBtn");
pageBtn.addEventListener("click", () => {
    const rawInput = document.getElementById("pageInput").value;
    const targetPage = parseInt(rawInput.trim(), 10);
    if (0 < targetPage && targetPage < maxPages) {
        curPage = targetPage - 1;
        draw(ctx, gridSize, vs, curPage * maxPaths * maxPaths);
        document.getElementById("curpage").textContent = `Page: (${curPage + 1} / ${maxPages})`;
        document.getElementById("pageInfo").textContent = `Jumped to page ${targetPage}`;
    } else {
        document.getElementById("pageInfo").textContent = `Outside page bounds`;
    }
});

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    const rawInput = document.getElementById("searchInput").value;
    const finalArray = rawInput.split(',').map(item => parseInt(item.trim(), 10));
    
    if (finalArray.length == n) {
        let sIndex = searchByTargetVec(finalArray, vs);
        if (sIndex >= 0) {
            // find correct page and position
            curPage = Math.floor(sIndex / (maxPaths * maxPaths));
            let nthPath = sIndex % (maxPaths * maxPaths);
            let nthPathRow = Math.floor(nthPath / maxPaths);
            let nthPathCol = nthPath % maxPaths;

            // change to correct page
            draw(ctx, gridSize, vs, curPage * maxPaths * maxPaths);
            document.getElementById("curpage").textContent = `Page: (${curPage + 1} / ${maxPages})`;

            drawBox(ctx, canvas.width / gridSize, n, nthPathCol, nthPathRow);
            document.getElementById("found").textContent = `Sequence found! :D`;
        } else {
            document.getElementById("found").textContent = `Sequence not found... :P`;
        }
    } else {
        document.getElementById("found").textContent = `Sequence should have ${n} numbers`;
    }
});

draw(ctx, gridSize, vs, 0);
document.getElementById("curpage").textContent = `Page: (${curPage + 1} / ${maxPages})`;
