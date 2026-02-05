let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

  // Scroll animations
  animateOnScroll();
  
  // Update scroll progress bar
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
  }
}

// Scroll Animation Function
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation classes to elements
window.addEventListener('DOMContentLoaded', () => {
  // Add fade-in to specialty boxes
  document.querySelectorAll('.speciality .box').forEach((box, index) => {
    box.classList.add('fade-in');
    box.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add slide-in to popular boxes
  document.querySelectorAll('.popular .box').forEach((box, index) => {
    box.classList.add('scale-in');
    box.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add animation to steps
  document.querySelectorAll('.steps .box').forEach((box, index) => {
    box.classList.add('slide-in-left');
    box.style.transitionDelay = `${index * 0.15}s`;
  });

  // Add animation to gallery
  document.querySelectorAll('.gallery .box').forEach((box, index) => {
    box.classList.add('fade-in');
    box.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add animation to reviews
  document.querySelectorAll('.review .box').forEach((box, index) => {
    box.classList.add('slide-in-right');
    box.style.transitionDelay = `${index * 0.2}s`;
  });

  // Typing effect disabled to preserve HTML structure
  // Home heading will use CSS animation instead
  const heading = document.querySelector('.home .content h3');
  if (heading) {
    // Just add a fade-in class
    heading.classList.add('fade-in-text');
  }

  // Animate stats counter
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statItems = document.querySelectorAll('.stat-item h4');
        statItems.forEach(stat => {
          const target = stat.textContent;
          const isNumber = /\d+/.test(target);
          
          if (isNumber) {
            const number = parseInt(target);
            let current = 0;
            const increment = number / 50;
            const suffix = target.replace(/\d+/, '');
            
            const counter = setInterval(() => {
              current += increment;
              if (current >= number) {
                stat.textContent = number + suffix;
                clearInterval(counter);
              } else {
                stat.textContent = Math.floor(current) + suffix;
              }
            }, 30);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const homeStats = document.querySelector('.home-stats');
  if (homeStats) {
    statsObserver.observe(homeStats);
  }

  // Initial animation check
  animateOnScroll();
});

// Form Validation
const orderForm = document.querySelector('.order form');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = orderForm.querySelector('input[type="text"]').value;
    const email = orderForm.querySelector('input[type="email"]').value;
    const number = orderForm.querySelector('input[type="number"]').value;
    const foodName = orderForm.querySelectorAll('input[type="text"]')[1].value;
    const address = orderForm.querySelector('textarea').value;
    
    if (!name || !email || !number || !foodName || !address) {
      shakeElement(orderForm);
      alert('Please fill all fields!');
      return;
    }
    
    if (!email.includes('@')) {
      shakeElement(orderForm.querySelector('input[type="email"]'));
      alert('Please enter a valid email!');
      return;
    }
    
    if (number.length < 10) {
      shakeElement(orderForm.querySelector('input[type="number"]'));
      alert('Please enter a valid phone number!');
      return;
    }
    
    // Success animation
    orderForm.style.transform = 'scale(1.02)';
    setTimeout(() => {
      orderForm.style.transform = 'scale(1)';
    }, 300);
    
    alert(`Thank you ${name}! Your order for ${foodName} has been received. We'll contact you at ${number} soon!`);
    orderForm.reset();
  });
}

// Shake animation function
function shakeElement(element) {
  element.style.animation = 'shake 0.5s';
  setTimeout(() => {
    element.style.animation = '';
  }, 500);
}

// Add hover effect to order buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  // Add click ripple effect
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
  const homeImage = document.querySelector('.home .image img');
  if (homeImage) {
    const scrolled = window.pageYOffset;
    homeImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add floating particles to home section
function createParticles() {
  const homeSection = document.querySelector('.home');
  if (!homeSection) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    homeSection.appendChild(particle);
  }
}

// Create particles when page loads
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateCursor() {
  const distX = mouseX - followerX;
  const distY = mouseY - followerY;
  
  followerX += distX * 0.1;
  followerY += distY * 0.1;
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .btn, input, textarea').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorFollower.style.transform = 'scale(1.5)';
  });
  
  elem.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
  });
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Add tilt effect to cards
document.querySelectorAll('.popular .box, .gallery .box').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Interactive food emoji reactions
const floatIcons = document.querySelectorAll('.float-icon');
floatIcons.forEach(icon => {
  icon.addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = '';
      this.style.transform = 'scale(1.5) rotate(360deg)';
      setTimeout(() => {
        this.style.transform = '';
      }, 500);
    }, 10);
  });
});

// Add confetti effect on button click
function createConfetti(x, y) {
  const colors = ['#ff3838', '#ffd700', '#ff6b6b', '#4CAF50', '#2196F3'];
  
  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
    confetti.style.setProperty('--ty', -Math.random() * 200 - 50 + 'px');
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 1000);
  }
}

// Add confetti on order buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    createConfetti(e.clientX, e.clientY);
  });
});

// Loader
function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;