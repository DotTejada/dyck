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
for (let g = 0; g < 6; g++) {
    vs = generateNext(vs);
}
let n = vs[0]?.length;
let maxPaths = ((gridSize / (2 + n)) | 0);
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

draw(ctx, gridSize, vs, 0);
document.getElementById("curpage").textContent = `Page: (${curPage + 1} / ${maxPages})`;
