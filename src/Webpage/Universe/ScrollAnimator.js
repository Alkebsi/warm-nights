import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteManager from "../SiteManager";

export default class ScrollAnimator {
  constructor() {
    this.siteManager = new SiteManager();
    this.camera = this.siteManager.camera;
    this.interval = this.siteManager.interval;

    // Registering GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    this.cameraAnimSteps = 0;

    this.setCameraMovement();
    this.setTextRevealingEffect();
  }

  setCameraMovement(animSteps) {
    switch (animSteps) {
      case 1:
        gsap.to(this.camera.instance.position, {
          duration: 2,
          ease: "power2.inOut",
          x: 10.77,
          y: 5.16,
          z: 3.18,
        });
        break;
      case 2:
        gsap.to(this.camera.instance.position, {
          duration: 2,
          ease: "power2.inOut",
          x: -5.7,
          y: 1.9,
          z: 9.5,
        });
        break;
      case 3:
        gsap.to(this.camera.instance.position, {
          duration: 2,
          ease: "power2.inOut",
          x: -4,
          y: 5.5,
          z: 2.8,
        });

        gsap.to(this.camera.lookAtObject, {
          duration: 2,
          ease: "power2.inOut",
          x: 0,
          y: 2.8,
          z: -3.5,
        });
        break;
      case 4:
        gsap.to(this.camera.instance.position, {
          duration: 2,
          ease: "power2.inOut",
          x: 0,
          y: 3.3,
          z: 12.8,
        }); 
    }
  }

  setTextRevealingEffect() {
    // Animating the title
    gsap.to(".content-title", {
      duration: 0.2,
      opacity: 0,
      scale: 1.1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-two",
        start: "bottom bottom",
        toggleActions: "play none none reverse",
        onLeaveBack: () => {
          this.setCameraMovement(1);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    // Animating the paragraphs
    gsap.to(".parg1", {
      duration: 0.5,
      delay: 2,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-two",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(2);
        },
        onEnterBack: () => {
          this.setCameraMovement(2);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg2", {
      duration: 0.5,
      delay: 2,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-three",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(3);
        },
        onEnterBack: () => {
          this.setCameraMovement(3);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg3", {
      duration: 0.5,
      delay: 2,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-four",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(4);
        },
        onEnterBack: () => {
          this.setCameraMovement(4);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg4", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-five",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(5);
        },
        onEnterBack: () => {
          this.setCameraMovement(5);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg5", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-six",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(6);
        },
        onEnterBack: () => {
          this.setCameraMovement(6);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg6", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-seven",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(7);
        },
        onEnterBack: () => {
          this.setCameraMovement(7);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg7", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-eight",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(8);
        },
        onEnterBack: () => {
          this.setCameraMovement(8);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg8", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-nine",
        start: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          this.setCameraMovement(9);
        },
        onEnterBack: () => {
          this.setCameraMovement(9);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });

    gsap.to(".parg9", {
      duration: 0.5,
      opacity: 1,
      scale: 1.1,
      pointerEvents: "initial",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#sp-eleven",
        start: "bottom bottom",
        toggleActions: "play none play reverse",
        onEnter: () => {
          this.setCameraMovement(10);
        },
        onEnterBack: () => {
          this.setCameraMovement(10);
        },
        // markers: {
        //   startColor: "#0f0",
        //   endColor: "#f00",
        //   fontSize: "1rem",
        // },
      },
    });
  }
}
