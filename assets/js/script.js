// Spinner
const spinnerWrapperEl = document.querySelector(".spinner-wrapper");

window.addEventListener("load", () => {
  spinnerWrapperEl.style.opacity = "0";

  setTimeout(() => {
    spinnerWrapperEl.style.display = "none";
  }, 600);
});

// Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const classes = entry.target.dataset.animate.split(" ");
      entry.target.classList.add("animate__animated", ...classes);

      const row = entry.target.closest(".row");

      if (row && !entry.target.style.animationDelay) {
        const items = Array.from(row.querySelectorAll("[data-animate]"));
        const index = items.indexOf(entry.target);
        entry.target.style.animationDelay = `${index * 0.15}s`;
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));

document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const menu = dropdown.querySelector(".dropdown-menu");

  dropdown.addEventListener("hide.bs.dropdown", (e) => {
    e.preventDefault();
    menu.classList.remove("show");

    setTimeout(() => {
      dropdown.classList.remove("show");
      menu.style.display = "none";
    }, 250);
  });

  dropdown.addEventListener("show.bs.dropdown", () => {
    menu.style.display = "block";
    requestAnimationFrame(() => {
      menu.classList.add("show");
    });
  });
});

// Go to Top Button
const goTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    goTopBtn.classList.remove("d-none");
    goTopBtn.classList.add("animate__fadeInUp");
    goTopBtn.classList.remove("animate__fadeOutDown");
  } else {
    goTopBtn.classList.add("animate__fadeOutDown");
    goTopBtn.classList.remove("animate__fadeInUp");
    // Hide after animation completes
    setTimeout(() => {
      if (goTopBtn.classList.contains("animate__fadeOutDown")) {
        goTopBtn.classList.add("d-none");
      }
    }, 500);
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
