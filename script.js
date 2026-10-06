const root = document.documentElement;
const themeButton = document.getElementById("themeButton");
function updateTheme() {
  const dark = root.dataset.theme === "dark";
  themeButton.textContent = dark ? "Light theme" : "Dark theme";
  themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#000000" : "#ffffff";
}
themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch {}
  updateTheme();
});
updateTheme();
document.getElementById("year").textContent = new Date().getFullYear();
// Keep bookmarks to sections of the former one-page site useful.
if (location.pathname.endsWith("/") || location.pathname.endsWith("/index.html")) {
  const destinations = { experience: "experience.html", research: "research.html", projects: "projects.html", education: "education.html", contact: "contact.html" };
  const destination = destinations[location.hash.slice(1)];
  if (destination) location.replace(destination);
}
