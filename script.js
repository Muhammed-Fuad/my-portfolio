const form = document.getElementById("contact-form");
 const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();


    // Grab input values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validate fields
    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "red";
      return;
    }

    // Simple email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "red";
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // ✅ Reset the form right after clicking submit
    form.reset();

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent.";
        status.style.color = "green";
      } else {
        const data = await response.json();
        status.textContent = data.errors
          ? data.errors.map(err => err.message).join(", ")
          : "Oops! Something went wrong.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again.";
      status.style.color = "red";
    }
  });

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.toggle-menu');
    const navMenu = document.querySelector('.nav-menu');
  
    toggleMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  });
  
