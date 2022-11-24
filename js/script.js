

const sections = document.querySelectorAll('section');
const sectionMenu = document.getElementById('sectionMenu')
const menuButton = document.getElementById('menuButton')
const sectionMenuWrapper = document.getElementById('sectionMenuWrapper')
const currentSection = document.getElementById('currentSection')
let menuOpen = false


// OPEN MENU
menuButton.addEventListener("click", toggleMenu);
function toggleMenu() {
    const menuHeight = sectionMenu.clientHeight
    menuOpen = !menuOpen
    if (menuOpen) {
        sectionMenuWrapper.style.height = menuHeight + 'px'
        menuButton.innerText = 'Hide'
    } else {
        sectionMenuWrapper.style.height = 0
        menuButton.innerText = 'Show'
    }
}

// CREATE MENU ITEMS - have these menu items auto generate when new section added
window.onload = function () {
    sections.forEach(element => {
        if (element.dataset.section) {
            let node = document.createElement("LI");
            node.classList.add('selectionButton', 'text-white', 'list-none', 'cursor-pointer', 'hover:text-sky-200', 'py-6')
            node.dataset.select = element.dataset.section
            let textnode = document.createTextNode('Section ' + element.dataset.section);
            node.appendChild(textnode);
            node.addEventListener('click', function handleClick(event) {
                toggleMenu()
                setTimeout(() => {
                    scrollToSection(node.dataset.select)
                }, 300);
            });
            sectionMenu.appendChild(node);
        }
    });
}

// SCROLL TO 
function scrollToSection(sectionIndex) {
    const selected = document.querySelector(`[data-section="${sectionIndex}"]`);
    selected.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

// SCROLL OBSERVER
const options = {
    rootMargin: '0px 0px -50% 0px',
}
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const selectedButton = document.querySelectorAll(`[data-select]`);
        if (!entry.target.dataset.section) {
            currentSection.innerHTML = ''
            selectedButton.forEach(button => {
                button.classList.remove('text-sky-400')
            })
            return
        } else if (entry.isIntersecting) {
            currentSection.innerHTML = entry.target.dataset.section
            selectedButton.forEach(button => {
                button.dataset.select == entry.target.dataset.section ? button.classList.add('text-sky-400') : button.classList.remove('text-sky-400')
            })
        }
    })
}, options);
sections.forEach(section => observer.observe(section));

// SCROLL PROGRESS
window.onscroll = () => scrollProgress()
function scrollProgress() {
    const progressBar = document.getElementById("progressBar")
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scroll / height) * 100;
    scrollPercentage == 0 ? currentSection.innerHTML = '' : null // force current seletion to reset at top
    progressBar.style.width = scrollPercentage + "%";
}


