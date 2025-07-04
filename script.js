//  Dark Mode Toggle Logic
const toggle = document.getElementById("darkModeToggle"); // finds the checkbox input from your HTML

if (toggle) { // This checks if the element with ID darkModeToggle exists. This prevents errors if the HTML doesn't have the toggle.
  // Apply saved theme on load // if this was not present then when we refresh the page it will come to light mode even if before we did dark moe on it.
  if (localStorage.getItem("theme") === "dark") { // reads the user's saved theme from localStorage (browser memory) // If the theme was "dark" ->
    document.body.classList.add("dark"); // adds a class dark to <body> (CSS uses body.dark { ... } to apply dark styles)
    toggle.checked = true; // sets the checkbox to ON (checked)
  }

  // Listen to toggle switch
  toggle.addEventListener("change", () => { // When the user clicks the toggle, this function will run.
    // This lets me switch themes dynamically.
    document.body.classList.toggle("dark"); // If dark class is on <body>, it removes it. // If it’s not there, it adds it.

    // After toggling, it checks the current theme and saves it to localStorage so the theme persists after refresh.
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}
//  localStorage - A simple browser feature to store key-value pairs in the user's browser.
//                 This stores the theme setting permanently unless cleared.
