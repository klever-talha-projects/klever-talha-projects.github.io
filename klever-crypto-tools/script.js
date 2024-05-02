const expand_btn = document.querySelector(".expand-btn");

let activeIndex;

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

const current = window.location.href;

const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    const hrefLinkClick = elem.href;

    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});

const searchInput = document.querySelector(".search__wrapper input");

searchInput.addEventListener("focus", (e) => {
  document.body.classList.remove("collapsed");
});


let navItems = document.querySelectorAll(".nav-item")
let dropDownItems = document.querySelectorAll(".drop-down-items")

if (window.innerWidth < window.innerHeight * 2) {
  // Hide all dropdown items
  dropDownItems.forEach(function (item) {
    item.style.display = "none";
  });

  // Add click event listeners to navItems
  navItems.forEach(function (navItem, index) {
    navItem.addEventListener("click", () => {
      // Hide all dropdown items except the one clicked
      dropDownItems.forEach(function (item, i) {
        if (i !== index) {
          item.style.display = "none";
        }
      });

      // Toggle display of the clicked dropdown item
      if (dropDownItems[index].style.display !== "none") {
        dropDownItems[index].style.display = "none";
      } else {
        dropDownItems[index].style.display = "flex";
      }
    });
  });
}