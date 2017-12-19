---
layout: post
title:  "js的10种排序算法"
categories: 排序 算法
tags: 排序 算法 JavaScript
author: Beats0
mathjax: true
---

* content
{:toc}

 - 时间复杂度指的是一个算法执行所耗费的时间
 - 空间复杂度指运行完一个程序所需内存的大小
 - 稳定指，如果a=b,a在b的前面，排序后a仍然在b的前面
 - 不稳定指，如果a=b，a在b的前面，排序后可能会交换位置






| 排序算法 | 平均时间复杂度  | 最好情况  | 最坏情况  | 空间复杂度 |  排序方式 |  稳定性  |
|:---------|:--------------|:----------|:---------|:----------|:---------|:---------|
| 冒泡排序 | $$O{(n^2)}$$   |$$O{(n)}$$ |$$O{(a^2)}$$|$$O(1)$$ | In-place |稳定 |
| 选择排序 | $$O{(a^2)}$$   |$$O{(a^2)}$$|$$O{(a^2)}$$|$$O(1)$$ | In-place|不稳定 |
| 插入排序 |$$O{(a^2)}$$    |$$O{(n)}$$ |$$O{(a^2)}$$|$$O(1)$$  | In-place|稳定 |
| 希尔排序 |$$O{(a \log n)}$$|$$O{(a \log_2 n)}$$|$$O{(a \log_2 n)}$$|$$O(1)$$  | In-place|不稳定 |
| 归并排序 |$$O{(a \log n)}$$|$$O{(a \log n)}$$|$$O{(a \log n)}$$|$$O(1)$$  | Out-place|稳定 |
| 快速排序 |$$O{(a \log n)}$$|$$O{(a \log n)}$$|$$O{(n^2)}$$|$$O{(\log n)}$$ | In-place|不稳定 |
| 堆栈排序 |$$O{(a \log n)}$$|$$O{(a \log n)}$$|$$O{(a \log n)}$$|$$O(1)$$ | In-place|不稳定 |
| 计数排序 |$$O{(n+k)}$$|$$O{(n+k)}$$|$$O{(n+k)}$$|$$O(k)$$ | Out-place|稳定 |
| 桶排序 |$$O{(n+k)}$$|$$O{(n+k)}$$| $$O{(n^2)}$$|$$O{(n+k)}$$| Out-place|稳定 |
| 基数排序 |$$O{(n * k)}$$|$$O{(n * k)}$$| $$O{(n * k)}$$|$$O{(n+k)}$$| Out-place|稳定 |

##### 冒泡排序
依次比较相邻的两个值，如果后面的比前面的小，则将小的元素排到前面。依照这个规则进行多次并且递减的迭代，直到顺序正确。

```js
 function sortArr(arr) {
        for (i = 0; i < arr.length - 1; i++) {
            for (j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    var exampleArr = [8, 94, 15, 88, 55, 76, 21, 39];
    console.log("Before:"+exampleArr);      //Before:8,94,15,88,55,76,21,39
    sortArr(exampleArr);
    console.log("After:"+exampleArr);       //After:8,15,21,39,55,76,88,94
```
当i=0的时候，里面的循环完整执行，从j=0执行到j=6,这也就是第一遍排序，结果是将最大的数排到了最后，这一遍循环结束后的结果应该是[8,15,88,55,76,21,39,94]<br>
当i=1的时候，里面的循环再次完整执行，由于最大的数已经在最后了，没有必要去比较数组的最后两项，这也是j<arr.length-1-i的巧妙之处，结果是[8,15,55,76,21,39,88,94]<br>
那么每次将剩下数组里面最大的一个数排到最后面，当第一个循环执行到最后的时候，也就是i=6,此时，j=0,只需要比较数组的第一和第二项，比较完毕，返回。<br>

##### Demo

