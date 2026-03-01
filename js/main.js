// Modal functionality for profile image
window.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-pic img');
    if (!profileImg) return;

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
        <div class="img-modal-overlay"></div>
        <div class="img-modal-content">
            <img src="${profileImg.src}" alt="Profile Photo" class="modal-img">
            <button class="img-modal-close">&times;</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'none';

    // Show modal on image click
    profileImg.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal on button or overlay click
    modal.querySelector('.img-modal-close').onclick = closeModal;
    modal.querySelector('.img-modal-overlay').onclick = closeModal;
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Sticky header and image shrink on scroll
    const header = document.querySelector('.header');
    const headerImg = document.querySelector('.profile-pic img');
    const headerName = document.querySelector('.header h1');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            header.classList.add('sticky');
            headerImg.style.width = '60px';
            headerImg.style.height = '60px';
            headerName.style.fontSize = '1.3rem';
        } else {
            header.classList.remove('sticky');
            headerImg.style.width = '160px';
            headerImg.style.height = '160px';
            headerName.style.fontSize = '2.5rem';
        }
    });

    // Change container background on scroll
    const mainContainer = document.querySelector('main.container');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            mainContainer.style.background = '#e3f6f5'; // You can change this color
        } else {
            mainContainer.style.background = '#fff';
        }
    });
});
function updateBio() {
    const bio = document.getElementById('bio');
    const newBio = prompt('Enter your new bio:');
    if (newBio !== null && newBio.trim() !== '') {
        bio.textContent = newBio;
    }
}

// Embedded website functionality
let embeddedUrl = "https://en.wikipedia.org/wiki/HTML";
const iframe = document.getElementById('embedded-site');
if (iframe) {
    iframe.src = embeddedUrl;
}