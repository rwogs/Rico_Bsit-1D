document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Account dropdown toggle
    const accountToggle = document.querySelector('.account-toggle');
    const accountDropdown = document.querySelector('.account-dropdown');
    
    accountToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        accountDropdown.classList.toggle('show', !isExpanded);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountToggle.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountToggle.setAttribute('aria-expanded', 'false');
            accountDropdown.classList.remove('show');
        }
    });
    
    // Login form submission with enhanced password handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const projectPasswordInput = document.getElementById('project-password');
        
        // Set initial placeholder text for password fields
        passwordInput.placeholder = "yourpassword123";
        projectPasswordInput.placeholder = "project123";
        
        // Add focus/blur events to password fields to match email behavior
        [passwordInput, projectPasswordInput].forEach(input => {
            input.addEventListener('focus', function() {
                this.placeholder = "Enter your " + (this.id === 'password' ? "account" : "project") + " password";
            });
            
            input.addEventListener('blur', function() {
                this.placeholder = this.value ? "••••••••" : (this.id === 'password' ? "yourpassword123" : "project123");
            });
        });
        
        // Add input event to show/hide dots based on content
        [passwordInput, projectPasswordInput].forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.type = "password"; // Ensure dots are shown when typing
                }
            });
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (!emailInput.value || !passwordInput.value || !projectPasswordInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Logging in...";
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Login successful! (Simulated)');
                this.reset();
                accountToggle.setAttribute('aria-expanded', 'false');
                accountDropdown.classList.remove('show');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Reset password placeholders
                passwordInput.placeholder = "yourpassword123";
                projectPasswordInput.placeholder = "project123";
            }, 1500);
        });
    }
    
    // Menu tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItemsContainer = document.querySelector('.menu-items');
    
    // Menu data
    const menuData = {
        snacks: [
            {
                id: 1,
                name: "Classic Burger",
                description: "Juicy beef patty with cheese, lettuce, and special sauce",
                price: "₱199",
                image: "assets/images/burger.jpg"
            },
            {
                id: 2,
                name: "Crispy Fries",
                description: "Golden crispy fries with your choice of seasoning",
                price: "₱99",
                image: "assets/images/fries.jpg"
            },
            {
                id: 3,
                name: "Chicken Wings",
                description: "Spicy or BBQ flavored wings with dip",
                price: "₱159",
                image: "assets/images/wings.jpg"
            }
        ],
        drinks: [
            {
                id: 4,
                name: "Iced Coffee",
                description: "Refreshing cold brew with milk",
                price: "₱129",
                image: "assets/images/coffee.jpg"
            },
            {
                id: 5,
                name: "Fruit Shake",
                description: "Fresh fruit blended with ice",
                price: "₱149",
                image: "assets/images/shake.jpg"
            },
            {
                id: 6,
                name: "Soda Float",
                description: "Classic soda with vanilla ice cream",
                price: "₱119",
                image: "assets/images/float.jpg"
            }
        ]
    };
    
    // Function to load menu items
    function loadMenuItems(category) {
        // Show loading spinner
        menuItemsContainer.innerHTML = '<div class="loading-spinner"></div>';
        
        // Simulate API call delay
        setTimeout(() => {
            const items = menuData[category];
            let html = '';
            
            items.forEach(item => {
                html += `
                    <div class="menu-card">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="menu-card-content">
                            <h3 class="menu-card-title">${item.name}</h3>
                            <p class="menu-card-price">${item.price}</p>
                            <p class="menu-card-desc">${item.description}</p>
                            <button class="btn btn-primary">Order Now</button>
                        </div>
                    </div>
                `;
            });
            
            menuItemsContainer.innerHTML = html;
        }, 500);
    }
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load items for selected category
            const category = this.getAttribute('data-tab');
            loadMenuItems(category);
        });
    });
    
    // Load initial menu (snacks)
    loadMenuItems('snacks');
    
    // Order buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-order')) {
            e.preventDefault();
            alert('Order functionality would be implemented here');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});