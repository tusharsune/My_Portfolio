document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const initialPage = document.getElementById('initialPage');
    const projectGrid = document.getElementById('projectGrid');
    const projectOverlay = document.getElementById('projectOverlay');
    const projectOverlayContent = document.getElementById('projectOverlayContent');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');
    const contactForm = document.getElementById('contactForm');
    const messageBox = document.getElementById('messageBox');
    const jobTitleEl = document.getElementById('jobTitle');
    const wavingHandEl = document.getElementById('wavingHand');
    const sections = document.querySelectorAll('.animate-on-scroll');
    const musicPlayer = document.getElementById('musicPlayer');
    const songSelect = document.getElementById('songSelect');
    const musicControlBtn = document.getElementById('musicControlBtn');

    // New mobile navigation elements
    const mobileNavBtn = document.getElementById('mobileNavBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const toggleThemeMobileBtn = document.getElementById('toggleThemeMobile');


    // --- Theme toggle logic ---
    let isLightMode = false;

    function updateTheme() {
        if (isLightMode) {
            body.classList.add('light-theme');
            toggleThemeBtn.textContent = '🌙';
            toggleThemeMobileBtn.textContent = '🌙';
        } else {
            body.classList.remove('light-theme');
            toggleThemeBtn.textContent = '☀️';
            toggleThemeMobileBtn.textContent = '☀️';
        }
    }
    if (toggleThemeBtn) {
        updateTheme();
        toggleThemeBtn.addEventListener('click', () => {
            isLightMode = !isLightMode;
            updateTheme();
        });
    }

    // New mobile theme toggle logic
    if (toggleThemeMobileBtn) {
        toggleThemeMobileBtn.addEventListener('click', () => {
            isLightMode = !isLightMode;
            updateTheme();
        });
    }


    // --- Mobile navigation logic ---
    mobileNavBtn.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
    });

    closeMobileNavBtn.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
        });
    });


    // --- Initial page animation ---
    initialPage.addEventListener('click', () => {
        initialPage.classList.add('hidden');
    });

    // --- Auto-stop wave hand animation after 5 seconds ---
    setTimeout(() => {
        wavingHandEl.style.animation = 'none';
    }, 15000);

    // --- Dynamic typing effect for job titles ---
    const jobTitles = ["Software Engineer", "Python Developer", "Coder", "Web Developer"];
    let jobTitleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentTitle = jobTitles[jobTitleIndex];
        if (isDeleting) {
            jobTitleEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                jobTitleIndex = (jobTitleIndex + 1) % jobTitles.length;
                setTimeout(typeWriter, 500);
            } else {
                setTimeout(typeWriter, 50);
            }
        } else {
            jobTitleEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(typeWriter, 1500);
            } else {
                setTimeout(typeWriter, 100);
            }
        }
    }
    setTimeout(typeWriter, 2000);

    // --- Animations on scroll (IntersectionObserver) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Dynamic Project Loading from Django API ---
    let projectsData = [];

    async function fetchAndRenderProjects() {
        try {
            const response = await fetch(`${window.location.origin}/api/projects/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            projectsData = await response.json();
        } catch (error) {
            console.error('Failed to fetch projects from API:', error);
            showMessageBox("Failed to load projects from the server. Using fallback data.", "error");

            // Fallback to hardcoded data
            projectsData = [{
                title: 'Portfolio Builder App',
                description: 'A web app to create developer portfolios with templates and a live preview.',
                image: '/static/images/2.png',
                tech: [{
                    name: 'Django'
                }, {
                    name: 'Bootstrap'
                }, {
                    name: 'JS'
                }],
                repo_url: '#',
                live_url: '#',
            }, {
                title: 'Mango Leaf Disease Classifier',
                description: 'ML model to detect mango leaf diseases using TensorFlow and a Streamlit interface.',
                image: '/static/images/1.png',
                tech: [{
                    name: 'Python'
                }, {
                    name: 'TensorFlow'
                }, {
                    name: 'Streamlit'
                }],
                repo_url: '#',
                live_url: '#',
            }, {
                title: 'Employee Management System',
                description: 'Manage employees with CRUD operations, login system, and data visualization.',
                image: '/static/images/1.png',
                tech: [{
                    name: 'Python'
                }, {
                    name: 'MySQL'
                }, {
                    name: 'Flask'
                }],
                repo_url: '#',
                live_url: '#',
            }, {
                title: 'Animated Cartoon Series',
                description: 'Developed characters and a storyline for a college-themed web series using various animation tools.',
                image: '/static/images/2.png',
                tech: [{
                    name: 'Animation'
                }, {
                    name: 'Illustrator'
                }, {
                    name: 'Blender'
                }],
                repo_url: '#',
                live_url: '#',
            }, {
                title: 'SMS Spam Detection',
                description: 'Detect spam messages using ML classification techniques and data preprocessing.',
                image: '/static/images/3.png',
                tech: [{
                    name: 'Python'
                }, {
                    name: 'Pandas'
                }, {
                    name: 'TensorFlow'
                }],
                repo_url: '#',
                live_url: '#',
            }, ];
        }

        projectGrid.innerHTML = ''; // Clear existing content
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card p-6 rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 border-2 border-chalk-white/10 relative overflow-hidden';
            card.dataset.projectId = index;
            card.innerHTML = `
                                <div class="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover rounded-xl" onerror="this.onerror=null;this.src='https://placehold.co/400x250/a5d6e1/333d42?text=Image+Not+Found';">
                                </div>
                                <h3 class="text-2xl font-bold pat-hand text-chalk-blue mb-1">${project.title}</h3>
                                <p class="text-sm text-chalk-white/80 mb-2">${project.description.substring(0, 80)}...</p>
                                <div class="flex flex-wrap gap-2">
                                    ${project.tech.map(t => `<span class="badge text-xs px-2 py-1 rounded-full bg-chalk-white/20 text-chalk-white">${t.name}</span>`).join('')}
                                </div>
                            `;
            projectGrid.appendChild(card);
        });
    }

    fetchAndRenderProjects();

    // --- Project overlay logic ---
    projectGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        const projectId = card.dataset.projectId;
        const project = projectsData[projectId];

        if (project) {
            projectOverlayContent.querySelector('div').innerHTML = `
                        <div class="flex flex-col md:flex-row gap-4 items-start">
                            <img src="${project.image}" class="w-full md:w-1/3 rounded-md border-2 border-chalk-white/40" alt="${project.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/a5d6e1/333d42?text=Image+Not+Found';">
                            <div class="project-details">
                                <h2 class="text-3xl font-bold pat-hand text-chalk-blue mb-2">${project.title}</h2>
                                <p class="text-chalk-white/80 mb-3">${project.description}</p>
                                <div class="mb-3 flex flex-wrap gap-2">
                                    ${project.tech.map(t => `<span class="badge text-xs px-2 py-1 rounded-full bg-chalk-white/20 text-chalk-white">${t.name}</span>`).join('')}
                                </div>
                                <div class="flex gap-2">
                                    ${project.repo_url ? `<a href="${project.repo_url}" target="_blank" class="bg-card-bg text-chalk-white rounded-lg px-4 py-2 hover:bg-chalk-slate/80 transition-colors border border-chalk-white/20">Repo</a>` : ''}
                                    ${project.live_url ? `<a href="${project.live_url}" target="_blank" class="bg-chalk-yellow text-chalk-slate rounded-lg px-4 py-2 hover:bg-chalk-yellow/80 transition-colors font-bold shadow-chalk">Live</a>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
            projectOverlay.classList.add('active');
            projectOverlayContent.style.transform = 'translateY(0)';
        }
    });

    // --- Close overlay button logic ---
    closeOverlayBtn.addEventListener('click', () => {
        projectOverlay.classList.remove('active');
        projectOverlayContent.style.transform = 'translateY(-50px)';
    });

    // --- Contact form message logic ---
    function showMessageBox(message, type = 'success') {
        messageBox.textContent = message;
        messageBox.className = `message-box show bg-${type === 'success' ? 'chalk-blue text-chalk-slate' : 'chalk-red text-chalk-white'}`;
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.reset();
        showMessageBox("Message sent successfully!", 'success');
    });

    // --- Music Player Logic ---
    // NOTE FOR USER: Standard YouTube links (watch or embed URLs) do not work 
    // with the simple Audio player due to cross-origin and streaming restrictions.
    // Please use direct links to audio files (like .mp3 or .wav) hosted online.
    const songs = [
    // EXAMPLE: A direct link to an MP3 file works perfectly.
    {
        name: "Creative Brainstorm (MP3)",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }, 
    {
        name: "Soft Ambient Track (MP3)",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    // ADDED USER'S SONGS (PLACEHOLDER URLS USED):
    {
        name: "Give Me Some Sunshine",
        url: "https://open.spotify.com/track/1w6XiTEJCIILDTV2wyP6fT?si=d760ada1143a405a" // Replace with your direct MP3 link
    },
    {
        name: "Wishlist",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" // Replace with your direct MP3 link
    },
    {
        name: "All Is Well (3 Idiots)",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" // Replace with your direct MP3 link
    },
    // ADD YOUR SONGS HERE:
    // {
    //    name: "My Custom Song Title",
    //    url: "https://link-to-your-direct-mp3-file.com/track.mp3"
    // }
    ];

    let audio = new Audio();
    let isPlaying = false;
    let currentSongIndex = -1;

    function renderSongOptions() {
        // Clear previous options
        songSelect.innerHTML = '<option value="" disabled selected>Select a Track...</option>';
        
        songs.forEach((song, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = song.name;
            songSelect.appendChild(option);
        });
    }

    musicControlBtn.addEventListener('click', () => {
        if (songSelect.value === "") {
            showMessageBox("Please select a sound first!", "error");
            return;
        }

        if (isPlaying) {
            audio.pause();
            musicControlBtn.textContent = 'Play';
            isPlaying = false;
        } else {
            const selectedIndex = songSelect.value;
            if (selectedIndex != currentSongIndex) {
                audio.pause();
                audio = new Audio(songs[selectedIndex].url);
                currentSongIndex = selectedIndex;
                audio.addEventListener('ended', onAudioEnded); // Re-attach listener for the new audio object
            }
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
                showMessageBox("Autoplay failed. Please interact with the page first.", "error");
            });
            musicControlBtn.textContent = 'Stop';
            isPlaying = true;
        }
    });

    songSelect.addEventListener('change', () => {
        if (isPlaying) {
            audio.pause();
            musicControlBtn.textContent = 'Play';
            isPlaying = false;
        }
    });

    function onAudioEnded() {
        musicControlBtn.textContent = 'Play';
        isPlaying = false;
    }

    // Initialize the event listener once, instead of inside the musicControlBtn click event
    // The listener must be re-attached whenever a new Audio object is created (see musicControlBtn logic above)
    // audio.addEventListener('ended', onAudioEnded); 
    
    renderSongOptions();

    // =========================================================
    // --- NEW: Proximity Cursor Logic (The solution you asked for) ---
    // =========================================================

    const PROXIMITY_RADIUS = 20; // The 20px margin you requested
    // Selectors for elements that should trigger the default cursor when near
    const interactiveSelectors = 'a[href], button, .project-card, .skills-card, .close-btn, #toggleTheme, #toggleThemeMobile, #musicControlBtn, #songSelect, label, input, textarea, .mobile-nav-link';

    /**
     * Checks if the mouse coordinates are within a specified radius of an element's bounding box.
     * @param {number} mouseX - Current mouse X position (clientX).
     * @param {number} mouseY - Current mouse Y position (clientY).
     * @param {HTMLElement} element - The DOM element to check against.
     * @param {number} radius - The proximity margin/radius in pixels.
     * @returns {boolean} True if the mouse is near the element.
     */
    function isNearElement(mouseX, mouseY, element, radius) {
        // Optimization: Skip check if element is hidden (like the mobile menu when inactive)
        if (element.offsetParent === null && element.style.display === 'none' || element.offsetWidth === 0) {
            return false;
        }

        const rect = element.getBoundingClientRect();

        // Check if the mouse is within the element's bounds PLUS the radius margin
        return mouseX >= rect.left - radius &&
            mouseX <= rect.right + radius &&
            mouseY >= rect.top - radius &&
            mouseY <= rect.bottom + radius;
    }

    // Cache the list of interactive elements once on load
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let isNearAny = false;

        // Check if the mouse is near any of the interactive elements
        for (const element of interactiveElements) {
            if (isNearElement(mouseX, mouseY, element, PROXIMITY_RADIUS)) {
                isNearAny = true;
                break; // Found one, no need to check others
            }
        }

        // Apply or remove the proximity cursor class to the body
        if (isNearAny) {
            body.classList.add('interactive-proximity');
        } else {
            body.classList.remove('interactive-proximity');
        }
    }

    // Attach the main event listener to the document
    document.addEventListener('mousemove', handleMouseMove);
});
