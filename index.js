document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const title = document.getElementById("title");
  const overlay = document.querySelector(".overlay");
  const whitespace = document.getElementById("whitespace");
  const blackspace = document.getElementById("blackspace");
  const wrapper = document.querySelector(".wrapper");
  const projectName = document.querySelector(".project-name");
  const projectImg = document.querySelector(".project-img");
  let blackClipSize = 0;
  let whiteClipSize = 0;

  gsap.from(".clip-top, .clip-bottom", 2, {
    delay: 0.25,
    height: "51dvh",
    ease: "power4.inOut",
  });

  gsap.to(".marquee", 3.5, {
    delay: 0.75,
    top: "50%",
    ease: "power4.inOut",
  });

  gsap.from(".clip-top .marquee, .clip-bottom .marquee", 5, {
    delay: 1,
    left: "100%",
    ease: "power3.inOut",
  });

  gsap.from(".clip-center .marquee", 5, {
    delay: 1,
    left: "-50%",
    ease: "power3.inOut",
  });

  gsap.to(".clip-top", 2, {
    delay: 6,
    clipPath: "inset(0 0 100% 0)",
    ease: "power4.inOut",
  });

  gsap.to(".clip-bottom", 2, {
    delay: 6,
    clipPath: "inset(100% 0 0 0)",
    ease: "power4.inOut",
  });

  gsap.to(
    ".clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span",
    1,
    {
      delay: 6,
      opacity: 0,
      ease: "power2.inOut",
    }
  );
  gsap.to(".role", 1, {
    delay: 6,
    opacity: 1,
    ease: "power2.inOut",
  });

  gsap.to(overlay, {
    delay: 7,
    "--pointer-scale": "25px",
    ease: "power2.inOut",
  });

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    const y2 = Math.round(clientY - scrollY / window.innerHeight);

    gsap.to(overlay, {
      "--x": `${x}%`,
      "--y": `${y}%`,
      duration: 0.3,
      ease: "sine.out",
    });
    gsap.to(".overlay-projects", {
      "--x-proj": `${x}%`,
      "--y-proj": `${y2}px`,
      duration: 0.3,
      ease: "sine.out",
    });
  });

  window.addEventListener("touchmove", (e) => {
    const { clientX, clientY } = e.touches[0];
    console.log(e);
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    const y2 = Math.round(clientY - scrollY / window.innerHeight);

    gsap.to(overlay, {
      "--x": `${x}%`,
      "--y": `${y}%`,
      duration: 0.3,
      ease: "sine.out",
    });

    gsap.to(".overlay-projects", {
      "--x-proj": `${x}%`,
      "--y-proj": `${y2}px`,
      duration: 0.3,
      ease: "sine.out",
    });

    const rect = title.getBoundingClientRect();
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      gsap.to(overlay, {
        "--pointer-scale": "50px",
      });
    } else {
      gsap.to(overlay, {
        "--pointer-scale": "15px",
      });
    }
    const rect2 = projectName.getBoundingClientRect();
    const rect3 = projectImg.getBoundingClientRect();
    if (
      (clientX >= rect2.left &&
        clientX <= rect2.right &&
        e.touches[0].pageY - scrollY >= rect2.top &&
        e.touches[0].pageY - scrollY <= rect2.bottom) ||
      (clientX >= rect3.left &&
        clientX <= rect3.right &&
        e.touches[0].pageY - scrollY >= rect3.top &&
        e.touches[0].pageY - scrollY <= rect3.bottom)
    ) {
      gsap.to(".overlay-projects", {
        "--pointer-scale-proj": "70px",
      });
    } else {
      gsap.to(".overlay-projects", {
        "--pointer-scale-proj": "15px",
      });
    }
  });

  title.addEventListener("mouseenter", (e) => {
    gsap.to(overlay, {
      "--pointer-scale": "175px",
    });
  });

  title.addEventListener("mouseleave", (e) => {
    gsap.to(overlay, {
      "--pointer-scale": "25px",
    });
  });

  projectName.addEventListener("mouseenter", (e) => {
    gsap.to(".overlay-projects", {
      "--pointer-scale-proj": "175px",
    });
  });

  projectName.addEventListener("mouseleave", (e) => {
    gsap.to(".overlay-projects", {
      "--pointer-scale-proj": "25px",
    });
  });

  projectImg.addEventListener("mouseenter", (e) => {
    gsap.to(".overlay-projects", {
      "--pointer-scale-proj": "200px",
    });
  });

  projectImg.addEventListener("mouseleave", (e) => {
    gsap.to(".overlay-projects", {
      "--pointer-scale-proj": "25px",
    });
  });

  function updateClipPath(slide, scale) {
    const rect = title.getBoundingClientRect();
    const fontSize = parseFloat(window.getComputedStyle(title).fontSize);

    const dotX = rect.left + rect.width * 0.79;
    const dotY = rect.top + fontSize * 0.48;

    slide.style.clipPath = `circle(${scale}% at ${dotX}px ${dotY}px)`;
  }

  function updateRole() {
    const top = title.getBoundingClientRect().bottom;
    const roleTexts = document.querySelectorAll(".role");
    roleTexts.forEach((role) => {
      role.style.top = `${top - 5}px`;
    });
  }

  updateClipPath(whitespace, whiteClipSize);
  updateClipPath(blackspace, blackClipSize);
  updateRole();
  window.addEventListener("resize", () => {
    updateClipPath(whitespace, whiteClipSize);
    updateClipPath(blackspace, blackClipSize);
    updateRole();
  });

  gsap.delayedCall(7.5, () => {
    ScrollTrigger.create({
      trigger: wrapper,
      start: "center center",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        let progress = self.progress;
        if (progress < 0.5) {
          blackClipSize = 0 + 200 * progress;
          whiteClipSize = 0;
          updateClipPath(whitespace, whiteClipSize);
          updateClipPath(blackspace, blackClipSize);
        } else {
          whiteClipSize = 0 + 200 * (progress - 0.5);
          updateClipPath(whitespace, whiteClipSize);
        }
      },
    });

    ScrollTrigger.create({
      trigger: ".sticky",
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress >= 0.5) {
          gsap.to(".project-name", 1, {
            transform: "translateY(0%)",
            ease: "power2.Out",
          });
          gsap.to(".project-img", 1, {
            transform: "translateX(0%)",
            ease: "power2.Out",
          });
        } else {
          gsap.to(".project-name", 1, {
            transform: "translateY(-100%)",
            ease: "power2.Out",
          });
          gsap.to(".project-img", 1, {
            transform: "translateX(100%)",
            ease: "power2.Out",
          });
        }
        if (progress >= 0.85) {
          gsap.to(".project-description", 1, {
            transform: "translateX(0%)",
            ease: "power2.Out",
          });
        } else {
          gsap.to(".project-description", 1, {
            transform: "translateX(-100%)",
            ease: "power2.Out",
          });
        }
      },
    });
  });
});
