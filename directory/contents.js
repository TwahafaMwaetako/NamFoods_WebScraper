const prices = {
    "Pick and Pay": {
      "item1": 10.99,
      "item2": 20.99,
      "item3": 30.99
    },
    "Food Lovers Market": {
      "item1": 11.99,
      "item2": 21.99,
      "item3": 31.99
    },
    "Shoprite": {
      "item1": 12.99,
      "item2": 22.99,
      "item3": 32.99
    }
  };
  
  function checkPrices() {
    const currentUrl = window.location.href;
    let supermarket = "";
    if (currentUrl.includes("picknpay")) {
      supermarket = "Pick and Pay";
    } else if (currentUrl.includes("foodloversmarket")) {
      supermarket = "Food Lovers Market";
    } else if (currentUrl.includes("shoprite")) {
      supermarket = "Shoprite";
    }
    if (supermarket) {
      const items = Object.keys(prices[supermarket]);
      items.forEach(item => {
        const currentPrice = parseFloat(document.querySelector(`[data-product-name="${item}"] .price`).innerText.replace(",", "."));
        const previousPrice = prices[supermarket][item];
        if (currentPrice < previousPrice) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: `${supermarket} Price Drop`,
            message: `The price of ${item} has dropped to ${currentPrice}!`
          });
          prices[supermarket][item] = currentPrice;
        }
      });
    }
  }
  
  setInterval(checkPrices, 5000);