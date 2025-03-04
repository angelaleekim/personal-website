import { attachShadow } from "./utils.mjs";
import { toHtmlElement } from "./toHtmlElement.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
  <nav>
    <h1 id="logo"><a href="index.html">AK</a></h1>
    <label id="dark-mode-toggle">
        <input type="checkbox" autocomplete="off" />
        Dark mode
    </label>
    <button id="menu-toggle" aria-label="Toggle navigation">☰</button>
    <div id="links-container"></div>
  </nav>
`;

const links = [
  { title: "Home", src: "index.html" },
  { title: "Projects", src: "projects.html" },
  { title: "Hobbies", src: "hobbies.html" },
];

class MyHeader extends HTMLElement {
  connectedCallback() {
    const shadowRoot = attachShadow(this, TEMPLATE);
    shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));

    // Retrieve elements inside the shadow root
    const navElement = shadowRoot.querySelector("nav");
    const linksContainer = shadowRoot.querySelector("#links-container");
    const darkModeToggle = shadowRoot.querySelector("input");
    const menuButton = shadowRoot.querySelector("#menu-toggle");

    // Add links to the container
    links.forEach(({ title, src }) => {
      const linkElement = toHtmlElement(`<a href="${src}">${title}</a>`);

      // Highlight the active page
      if (window.location.pathname.includes(src)) {
        linkElement.classList.add("active");
      }

      linksContainer.appendChild(linkElement);
    });

    // Toggle menu visibility
    menuButton.addEventListener("click", () => {
      linksContainer.classList.toggle("active");
    });

    // Check and apply dark mode from localStorage
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      darkModeToggle.checked = true; // Ensure the checkbox reflects the stored mode
    }

    // Event listener for dark mode toggle
    darkModeToggle.addEventListener("change", () => {
      console.log("Testing dark mode.");

      if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true"); // Store as a string
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false"); // Store as a string
      }
    });

    // Wait for the page to load before adding navigation
    window.addEventListener("load", () => {
      document.body.prepend(navElement);
    });

    // Append the whole component to the custom element itself (not document.body)
    this.appendChild(shadowRoot);
  }
}

customElements.define("my-header", MyHeader);
