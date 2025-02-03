import { attachShadow } from "./utils.mjs";
import { toHtmlElement } from "./toHtmlElement.mjs";

const links = [
  {
    title: "Home",
    src: "index.html",
  },
  {
    title: "Projects",
    src: "projects.html",
  },
  {
    title: "Hobbies",
    src: "hobbies.html",
  },
];

const TEMPLATE = document.createElement("template");

class MyNavbar extends HTMLElement {
  connectedCallback() {
    const shadowRoot = attachShadow(this, TEMPLATE);

    const navElement = document.createElement("nav");
    // Add the logo
    navElement.appendChild(
      toHtmlElement(`<h1 id="logo"><a href="index.html">AK</a></h1>`)
    );

    // Add the hamburger menu button for mobile
    const menuButton = toHtmlElement(
      `<button id="menu-toggle" aria-label="Toggle navigation">☰</button>`
    );
    navElement.appendChild(menuButton);

    // Create the links container
    const linksContainer = document.createElement("div");
    linksContainer.id = "links-container";

    // Add links to the container
    links.forEach((link) => {
      const linkElement = toHtmlElement(
        `<a href="${link.src}">${link.title}</a>`
      );

      // Highlight the active page
      if (window.location.pathname.includes(link.src)) {
        linkElement.classList.add("active");
      }

      linksContainer.appendChild(linkElement);
    });

    // Append the links container to the nav
    navElement.appendChild(linksContainer);

    // Event listener for the hamburger menu
    menuButton.addEventListener("click", () => {
      linksContainer.classList.toggle("active");
    });

    document.getElementsByTagName("body").addEventListener("click", () => {
      linksContainer.classList.toggle();
    });

    // Wait for the page to load before adding navigation
    window.addEventListener("load", () => {
      document.body.prepend(navElement);
    });

    shadowRoot.append(navElement);
  }
}

customElements.define("my-navbar", MyNavbar);
