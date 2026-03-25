// Hamburger
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });

      // Close nav on link click
      navLinks.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => navLinks.classList.remove("open"));
      });

      // Scroll reveal
      const reveals = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      reveals.forEach((el) => observer.observe(el));

      // Floating dots
      const heroDotsEl = document.getElementById("heroDots");
      for (let i = 0; i < 20; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        const size = Math.random() * 4 + 2;
        dot.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${40 + Math.random() * 60}%;
      --dur:${4 + Math.random() * 6}s;
      --delay:${Math.random() * 5}s;
    `;
        heroDotsEl.appendChild(dot);
      }
      async function loadPublications(file, targetId) {
        try {
          const response = await fetch(file);
          const text = await response.text();
          const container = document.getElementById(targetId);

          const items = text.split("---");

          items.forEach((item) => {
            const lines = item.trim().split("\n");
            if (lines.length >= 3) {
              const venue = lines[0];
              const title = lines[1];
              const authors = marked.parseInline(lines[2]); // 마크다운 **bold** 처리

              const card = `
          <div class="pub-card reveal">
            <div>
              <p class="pub-venue">${venue}</p>
              <p class="pub-title">${title}</p>
              <p class="pub-authors">${authors}</p>
            </div>
          </div>
        `;
              container.innerHTML += card;
            }
          });
        } catch (error) {
          console.error(`${file} 로드 실패:`, error);
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        loadPublications("markdown/journals.md", "journal-list");
        loadPublications("markdown/conferences.md", "conference-list");
        loadPublications("markdown/patents.md", "patent-list");
      });