/* ===========================================
   CSSOff Main JS
   =========================================== */

$(function(){
	
	// fittext for headlines
	$('#obstacles h1.title').fitText(0.57);
	$('#prizes h1.title').fitText(0.35);
	$('#contestant h1.title').fitText(.96);
	
	// custom select
	$('section#contestant form select').sbCustomSelect();
	
	// scroll		
	$.localScroll({
		offset: {left: 0, top: -33},
		easing: 'easeInOutExpo'
	});	
	
	// init cycle slideshow
	$('.obstacle-detail').cycle({ 
	    fx:     'fadeZoom', 
	    speed:  'fast', 
	    timeout: 0,
	    cleartypeNoBg: true, 
	    pager:  '.obstacle-options', 
	    pagerAnchorBuilder: function(idx, slide) { 
	        return '.obstacle-options li:eq(' + idx + ') a'; 
	    } 
	});
		
	// color the main nav on scroll
	$('#home h1').waypoint(function() {
		$('#main-header').toggleClass('active');
	}, {
		offset: '6px'
	});
	
	// set the waypoint to add active classes
	$('#main-container > section').waypoint({ offset: '50%' });
		
	$('body').delegate('#main-container > section', 'waypoint.reached', function(event, direction) {
		var $active = $(this);
		
		if (direction === "up") {
			$active = $active.prev();
		}
		if (!$active.length) $active.end();
		
		$('.link-active').removeClass('link-active');
		$('a[href=#'+$active.attr('id')+']').not('.nav-top a').addClass('link-active');
	});
	
	// remove/add active class on link when clicked
	$('#main-nav a').click(function() {
		$('#main-nav a').removeClass('link-active');
		$(this).not('.nav-top a').addClass('link-active');
	});	
	
	// start the clock when the prizes section is in view
	$('#prizes .content').waypoint(function() {
		// count down the clock
		var count = 60,
			$this = $('.counter');
		
		countdown = setInterval(function(){
			$this.html(count);
			if (count == 10) {
				$this.addClass('alert');
			}
			if (count == 0) {
				clearInterval(countdown);
			}
			count--;
		}, 1000);
	}, {
		triggerOnce: true
	});
	
	// add placeholder to browsers that don't recognize them
	if(!Modernizr.input.placeholder){	
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});	
	}

});