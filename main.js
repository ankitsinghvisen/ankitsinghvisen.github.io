// Typed.js rotating role text
if (window.Typed) {
    new Typed('.text', {
        strings: ['Linux Administrator', 'System Administrator', 'Network Engineer', 'Automation Enthusiast'],
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1500,
        loop: true
    });
}

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });
}

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
    });
});

// Scroll-spy: highlight active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function onScrollSpy() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy();

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Project "Read More" modal =====
const projectDetails = {
    oxidized: {
        icon: 'bx-archive',
        title: 'Oxidized Configuration Backup Server',
        points: [
            'Designed, built, and deployed an Oxidized server from scratch on Linux for automated backup and version control of enterprise network device configurations.',
            'Integrated enterprise network devices including Cisco, HP, Aruba, Brocade, and Netgear switches for scheduled configuration backups.',
            'Improved configuration management, auditability, and disaster recovery by maintaining version-controlled device configurations.'
        ],
        stack: ['Linux', 'Oxidized', 'LibreNMS', 'Git', 'SSH']
    },
    rsyslog: {
        icon: 'bx-list-check',
        title: 'Centralized Logging using Rsyslog',
        points: [
            'Designed, implemented, and managed a centralized Rsyslog server collecting logs from Linux servers, proxy servers, firewalls, routers, and enterprise network switches.',
            'Configured remote log forwarding, log rotation, and secure log storage.',
            'Integrated log data with Grafana/Kibana dashboards for infrastructure monitoring and troubleshooting.',
            'Improved incident investigation through centralized log visibility.'
        ],
        stack: ['Linux', 'Rsyslog', 'SSH']
    },
    ansible: {
        icon: 'bx-cog',
        title: 'Linux Server Automation using Ansible',
        points: [
            'Developed Ansible playbooks for automated server provisioning, package installation, patch management, and configuration management.',
            'Managed inventory groups and reusable roles for enterprise Linux environments.',
            'Automated routine administrative tasks, reducing manual effort and ensuring configuration consistency.'
        ],
        stack: ['Linux', 'Ansible', 'SSH']
    },
    portal: {
        icon: 'bx-shield-quarter',
        title: 'Accounts Portal for VPN & Wi-Fi User Provisioning',
        points: [
            'Designed and deployed a secure Django-based Accounts Portal from scratch for external VPN and Wi-Fi account provisioning.',
            'Implemented LDAP integration, role-based access control (RBAC), secure authentication, user lifecycle management, and audit logging.',
            'Developed administrative workflows for user creation, account management, and secure access provisioning while following security best practices.'
        ],
        stack: ['Linux', 'Python', 'Django', 'PostgreSQL', 'LDAP', 'Bootstrap', 'Nginx', 'Gunicorn/uWSGI']
    }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalList = document.getElementById('modalList');
const modalStack = document.getElementById('modalStack');

document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const data = projectDetails[btn.dataset.project];
        if (!data) return;

        modalIcon.innerHTML = `<i class='bx ${data.icon}'></i>`;
        modalTitle.textContent = data.title;
        modalList.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');
        modalStack.innerHTML = data.stack.map(s => `<span>${s}</span>`).join('');

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
