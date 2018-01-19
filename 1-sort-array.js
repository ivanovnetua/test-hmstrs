// 1) Есть массив цифр по возрастанию [-10,-9,-8,-5,-3,-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30],
// необходимо написать функцию, которая принимает массив и возвращает результат, который выводит все цифры через запятую.
// Однако если цифры идут подряд, то вывести их диапазоном через тире, например 21,22,23,24 => 21-24.

class SortArray {

    constructor(array) {
        this.array = array;
    }

    sortRulles(a, b) {
        if (a > b)
            return 1;
        else if (a < b)
            return -1;
        else
            return 0;
    }

    sortByDesc() {
        let newArray = this.array.concat();
        newArray.sort(this.sortRulles);

        return newArray
    }

    sortByRanges() {
        let sortedDescArray = this.sortByDesc();
        let ranges = [];
        let oldValue = null;
        let currentRangeIndex = null;

        sortedDescArray.forEach((el, i) => {
            if (i == 0) {
                oldValue = el;
                currentRangeIndex = 0;
                ranges.push([el]);
            } else {
                if (el - oldValue == 1) {
                    oldValue = el;
                    ranges[currentRangeIndex].push(el);
                } else {
                    oldValue = el;
                    currentRangeIndex++;
                    ranges.push([el]);
                }
            }
        });

        return ranges
    }

    getsortedArray() {
        let sortedByRanges = this.sortByRanges()
        let result = sortedByRanges.map((el, i) => {
            if (el.length > 1) {
                return `${el[0]}-${el[el.length - 1]}`
            } else {
                return el[0].toString()
            }
        });

        return result.join(',');
    }

}


(function main() {
    const array = [-10, -9, -8, -5, -3, -2, 0, 1, 2, 3, 4, 5, 8, 9, 11, 13, 15, 18, 22, 25, 28, 29, 30];
    const sortObj = new SortArray(array);
    let sortedArray = sortObj.getsortedArray();

    console.log(sortedArray);


})();