[twobin/twobinSort 常见排序算法(JS版)](https://github.com/twobin/twobinSort)

[Sort Demo](https://beats0.github.io/Demo/Sort/)

##### 冒泡排序(Bubble Sort)
作为最简单的排序算法之一，它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。所以数量越大速度越慢，冒泡排序还有一种优化算法，就是立一个flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。但这种改进对于提升性能来说并没有什么太大作用。
```js
        Array.prototype.bubbleSort = function() {
            for (var i = this.length - 1; i > 0; --i)
            {
                for (var j = 0; j < i; ++j)
                    if (this[j] > this[j + 1])
                        this.swap(j, j + 1);
            }
        }
```
##### 选择排序(Selection Sort)
是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小(或最大)的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。 选择排序是不稳定的排序方法(比如序列 `[5， 5， 3]` 第一次就将第一个 `[5] `与` [3] `交换，导致第一个5挪动到第二个5后面)。
```js
        Array.prototype.selectionSort = function() {
            for (var i = 0; i < this.length; ++i)
            {
                var index = i;
                for (var j = i + 1; j < this.length; ++j)
                {
                    if (this[j] < this[index])
                        index = j;
                }
                this.swap(i, index);
            }
        }
```

##### 插入排序(Insertion Sort)
插入排序的基本思想是：每步将一个待排序的记录，按其关键码值的大小插入前面已经排序的文件中适当位置上，直到全部插入完为止。在时间复杂度上表现最稳定的排序算法之一，因为无论什么数据进去都是O(n²)的时间复杂度。也有一种优化算法，叫做`折半插入排序`:不断的依次将元素插入前面已排好序的序列中。由于前半部分为已排好序的数列，这样我们不用按顺序依次寻找插入点，可以采用折半查找的方法来加快寻找插入点的速度。
```js
        Array.prototype.insertionSort = function() {
            for (var i = 1; i < this.length; ++i)
            {
                var j = i,
                    value = this[i];
                while (j > 0 && this[j - 1] > value)
                {
                    this[j] = this[j - 1];
                    --j;
                }
                this[j] = value;
            }
        }
```
##### 希尔排序(>>位运算)(Shell Sort)
希尔排序(Shell Sort)是插入排序的一种。也称缩小增量排序，是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法。把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。
```js
        Array.prototype.shellSort = function() {
            for (var step = this.length >> 1; step > 0; step >>= 1)
            {
                //alert(step >>= 1);
                for (var i = 0; i < step; ++i)
                {
                    for (var j = i + step; j < this.length; j += step)
                    {
                        var k = j, value = this[j];
                        while (k >= step && this[k - step] > value)
                        {
                            this[k] = this[k - step];
                            k -= step;
                        }
                        this[k] = value;
                    }
                }
            }
        }
```
##### 递归快速排序(quick Sort)
递归算法是把问题转化为规模缩小了的同类问题的子问题。然后递归调用函数(或过程)来表示问题的解。一个过程(或函数)直接或间接调用自己本身,这种过程(或函数)叫递归过程(或函数)
```js
        Array.prototype.quickSort = function(s, e) {
            if (s == null)
                s = 0;
            if (e == null)
                e = this.length - 1;
            if (s >= e)
                return;
            this.swap((s + e) >> 1, e);
            var index = s - 1;
            for (var i = s; i <= e; ++i)
                if (this[i] <= this[e]) this.swap(i, ++index);
            this.quickSort(s, index - 1);
            this.quickSort(index + 1, e);
        }
```
##### 堆栈快速排序(Heap Sort)

```js
        Array.prototype.stackQuickSort = function() {
            var stack = [0, this.length - 1];
            while (stack.length > 0)
            {
                var e = stack.pop(), s = stack.pop();
                if (s >= e)
                    continue;
                this.swap((s + e) >> 1, e);
                var index = s - 1;
                for (var i = s; i <= e; ++i)
                {
                    if (this[i] <= this[e])
                        this.swap(i, ++index);
                }
                stack.push(s, index - 1, index + 1, e);
            }
        }
```
##### 归并排序(Merge Sort)
作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

 - 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第2种方法）
 - 自下而上的迭代
注意:JavaScript没有对递归进行优化。运用递归函数不仅没有运行速度上的优势，还可能造成程序运行失败。因此不建议使用递归。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是`O(n log n)`的时间复杂度。代价是需要额外的内存空间。
```js
        Array.prototype.mergeSort = function(s, e, b) {
            if (s == null)
                s = 0;
            if (e == null)
                e = this.length - 1;
            if (b == null)
                b = new Array(this.length);
            if (s >= e)
                return;
            var m = (s + e) >> 1;
            this.mergeSort(s, m, b);
            this.mergeSort(m + 1, e, b);
            for (var i = s, j = s, k = m + 1; i <= e; ++i)
                b[i] = this[(k > e || j <= m && this[j] < this[k]) ? j++ : k++];
            for (var i = s; i <= e; ++i)
                this[i] = b[i];
        }
```
##### 堆排序(heapSort)
堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：
 - 大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列
 - 小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列
```js
        Array.prototype.heapSort = function() {
            for (var i = 1; i < this.length; ++i)
            {
                for (var j = i, k = (j - 1) >> 1; k >= 0; j = k, k = (k - 1) >> 1)
                {
                    if (this[k] >= this[j])
                        break;
                    this.swap(j, k);
                }
            }
            for (var i = this.length - 1; i > 0; --i)
            {
                this.swap(0, i);
                for (var j = 0, k = (j + 1) << 1; k <= i; j = k, k = (k + 1) << 1)
                {
                    if (k == i || this[k] < this[k - 1])
                        --k;
                    if (this[k] <= this[j])
                        break;
                    this.swap(j, k);
                }
            }
        }
```

##### 计数排序(Counting Sort)
计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
```js
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}
```


##### 桶排序(Bucket Sort)
桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。

 - 在额外空间充足的情况下，尽量增大桶的数量
 - 使用的映射函数能够将输入的N个数据均匀的分配到K个桶中
```js
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                //输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                //输入数据的最大值
      }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            //设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      //对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}
```

##### 基数排序(Radix Sort)
基数排序有两种方法：
 - MSD 从高位开始进行排序
 - LSD 从低位开始进行排序
```js
//LSD Radix Sort
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```
##### 基数排序 vs 计数排序 vs 桶排序
这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

 - 基数排序：根据键值的每位数字来分配桶
 - 计数排序：每个桶只存储单一键值
 - 桶排序：每个桶存储一定范围的数值

##### 生成随机数
```js
        function generate() {
            var max = parseInt(txtMax.value),
                count = parseInt(txtCount.value);
            if (isNaN(max) || isNaN(count))
            {
                alert("随机数个数和最大值必须是整数");
                return;
            }
            var array = [];
            for (var i = 0; i < count; ++i)
                array.push(Math.round(Math.random() * max));
            txtInput.value = array.join(",");
            txtOutput.value = "";
        }
```
##### 返回排序时间
```js
        function sortAlgorithm(type) {
            var timer=0;
            var array = txtInput.value == "" ? [] : txtInput.value.replace().split(",");
            for (var i = 0; i < array.length; ++i)
                array[i] = parseInt(array[i]);
            var t1 = new Date();
            //eval() 函数可计算某个字符串，并执行其中的的JavaScript代码
            eval("array." + type + "Sort()");
            var t2 = new Date();
            timer= t2.valueOf() - t1.valueOf();
            txtOutput.value = array.join(",");
            return timer;
        }
```
## 运行结果
 ![Sort](https://ws1.sinaimg.cn/large/006nOlwNgy1fmme5jjjjtj30hk0bogm2.jpg)

## 参考

 - [twobin/twobinSort](https://github.com/twobin/twobinSort)
 - [杜少博客](https://www.cnblogs.com/dushao/p/6004883.html)
