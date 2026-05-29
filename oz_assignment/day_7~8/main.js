const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
let currentTab = "all"; // "all" 또는 "favorites"
let searchQuery = "";
let favorites = JSON.parse(localStorage.getItem("crypto_favorites")) || [];

// 로컬스토리지 저장 함수
function saveFavorites() {
    localStorage.setItem("crypto_favorites", JSON.stringify(favorites));
}

async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // 1. USDT로 끝나는 심볼만 필터링
        let filteredData = data.filter(item => item.symbol.endsWith("USDT"));

        // 2. 탭 기준 필터링 (관심항목 탭인 경우)
        if (currentTab === "favorites") {
            filteredData = filteredData.filter(item => favorites.includes(item.symbol));
        }

        // 3. 검색어 필터링
        if (searchQuery) {
            filteredData = filteredData.filter(item =>
                item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 화면에 렌더링
        renderTable(filteredData);
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);


    }
}

function renderTable(data) {
    const tableBody = document.getElementById("crypto-table-body");
    tableBody.innerHTML = ""; // 기존 데이터 초기화

    data.forEach(item => {
        const isFavorite = favorites.includes(item.symbol);
        const priceChangePercent = parseFloat(item.priceChangePercent).toFixed(2);

        // 변동률에 따른 클래스 지정 (CSS에서 색상 처리)
        const changeClass = priceChangePercent >= 0 ? "positive" : "negative";
        const sign = priceChangePercent >= 0 ? "+" : "";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <span class="star-btn ${isFavorite ? 'active' : ''}" data-symbol="${item.symbol}">
                    ${isFavorite ? "★" : "☆"}
                </span>
            </td>
            <td class="bold">${item.symbol}</td>
            <td>${parseFloat(item.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            <td class="${changeClass}">${sign}${priceChangePercent}%</td>
            <td>${parseFloat(item.highPrice).toLocaleString()}</td>
            <td>${parseFloat(item.lowPrice).toLocaleString()}</td>
        `;
        tableBody.appendChild(tr);
    });

    // 즐겨찾기 버튼 이벤트 바인딩
    setupFavoriteEvents();


}
// 관심항목 추가/제거 이벤트
function setupFavoriteEvents() {
    document.querySelectorAll(".star-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const symbol = e.target.getAttribute("data-symbol");
            if (favorites.includes(symbol)) {
                favorites = favorites.filter(fav => fav !== symbol); // 제거
            } else {
                favorites.push(symbol); // 추가
            }
            saveFavorites();
            fetchCryptoData(); // 화면 즉시 갱신
        });
    });
}

// 검색창 입력 이벤트
document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    fetchCryptoData();
});

// 탭 전환 이벤트
document.getElementById("tab-all").addEventListener("click", (e) => {
    currentTab = "all";
    document.getElementById("tab-all").classList.add("active");
    document.getElementById("tab-favorites").classList.remove("active");
    fetchCryptoData();
});

document.getElementById("tab-favorites").addEventListener("click", (e) => {
    currentTab = "favorites";
    document.getElementById("tab-favorites").classList.add("active");
    document.getElementById("tab-all").classList.remove("active");
    fetchCryptoData();
});

// ⑤ 최초 실행 및 1초(1000ms)마다 주기적 호출
fetchCryptoData();
setInterval(fetchCryptoData, 1000);