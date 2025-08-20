document.addEventListener("DOMContentLoaded", function () {
    const imagesContainer = document.querySelector(".hero-section-img");
    const images = document.querySelectorAll(".hero-section-img img");
    let index = 0;
    let autoSlide;

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            index = (index + 1) % images.length;
            updateCarousel();
        }, 5000);
    }

    function updateCarousel() {
        imagesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    document.querySelector(".arrow-right").addEventListener("click", function () {
        stopAutoSlide();
        index = (index + 1) % images.length;
        updateCarousel();
        startAutoSlide();
    });

    document.querySelector(".arrow-left").addEventListener("click", function () {
        stopAutoSlide();
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
        startAutoSlide();
    });

    startAutoSlide();
});


    document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".Cartegory-right-content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const productWidth = document.querySelector(".product-right").offsetWidth;
    const productGap = 15;
    const scrollAmount = productWidth + productGap;

    function updateButtons() {
        prevBtn.style.opacity = slider.scrollLeft > 0 ? "1" : "0.3";
        nextBtn.style.opacity = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth ? "0.3" : "1";
    }

    nextBtn.addEventListener("click", function () {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateButtons, 300);
    });

    prevBtn.addEventListener("click", function () {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(updateButtons, 300);
    });

    slider.addEventListener("scroll", updateButtons);
    updateButtons();
});




function openVariantModal(productId) {
    $.get("/Home/GetVariants", { productId: productId }, function (data) {
        $("#variantList").html(data);
        $("#variantModal").modal("show");
    });
}

function addToCart(productId) {
    let quantity = parseInt(document.getElementById("quantity").textContent) || 1;

    $.post("/Shop/AddToCart", { productId: productId, quantity: quantity }, function (response) {
        if (response.success) {
            $("#variantModal").modal("hide");
            $("#cart-count").text(response.cartCount);
        } else {
            alert(response.message);
        }
    });
}