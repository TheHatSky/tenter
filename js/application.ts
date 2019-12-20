import "./vendor/evil-icons.js";
import "./snap.scss";

import { Settings } from "./Settings";

class Application {
  public settings: Settings;

  constructor() {
    this.settings = new Settings();

    document
      .querySelectorAll<HTMLElement>("[data-image-name]")
      .forEach(element => {
        const imageName = element.getAttribute("data-image-name");
        element.style.backgroundImage = `url(images/${imageName}m.jpg)`;
      });

    setTimeout(() => {
      let loader = document.querySelector<HTMLElement>(".loader");
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 300);
    }, 1000);
  }
}
new Application();
