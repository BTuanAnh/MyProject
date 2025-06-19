function toggleMenu(element) {
    let nextElement = element.nextElementSibling;

    if (nextElement && nextElement.classList.contains('sub-menu')) {
        nextElement.classList.toggle('active');

        if (nextElement.classList.contains('color-options') || nextElement.classList.contains('size-options')) {
            nextElement.style.display = nextElement.classList.contains('active') ? 'flex' : 'none';

        }

        let icon = element.querySelector("i");
        if (icon) {
            icon.classList.toggle("bi-chevron-right");
            icon.classList.toggle("bi-chevron-down");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu(element) {
        let nextElement = element.querySelector(".sub-menu");

        if (nextElement) {
            nextElement.classList.toggle("active");

            let icon = element.querySelector("i");
            if (icon) {
                icon.classList.toggle("bi-chevron-right");
                icon.classList.toggle("bi-chevron-down");
            }
        }
    }

    document.querySelectorAll(".sub-menu > li").forEach(item => {
        if (item.querySelector(".sub-menu")) {
            item.addEventListener("click", function (event) {
                toggleMenu(this);
                event.stopPropagation();
            });
        }
    });
});


















//document.addEventListener("DOMContentLoaded", function () {
//    const priceRange = document.getElementById("priceRange");
//    const priceValue = document.getElementById("priceValue");
//    const filterSelect = document.getElementById("filter");
//    const searchInput = document.getElementById("search");
//    const categoryLinks = document.querySelectorAll(".category-left .sub-menu a");

//    priceRange.addEventListener("input", function () {
//        priceValue.innerText = new Intl.NumberFormat('vi-VN').format(this.value) + "đ";
//        filterProducts();
//    });

//    document.querySelectorAll(".category-left .sub-menu a").forEach(item => {
//        item.addEventListener("click", function (event) {
//            event.preventDefault();
//            document.querySelectorAll(".category-left .sub-menu a").forEach(a => a.classList.remove("active"));
//            this.classList.add("active");
//            filterProducts();
//        });
//    });

//    function filterProducts() {
//        let maxPrice = parseInt(document.getElementById("priceRange").value);
//        let selectedCategoryElement = document.querySelector(".category-left .sub-menu a.active");
//        let selectedCategory = selectedCategoryElement ? selectedCategoryElement.getAttribute("data-category") : null;
//        let filterValue = document.getElementById("filter").value;
//        let searchTerm = document.getElementById("search").value.toLowerCase();

//        document.querySelectorAll(".product-right").forEach(product => {
//            let price = parseInt(product.querySelector("p").innerText.replace(/\D/g, ""));
//            let category = product.getAttribute("data-category");
//            let name = product.querySelector("h1").innerText.toLowerCase();

//            let matchesCategory = !selectedCategory || category === selectedCategory;
//            let matchesPrice = price <= maxPrice;
//            let matchesSearch = name.includes(searchTerm);

//            let showProduct = matchesCategory && matchesPrice && matchesSearch;
//            product.style.display = showProduct ? "block" : "none";
//        });

//        sortProducts(filterValue);
//    }

//    function sortProducts(filterValue) {
//        let container = document.querySelector(".Cartegory-right-content");
//        let products = Array.from(container.querySelectorAll(".product-right"));

//        products.sort((a, b) => {
//            let priceA = parseInt(a.querySelector("p").innerText.replace(/\D/g, ""));
//            let priceB = parseInt(b.querySelector("p").innerText.replace(/\D/g, ""));

//            return filterValue === "price-asc" ? priceA - priceB : priceB - priceA;
//        });

//        products.forEach(product => container.appendChild(product));
//    }

//    searchInput.addEventListener("keyup", filterProducts);
//    filterSelect.addEventListener("change", filterProducts);
//});

//function searchProducts() {
//    let input = document.getElementById("search").value.toLowerCase();
//    let products = document.querySelectorAll(".product-item");

//    products.forEach(product => {
//        let name = product.querySelector("p").innerText.toLowerCase();
//        product.style.display = name.includes(input) ? "block" : "none";
//    });
//}

//function filterProducts() {
//    let filterValue = document.getElementById("filter").value;
//    let products = [...document.querySelectorAll(".product-item")];

//    if (filterValue === "price-asc") {
//        products.sort((a, b) => a.dataset.price - b.dataset.price);
//    } else if (filterValue === "price-desc") {
//        products.sort((a, b) => b.dataset.price - a.dataset.price);
//    } else if (filterValue === "latest") {
//        products.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
//    }

//    let container = document.querySelector(".product-list");
//    container.innerHTML = "";
//    products.forEach(product => container.appendChild(product));
//}

//document.addEventListener("DOMContentLoaded", function () {
//    let currentPage = 1;
//    const itemsPerPage = 12;
//    const products = document.querySelectorAll(".product-right");
//    const totalPages = Math.ceil(products.length / itemsPerPage);

//    function showPage(page) {
//        products.forEach(product => {
//            product.style.display = "none";
//        });

//        products.forEach((product, index) => {
//            let productPage = Math.ceil((index + 1) / itemsPerPage);
//            if (productPage === page) {
//                product.style.display = "block";
//            }
//        });

//        document.querySelectorAll(".page-number").forEach(btn => {
//            btn.classList.toggle("active", parseInt(btn.dataset.page) === page);
//        });

//        document.querySelector(".prev-page").style.display = (page === 1) ? "none" : "inline-block";
//        document.querySelector(".next-page").style.display = (page === totalPages) ? "none" : "inline-block";
//    }

//    function updatePagination() {
//        const paginationContainer = document.querySelector(".Cartegory-right-bottom-items p");
//        paginationContainer.innerHTML = `<span class="prev-page">&laquo;</span>`;

//        for (let i = 1; i <= totalPages; i++) {
//            if (totalPages >= i) {
//                paginationContainer.innerHTML += `<span class="page-number" data-page="${i}">${i}</span>`;
//            }
//        }

//        paginationContainer.innerHTML += `<span class="next-page">&raquo;</span>`;

//        document.querySelectorAll(".page-number").forEach(btn => {
//            btn.addEventListener("click", function () {
//                currentPage = parseInt(this.dataset.page);
//                showPage(currentPage);
//            });
//        });

//        document.querySelector(".prev-page").addEventListener("click", function () {
//            if (currentPage > 1) {
//                currentPage--;
//                showPage(currentPage);
//            }
//        });

//        document.querySelector(".next-page").addEventListener("click", function () {
//            if (currentPage < totalPages) {
//                currentPage++;
//                showPage(currentPage);
//            }
//        });
//    }

//    updatePagination();
//    showPage(currentPage);
//});







document.addEventListener("DOMContentLoaded", function () {
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const filterSelect = document.getElementById("filter");
    const searchInput = document.getElementById("search");
    const categoryLinks = document.querySelectorAll(".category-left .sub-menu a");

    let allProducts = Array.from(document.querySelectorAll(".product-right"));
    let currentPage = 1;
    const itemsPerPage = 12;

    priceRange.addEventListener("input", function () {
        priceValue.innerText = new Intl.NumberFormat('vi-VN').format(this.value) + "đ";
        filterProducts();
    });

    categoryLinks.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            categoryLinks.forEach(a => a.classList.remove("active"));
            this.classList.add("active");
            filterProducts();
        });
    });

    searchInput.addEventListener("keyup", filterProducts);
    filterSelect.addEventListener("change", filterProducts);

    function filterProducts() {
        let maxPrice = parseInt(priceRange.value);
        let selectedCategoryElement = document.querySelector(".category-left .sub-menu a.active");
        let selectedCategory = selectedCategoryElement ? selectedCategoryElement.getAttribute("data-category") : null;
        let filterValue = filterSelect.value;
        let searchTerm = searchInput.value.toLowerCase();

        let filteredProducts = allProducts.filter(product => {
            let price = parseInt(product.querySelector("p").innerText.replace(/\D/g, ""));
            let category = product.getAttribute("data-category");
            let name = product.querySelector("h1").innerText.toLowerCase();

            return (!selectedCategory || category === selectedCategory) && price <= maxPrice && name.includes(searchTerm);
        });

        sortProducts(filteredProducts, filterValue);
        updatePagination(filteredProducts);
        showPage(currentPage, filteredProducts);
    }

    function sortProducts(products, filterValue) {
        products.sort((a, b) => {
            let priceA = parseInt(a.querySelector("p").innerText.replace(/\D/g, ""));
            let priceB = parseInt(b.querySelector("p").innerText.replace(/\D/g, ""));
            return filterValue === "price-asc" ? priceA - priceB : priceB - priceA;
        });
    }

    function showPage(page, products) {
        let startIndex = (page - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;

        allProducts.forEach(product => product.style.display = "none");
        products.slice(startIndex, endIndex).forEach(product => product.style.display = "block");
    }

    function updatePagination(filteredProducts) {
        let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const paginationContainer = document.querySelector(".Cartegory-right-bottom-items p");
        paginationContainer.innerHTML = `<span class="prev-page">&laquo;</span>`;

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<span class="page-number" data-page="${i}">${i}</span>`;
        }
        paginationContainer.innerHTML += `<span class="next-page">&raquo;</span>`;

        document.querySelectorAll(".page-number").forEach(btn => {
            btn.addEventListener("click", function () {
                currentPage = parseInt(this.dataset.page);
                showPage(currentPage, filteredProducts);
            });
        });

        document.querySelector(".prev-page").addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage, filteredProducts);
            }
        });

        document.querySelector(".next-page").addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage, filteredProducts);
            }
        });
    }

    filterProducts();
});












document.addEventListener("DOMContentLoaded", function () {
    const quantityInputs = document.querySelectorAll(".quantity-input");

    quantityInputs.forEach(input => {
        input.addEventListener("change", function () {
            let price = parseFloat(this.closest(".cart-item").dataset.price);
            let quantity = parseInt(this.value);
            let subtotalElement = this.closest(".cart-item").querySelector(".subtotal");

            let newSubtotal = price * quantity;
            subtotalElement.innerHTML = newSubtotal.toLocaleString() + "<sup>đ</sup>";
        });
    });
});

function openVariantModal(bookId) {
    $.get("/Home/GetVariants", { bookId: bookId }, function (data) {
        $("#variantList").html(data);
        $("#variantModal").modal("show");
    });
}
function addToCart(bookId) {
    let quantity = parseInt(document.getElementById("quantity").textContent) || 1;

    $.post("/Shop/AddToCart", { bookId: bookId, quantity: quantity }, function (response) {
        if (response.success) {
            $("#variantModal").modal("hide");
            $("#cart-count").text(response.cartCount);
        } else {
            alert(response.message);
        }
    });
}