document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-menu").forEach(item => {
        item.addEventListener("click", function () {
            let parent = this.parentElement;
            parent.classList.toggle("active"); 
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let userIcon = document.getElementById("userIcon");
    let dropdownMenu = document.getElementById("dropdownMenu");

    // Toggle dropdown khi click vào icon user
    userIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        dropdownMenu.style.display = (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "")
            ? "block"
            : "none";
    });

    // Ẩn dropdown khi click ra ngoài
    document.addEventListener("click", function (event) {
        if (!dropdownMenu.contains(event.target) && !userIcon.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});









