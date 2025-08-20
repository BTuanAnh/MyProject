function updateVariantImage() {
    var selectedColor = document.querySelector(".color-option.selected")?.dataset.color;
    var selectedSize = document.querySelector(".size-option.selected")?.dataset.size;
    var variants = document.querySelectorAll(".variant-item");
    var previewImage = document.getElementById("previewImage");
    var foundVariant = false;

    var availableSizes = new Set();
    variants.forEach(variant => {
        if (variant.dataset.color === selectedColor) {
            availableSizes.add(variant.dataset.size);
        }
    });

    document.querySelectorAll(".size-option").forEach(option => {
        if (availableSizes.has(option.dataset.size)) {
            option.classList.remove("disabled");
        } else {
            option.classList.add("disabled");
        }
    });

    let quantitySpans = document.querySelectorAll(".quantity-option");

    quantitySpans.forEach(span => {
        span.style.display = "none";
    });

    quantitySpans.forEach(span => {
        if (span.dataset.color === selectedColor && span.dataset.size === selectedSize) {
            span.style.display = "inline-block";
        }
    });

    variants.forEach(variant => {
        var color = variant.dataset.color;
        var size = variant.dataset.size;
        var imageUrl = variant.dataset.image;
        var button = variant.querySelector("button");
        var quantity = parseInt(variant.dataset.quantity);

        if (color === selectedColor && size === selectedSize && quantity > 0) {
            previewImage.src = imageUrl;
            previewImage.style.display = "block";
            variant.style.display = "block";
            if (button) button.style.display = "block";
            foundVariant = true;
        } else {
            variant.style.display = "none";
            if (button) button.style.display = "none";
        }
    });

    if (!foundVariant) {
        previewImage.style.display = "none";
    }
}

document.querySelectorAll(".color-option").forEach(option => {
    option.addEventListener("click", function () {
        document.querySelectorAll(".color-option").forEach(opt => opt.classList.remove("selected"));
        this.classList.add("selected");
        updateVariantImage();
    });
});

document.querySelectorAll(".size-option").forEach(option => {
    option.addEventListener("click", function () {
        if (this.classList.contains("disabled")) return;
        document.querySelectorAll(".size-option").forEach(opt => opt.classList.remove("selected"));
        this.classList.add("selected");
        updateVariantImage();
    });
});

function updateQuantity(change) {
    let quantityElement = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityElement.innerText);
    let selectedColor = document.querySelector(".color-option.selected")?.dataset.color;
    let selectedSize = document.querySelector(".size-option.selected")?.dataset.size;
    let maxQuantity = 0;

    document.querySelectorAll(".quantity-option").forEach(span => {
        if (span.dataset.color === selectedColor && span.dataset.size === selectedSize) {
            maxQuantity = parseInt(span.dataset.quantity);
        }
    });

    let newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
        quantityElement.innerText = newQuantity;
    }

    document.querySelector(".qty-btn:first-of-type").disabled = newQuantity === 1;
    document.querySelector(".qty-btn:last-of-type").disabled = newQuantity === maxQuantity;
}

document.querySelectorAll(".color-option").forEach(colorBtn => {
    colorBtn.addEventListener("click", function () {
        let selectedColor = this.dataset.color;
        let maxQuantity = 0;

        document.querySelectorAll(".quantity-option").forEach(span => {
            if (span.dataset.color === selectedColor) {
                maxQuantity = parseInt(span.dataset.quantity);
            }
        });

        let quantityElement = document.getElementById("quantity");
        quantityElement.innerText = 1;

        document.querySelector(".qty-btn:first-of-type").disabled = true;
        document.querySelector(".qty-btn:last-of-type").disabled = maxQuantity <= 1;
    });
});

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

function changeTab(tabName, element) {
    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-list li').forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    element.classList.add('active');
}