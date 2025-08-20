// Navigation with active link management and smooth fading effect
function navigateTo(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach(section => {
    if(section.id === sectionId) {
      section.classList.add('active-section');
    } else {
      section.classList.remove('active-section');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').substring(1) === sectionId);
  });

  // Clear messages on section change
  document.getElementById('message').textContent = '';
  document.getElementById('formResponse').textContent = '';
  clearErrors();
}

// Show current date/time
function showDate() {
  const now = new Date();
  document.getElementById('message').textContent = 'Current date and time: ' + now.toLocaleString();
}

// Clear error messages
function clearErrors() {
  ['nameError', 'emailError', 'messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

// Validate form inputs with detailed error messages and submission response
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  clearErrors();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const messageInput = this.message.value.trim();
  const responseDiv = document.getElementById('formResponse');

  let isValid = true;

  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'Please enter a valid name (min 2 characters).';
    isValid = false;
  }

  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (messageInput.length < 5) {
    document.getElementById('messageError').textContent = 'Please enter a message (min 5 characters).';
    isValid = false;
  }

  if (isValid) {
    responseDiv.style.color = 'green';
    responseDiv.textContent = `Thank you, ${name}! Your message has been received.`;
    this.reset();
  } else {
    responseDiv.style.color = 'red';
    responseDiv.textContent = 'Please correct the errors above and try again.';
  }
});

// Basic email validation regex
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show "Back to Top" button on scroll and handle click
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize with the home section active
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});
