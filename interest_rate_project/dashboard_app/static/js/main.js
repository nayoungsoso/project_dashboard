document.addEventListener("DOMContentLoaded", function() {
    // showPopup 함수 정의
    function showPopup(title, content) {
        // 팝업 내용 설정
        document.getElementById('popup-title').textContent = title;
        document.getElementById('popup-content').textContent = content;
    
        // 팝업과 배경 표시
        document.getElementById('popup').style.display = 'block';
        document.getElementById('popup-overlay').style.display = 'block';
    }

    function closePopup() {
        // 팝업과 배경 숨기기
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup-overlay').style.display = 'none';
    }

    // 닫기 버튼 클릭 시 팝업 닫기
    document.querySelector('.close-btn').addEventListener('click', closePopup);

    // 각 grid-item 클릭 시 showPopup 실행
    var gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var title = item.textContent.trim();
            var content = item.querySelector('.item').textContent.trim();
            showPopup(title, content);  // showPopup에 제목과 내용을 전달
        });
    });
});
