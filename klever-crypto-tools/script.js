const htmlCode = `
<div class="search__wrapper">
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M9 9L13 13M5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333Z"
    stroke="#989EB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
<input type="search" placeholder="Search Tools..." class="search-box">
</div>
<div class="sidebar-links">
<h2 class="nav-item">Tools</h2>
<ul class="drop-down-items">
  <li>
    <a href="#mc-projection" title="Market cap projection" class="tooltip mc-projection tools">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M6 15L10 11L14 15L20 9M20 9V13M20 9H16"
            stroke="#E6E8F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
      </svg>
      <span class="link hide">MC Projection</span>
      <span class="tooltip__content">MC Projection</span>
    </a>
  </li>
  <li>
    <a href="#mc-comparison" title="Marketcap Comparison" class="tooltip mc-comparison tools">
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>git_compare_line</title>
          <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Development" transform="translate(-576.000000, 0.000000)">
              <g id="git_compare_line" transform="translate(576.000000, 0.000000)">
                <path
                  d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                  id="MingCute" fill-rule="nonzero"> </path>
                <path
                  d="M6,2.99994 C7.65685,2.99994 9,4.34309 9,5.99994 C9,7.240849 8.24658397,8.30578855 7.1722376,8.76227298 L7,8.82923 L7,15.9999 C7,16.51275 7.38604429,16.9354092 7.88337975,16.9931725 L8,16.9999 L10.2071,16.9999 L9.79291,16.5857 C9.40239,16.1952 9.40239,15.562 9.79291,15.1715 C10.1533623,14.8110385 10.7206208,14.7833107 11.1128973,15.0883166 L11.2071,15.1715 L13.3284,17.2928 C13.6889538,17.6533538 13.7166888,18.2205349 13.4116047,18.6127989 L13.3284,18.707 L11.2071,20.8284 C10.8166,21.2189 10.1834,21.2189 9.79291,20.8284 C9.43243,20.4678462 9.40470077,19.9006651 9.70972231,19.5084011 L9.79291,19.4142 L10.2071,18.9999 L8,18.9999 C6.40232321,18.9999 5.09633941,17.7510226 5.00509271,16.1761773 L5,15.9999 L5,8.82923 C3.83481,8.4174 3,7.30616 3,5.99994 C3,4.34309 4.34315,2.99994 6,2.99994 Z M12.7928,3.17156 C13.1834,2.78103 13.8165,2.78103 14.207,3.17156 C14.5675538,3.53204 14.5952888,4.09926651 14.2902047,4.49156153 L14.207,4.58577 L13.7929,4.99994 L16,4.99994 C17.597725,4.99994 18.903664,6.24885462 18.9949075,7.82366664 L19,7.99994 L19,15.1706 C20.1652,15.5825 21,16.6937 21,17.9999 C21,19.6568 19.6569,20.9999 18,20.9999 C16.3431,20.9999 15,19.6568 15,17.9999 C15,16.75901 15.753407,15.6941075 16.827761,15.2375667 L17,15.1706 L17,7.99994 C17,7.48710857 16.613973,7.06443347 16.1166239,7.0066678 L16,6.99994 L13.7929,6.99994 L14.2071,7.41415 C14.5976,7.80468 14.5976,8.43784 14.2071,8.82837 C13.8466385,9.18885 13.2793793,9.21657923 12.8871027,8.91155769 L12.7929,8.82837 L10.6716,6.70705 C10.3110462,6.34656077 10.2833112,5.77933355 10.5883953,5.38703848 L10.6716,5.29283 L12.7928,3.17156 Z M18,16.9999 C17.4477,16.9999 17,17.4477 17,17.9999 C17,18.5522 17.4477,18.9999 18,18.9999 C18.5523,18.9999 19,18.5522 19,17.9999 C19,17.4477 18.5523,16.9999 18,16.9999 Z M6,4.99994 C5.44772,4.99994 5,5.44766 5,5.99994 C5,6.55222 5.44772,6.99994 6,6.99994 C6.55228,6.99994 7,6.55222 7,5.99994 C7,5.44766 6.55228,4.99994 6,4.99994 Z"
                  id="形状" fill="#E6E8F0"> </path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <span class="link hide">MC Comparison</span>
      <span class="tooltip__content">MC Comparison</span>
    </a>
  </li>
  <li>
    <a href="#dca" title="Dollar cost average" class="tooltip dca tools">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-pie" width="24"
        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8"></path>
        <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5"></path>
      </svg>
      <span class="link hide">DCA</span>
      <span class="tooltip__content">DCA</span>
    </a>
  </li>
</ul>
</div>
<div class="sidebar-links">
<h2 class="nav-item">Subscription</h2>
<div class="sidebar__action__wrapper drop-down-items">
  <div class="sidebar__action">
    <div class="progress-bar">
      <div class="progress-bar__value">
        60%
      </div>
    </div>
    <h2>Used Capacity</h2>
    <p>
      You are already using 60% of your capacity.
    </p>
    <button>
      Upgrade plan
    </button>
  </div>
</div>
</div>
<div class="sidebar-links">
<h2 class="nav-item">Chat Room</h2>
<ul class="drop-down-items">
  <li>
    <a href="#map-overview" title="Chat Room" class="tooltip">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
            fill="#E6E8F0"></path>
          <path d="M8 11H8.009M11.991 11H12M15.991 11H16" stroke="#E6E8F0" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </g>
      </svg>
      <span class="link hide">Chat Room</span>
      <span class="tooltip__content">Chat Room</span>
    </a>
  </li>
</ul>
</div>
<div class="divider"></div>
<div class="sidebar__profile">
<div class="avatar__wrapper">
  <img class="avatar" src="assets/profile.png" alt="Joe Doe Picture">
  <div class="online__status"></div>
</div>
<section class="avatar__name hide">
  <div class="user-name">Joe Doe</div>
  <div class="email">joe.doe@atheros.ai</div>
</section>
<a href="#logout" class="logout">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24"
    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
    stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
    <path d="M9 12h12l-3 -3"></path>
    <path d="M18 15l3 -3"></path>
  </svg>
</a>
</div>
`;

