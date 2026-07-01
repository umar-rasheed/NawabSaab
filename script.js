// Modern Minimal Royal Wedding Invitation
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cMashaAllah - Umar Rasheed & Aiesha Bashir', 'color:#d4af37; font-size:18px;');

    // Share button
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const text = `Umar Rasheed & Aiesha Bashir Wedding Invitation\nMehndi: 28 July | Barat: 30 July | Walima: 2 August\n`;
            if (navigator.share) {
                navigator.share({
                    title: 'Wedding Invitation',
                    text: text,
                    url: window.location.href
                });
            } else {
                alert('Link copied! Share with your loved ones ❤️');
                navigator.clipboard.writeText(window.location.href);
            }
        });
    }
});

// Subtle entrance animation
setTimeout(() => {
    document.querySelector('.card').style.opacity = '1';
}, 300);