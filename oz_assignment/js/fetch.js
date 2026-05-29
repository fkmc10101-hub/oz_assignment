// 비동기 프로그래밍(Asyncronous Programing)

// 클라이언트

// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(response => response.json())
//     .then(data => console.log(data));

//POST 요청
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Python 공부법", body: "열심히 공부하세요" })
})
    .then(response => response.json())
    .then(data => console.log(data));
