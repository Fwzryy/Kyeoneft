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

