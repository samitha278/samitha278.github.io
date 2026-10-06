const root = document.documentElement;
root.classList.add("js");
const themeButton = document.getElementById("themeButton");
function updateTheme() {
  const dark = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeButton.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
  themeButton.setAttribute("aria-pressed", String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? "#000000" : "#ffffff";
}
themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch {}
  updateTheme();
});
updateTheme();
const menuButton = document.getElementById("menuButton");
const header = document.querySelector(".site-header");
function closeMenu() {
  header.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  if (open) document.querySelector("#primaryNav a").focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 981px)").addEventListener("change", closeMenu);
// Keep bookmarks to sections of the former one-page site useful.
if (location.pathname.endsWith("/") || location.pathname.endsWith("/index.html")) {
  const destinations = { about: "about.html", experience: "experience.html", research: "research.html", projects: "projects.html", education: "education.html", contact: "contact.html" };
  const destination = destinations[location.hash.slice(1)];
  if (destination) location.replace(destination);
}
