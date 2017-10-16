var arr = [1, 2, 3, 4, 5, 6];
console.time("ruduce");
Array.prototype.ruduceSum = function () {
    for (var i = 0; i < 10000; i++) {
        return this.reduce(function (preValue, curValue) {
            return preValue + curValue;
        });
    }
}
arr.ruduceSum();
console.log('最终的值：' + arr.ruduceSum()); // 21 console.timeEnd("ruduce"); // 0.417ms