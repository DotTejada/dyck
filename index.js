function dinv(v) {
    let count = 0;
    for (let i = 0; i < v?.length - 1; i++) {
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
    return v?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#121212";
    let cellSize = canvas.width / n;
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

// draws box around the dyck path at (x, y)
function drawBox(ctx, cellSize, inc, x, y) {
    ctx.strokeStyle = "#FF99FF";
    inc += 2;
    x = (x * inc);
    y = (y * inc);
    ctx.beginPath();
    ctx.moveTo(x * cellSize, y * cellSize);
    ctx.lineTo((x + inc) * cellSize, y * cellSize);
    ctx.lineTo((x + inc) * cellSize, (y + inc) * cellSize);
    ctx.lineTo(x * cellSize, (y + inc) * cellSize);
    ctx.lineTo(x * cellSize, y * cellSize);
    ctx.stroke();
}

// draws one (1) dyck path
function drawPath(ctx, gridSize, dyckVec, x, y) {

    let inc = dyckVec?.length;
    let j = 2 + (x * (2 + inc));
    let i = 2 + (y * (2 + inc));

    let cellSize = canvas.width / gridSize;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${cellSize}px serif`;

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
    for (let k = 1; k < dyckVec?.length; k++) {
        if (dyckVec[k] <= dyckVec[k-1]) {
            // go right, then find how many more times
            rightCount += 1;
            ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
            let diff = dyckVec[k-1] - dyckVec[k];
            for (let l = 0; l < diff; l++) {
                // go right repeatedly
                rightCount += 1;
                ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
            }
        }
        // go up
        ctx.fillText(`${dyckVec[k]}`, (j-1) * cellSize, (i + inc - upCount) * cellSize);
        upCount += 1;
        ctx.lineTo((j + rightCount) * cellSize, (i + inc - upCount) * cellSize);
    }
    // complete the top by going right until hits the x = y boundary
    ctx.textBaseline = "middle";
    ctx.textAlign = "start";
    ctx.fillText(`q${dinv(dyckVec)} t${area(dyckVec)}`, j * cellSize, (i + inc - upCount - 1) * cellSize);
    ctx.lineTo((j + inc) * cellSize, i * cellSize);
    ctx.stroke();
}

function drawPaths(ctx, n, vsStart) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    let cellSize = canvas.width / n;
    ctx.font = `${cellSize}px serif`;
    let vi = 0;

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

function arraysEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

function searchByTargetVec(needle, haystack) {
    let hStart = 0;
    let hEnd = haystack.length - 1;
    while (hStart <= hEnd) {
        let searchIndex = Math.floor(hStart + (hEnd - hStart) / 2);
        let candidate = haystack[searchIndex];
        if (arraysEqual(needle, candidate)) {
            return searchIndex;
        }
        for (let i = 0; i < needle.length; i++) {
            if (needle[i] > candidate[i]) {
                hEnd = searchIndex - 1;
                break;
            } else if (needle[i] < candidate[i]) {
                hStart = searchIndex + 1;
                break;
            }
        }
    }
    return -1;
}

function draw(ctx, gridSize, vs, vidx) {

    clear(ctx);
    grid(ctx, gridSize);
    let n = vs[0]?.length;
    let maxPaths = Math.floor(gridSize / (2 + n));
    for (let i = 0; i < maxPaths; i++) {
        for (let j = 0; j < maxPaths; j++) {
            drawPath(ctx, gridSize, vs[vidx], j, i);
            if (vidx < vs.length) { vidx++ } else { break; }
        }
    }
    // area of one dyck path (2 + n) * (2 + n)
    document.getElementById("maxpaths").textContent = `Most paths per page: ${maxPaths * maxPaths}`;
}
