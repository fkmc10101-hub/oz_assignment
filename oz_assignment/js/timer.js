//setTimeout
//일정 시간이 지나면, 어떤 함수를 실행할 수 있게 함수

//(함수, timeout 시간)
// setTimeout(
//     () =>
//         console.log('3초가 지났습니다.'), 
//     3000 /// 1ms = 1//1000s
// );


//setInterval
//일정 시간마다 함수를 반복 실행하는 함수


let count = 0;

const timerId = setInterval(
    () => {
        count++;

        console.log(count + '번째 호출')

        if (count === 6) {
            clearInterval(timerId); // timerId를 사용하여 setInterval을 멈출 수 있습니다.
        }



    }, 1000



    // timerId를 사용하여 setInterval을 멈출 수 있습니다.
);