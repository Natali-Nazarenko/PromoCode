let resultButton = document.querySelector('.butNumber');
let clearButton = document.querySelector('.clear_btn');
let result = document.querySelector('.outputResult');


clearButton.onclick = () => {
    result.innerHTML = '';
}

resultButton.onclick = () => {

    let valuePromo = document.querySelector('.inputNumber').value;

    //проверка на валидность вводимого значения--------
    let str = valuePromo.replace(/[0-9]/g, '')
    if (str.length != 0) {
        return alert('PromoCode must have includes only digits!');
    }
    //-------------------------------------------------

    //разбиваем число по эл-ам и записываем в массив
    let additionalValue = +valuePromo;

    let promoArr = [];
    for (i = valuePromo.length - 1; i >= 0; i--) {
        promoArr[i] = additionalValue % 10;
        additionalValue = Math.trunc(additionalValue / 10);
    }
    console.log('promoArr ', promoArr)

    //------------------------------------------------

    let promoArrPairsDraft = [];
    let promoArrPairsFilter = [];

    for (let i = 0; i < promoArr.length - 1; i++) {
        if (((promoArr[i] % 2) != 0) && ((promoArr[i + 1] % 2) != 0)) {//поиск нечетной пары цифр
            //записываем нечетную пару и ее позиции в черновой массив
            promoArrPairsDraft[promoArrPairsDraft.length] = promoArr[i];
            promoArrPairsDraft[promoArrPairsDraft.length] = promoArr[i + 1];
            promoArrPairsDraft[promoArrPairsDraft.length] = i;
            promoArrPairsDraft[promoArrPairsDraft.length] = i + 1;
        }
    }
    console.log('promoArrPairsDraft ', promoArrPairsDraft);
    if (promoArrPairsDraft.length > 4) {//если больше одной пары, подходящей под условие
        //первую пару записываем в отдельный фильтр-массив
        for (let i = 0; i < 4; i++) {
            promoArrPairsFilter[i] = promoArrPairsDraft[i];
        }
        console.log('promoArrPairsFilter ', promoArrPairsFilter);
        for (let i = 0; i < promoArrPairsDraft.length - 4; i = i + 4) {
            //если разность позиций первого числа второй пары и второго числа первой пары больше 1,
            //то мы нашли еще одну пару, отдельностоящую
            if ((promoArrPairsDraft[i + 6] - promoArrPairsDraft[i + 3]) > 1) {
                //дописываем вторую пару в фильтр-массив
                promoArrPairsFilter[promoArrPairsFilter.length] = promoArrPairsDraft[i + 4];
                promoArrPairsFilter[promoArrPairsFilter.length] = promoArrPairsDraft[i + 5];
                promoArrPairsFilter[promoArrPairsFilter.length] = promoArrPairsDraft[i + 6];
                promoArrPairsFilter[promoArrPairsFilter.length] = promoArrPairsDraft[i + 7];
            }
        }
        console.log('promoArrPairsFilter ', promoArrPairsFilter);

        let parityCountBetweenPairs = 0;
        //проверяем наличие четного числа между нечетными парами и увеличиваем счетчик на 1
        for (let i = promoArrPairsFilter[3]; i < promoArrPairsFilter[6]; i++) {
            if ((promoArr[i] % 2) == 0) {
                parityCountBetweenPairs++;
            }
        }
        //проверяем счетчик четных чисел и пары на возростание (две или три пары) 
        if ((parityCountBetweenPairs > 0 && promoArrPairsFilter.length == 12) &&
            (promoArrPairsFilter[1] > promoArrPairsFilter[0]) &&
            (promoArrPairsFilter[5] > promoArrPairsFilter[4]) &&
            (promoArrPairsFilter[9] > promoArrPairsFilter[8])) {
            return result.innerHTML = 'Your bonus 2000';
        } else if ((parityCountBetweenPairs > 0 && promoArrPairsFilter.length == 8) &&
            (promoArrPairsFilter[1] > promoArrPairsFilter[0]) &&
            (promoArrPairsFilter[5] > promoArrPairsFilter[4])) {
            return result.innerHTML = 'Your bonus 2000';
        } else if (parityCountBetweenPairs > 0) {
            return result.innerHTML = 'Your bonus 1000';
        }
    }

    let paritySum = 0;
    let unParitySum = 0;
//если условия первых двух заданий не выполнились,
//то вычисляем суммы четных и нечетных
    for (let i = 0; i < promoArr.length; i++) {
        if ((promoArr[i] % 2) == 0) {
            paritySum += promoArr[i]
        } else {
            unParitySum += promoArr[i];
        }
    }
    console.log('UnParitySum ', unParitySum);
    console.log('ParitySum ', paritySum);

    if (unParitySum < paritySum) {
        return result.innerHTML = 'Your bonus 100';
    } else return result.innerHTML = 'Oops. Your bonus 0';
}
