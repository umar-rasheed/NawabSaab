// Envelope Opening + Tab System
document.getElementById('envelope').addEventListener('click', function() {
    const envelope = this;
    const main = document.getElementById('main-invitation');
    
    // Animate flap
    envelope.style.transform = 'rotateX(180deg)';
    
    setTimeout(() => {
        envelope.classList.add('hidden');
        main.classList.remove('hidden');
    }, 800);
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Activate clicked
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.remove('hidden');
    });
});