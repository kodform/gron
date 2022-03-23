var swiper = new Swiper(".mySwiper", { // Run swiper
  slidesPerView: 1.75,
  spaceBetween: 25,
  centeredSlides: true,
  slideToClickedSlide: true,
  pagination: {
    el: ".pagination",
    type: "fraction",
    clickable: true,
  },
});


function sortAfterYear() { // Sort .item--list in chronological order
  var container = $(".items--list");
  var items = $(".item");

  items.sort(function(a, b) {
    let d1 = new Date($(a).data("year"));
    let d2 = new Date($(b).data("year"));
    return d2 > d1 ? -1 : d2 < d1 ? 1 : 0;
  }).each(function() {
    container.prepend(this);
  });
};
sortAfterYear();

var dateString = [];
var uniqueDates = [];

function getDates() { // Get all unique years from .item--list and append to .year--controller
  $('li.item').each(function(num, elem) {
    var thisDate = $(elem).data("year");
    
    $(this).attr("id", thisDate);
    
    dateString.push(thisDate); //'<li>' + 
    
    uniqueDates = dateString.filter(
      function(value, index, self) {
        return self.indexOf(value) === index;
      }
    );
  });

  var controller = $(".year--control");
  var parent = controller.parent();
  
  controller.detach().empty().each(function(i){
      for (var x = 0; x < uniqueDates.length; x++){
          $(this).append('<li><a href="#' + uniqueDates[x] + '">' + uniqueDates[x] + '</a></li>');
          if (x == uniqueDates.length - 1){
              $(this).appendTo(parent);
          }
      }
  });
}
getDates();

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 250, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });