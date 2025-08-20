document.addEventListener("DOMContentLoaded", function () {
    updateTotalAmount(); 
});

function updateCart(productId) {
    let inputElement = document.getElementById("qty-" + productId);
    let newQty = parseInt(inputElement.value);

    if (isNaN(newQty) || newQty < 1) {
        newQty = 1; 
    }

    $.post("/Shop/UpdateQuantity", { productId: productId, quantity: newQty }, function (response) {
        if (response.success) {
            inputElement.value = response.updatedQuantity; 
            $("#cart-count").text(response.cartCount); 

            let price = parseFloat($("#price-" + productId).data("price")); 
            let totalPrice = price * response.updatedQuantity;
            $("#total-" + productId).text(totalPrice.toLocaleString("vi-VN") + " đ"); 


            updateTotalCartPrice();
        } else {
            alert(response.message);
        }
    });
}
function updateTotalAmount() {
    let totalAmount = 0;
    let totalElements = document.getElementsByClassName("total-price");

    for (let i = 0; i < totalElements.length; i++) {
        let priceText = totalElements[i].innerText.replace(" ₫", "").replace(/,/g, "");
        totalAmount += parseFloat(priceText);
    }

    totalAmount *= 1000;

    let totalAmountElement = document.getElementById("total-amount");
    let grandTotalElement = document.querySelector(".grand-total");

    if (totalAmountElement) {
        totalAmountElement.innerText = totalAmount.toLocaleString() + "₫";
    }

    if (grandTotalElement) {
        grandTotalElement.innerText = totalAmount.toLocaleString() + "₫";
    }
}

function updateTotalCartPrice() {
    let totalCartPrice = 0;

    document.querySelectorAll(".total-price").forEach(function (element) {
        let priceText = element.innerText.replace(/[^\d]/g, '');
        let price = priceText ? parseFloat(priceText) : 0;
        totalCartPrice += price;
    });

    let totalAmountElement = document.getElementById("total-amount");
    let grandTotalElement = document.querySelector(".grand-total");

    if (totalAmountElement) {
        totalAmountElement.innerText = totalCartPrice.toLocaleString("vi-VN") + " ₫";
    }

    if (grandTotalElement) {
        grandTotalElement.innerText = totalCartPrice.toLocaleString("vi-VN") + " ₫";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateTotalCartPrice();
});
