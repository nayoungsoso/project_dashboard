const data = [
    { title: "Project Duration", content: "2025.2.14. ~ 25.4.10" },
    { title: "Member", content: [
        "Chanseok Yoon (avus23@google.com)",
        "Seokje Lim (aicpakevin@google.com)",
        "Jiyoon Jeong (jioyun10212@google.com)",
        "Nayoung Lee (nayoung09021112@google.com)"
    ]},
    { title: "Git Hub", content: "go to GitHub" },
    { title: "Notion", content: "go to Notion" }
];

let dataIndex = 0; // 배열의 각 항목 인덱스
let titleIndex = 0;
let contentIndex = 0;
let memberIndex = 0;
let typingIndex = 1; // 동적으로 생성되는 id에 대한 인덱스

// 타이틀 타이핑 함수
function typeTitle() {
    // 타이틀이 다 타이핑되었을 경우, 0.5초 후에 내용 타이핑을 시작
    if (titleIndex < data[dataIndex].title.length) {
        document.getElementById(`typing-title-${typingIndex}`).innerHTML += data[dataIndex].title.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, 100); // 타이핑 속도 (100ms)
    } else {
        titleIndex = 0; // 타이틀 끝나면 다시 시작
        setTimeout(typeContent, 500); // 타이틀 끝난 후 0.5초 뒤 본문 타이핑 시작
    }
}

// 내용 타이핑 함수 (일반 텍스트)
function typeContent() {
    if (Array.isArray(data[dataIndex].content)) {
        // 멤버 항목이 배열일 때 각 멤버를 한 줄씩 출력
        typeMember();
    } else {
        // 일반 텍스트일 경우
        if (data[dataIndex].content.includes("go to GitHub")) {
            // GitHub 링크가 있을 경우
            if (contentIndex < "Go to GitHub".length) {
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += "Go to GitHub".charAt(contentIndex);
                contentIndex++;
                setTimeout(typeContent, 50); // 본문 타이핑 속도 (50ms)
            } else {
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += 
                '<a href="https://github.com/nayoungsoso/project_dashboard" target="_blank" style="color: white;">➜</a>'; // 링크 추가 및 흰색 텍스트 스타일 적용
                contentIndex = 0;
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += "<br>";
                dataIndex++;
                typingIndex++;
                if (dataIndex < data.length) {
                    setTimeout(typeTitle, 500); // 다음 항목 타이틀 타이핑 시작
                }
            }
        } else if (data[dataIndex].content.includes("go to Notion")) {
            // Notion 링크가 있을 경우
            if (contentIndex < "Go to Notion".length) {
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += "Go to Notion".charAt(contentIndex);
                contentIndex++;
                setTimeout(typeContent, 50);
            } else {
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += 
                '<a href="https://www.notion.so/sjlim1126/19a45b9dc29e803fbc32d2abb83bd51e" target="_blank"             style="color: white;">➜</a>'; // 링크 추가
                contentIndex = 0;
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += "<br>";
                dataIndex++;
                typingIndex++;
                if (dataIndex < data.length) {
                    setTimeout(typeTitle, 500); // 다음 항목 타이틀 타이핑 시작
                }
            }
        } else {
            if (contentIndex < data[dataIndex].content.length) {
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += data[dataIndex].content.charAt(contentIndex);
                contentIndex++;
                setTimeout(typeContent, 50); // 본문 타이핑 속도 (50ms)
            } else {
                contentIndex = 0;
                document.getElementById(`typing-text-${typingIndex}`).innerHTML += "<br>"; // 줄 바꿈 추가
                dataIndex++;
                typingIndex++;
                if (dataIndex < data.length) {
                    setTimeout(typeTitle, 500); // 다음 항목 타이틀 타이핑 시작
                }
            }
        }
    }
}

// 멤버 항목 타이핑 함수 (배열로 제공된 멤버 목록)
function typeMember() {
    if (memberIndex < data[dataIndex].content.length) {
        document.getElementById(`typing-text-${typingIndex}`).innerHTML += data[dataIndex].content[memberIndex] + "<br>";
        memberIndex++;
        setTimeout(typeMember, 100); // 멤버 타이핑 속도 (100ms)
    } else {
        memberIndex = 0; // 멤버 항목 끝나면 다시 시작
        document.getElementById(`typing-text-${typingIndex}`).innerHTML += "<br>"; // 줄 바꿈 추가
        dataIndex++; // 다음 항목으로
        typingIndex++; // 다음 id로 이동
        if (dataIndex < data.length) {
            setTimeout(typeTitle, 500); // 다음 항목 타이틀 타이핑 시작
        }
    }
}

// 페이지 로드 후 실행
window.onload = () => {
    typeTitle();
};
