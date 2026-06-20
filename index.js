function dinv(v) {
    let count = 0;
    for (let i = 0; i < v.length - 1; i++) {
        for (let j = i + 1; j < v.length; j++) {
            let diff = v[i] - v[j];
            if (diff == 0 || diff == 1) {
                count += 1;
            }
        }
    }
    return count;
}

function area(v) {
    return v.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function generateNext(vs) {
    let vsNext = [];
    for (let i = 0; i < vs.length; i++) {
        let v = vs[i];
        let last = v[v.length-1] + 1;
        for (let j = last; j >= 0; j--) {
            v.push(j);
            vsNext.push([...v]);
            v.pop();
        }
    }
    return vsNext;
}

function clear(ctx) {
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function grid(ctx, n) {
    let cellSize = canvas.width / n;
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

function drawPaths(ctx, n, vsStart) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    let cellSize = canvas.width / n;
    ctx.font = `${cellSize}px serif`;
    let vi = 0;

    //let vecTest = [[0]]
    //console.time("gen")
    //let vec = generateNext(vecTest)
    //for (let g = 0; g < 13; g++) {
    //    vec = generateNext(vec)
    //}
    //console.timeEnd("gen")
    //console.log(vec)

    let vs = generateNext(vsStart);
    for (let g = 0; g < 2; g++) {
        vs = generateNext(vs);
    }
    console.log(`n = ${vs[0].length}\nCn = ${vs.length}`);
    let inc = vs[0].length;
    outer: for (let i = 2; i <= n; i += inc + 2) {
        for (let j = 2; j < n; j += inc + 2) {
            // draw x = y boundary
            ctx.beginPath();
            ctx.moveTo(j * cellSize, (i + inc) * cellSize);
            ctx.lineTo((j + inc) * cellSize, i * cellSize);
            // draw unique path
            ctx.moveTo(j * cellSize, (i + inc) * cellSize);
            ctx.lineTo(j * cellSize, (i + inc - 1) * cellSize);
            let upCount = 1;
            let rightCount = 0;
            ctx.textBaseline = "alphabetic";
            ctx.textAlign = "center";
            ctx.fillText("0", (j-1) * cellSize, (i + inc) * cellSize);
            for (let k = 1; k < vs[vi].length; k++) {
                if (vs[vi][k] <= vs[vi][k-1]) {
                    // go right, then find how many more times
                    rightCount += 1;
                    ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
                    let diff = vs[vi][k-1] - vs[vi][k];
                    for (let l = 0; l < diff; l++) {
                        // go right repeatedly
                        rightCount += 1;
                        ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
                    }
                }
                // go up
                ctx.textBaseline = "alphabetic";
                ctx.textAlign = "center";
                ctx.fillText(`${vs[vi][k]}`, (j-1) * cellSize, (i + inc - upCount) * cellSize);
                upCount += 1;
                ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
            }
            // complete the top by going right until hits the x = y boundary
            ctx.textBaseline = "middle";
            ctx.textAlign = "start";
            ctx.fillText(`q${dinv(vs[vi])} t${area(vs[vi])}`, j * cellSize, (i + inc - upCount - 1) * cellSize);
            ctx.lineTo((j + inc) * cellSize, i * cellSize);
            ctx.stroke();
            if (vi < vs.length - 1) { vi += 1; } else { break outer; }
        }
    }
}

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    var ctx = canvas.getContext("2d");

    let vsStart = [
        [0,1,2],
        [0,1,1],
        [0,0,1],
        [0,1,0],
        [0,0,0]
    ];
    let gridSize = 104;

    clear(ctx);
    grid(ctx, gridSize);
    drawPaths(ctx, gridSize, vsStart);
}

draw();
