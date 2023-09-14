import './style.css'
import Experience from './Experience/Experience'

const portfolio = new Experience(document.querySelector(".portfolio-canvas"))

document.addEventListener("DOMContentLoaded", () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar) => {
      let percent = bar.getAttribute('data-percent');
      let fill = document.createElement('div');
      fill.className = 'skill-fill';
      fill.style.width = '0%';
      fill.style.height = '100%';
      fill.style.borderRadius = '20px';
      fill.style.position = 'absolute';
      bar.appendChild(fill);
  
      setTimeout(() => {
        fill.style.width = percent;
      }, 50);
    });
  });
  