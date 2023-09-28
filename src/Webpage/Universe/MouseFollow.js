import SiteManager from "../SiteManager";

export default class MouseFollow {
  constructor() {
    this.siteManager = new SiteManager();
    this.sizes = this.siteManager.sizes;
    this.interval = this.siteManager.interval;

    this.mouseLocation = {
      x: 0,
      y: 0,
    };
    this.lineLocation = 0;

    this.setInstance();
  }

  setInstance() {
    // Creating the DOM element
    this.instance = document.createElement("DIV");
    this.instance.setAttribute("id", "mouse-follow-element");
    document.body.appendChild(this.instance);

    // Adding the article content inside this instance
    this.article = [...document.querySelector("#content-article").children];

    for (const child of this.article) {
      const element = child.cloneNode(true);
      element.attributes.class.nodeValue += " articles-clone";

      if (
        element.attributes.class.nodeValue.search(/content-ps|content-title/i) === 0
      ) {
        this.instance.appendChild(element);
      }
    }
  }

  update() {
    // Update the mouse location events
    // this.mouseLocation.x += ((this.sizes.mouseLocation.x * 0.5 + 0.5) * this.sizes.width - this.mouseLocation.x) * 0.1;
    if (this.sizes.mouseLocation.y == 0 && this.lineLocation === 0) {
      this.mouseLocation.y = 0;
    } else {
      this.mouseLocation.y +=
        ((-this.sizes.mouseLocation.y * 0.5 + 0.5) * this.sizes.height -
          this.mouseLocation.y) *
        0.1;
      this.lineLocation = this.mouseLocation.y * 2;
    }

    // Make the line follows the cusror
    this.instance.style.height = this.mouseLocation.y + "px";

    if (this.mouseLocation.y >= this.sizes.height * 0.35) {
      this.instance.style.borderBottom = "170px solid transparent";
    } else {
      this.instance.style.borderBottom = "1px solid transparent";
    }
  }
}
