function add(n1, n2) {
    return n1 + n2;
}

function run(fn) {
    return fn(2, 3)
}

let result = run(add)
console.log(result);