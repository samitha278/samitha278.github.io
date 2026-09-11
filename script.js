const root = document.documentElement;
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

function updateThemeButton() {
  const dark = root.dataset.theme === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  themeButton.setAttribute("aria-label", label);
  themeButton.title = label;
  themeButton.textContent = dark ? "☀" : "☾";
  document.querySelector('meta[name="theme-color"]').content = dark ? "#1b1e1b" : "#f7f7f2";
}

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch {}
  updateThemeButton();
});
updateThemeButton();

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuButton.textContent = open ? "×" : "☰";
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest("nav")) setMenu(false);
});
matchMedia("(min-width: 801px)").addEventListener("change", () => setMenu(false));
document.getElementById("year").textContent = new Date().getFullYear();
