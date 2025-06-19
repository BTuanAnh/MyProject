function updateVariantDisplay() {
    let variants = document.querySelectorAll(".variant-item");
    let previewImage = document.getElementById("previewImage");
    let quantityElement = document.getElementById("quantity");
    let foundVariant = false;

    variants.forEach(variant => {
        let imageUrl = variant.dataset.image;
        let quantity = parseInt(variant.dataset.quantity);
        let button = variant.querySelector("button");

        if (quantity > 0) {
            previewImage.src = imageUrl;
            previewImage.style.display = "block";
            variant.style.display = "block";
            if (button) button.style.display = "block";
            foundVariant = true;
        } else {
            variant.style.display = "none";
        }
    });

    if (!foundVariant) {
        previewImage.style.display = "none";
    }

    quantityElement.innerText = "1";
    updateQuantityButtons(1, getMaxQuantity());
}

function updateQuantity(change) {
    let quantityElement = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityElement.innerText);
    let maxQuantity = getMaxQuantity();

    let newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
        quantityElement.innerText = newQuantity;
    }

    updateQuantityButtons(newQuantity, maxQuantity);
}

function getMaxQuantity() {
    let maxQuantity = 0;
    document.querySelectorAll(".variant-item").forEach(variant => {
        let quantity = parseInt(variant.dataset.quantity);
        if (quantity > maxQuantity) {
            maxQuantity = quantity;
        }
    });
    return maxQuantity;
}

function updateQuantityButtons(current, max) {
    document.querySelector(".qty-btn:first-of-type").disabled = current === 1;
    document.querySelector(".qty-btn:last-of-type").disabled = current === max;
}

document.addEventListener("DOMContentLoaded", updateVariantDisplay);