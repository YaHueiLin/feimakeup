/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

		$gallery.poptrox({
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
			popupIsFixed: false,
			onPopupOpen: function() {
				// 等待 DOM 更新後再調整位置
				setTimeout(function() {
					var $overlay = $('.poptrox-overlay');
					var $popup = $('.poptrox-popup');
					var scrollTop = $(window).scrollTop();
					var windowHeight = $(window).height();
					var documentHeight = $(document).height();

					console.log('ScrollTop:', scrollTop, 'WindowHeight:', windowHeight);

					// 完全覆蓋 poptrox 的 CSS
					$overlay.attr('style',
						'position: absolute !important; ' +
						'top: 0px !important; ' +
						'left: 0px !important; ' +
						'width: 100% !important; ' +
						'height: ' + documentHeight + 'px !important; ' +
						'z-index: 10001 !important; ' +
						'text-align: center !important; ' +
						'cursor: pointer !important; ' +
						'background: rgba(31, 35, 40, 0.65) !important;'
					);

					// 計算 popup 的絕對位置（當前視窗中心）
					var popupTop = scrollTop + (windowHeight / 2);

					$popup.attr('style',
						'position: absolute !important; ' +
						'top: ' + popupTop + 'px !important; ' +
						'left: 50% !important; ' +
						'transform: translate(-50%, -50%) !important; ' +
						'z-index: 10002 !important; ' +
						'display: inline-block !important; ' +
						'vertical-align: middle !important; ' +
						'cursor: auto !important;'
					);
				}, 100);
			}
		});			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					// For generic style2 sections except #About (About), keep default behavior.
					$('.main.style2').not('#About')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					// About section (#About): animate in once, then stay visible (no leave re-hide).
					$('#About')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { /* keep visible after first animation */ }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

})(jQuery);