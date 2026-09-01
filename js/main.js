/* Suba Mangalam Events — Main Interactive JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Highlight Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. FAQ Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Interactive Event Package Estimator Tool
  const eventTypeSelect = document.getElementById('calc-event-type');
  const guestCountInput = document.getElementById('calc-guests');
  const decorTierSelect = document.getElementById('calc-decor');
  const cateringTierSelect = document.getElementById('calc-catering');
  const priceDisplay = document.getElementById('calc-price-display');
  const whatsappCalcBtn = document.getElementById('calc-whatsapp-btn');

  function calculateEstimate() {
    if (!eventTypeSelect || !guestCountInput || !decorTierSelect || !cateringTierSelect || !priceDisplay) return;

    const eventMultiplier = parseFloat(eventTypeSelect.value) || 1.0;
    const guests = parseInt(guestCountInput.value) || 100;
    const decorBase = parseInt(decorTierSelect.value) || 25000;
    const perPlateCatering = parseInt(cateringTierSelect.value) || 350;

    const totalCatering = guests * perPlateCatering;
    const grandTotal = Math.round((decorBase + totalCatering) * eventMultiplier);

    const formattedPrice = "₹" + grandTotal.toLocaleString('en-IN');
    priceDisplay.textContent = formattedPrice;

    if (whatsappCalcBtn) {
      const eventName = eventTypeSelect.options[eventTypeSelect.selectedIndex].text;
      const message = `Hello Suba Mangalam Events, I calculated a quick estimate on your website for a ${eventName} with ${guests} guests. Estimated Total: ${formattedPrice}. I would like to check date availability!`;
      whatsappCalcBtn.href = `https://wa.me/919025769906?text=${encodeURIComponent(message)}`;
    }
  }

  if (eventTypeSelect && guestCountInput && decorTierSelect && cateringTierSelect) {
    eventTypeSelect.addEventListener('change', calculateEstimate);
    guestCountInput.addEventListener('input', calculateEstimate);
    decorTierSelect.addEventListener('change', calculateEstimate);
    cateringTierSelect.addEventListener('change', calculateEstimate);
    calculateEstimate();
  }

  // 6. Contact & Booking Form WhatsApp Submit Handler
  const bookingForm = document.getElementById('event-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('booking-name')?.value || '';
      const phone = document.getElementById('booking-phone')?.value || '';
      const eventType = document.getElementById('booking-event-type')?.value || '';
      const eventDate = document.getElementById('booking-date')?.value || '';
      const guests = document.getElementById('booking-guests')?.value || '';
      const location = document.getElementById('booking-location')?.value || '';
      const notes = document.getElementById('booking-notes')?.value || '';

      const text = `*New Event Booking Request — Suba Mangalam Events*\n\n` +
        `👤 *Client Name*: ${name}\n` +
        `📞 *Phone*: ${phone}\n` +
        `🎉 *Event Type*: ${eventType}\n` +
        `📅 *Date*: ${eventDate}\n` +
        `👥 *Expected Guests*: ${guests}\n` +
        `📍 *Location*: ${location}\n` +
        `📝 *Special Details*: ${notes}\n\n` +
        `Please confirm date availability and contact me.`;

      window.open(`https://wa.me/919025769906?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
});
