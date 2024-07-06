/**
 * Imports
 */
import Experience from "./Classes/Experience";

/**
 * DOMElement
 */
const canvas = document.querySelector("[data-webgl]");

const init = () => {
    new Experience(canvas);
};
init();
