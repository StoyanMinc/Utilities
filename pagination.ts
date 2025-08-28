function returnPageArray(current, total) {
    let arr: number[] = [];
    let counter_previous = 0;
    let counter_next = 0;
    for (let pi = current; pi > 0; pi--) {
        if (counter_previous < 5) {
            arr.unshift(pi);
            counter_previous++;
        }
    }
    for (var pi = current + 1; pi < total + 1; pi++) {
        if (counter_next < 5) {
            arr.push(pi);
            counter_next++;
        }
    }
    return arr;
}

