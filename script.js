const itemInput = document.getElementById("item");
const priceInput = document.getElementById("price");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const status = document.getElementById("status");

saveBtn.addEventListener("click", () => {
  const item = itemInput.value.trim();
  const price = priceInput.value.trim();
  if (item && price) {
    chrome.storage.sync.set({ [item]: price }, () => {
      status.textContent = "Item saved successfully!";
      itemInput.value = "";
      priceInput.value = "";
    });
  } else {
    status.textContent = "Please enter both item and price";
  }
});

clearBtn.addEventListener("click", () => {
  chrome.storage.sync.clear(() => {
    status.textContent = "All items cleared!";
  });
});