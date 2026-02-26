let menubutton = document.getElementById("menu_bar");
let mobilemenu = document.getElementById("mobile_menu");

menubutton.addEventListener("click", () => {
    mobilemenu.classList.toggle("open");
});

let mobileLinks = mobilemenu.querySelectorAll("a");
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobilemenu.classList.remove("open");
    });
});

const searchIcon = document.getElementById("search-icon");
const searchOverlay = document.getElementById("search-overlay");
const closeSearch = document.getElementById("close-search");

searchIcon.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput.focus();
});
closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
});

const bagIcon = document.getElementById("bag-icon");
const bagDropdown = document.getElementById("bag-dropdown");
const bagItems = document.getElementById("bag-items");
const emptyText = document.querySelector(".empty-text");
const buyButtons = document.querySelectorAll(".buy");
const bagCount = document.getElementById("bag-count");
const popup = document.getElementById("added-popup");

const productLink = {
    "MacBook Pro 14\"": "macbookpro.html",
    "iPad Pro": "ipadpro.html",
    "iPhone 17 Pro": "iphonepro.html",
    "Vision Pro": "visionpro.html",
    "AirPods Pro 3": "airpodspro.html",
    "WATCH SERIES 11": "watch.html",
    "iPhone Air": "iphoneair.html"
};

let bag = [];

bagIcon.addEventListener("click", () => {
    bagDropdown.classList.toggle("active");
});

buyButtons.forEach(button => {
    button.addEventListener("click", function() {
        const name = this.closest(".content, .card").querySelector("h1").innerText;

        bag.push({ name: name, link: productLink[name] });

        updateBag();
        showPopup(name);
        updateBagCounter();
    });
});

function updateBag() {
    bagItems.innerHTML = "";

    if (bag.length === 0) {
        emptyText.style.display = "block";
    } else {
        emptyText.style.display = "none";

        bag.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerText = item.name;
            li.style.cursor = "pointer";

            li.addEventListener("click", () => {
                window.location.href = item.link;
            });

            const removeBtn = document.createElement("span");
            removeBtn.innerText = "❌";
            removeBtn.style.cursor = "pointer";
            removeBtn.style.float = "right";
            removeBtn.style.marginLeft = "10px";

            removeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); 
                bag.splice(index, 1);
                updateBag();
                updateBagCounter();
            });

            li.appendChild(removeBtn);
            bagItems.appendChild(li);
        });
    }
}

function updateBagCounter() {
    if (bag.length > 0) {
        bagCount.style.display = "block";
        bagCount.innerText = bag.length;
    } else {
        bagCount.style.display = "none";
    }
}

function showPopup(productName) {
    popup.innerText = productName + " added to bag";
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2500);
}

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let value = searchInput.value.toLowerCase().trim();

        if (value.includes("mac")) {
            document.getElementById("macbookpro").scrollIntoView({ behavior: "smooth" });
        } else if (value.includes("ipad")) {
            document.getElementById("ipadpro").scrollIntoView({ behavior: "smooth" });
        } else if (value.includes("iphone")) {
            document.getElementById("iphonepro").scrollIntoView({ behavior: "smooth" });
        } else if (value.includes("vision")) {
            document.getElementById("visionpro").scrollIntoView({ behavior: "smooth" });
        } else if (value.includes("airpods")) {
            document.getElementById("airpodspro").scrollIntoView({ behavior: "smooth" });
        } else if (value.includes("watch")) {
            document.getElementById("watch").scrollIntoView({ behavior: "smooth" });
        } else {
            alert("Product not found");
        }

        searchOverlay.classList.remove("active");
        searchInput.value = "";
    }
});

