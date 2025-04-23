// Add this function to close the modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById("projectModal")
    if (event.target == modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  }
  
  // Add this function to close the modal with the close button
  function closeModal() {
    document.getElementById("projectModal").style.display = "none"
    document.body.style.overflow = "auto"
  }
  
  // Enhance the showCategory function to add smooth transitions
  function showCategory(category) {
    const categories = ["projects", "arts", "photography"]
  
    categories.forEach((cat) => {
      const element = document.getElementById(cat)
      if (cat === category) {
        element.style.display = "grid"
        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }, 50)
      } else {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        setTimeout(() => {
          element.style.display = "none"
        }, 300)
      }
    })
  
    // Update active button
    const buttons = document.querySelectorAll(".buttons h2")
    buttons.forEach((btn) => {
      if (btn.textContent.toLowerCase() === category.toUpperCase()) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  }
  // DOM Elements
  const header = document.querySelector("header")
  const menuBtn = document.querySelector(".menu-btn")
  const navList = document.querySelector(".navlist")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")
  const contactForm = document.getElementById("contactForm")
  const modal = document.getElementById("projectModal")
  const closeModalElement = document.querySelector(".close-modal")
  
  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
  
  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("active")
    menuBtn.classList.toggle("active")
  })
  
  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active")
      menuBtn.classList.remove("active")
    })
  })
  
  // Scroll spy for navigation
  window.addEventListener("scroll", () => {
    let current = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
  
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })
  
  // Project filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")
  
      const filter = btn.getAttribute("data-filter")
  
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
  
  // Gallery tabs
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))
  
      // Add active class to clicked button
      btn.classList.add("active")
  
      // Show corresponding content
      const tabId = btn.getAttribute("data-tab") + "-tab"
      document.getElementById(tabId).classList.add("active")
    })
  })
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value
  
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show an alert
      console.log({ name, email, subject, message })
  
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }
  
  // Project modal
  function showProjectDetails(title, images, description) {
    // Extract tech tags from the title if they exist
    let displayTitle = title;
    let techTags = [];
    
    // Check if title contains tech tags in parentheses
    if (title.includes('(') && title.includes(')')) {
      const titleParts = title.split('(');
      displayTitle = titleParts[0].trim();
      
      // Extract tech tags from parentheses
      const techString = titleParts[1].replace(')', '').trim();
      techTags = techString.split('/').map(tag => tag.trim());
    }
    
    // Set the display title
    document.getElementById("modalTitle").textContent = displayTitle;
    document.getElementById("modalDescription").textContent = description;
    
    // Handle tech tags
    const modalTechTags = document.getElementById("modalTechTags");
    modalTechTags.innerHTML = "";
    
    techTags.forEach(tag => {
      const tagElement = document.createElement("span");
      tagElement.className = "tech-tag";
      tagElement.textContent = tag;
      modalTechTags.appendChild(tagElement);
    });
    
    // Set up images
    const modalImagesContainer = document.getElementById("modalImagesContainer");
    modalImagesContainer.innerHTML = "";
    
    images.forEach((imageSrc) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = displayTitle;
      img.loading = "lazy";
      
      // Create a container for each image for better styling
      const imgContainer = document.createElement("div");
      imgContainer.className = "modal-image-container";
      imgContainer.appendChild(img);
      
      // Add glass animation to each image container
      const imageGlassAnimation = document.createElement("div");
      imageGlassAnimation.className = "glass-animation";
      imgContainer.appendChild(imageGlassAnimation);
      
      modalImagesContainer.appendChild(imgContainer);
    });
    
    // Add glass animation to the modal content
    const modalContent = document.querySelector(".modal-content");
    
    // Clear any existing glass animations
    const existingAnimation = modalContent.querySelector(".modal-glass-animation");
    if (existingAnimation) {
      existingAnimation.remove();
    }
    
    // Create and add the glass animation element
    const glassAnimation = document.createElement("div");
    glassAnimation.className = "modal-glass-animation";
    modalContent.appendChild(glassAnimation);
    
    // Show the modal with a slight delay for smoother animation
    setTimeout(() => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }, 50);
  }
  
  // Close modal
  if (closeModalElement) {
    closeModalElement.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }
  
  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
  
  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in, .skill-progress, .section-title");
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add("active");
        element.classList.add("animate");
      }
    });
  }
  
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", () => {
    // Add animation classes to elements
    document.querySelectorAll(".section-title").forEach(title => {
      title.classList.add("fade-in");
    });
    
    document.querySelectorAll(".project-card:nth-child(odd)").forEach(card => {
      card.classList.add("slide-in-left");
    });
    
    document.querySelectorAll(".project-card:nth-child(even)").forEach(card => {
      card.classList.add("slide-in-right");
    });
    
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.classList.add("zoom-in");
    });
    
    document.querySelectorAll(".skill-item").forEach(item => {
      item.classList.add("fade-in");
    });
    
    document.querySelectorAll(".timeline-item").forEach(item => {
      item.classList.add("fade-in");
    });
    
    document.querySelectorAll(".contact-item").forEach(item => {
      item.classList.add("fade-in");
    });
    
    document.querySelectorAll(".info-item").forEach(item => {
      item.classList.add("fade-in");
    });
    
    document.querySelectorAll(".about-image").forEach(img => {
      img.classList.add("zoom-in");
    });
    
    document.querySelectorAll(".about-text").forEach(text => {
      text.classList.add("fade-in");
    });
    
    // Run animation on page load
    setTimeout(animateOnScroll, 300);
  });
  
  // Star background parallax effect
  document.addEventListener("mousemove", function(e) {
    const stars = document.querySelectorAll(".stars, .stars2, .stars3");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
      const depth = 10 * (index + 1);
      const moveX = (x * depth) - (depth / 2);
      const moveY = (y * depth) - (depth / 2);
      star.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
  
  // Initialize the page
  document.addEventListener("DOMContentLoaded", () => {
    // Set first tab as active by default
    if (tabBtns.length > 0 && tabContents.length > 0) {
      tabBtns[0].classList.add("active")
      tabContents[0].classList.add("active")
    }
  
    // Set 'all' filter as active by default
    if (filterBtns.length > 0) {
      filterBtns[0].classList.add("active")
    }
  
    // Animate skills on page load
    const skillBars = document.querySelectorAll(".skill-progress")
    skillBars.forEach((bar) => {
      bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent
    })
  })
  
  // Initialize the page with projects category shown by default
  document.addEventListener("DOMContentLoaded", () => {
    showCategory("projects")
  
    // Add parallax effect to stars
    window.addEventListener("mousemove", (e) => {
      const stars1 = document.getElementById("stars")
      const stars2 = document.getElementById("stars2")
      const stars3 = document.getElementById("stars3")
  
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
  
      stars1.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px)`
      stars2.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`
      stars3.style.transform = `translateX(${x * 30}px) translateY(${y * 30}px)`
    })
  })
  
  // Add this function to animate the skill progress bars when they come into view
  function animateSkillBars() {
    const skillElements = document.querySelectorAll('.skill-progress');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in view
            if (entry.isIntersecting) {
                // Add the animate class to trigger the width animation
                entry.target.classList.add('animate');
                // Stop observing once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each skill progress bar
    skillElements.forEach(skill => {
        observer.observe(skill);
    });
  }
  
  // Enhance tech stack animations
  function animateTechStack() {
    const skillItems = document.querySelectorAll('.skill-item');
    const techStack = document.querySelector('.tech-stack');
    
    // Create an Intersection Observer for skill items
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the element is in view
        if (entry.isIntersecting) {
          // Add the animate class to trigger the animation
          entry.target.classList.add('animate');
          // Stop observing once it's animated
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each skill item
    skillItems.forEach(item => {
      observer.observe(item);
    });
    
    // Add mousemove effect to tech stack
    if (techStack) {
      techStack.addEventListener('mousemove', (e) => {
        const rect = techStack.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position within the element
        const y = e.clientY - rect.top;  // Y position within the element
        
        // Calculate rotation based on mouse position
        const tiltX = ((y / rect.height) * 10) - 5; // -5 to 5 degrees
        const tiltY = (-(x / rect.width) * 10) + 5; // -5 to 5 degrees
        
        // Apply the tilt effect
        techStack.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });
      
      // Reset the tilt effect when mouse leaves
      techStack.addEventListener('mouseleave', () => {
        techStack.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-5px)';
        
        // Gradually return to normal position
        setTimeout(() => {
          techStack.style.transform = 'translateY(0)';
        }, 200);
      });
    }
  }
  
  // Add text animation effects
  function animateText() {
    // Create text reveal animations for paragraphs and other text
    const textElements = document.querySelectorAll('p, .info-item p, .skill-description');
    
    textElements.forEach(element => {
      element.classList.add('text-reveal');
    });
    
    // Create an intersection observer for text elements
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe each text element
    textElements.forEach(element => {
      textObserver.observe(element);
    });
    
    // Add character-by-character animation to main heading
    const mainHeading = document.querySelector('#home h1');
    if (mainHeading) {
      const text = mainHeading.innerText;
      mainHeading.innerHTML = '';
      
      // Add each character with staggered animation
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'char-animation';
        span.style.animationDelay = `${i * 0.05}s`;
        span.textContent = char === ' ' ? '\u00A0' : char;
        mainHeading.appendChild(span);
      }
    }
    
    // Add hover effect for skill titles
    const skillTitles = document.querySelectorAll('.skill-info h3');
    skillTitles.forEach(title => {
      title.addEventListener('mouseover', function() {
        this.style.color = '#ffffff';
        this.style.textShadow = '0 0 15px rgba(100, 255, 218, 0.8)';
      });
      
      title.addEventListener('mouseout', function() {
        this.style.color = '#64ffda';
        this.style.textShadow = '0 0 10px rgba(100, 255, 218, 0.2)';
      });
    });
  }
  
  // Call the function when the page is loaded
  document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
    
    // Add glass animations
    addGlassAnimations();
    
    // Add tech stack animations
    animateTechStack();
    
    // Add text animations
    animateText();
  });
  
  // Add glass animation elements to glassmorphism containers
  function addGlassAnimations() {
    const glassElements = document.querySelectorAll('.glass-container, .contact-item, .skill-item, .project-card, .education-column');
    
    glassElements.forEach(element => {
      // Create the glass animation element
      const glassAnimation = document.createElement('div');
      glassAnimation.classList.add('glass-animation');
      
      // Add it to the glass element
      element.appendChild(glassAnimation);
    });
  }
  