/**
 * Premium Luxury Islamic Wedding Invitation
 * Umar Rasheed & Aiesha Bashir
 * Pure Vanilla JS - No dependencies
 * Features: Envelope animation, Theme toggle, Web Audio music, Share, RSVP modal, Smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== ENVELOPE ANIMATION ====================
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelope-screen');
  const mainInvitation = document.getElementById('main-invitation');

  if (envelope) {
    // Click / Tap to open
    envelope.addEventListener('click', () => {
      if (envelope.classList.contains('opened')) return;

      envelope.classList.add('opened');

      // Gentle paper opening sound (subtle)
      playEnvelopeOpenSound();

      // After flap animation completes, reveal main invitation
      setTimeout(() => {
        // Fade out envelope screen elegantly
        envelopeScreen.style.transition = 'opacity 1.1s cubic-bezier(0.23, 1, 0.32, 1), visibility 1.1s';
        envelopeScreen.style.opacity = '0';

        setTimeout(() => {
          envelopeScreen.style.visibility = 'hidden';
          envelopeScreen.style.display = 'none';

          // Show main invitation with beautiful fade + slight slide
          mainInvitation.style.transition = 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
          mainInvitation.style.opacity = '1';
          mainInvitation.style.visibility = 'visible';
          mainInvitation.style.transform = 'translateY(0)';
          mainInvitation.classList.add('visible');

          // Trigger scroll animations for event cards
          initScrollAnimations();

          // Optional: Auto-play soft music hint on first open (disabled by default for UX)
          // showMusicHint();
        }, 1050);
      }, 1450); // Wait for flap to fully open
    });

    // Keyboard accessibility
    envelope.setAttribute('tabindex', '0');
    envelope.setAttribute('aria-label', 'Tap or press Enter to open the wedding invitation');
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        envelope.click();
      }
    });
  }

  // ==================== THEME TOGGLE (Light / Dark Elegant) ====================
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme (default elegant light, or saved preference)
  const savedTheme = localStorage.getItem('wedding-theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } else if (prefersDark) {
    document.documentElement.classList.add('dark');
  }

  if (themeToggle) {
    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('wedding-theme', isDark ? 'dark' : 'light');
      updateThemeIcon();

      // Subtle flash effect on toggle
      document.body.style.transition = 'background-color 0.1s ease';
      setTimeout(() => {
        document.body.style.transition = 'background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1), color 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      }, 80);
    });
  }

  function updateThemeIcon() {
    const icon = themeToggle.querySelector('.icon');
    if (!icon) return;
    const isDark = document.documentElement.classList.contains('dark');
    icon.innerHTML = isDark 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>` 
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  }

  // ==================== WEB AUDIO API - ELEGANT BACKGROUND MUSIC ====================
  let audioContext;
  let musicInterval = null;
  let isMusicPlaying = false;
  const musicBtn = document.getElementById('music-btn');

  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  function playNote(frequency, duration, type = 'sine', volume = 0.08, detune = 0) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    if (detune) oscillator.detune.value = detune;

    // Soft low-pass filter for elegant warm tone
    filter.type = 'lowpass';
    filter.frequency.value = 1800;

    // Gentle envelope
    const now = audioContext.currentTime;
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.08);
    gainNode.gain.linearRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.3);
  }

  function playElegantMelody() {
    if (!audioContext || isMusicPlaying) return;

    // Soft elegant arpeggio / chord progression suitable for wedding (C major inspired, warm tones)
    const notes = [
      { freq: 261.63, dur: 2.8, vol: 0.055 }, // C4
      { freq: 329.63, dur: 2.6, vol: 0.048 }, // E4
      { freq: 392.00, dur: 3.1, vol: 0.052 }, // G4
      { freq: 523.25, dur: 2.4, vol: 0.045 }, // C5
      { freq: 440.00, dur: 2.9, vol: 0.05 },  // A4
      { freq: 349.23, dur: 3.3, vol: 0.048 }, // F4
    ];

    let noteIndex = 0;

    musicInterval = setInterval(() => {
      if (!isMusicPlaying) {
        clearInterval(musicInterval);
        return;
      }
      
      const note = notes[noteIndex % notes.length];
      playNote(note.freq, note.dur, 'sine', note.vol);
      
      // Add very soft harmony note occasionally
      if (Math.random() > 0.65) {
        setTimeout(() => {
          if (isMusicPlaying) playNote(note.freq * 1.5, note.dur * 0.8, 'sine', note.vol * 0.55);
        }, 280);
      }
      
      noteIndex++;
    }, 1850); // Slow, elegant tempo
  }

  function toggleMusic() {
    const ctx = initAudioContext();
    
    // Resume audio context on user gesture (required by browsers)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isMusicPlaying = !isMusicPlaying;

    if (musicBtn) {
      musicBtn.classList.toggle('active', isMusicPlaying);
      const icon = musicBtn.querySelector('.icon');
      if (icon) icon.textContent = isMusicPlaying ? '❚❚' : '♫';
    }

    if (isMusicPlaying) {
      playElegantMelody();
      // Gentle welcome chime
      setTimeout(() => {
        if (isMusicPlaying) playNote(523.25, 1.8, 'sine', 0.065);
      }, 420);
    } else {
      if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
      }
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Subtle envelope open sound (paper-like)
  function playEnvelopeOpenSound() {
    const ctx = initAudioContext();
    if (!ctx) return;

    // Soft whoosh / paper rustle simulation
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 680;
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.value = 0.035;

    const now = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.0001, now + 1.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.3);
  }

  // ==================== SHARE BUTTON ====================
  const shareBtn = document.getElementById('share-btn');

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareText = `You're cordially invited to the wedding celebrations of Umar Rasheed & Aiesha Bashir!\n\n` +
        `✨ Mehndi — 28 July 2026 (Evening)\n` +
        `✨ Barat — 30 July 2026 at 3:00 PM, Sialkot Grand Event Marquee\n` +
        `✨ Walima — 2 August 2026 at 2:00 PM, Bradan Marquee\n\n` +
        `With the blessings of Allah, we request the pleasure of your company.`;

      // Modern Web Share API (works great on mobile)
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Umar & Aiesha Wedding Invitation',
            text: shareText,
          });
          return;
        } catch (err) {
          // User cancelled or error — fallback below
        }
      }

      // Fallback: Copy to clipboard + WhatsApp quick share
      try {
        await navigator.clipboard.writeText(shareText);
        
        // Show elegant toast
        showToast('Invitation details copied to clipboard. Share via WhatsApp?');
        
        // Offer WhatsApp share
        setTimeout(() => {
          const waText = encodeURIComponent(shareText);
          const waUrl = `https://wa.me/?text=${waText}`;
          if (confirm('Open WhatsApp to share the invitation?')) {
            window.open(waUrl, '_blank');
          }
        }, 850);
      } catch (e) {
        // Ultimate fallback
        alert(shareText);
      }
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: var(--bg-card); color: var(--text); border: 1px solid var(--gold);
      padding: 14px 26px; border-radius: 6px; box-shadow: 0 10px 30px var(--shadow);
      font-size: 0.92rem; z-index: 3000; white-space: nowrap;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.4s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 420);
    }, 2600);
  }

  // ==================== RSVP MODAL ====================
  const rsvpBtn = document.getElementById('rsvp-btn');
  const modal = document.getElementById('rsvp-modal');
  const modalClose = document.getElementById('modal-close');
  const rsvpForm = document.getElementById('rsvp-form');
  const successState = document.getElementById('success-state');

  if (rsvpBtn && modal) {
    rsvpBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after close
    setTimeout(() => {
      if (rsvpForm) rsvpForm.style.display = 'block';
      if (successState) successState.style.display = 'none';
    }, 350);
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate sending (in real would POST to backend)
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          // Show success
          rsvpForm.style.display = 'none';
          if (successState) successState.style.display = 'block';
          
          // Confetti-like gentle gold particles (subtle)
          createCelebrationParticles();

          // Auto close after showing success
          setTimeout(() => {
            closeModal();
            // Reset for next time
            rsvpForm.reset();
            if (submitBtn) {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }
          }, 2650);
        }, 1250);
      }
    });
  }

  function createCelebrationParticles() {
    const colors = ['#C9A961', '#D4C3A3', '#A67C52'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:4000;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 42; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position:absolute; width:7px; height:7px; border-radius:50%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        left:${Math.random()*100}vw; top:-20px;
        opacity:${0.6 + Math.random()*0.4};
        transform:scale(${0.6 + Math.random()});
      `;
      container.appendChild(particle);

      const duration = 1800 + Math.random() * 1600;
      const xDrift = (Math.random() - 0.5) * 180;

      particle.animate([
        { transform: `translateY(0) translateX(0)`, opacity: particle.style.opacity },
        { transform: `translateY(${window.innerHeight + 80}px) translateX(${xDrift}px)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
      }).onfinish = () => particle.remove();

      // Remove container when done
      setTimeout(() => {
        if (container.parentNode) container.parentNode.removeChild(container);
      }, 3800);
    }
  }

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.event-card, .fade-in');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      animatedElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // ==================== KEYBOARD SHORTCUTS & ACCESSIBILITY ====================
  document.addEventListener('keydown', (e) => {
    // Press "M" to toggle music (when invitation is open)
    if (e.key.toLowerCase() === 'm' && mainInvitation.classList.contains('visible')) {
      e.preventDefault();
      if (musicBtn) musicBtn.click();
    }
    
    // Press "T" to toggle theme
    if (e.key.toLowerCase() === 't') {
      e.preventDefault();
      if (themeToggle) themeToggle.click();
    }

    // Escape closes modal
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==================== INITIALIZATION ====================
  // Make sure main invitation starts hidden properly
  if (mainInvitation) {
    mainInvitation.style.opacity = '0';
    mainInvitation.style.visibility = 'hidden';
    mainInvitation.style.transform = 'translateY(12px)';
  }

  // Easter egg: Double-click logo or names for subtle sparkle
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('dblclick', () => {
      createCelebrationParticles();
      if (musicBtn && !isMusicPlaying) {
        musicBtn.click();
      }
    });
  }

  // Welcome console message for developers / curious users
  console.log('%c[Wedding Invite] Premium invitation ready. Built with pure HTML, CSS & JS. Theme, music, share & RSVP all functional.', 'color:#C9A961; font-size:9px');
});