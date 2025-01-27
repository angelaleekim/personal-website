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

const navElement = document.createElement("nav");

navElement.appendChild(
  toHtmlElement(`<h1 id="logo"><a href="index.html">AK</a></h1>`)
);

links.forEach((link) => {
  const linkElement = toHtmlElement(`<a href="${link.src}">${link.title}</a>`);

  // Check if the current page matches the link's href
  if (window.location.pathname.includes(link.src)) {
    linkElement.classList.add("active"); // Add active class if it matches
  }

  navElement.appendChild(linkElement);
});

// Wait for the page to load before adding navigation
window.addEventListener("load", () => {
  document.body.prepend(navElement);
});

export default navElement;
