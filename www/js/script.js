/* ===========================================
   Emeril's Restaurants Main JS
   Author: Terrance Pitre
   =========================================== */

var er = {
	
	// cache static elements used on load				
	bg:				$('.bg'),
	
	transformNav: function(){
		var $restWelcome = $('.rest-welcome'),
				$subHead = $('#sub-head');
				
		// color the main nav on scroll
		$restWelcome.waypoint(function() {
			$subHead.toggleClass('active');
		});
	},
	
	initSlideshow: function(){
		// Speed of the automatic slideshow
		var slideshowSpeed = 6000;
		
		// Variable to store the images we need to set as background
		// which also includes some text and url's.
		var photos = [ {
				"image" : "img2.jpg",
			}, {
				"image" : "img7.jpg",
			}, {
				"image" : "img1.jpg",
			}, {
				"image" : "img3.jpg",
			}, {
				"image" : "img7.jpg",
			}
		];
		
		// Backwards navigation
		$(".prev").click(function(e) {
			stopAnimation();
			navigate("back");
			e.preventDefault();
		});
		
		// Forward navigation
		$(".next").click(function(e) {
			stopAnimation();
			navigate("next");
			e.preventDefault();
		});
		
		var interval;
		
		$(".pause").toggle(function(){
			stopAnimation();
		}, function() {
			// Change the background image to "pause"
			$(this).removeClass('play');
			
			// Show the next image
			navigate("next");
			
			// Start playing the animation
			interval = setInterval(function() {
				navigate("next");
			}, slideshowSpeed);
		});
		
		
		var currentImg = 0;
		var animating = false;
		
		var navigate = function(direction) {
			
			// Check if no animation is running. If it is, prevent the action			
			if(animating) {
				return;
			}
			
			// Check which current image we need to show
			if(direction == "next") {
				currentImg++;
				if(currentImg == photos.length + 1) {
					currentImg = 1;
				}
			} else {
				currentImg--;
				if(currentImg == 0) {
					currentImg = photos.length;
				}
			}
				
			showImage(photos[currentImg - 1]);
			
		};
				
		var showImage = function(photoObject) {
			animating = true;
		
			// Set the background image of the new active container
			$("#main-container").css({
				"background-image" : "url(img/" + photoObject.image + ")"
			});
						
			// Fade out the current container
			// and display the header text when animation is complete
			
			animating = false;
		};
		
		var stopAnimation = function() {
			// Change the background image to "play"
			$(".pause").addClass('play');
			
			// Clear the interval
			clearInterval(interval);
		};
		
		// We should statically set the first image
		navigate("next");
		
		// Start playing the animation
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	},
	
	addPlaceHolder: function(){
	
		// add placeholder to browsers that don't recognize them
		if(!Modernizr.input.placeholder){
		
			$('[placeholder]').focus(function(){
				var input = $(this);
				if (input.val() == input.attr('placeholder')){
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function(){
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function(){
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')){
						input.val('');
					}
				})
			});	
		}
	
	}
	
}

$(function(){
	
	// init the functions
	er.addPlaceHolder();	
	er.transformNav();
	er.initSlideshow();
				
});
		