/* ===========================================
   Emeril's Restaurants Main JS
   Author: Terrance Pitre
   =========================================== */

var er = {
	
	// cache static elements used on load
	bg:				$('.bg'),
	
	transformNav: function(){
		var $restWelcome = $('.trigger-nav'),
				$subHead = $('#sub-head');
				
		// color the main nav on scroll
//		$restWelcome.waypoint(function() {
//			$subHead.toggleClass('active');
//		});
	},
	
	miscFunct: function(){
		
		var $cityFilter = $('#city-filter'),
				$mainNav		= $('#main-nav');
		
		$cityFilter.click(function() {
			$(this).toggleClass('city-open');
		});
		
		$mainNav.toggle(
			function(){
				$(this).animate({ marginTop: 0 }, 300, 'easeInOutQuint');
			},
			function() {
				$(this).animate({ marginTop: -194 }, 300, 'easeInOutQuint');
			}
		);
	},
	
	toggleGallery: function(){
		
		var $togGallery = $('.toggle-gallery');
		
		var up = function(){
			$('#main-content').animate({
				paddingTop: 560
			}, 700, 'easeInOutQuint');
			$togGallery.addClass('down');
		};
		
		var down = function(){
			$('#main-content').animate({
				paddingTop: 136
			}, 700, 'easeInOutQuint');
			$togGallery.removeClass('down');
		};
		
		$togGallery.toggle(up, down);
	},
	
	initSlideshow: function(){
		if ($('body').hasClass('show-gallerys')) {
			// Speed of the automatic slideshow
			var slideshowSpeed = 6000;
			
			// Variable to store the images we need to set as background
			// which also includes some text and url's.
			var photos = [ {
					"image" : "em-img1.jpg"
				}, {
					"image" : "em-img2.jpg"
				}, {
					"image" : "em-img3.jpg"
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
				if(direction === "next") {
					currentImg++;
					if(currentImg === photos.length + 1) {
						currentImg = 1;
					}
				} else {
					currentImg--;
					if(currentImg === 0) {
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
			
			// Start playing the animation if it's the main page
			if ($('body').hasClass('rest-home')) {
				interval = setInterval(function() {
					navigate("next");
				}, slideshowSpeed);
			}
		}
	},
	
	addPlaceHolder: function(){
	
		// add placeholder to browsers that don't recognize them
//		if(!Modernizr.input.placeholder){
//
//			$('[placeholder]').focus(function(){
//				var input = $(this);
//				if (input.val() === input.attr('placeholder')){
//					input.val('');
//					input.removeClass('placeholder');
//				}
//			}).blur(function(){
//				var input = $(this);
//				if (input.val() === '' || input.val() === input.attr('placeholder')) {
//					input.addClass('placeholder');
//					input.val(input.attr('placeholder'));
//				}
//			}).blur();
//			$('[placeholder]').parents('form').submit(function(){
//				$(this).find('[placeholder]').each(function() {
//					var input = $(this);
//					if (input.val() === input.attr('placeholder')){
//						input.val('');
//					}
//				});
//			});
//		}
	
	}
	
};

$(function(){
	
	// init the functions
	er.miscFunct();
	er.addPlaceHolder();
	er.toggleGallery();
	//er.transformNav();
	er.initSlideshow();
	
	
	$('#city-filter').find('li').click(function(e){
		e.preventDefault();
		
		
		if ($('.rest-cities').attr('data-city-filter') == $(this).attr('data-city-filter')) {
			console.log($('.rest-cities').attr('data-city-filter'));
		}
	});
	
});



/* remove this once live */
/*
  <div id="viewportwidth"></div>
  <div id="viewportheight"></div>
  <div id="resolutionwidth"></div>
  <div id="resolutionheight"></div>
*/
function getViewportWidth()
{
       if (window.innerWidth)
       {
               return window.innerWidth;
       }
       else if (document.body && document.body.offsetWidth)
       {
               return document.body.offsetWidth;
       }
       else
       {
               return 0;
       }
}

function getViewportHeight()
{
       if (window.innerHeight)
       {
               return window.innerHeight;
       }
       else if (document.body && document.body.offsetHeight)
       {
               return document.body.offsetHeight;
       }
       else
       {
               return 0;
       }
}

var tellMeTheSizes=function()
{
       document.getElementById("viewportwidth").innerHTML = "VW: " + getViewportWidth() + "px";
       //document.getElementById("viewportheight").innerHTML = "viewport height " + getViewportHeight() + "px";
       //document.getElementById("resolutionwidth").innerHTML = "screen width " + screen.width + "px";
       //document.getElementById("resolutionheight").innerHTML = "screen height " + screen.height + "px";
};

window.onload=function()
{
       tellMeTheSizes();
};

window.onresize=function()
{
       tellMeTheSizes();
};
		