function toggleEvent(card) {
    const body = card.querySelector('.event-body');
    const arrow = card.querySelector('.arrow');
    
    body.classList.toggle('show');
    arrow.style.transform = body.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
}

// Open the invitation
document.getElementById('closed-card').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('open-content').classList.remove('hidden');
});