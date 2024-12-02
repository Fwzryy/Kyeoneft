const svg = document.querySelector('svg.trail')
const path = svg.querySelector('path')

let points = []
let segments = 100
let mouse = {
  x: 0,
  y: 0,
}

const move = (event) => {
  const x = event.clientX
  const y = event.clientY

  mouse.x = x
  mouse.y = y

  if (points.length === 0) {
    for (let i = 0; i < segments; i++) {
      points.push({
        x: x,
        y: y,
      })
    }
  }
}

const anim = () => {
  // starting point
  let px = mouse.x
  let py = mouse.y

  points.forEach((p, index) => {
    p.x = px
    p.y = py

    let n = points[index + 1]

    if (n) {
      px = px - (p.x - n.x) * 0.6
      py = py - (p.y - n.y) * 0.6
    }
  })

  path.setAttribute('d', `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`)

  requestAnimationFrame(anim)
}

const resize = () => {
  const ww = window.innerWidth
  const wh = window.innerHeight

  svg.style.width = ww + 'px'
  svg.style.height = wh + 'px'
  svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`)
}

document.addEventListener('mousemove', move)
window.addEventListener('resize', resize)

anim()
resize()

// counter
let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter-item .counter');

// Scroll Animation
let CounterObserver = new IntersectionObserver(
  (entries, observer) => {
    let [entry] = entries;
    if (!entry.isIntersecting) return;

    let speed = 200; 
    counters.forEach((counter, index) => {
 
      let suffix = "";
      if (index === 0) suffix = "M"; 
      else if (index === 1) suffix = "k+"; 
      else if (index === 2) suffix = "+";

      function UpdateCounter() {
        const targetNumber = +counter.dataset.target; // Target 
        const initialNumber = +counter.innerText.replace(/[^0-9]/g, ''); 
        const incPerCount = targetNumber / speed; // Increment
        if (initialNumber < targetNumber) {
          counter.innerText = Math.ceil(initialNumber + incPerCount) + suffix;
          setTimeout(UpdateCounter, 40); // 
        } else {
          counter.innerText = targetNumber.toLocaleString() + suffix; 
        }
      }
      UpdateCounter();

      // Slide animation
      if (counter.parentElement.style.animation) {
        counter.parentElement.style.animation = '';
      } else {
        counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${
          index / counters.length + 0.5
        }s`;
      }
    });

    observer.unobserve(section_counter);
  },
  {
    root: null,
    threshold: window.innerWidth > 768 ? 0.4 : 0.3,
  }
);

CounterObserver.observe(section_counter);


 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin)
  // gsap code here!
  gsap.from(".frame-text", {
    scrollTrigger: {
      trigger: ".frame-text",
      toggleActions: "restart reset restart reset"
  },
    y: 100,
    duration: 2,
    ease: "elastic"
  }),
    gsap.fromTo(
      ".text-h1",
      { x: "-100%", opacity: 0 }, // Mulai di atas dengan transparansi 0
      {
        x: "0%",
        opacity: 1,
        duration: 1.9,
        ease: "power3.out",
      }),
      gsap.fromTo(
        ".text-h1 span",
        { y: "100%", opacity: 0 }, // Mulai di bawah
        {
          y: "0%",
          opacity: 1,
          duration: 2,
          delay: 0.7, // Mulai setelah teks utama muncul
          ease: "bounce.out",
        }
      ),
      gsap.fromTo(
        ".text-p",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.3, // Setelah h1 selesai
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".btn-check",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2, // Setelah paragraf selesai
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".navbar",
        { y: -100, opacity: 0 }, // Navbar muncul dari atas
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    
      gsap.fromTo(
        ".navbar-menu li",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
      );
    
      gsap.fromTo(
        ".btn-getinfo",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "elastic.out(1, 0.5)" }
      );
  

  gsap.from(".section_counter", {
    scrollTrigger: {
      trigger: ".section_counter",
      toggleActions: "restart reset restart reset"
  },
    y: 100,
    duration: 3,
    ease: "elastic"
  })

  gsap.fromTo(
    ".cardA-1", 
    { y: 200, opacity: 0 }, // State awal
    { 
      y: 0, 
      opacity: 1, // State akhir
      duration: 1, 
      scrollTrigger: {
        trigger: ".cardA-1", // Elemen yang memicu scroll
        start: "top 80%", // Mulai saat elemen masuk viewport
        end: "top 20%", // Berakhir saat elemen mencapai posisi tertentu
      }
    }
  );
  gsap.fromTo(
    ".cardA-2", 
    { y: 200, opacity: 0 }, // State awal
    { 
      y: 0, 
      opacity: 1, // State akhir
      duration: 1, 
      delay:0.5,
      scrollTrigger: {
        trigger: ".cardA-2", // Elemen yang memicu scroll
        start: "top 80%", // Mulai saat elemen masuk viewport
        end: "top 20%", // Berakhir saat elemen mencapai posisi tertentu
       
      }
    }
  );
  gsap.fromTo(
    ".cardA-3", 
    { y: 200, opacity: 0 }, // State awal
    { 
      y: 0, 
      opacity: 1, // State akhir
      duration: 1, 
      delay:1,
      scrollTrigger: {
        trigger: ".cardA-3", // Elemen yang memicu scroll
        start: "top 80%", // Mulai saat elemen masuk viewport
        end: "top 20%", // Berakhir saat elemen mencapai posisi tertentu
      
      }
    }
  );



 });

