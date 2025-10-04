(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Modern Sticky Navbar with Scroll Effect
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Hero Video Background
    $(document).ready(function() {
        const heroVideo = $('.hero-video-bg-video')[0];
        
        if (heroVideo) {
            // Handle video loading
            heroVideo.addEventListener('loadeddata', function() {
                console.log('Hero video loaded successfully');
                
                // Try to play video on all devices
                const playPromise = heroVideo.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        console.log('Hero video playing successfully');
                    }).catch(function(error) {
                        console.log('Video autoplay failed:', error);
                        // On mobile, user interaction might be required
                        if (window.innerWidth <= 768) {
                            console.log('Mobile device - video will play on user interaction');
                        }
                    });
                }
            });
            
            // Handle video errors
            heroVideo.addEventListener('error', function(e) {
                console.log('Hero video error:', e);
                // Fallback to background image if video fails
                $('.hero-video-bg').addClass('video-fallback');
            });
            
            // Mobile video optimization
            if (window.innerWidth <= 768) {
                // Pause video on mobile for better performance
                heroVideo.pause();
            }
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Modern Navbar Active Link
    $(document).ready(function() {
        // Add active class to current page
        var currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '' || currentPage === 'index.html') {
            $('.navbar-nav .nav-link[href="index.html"]').addClass('active');
        } else {
            $('.navbar-nav .nav-link[href="' + currentPage + '"]').addClass('active');
        }

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });

        // Navbar collapse on mobile when clicking outside
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.navbar').length) {
                $('.navbar-collapse').collapse('hide');
            }
        });

// Video Play Button
$('#playVideo').on('click', function() {
    const video = $(this).closest('.video-container').find('video')[0];
    const container = $(this).closest('.video-container');
    
    if (video.paused) {
        video.play().then(function() {
            container.addClass('playing');
            $(this).hide();
        }).catch(function(error) {
            console.log('Video play failed:', error);
            // Fallback: show video controls
            video.controls = true;
        });
    } else {
        video.pause();
        container.removeClass('playing');
        $(this).show();
    }
});

// Hide play button when video starts playing
$('.video-container video').on('play', function() {
    $(this).closest('.video-container').addClass('playing');
    $(this).closest('.video-container').find('.btn-play-video').hide();
});

// Show play button when video is paused
$('.video-container video').on('pause', function() {
    $(this).closest('.video-container').removeClass('playing');
    $(this).closest('.video-container').find('.btn-play-video').show();
});

// Mobile video optimization
$(document).ready(function() {
    const video = $('.video-container video')[0];
    
    if (video) {
        // Enable inline playback on mobile
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Handle mobile video loading
        video.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded');
        });
        
        // Handle video errors on mobile
        video.addEventListener('error', function(e) {
            console.log('Video error on mobile:', e);
            // Show fallback message
            const container = $(this).closest('.video-container');
            container.append('<div class="video-fallback-message text-center p-4"><p class="text-muted">Vidéo non disponible sur cet appareil</p></div>');
        });
        
        // Optimize for mobile performance
        if (window.innerWidth <= 768) {
            video.preload = 'metadata';
        }
    }
});

    });
    
})(jQuery);

