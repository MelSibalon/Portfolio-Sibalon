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
    document.getElementById("modalTitle").textContent = title
    document.getElementById("modalDescription").textContent = description
  
    const modalImagesContainer = document.getElementById("modalImagesContainer")
    modalImagesContainer.innerHTML = ""
  
    images.forEach((imageSrc) => {
      const img = document.createElement("img")
      img.src = imageSrc
      img.alt = title
      modalImagesContainer.appendChild(img)
    })
  
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
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
    const elements = document.querySelectorAll(".skill-progress, .timeline-item, .project-card, .gallery-item")
  
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2
  
      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }
  
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)
  
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
  