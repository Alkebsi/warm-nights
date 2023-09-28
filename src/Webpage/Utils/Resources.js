import { LoadingManager } from "three";
import gsap from "gsap";

export default class Resources {
  constructor(loadingPanel) {
    this.loadingPanel = loadingPanel;
    this.loadingCaption = this.loadingPanel.children[0];
    this.loadingProgress = this.loadingPanel.children[1];

    this.ready = false;
    this.progress = 0;

    this.setInstance();
    // this.loadingPanelMgr();
  }

  setInstance() {
    this.loadingManager = new LoadingManager(
      () => {
        // console.log("Elements Loaded");
        this.ready = true;
        this.loadingPanelMgr();
      },
      (itemURL, loadedItems, totalItems) => {
        this.progress = Math.round((loadedItems / totalItems) * 100);
        this.loadingPanelMgr();
        // console.log(`Loading ${this.progress}`);
      }
    );
  }

  loadingPanelMgr() {
    this.loadingCaption.innerHTML = `Loading ${this.progress}%`;

    if (this.ready) {
      gsap.to(this.loadingPanel, {
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
        opacity: 0,
      });
      window.setTimeout(() => {
        this.loadingPanel.style.display = "none";
      }, 2200);
    }
  }
}