// Add the HTML code to the sidebar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const navbar = document.querySelector(".navbar");

  if (window.innerWidth < 780) {
    navbar.innerHTML += htmlCode;
    navbarExpand()
    search()
  } else {
    sidebar.innerHTML += htmlCode;
    sidebarExpand()
    search()
  }

})

function sidebarExpand() {
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
}


let isExpanded = false;

const navBar = document.querySelector(".navbar");
const row = document.querySelector(".row");
const animate1 = document.querySelector(".animate1");
const animate2 = document.querySelector(".animate2");
const animate3 = document.querySelector(".animate3");

// Keyframes
const values1 = [
  "M 84,24 C 84,24 61.333333,24.001 50,24.001 38.666667,24.001 16,24 16,24",
  "M 82,24 C 82,24 66.957389,30.5 50,30.5 33.042611,30.5 18,24 18,24",
  "M 80,24 C 80,24 61.663104,37 50,37 38.336896,37 20,24 20,24",
  "M 78,24 C 78,24 55.685686,43.5 50,43.5 44.314314,43.5 22,24 22,24",
  "M 76,24 C 76,24 50.055365,50 50,50 49.94463,50 24,24 24,24"
];
const values2 = [
  "M 84,50 H 50 16",
  "M 75.5,50 H 50 24.5",
  "M 67,50 H 50 33",
  "M 58.5,50 H 50 41.5",
  "M 50.001,50 H 50 49.99"
];
const values3 = [
  "M 84,76 C 84,76 61.333333,76.001 50,76.001 38.666667,76.001 16,76 16,76",
  "M 82,76 C 82,76 66.957389,69.5 50,69.5 33.042611,69.5 18,76 18,76",
  "M 80,76 C 80,76 61.663104,63 50,63 38.336896,63 20,76 20,76",
  "M 78,76 C 78,76 55.685686,56.5 50,56.5 44.314314,56.5 22,76 22,76",
  "M 76,76 C 76,76 50.055365,50 50,50 49.944635,50 24,76 24,76"
];

function toggleAnimation(values, animate) {
  animate.setAttribute(
    "values",
    !isExpanded ? values.join("; ") : values.slice().reverse().join("; ")
  );
  animate.beginElement();
}

function handleClick() {
  isExpanded = row.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    navBar.classList.remove("active");
  } else {
    navBar.classList.add("active");
  }

  toggleAnimation(values1, animate1);
  toggleAnimation(values2, animate2);
  toggleAnimation(values3, animate3);

  row.setAttribute("aria-expanded", !isExpanded);
  row.setAttribute("aria-label", !isExpanded ? "Close Menu" : "Open Menu");
}

function initPath(clazz, descriptor) {
  const path = document.querySelector(clazz);
  path.setAttribute("d", descriptor);
}

initPath(".path1", values1[0]);
initPath(".path2", values2[0]);
initPath(".path3", values3[0]);

row.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    row.click();
  }
});



function search() {
  let tools = ["mc-projection", "mc-comparison", "dca"]
  let searchBox = document.querySelector(".search-box");

  searchBox.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    tools.forEach(tool => {
      const elements = document.querySelectorAll('.' + tool);

      elements.forEach(element => {
        const toolLower = tool.toLowerCase();
        if (toolLower.includes(searchText) || searchText.split(' ').every(word => toolLower.includes(word))) {
          element.style.display = 'flex';
        } else {
          element.style.display = 'none';
        }
      });
    });
  });

}
