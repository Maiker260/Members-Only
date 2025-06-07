const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

if (window.authMode === "sign-up") {
    container.classList.add("right-panel-active");
} else {
    container.classList.remove("right-panel-active");
}
// Remove query parameters in the URL
if (window.history.replaceState) {
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url.toString());
}
