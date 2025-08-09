/**
 * Enhanced Main JavaScript
 * Modern, performance-optimized JavaScript with better practices
 */

(function($) {
	'use strict';

	// Cache DOM elements for better performance
	const $window = $(window);
	const $body = $('body');
	const $header = $('#header');
	const $all = $body.add($header);

	// Performance optimization: Debounce function
	function debounce(func, wait, immediate) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				timeout = null;
				if (!immediate) func.apply(this, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(this, args);
		};
	}

	// Performance optimization: Throttle function
	function throttle(func, limit) {
		let inThrottle;
		return function(...args) {
			if (!inThrottle) {
				func.apply(this, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		};
	}

	// Modern breakpoint configuration
	const breakpointConfig = {
		xxlarge: ['1681px', '1920px'],
		xlarge: ['1281px', '1680px'],
		large: ['1001px', '1280px'],
		medium: ['737px', '1000px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	};

	// Initialize breakpoints
	breakpoints(breakpointConfig);

	// Enhanced preload handling with performance monitoring
	function handlePageLoad() {
		// Performance measurement
		const loadStartTime = performance.now();

		$window.on('load', function() {
			// Slight delay to ensure all assets are loaded
			setTimeout(function() {
				$body.removeClass('is-preload');

				// Log performance metrics (development only)
				if (console && console.log) {
					const loadTime = performance.now() - loadStartTime;
					console.log(`Page load completed in ${loadTime.toFixed(2)}ms`);
				}

				// Trigger custom event for analytics or other scripts
				$window.trigger('site:loaded');
			}, 100);
		});
	}

	// Enhanced touch mode detection
	function initializeTouchMode() {
		const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		if (browser.mobile || isTouchDevice) {
			$body.addClass('is-touch');
		} else {
			// More precise touch detection for hybrid devices
			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});
		}
	}

	// Enhanced gallery initialization with performance optimizations
	function initializeGallery() {
		$window.on('load', function() {
			const $gallery = $('.gallery');

			if ($gallery.length === 0) return;

			// Optimized Poptrox configuration
			const poptroxConfig = {
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: false,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true,
				// Performance optimization: Preload adjacent images
				preloadAdjacent: true
				// Removed popupIsFixed: true as it was causing positioning issues
			};

			$gallery.poptrox(poptroxConfig);

			// Optimized margin adjustment with debouncing
			const adjustMargins = debounce(function() {
				$gallery.each(function() {
					const instance = $(this)[0]._poptrox;
					if (instance) {
						instance.windowMargin = window.innerWidth <= 736 ? 5 : 50;
					}
				});
			}, 100);

			breakpoints.on('>small', adjustMargins);
			breakpoints.on('<=small', adjustMargins);

			// Preload gallery images for better UX
			const preloadImages = () => {
				$gallery.find('a[href*=".webp"], a[href*=".jpg"]').each(function(index) {
					if (index < 3) { // Preload first 3 images
						const img = new Image();
						img.src = $(this).attr('href');
					}
				});
			};

			// Delay preloading to not interfere with critical resources
			setTimeout(preloadImages, 1000);
		});
	}

	// Enhanced scroll-based transitions with performance optimizations
	function initializeScrollTransitions() {
		if (!browser.canUse('transition')) return;

		let ticking = false;

		const scrollHandler = throttle(function() {
			if (!ticking) {
				requestAnimationFrame(function() {
					// Only process visible elements
					const viewportHeight = window.innerHeight;
					const scrollTop = window.pageYOffset;

					$('.gallery, .main.style1, .main.style2, #contact').each(function() {
						const $element = $(this);
						const elementTop = $element.offset().top;
						const elementHeight = $element.outerHeight();

						// Check if element is in viewport with margin
						const isVisible = (elementTop < scrollTop + viewportHeight * 1.2) &&
										 (elementTop + elementHeight > scrollTop - viewportHeight * 0.2);

						if (isVisible) {
							$element.removeClass('inactive');
						} else {
							$element.addClass('inactive');
						}
					});

					ticking = false;
				});
				ticking = true;
			}
		}, 16); // ~60fps

		const initializeScrollElements = function() {
			// Initialize galleries with intersection observer if available
			if ('IntersectionObserver' in window) {
				const observerOptions = {
					rootMargin: '20% 0px',
					threshold: 0.1
				};

				const observer = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						const $target = $(entry.target);
						if (entry.isIntersecting) {
							$target.removeClass('inactive');
						} else {
							$target.addClass('inactive');
						}
					});
				}, observerOptions);

				$('.gallery').each(function() {
					$(this).addClass('inactive');
					observer.observe(this);
				});
			} else {
				// Fallback to scroll event
				$('.gallery').scrollex({
					top: '30vh',
					bottom: '30vh',
					delay: 50,
					initialize: function() { $(this).addClass('inactive'); },
					terminate: function() { $(this).removeClass('inactive'); },
					enter: function() { $(this).removeClass('inactive'); },
					leave: function() { $(this).addClass('inactive'); }
				});
			}

			// Traditional scroll effects for other elements
			$('.main.style1').scrollex({
				mode: 'middle',
				delay: 100,
				initialize: function() { $(this).addClass('inactive'); },
				terminate: function() { $(this).removeClass('inactive'); },
				enter: function() { $(this).removeClass('inactive'); },
				leave: function() { $(this).addClass('inactive'); }
			});

			$('.main.style2').scrollex({
				mode: 'middle',
				delay: 100,
				initialize: function() { $(this).addClass('inactive'); },
				terminate: function() { $(this).removeClass('inactive'); },
				enter: function() { $(this).removeClass('inactive'); },
				leave: function() { $(this).addClass('inactive'); }
			});

			$('#contact').scrollex({
				mode: 'middle',
				delay: 100,
				initialize: function() { $(this).addClass('inactive'); },
				terminate: function() { $(this).removeClass('inactive'); },
				enter: function() { $(this).removeClass('inactive'); },
				leave: function() { $(this).addClass('inactive'); }
			});
		};

		const cleanupScrollElements = function() {
			$('.gallery, .main.style1, .main.style2, #contact').unscrollex();
		};

		// Responsive scroll handling
		breakpoints.on('<=small', cleanupScrollElements);
		breakpoints.on('>small', initializeScrollElements);
	}

	// Enhanced resize handling with performance optimizations
	function initializeResizeHandling() {
		let resizeTimeout;

		const optimizedResizeHandler = debounce(function() {
			// Disable animations during resize
			$body.addClass('is-resizing');

			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() {
				// Re-enable animations after resize is complete
				setTimeout(function() {
					$body.removeClass('is-resizing');
					$window.trigger('site:resized');
				}, 50);
			}, 100);
		}, 100);

		$window.on('resize', optimizedResizeHandler);
	}

	// Form enhancements
	function initializeForms() {
		const $forms = $('form');

		$forms.each(function() {
			const $form = $(this);

			// Add loading state handling
			$form.on('submit', function() {
				const $submitBtn = $form.find('input[type="submit"], button[type="submit"]');
				$submitBtn.addClass('loading').prop('disabled', true);

				// Remove loading state after a timeout (in case form doesn't redirect)
				setTimeout(function() {
					$submitBtn.removeClass('loading').prop('disabled', false);
				}, 5000);
			});

			// Enhanced form validation
			$form.find('input[required], textarea[required]').on('blur', function() {
				const $field = $(this);
				const value = $field.val().trim();

				if (!value) {
					$field.addClass('error');
				} else {
					$field.removeClass('error');
				}
			});

			// Email validation
			$form.find('input[type="email"]').on('blur', function() {
				const $field = $(this);
				const email = $field.val().trim();
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

				if (email && !emailRegex.test(email)) {
					$field.addClass('error');
				} else {
					$field.removeClass('error');
				}
			});
		});
	}

	// Keyboard navigation enhancements
	function initializeKeyboardNavigation() {
		// Skip link functionality
		const $skipLink = $('<a href="#main" class="skip-link sr-only">Skip to main content</a>');
		$body.prepend($skipLink);

		// Enhanced keyboard navigation for gallery
		$('.gallery').on('keydown', 'a', function(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				$(this).click();
			}
		});

		// Escape key handling for poptrox
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $('.poptrox-popup').length > 0) {
				$('.poptrox-popup .closer').click();
			}
		});
	}

	// Performance monitoring
	function initializePerformanceMonitoring() {
		// Report performance metrics
		if ('performance' in window && 'getEntriesByType' in performance) {
			$window.on('load', function() {
				setTimeout(function() {
					const navigation = performance.getEntriesByType('navigation')[0];
					const paintEntries = performance.getEntriesByType('paint');

					// Log key metrics (development only)
					if (console && console.log && location.hostname === 'localhost') {
						console.group('Performance Metrics');
						console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
						console.log('Load Complete:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');

						paintEntries.forEach(function(entry) {
							console.log(entry.name + ':', entry.startTime.toFixed(2), 'ms');
						});
						console.groupEnd();
					}
				}, 1000);
			});
		}
	}

	// Initialize all modules
	function initialize() {
		handlePageLoad();
		initializeTouchMode();
		initializeGallery();
		initializeScrollTransitions();
		initializeResizeHandling();
		initializeForms();
		initializeKeyboardNavigation();
		initializePerformanceMonitoring();

		// Trigger initialization complete event
		$window.trigger('site:initialized');
	}

	// Start initialization when DOM is ready
	$(document).ready(initialize);

})(jQuery);
