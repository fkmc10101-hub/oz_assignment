function runCalculator() {
    const expression = prompt("계산할 수식을 입력하세요 (예: 2+8-4-1)");

    if (!expression) {
        console.log("계산이 취소되었거나 입력된 수식이 없습니다.");
        return;
    }

    try {
        // 내 로컬 파일이므로 보안 정책(CSP)에 걸리지 않고 정상 작동합니다!
        const result = new Function(`return ${expression}`)();

        console.log(`[계산 완료] 수식: ${expression} = 결과: ${result}`);
        alert(`계산 결과: ${result}`);
    } catch (error) {
        console.error("올바른 수식을 입력해주세요.");
        alert("올바르지 않은 수식입니다.");
    }
}

// 페이지가 열리자마자 계산기가 실행되도록 설정
runCalculator();