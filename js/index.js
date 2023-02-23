"use sctrict"
window.addEventListener('DOMContentLoaded', () => {
    
    // mobile or pc
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');
        fullScrinSection();
    // fullScrinSection
    function fullScrinSection () {
        const sections = document.querySelectorAll('section'),
              nextSectionBtn = document.querySelector('.section-next'),
              prewSectionBtn = document.querySelector('.section-prew');
        let i = 0;

        sections.forEach(section => {
            section.style.transition = "all 0.6s ease";
            section.classList.remove('_section-show');
            section.classList.add('_section-hide');
        });
        sections[i].classList.remove('_section-hide');
        sections[i].classList.add('_section-show');

        if ( nextSectionBtn) nextSectionBtn.addEventListener('click', showNextSection);
        if ( prewSectionBtn) prewSectionBtn.addEventListener('click', showPrewSection);

        function showNextSection () {
            sections.forEach(section => {
                section.classList.add('_section-hide');
            });

            if (i >= sections.length - 1) i = 0;
            else i++;
            sections[i].classList.remove('_section-hide');
            sections[i].classList.add('_section-show');
            if ( i == 2) slider();
        }

        function showPrewSection () {
            sections.forEach(section => {
                section.classList.add('_section-hide');
            });

            if (i <= 0) i = sections.length - 1
            else  i--;
            sections[i].classList.remove('_section-hide');
            sections[i].classList.add('_section-show');
            if ( i == 2) slider();
        }
    }
    }  else {
        document.body.classList.add('pc');
        slider();
    }
    // menuBurger
    function menuBurger () {
        const menuIcon = document.querySelector(".menu-icon"),
              header = document.querySelector('.header');
        
        if ( menuIcon) menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle('active');
            header.classList.toggle('active');
            document.body.classList.toggle('_lock');
        })
    }
    menuBurger();

    // scroll to section 
    function scrollToSections () {
        const menuLinks = document.querySelectorAll('.list-item'),
          logo = document.querySelectorAll('.logo'),
          menuIcon = document.querySelector('.menu-icon'),
          header = document.querySelector('.header'),
          fullScrinSections = document.querySelectorAll('section'),
          headerHeight = header.offsetHeight;

        if (logo.length > 0) logo.forEach(logo => logo.addEventListener('click', scrollToSection)); 
        if (menuLinks.length > 0 ) menuLinks.forEach(link => link.addEventListener('click',scrollToSection));

        function scrollToSection (e) {
            const navLink = e.target;
            if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
                const gotoBlock = document.querySelector(navLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeight;
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
            }
            menuIcon.classList.remove('active')
            header.classList.remove('active');
            document.body.classList.remove('_lock');
            e.preventDefault();

            if (document.body.classList.contains('touch')) {
                menuLinks.forEach((item, i) => {
                    if (item == e.target) {
                        fullScrinSections.forEach(section => {
                        section.style.transition = "all 0.6s ease";
                        section.classList.add('_section-hide');
                        });
                        fullScrinSections[i + 1].classList.remove('_section-hide');
                        fullScrinSections[i + 1].classList.add('_section-show');
                    }
                })
                
            }
        }
    }
    scrollToSections();

    // slider
    function slider () {
        const slides = document.querySelectorAll(".slide"),  
              prev = document.querySelector(".prew-button"),  
              next = document.querySelector(".next-button"),  
              slidesWrapper = document.querySelector(".slide-wrapper"),  
              slidesField = document.querySelector(".slide-field"),     
              width = parseInt(window.getComputedStyle(slidesWrapper).width); 

        let slideIndex = 1; 
        let offset = 0;  

        if (slides) slides.forEach(slide => slide.style.width = width);
        if (next) next.addEventListener('click', nextSlide);
        if (prev) prev.addEventListener('click', prevSlide);
        if (slidesField) {
            slidesField.style.width = 100 * slides.length  + '%';   
            slidesField.style.transition = 'all 0.7s ease'; 
            }           

        function prevSlide () {
            if (offset == 0) {      
                offset = width * (slides.length -1);  
            } else {
                offset = offset - width; 
            }
            slidesField.style.transform = `translateX(-${offset}px)`;  
            
            if (slideIndex == 1) {            
                slideIndex = slides.length;
            } else {
                slideIndex--;              
            }
        }

        function nextSlide () {
            if (offset == width * (slides.length -1)) {      
                offset = 0;                       
            } else {
                offset = offset + width;  
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if (slideIndex == slides.length) {          
                slideIndex = 1;
            } else {
                slideIndex++;                          
            }
        } 
    }
    
    // Tabs
    function tabs () {
        const tabsBtn = document.querySelectorAll('.tabs-button'),
              tabs = document.querySelectorAll('.work-tab');
    
        if ( tabsBtn.length > 0 ) {
            tabsBtn[0].classList.add('_active');
            tabsBtn[0].classList.add('icon-arrow-next');
            tabs[0].classList.add('_active');

            tabsBtn.forEach((btn, i) => btn.addEventListener('click', (e) => {
                tabsBtn.forEach(otherBtn => {
                    otherBtn.classList.remove('_active');
                    otherBtn.classList.remove('icon-arrow-next')
                } );
                btn.classList.add('_active');
                btn.classList.add('icon-arrow-next');
                tabs.forEach(tab => tab.classList.remove('_active'));
                tabs[i].classList.add('_active');
            }));
        }   
    }
    tabs();

    // forms
    function form () {
        const form = document.querySelector('.form');
        if (form) form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formMessage = document.querySelector('.form-message');
            formMessage.classList.add('active');
            form.reset();
            setTimeout(() => {
                formMessage.classList.remove('active');
            },3000)
        })
    }
    form();
});