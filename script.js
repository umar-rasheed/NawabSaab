function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

document.querySelector('.closed-card').addEventListener('click', () => {
    showScreen('inside');
});

function showDetails(type) {
    showScreen(type + '-detail');
}

function backToInside() {
    showScreen('inside');
}