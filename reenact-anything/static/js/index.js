window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    // Options for the two slides carousel
    var twoSlidesOptions = {
			slidesToScroll: 1,
			slidesToShow: 2,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 10000,
    }

		// Initialize all div with carousel class
    var twoSlidesCarousels = bulmaCarousel.attach('.results-carousel', twoSlidesOptions);

    // Options for the two slides carousel
    var oneSlidesOptions = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 10000,
    }

		// Initialize all div with carousel class
    var oneSlidesCarousels = bulmaCarousel.attach('.eval-carousel', oneSlidesOptions);

    // Loop on each carousel initialized
    var carousels = [...twoSlidesCarousels, ...oneSlidesCarousels];
    for(var i = 0; i < carousels.length; i++) {
      // Add listener to event
      carousels[i].on('before:show', state => {
        console.log(state);
        // TODO: Fix problem where the first slide of a carousel might not load if it's in the last position of the
        //       carousel, i.e., if it looped over once. Similarly, going backwards does not load the last item directly.
      });
    }
})

function createResultsCarouselItem(videoID, hasSecondOutput = false, itemName="item_results") {
  // Base structure with one output video
  let itemHTMLStart = `
    <div class="${itemName} item_${videoID}">
      <div class="columns is-centered is-gapless">
        <div class="column">
          <video poster="" id="${videoID}_input" class="carousel-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_input.mp4">
            <!-- No source element to avoid initial loading -->
          </video>
          <h2 class="subtitle has-text-centered small-text">Motion reference video</h2>
        </div>
        <div class="column">
          <video poster="" id="${videoID}_output" class="carousel-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output.mp4">
            <!-- No source element to avoid initial loading -->
          </video>
          <h2 class="subtitle has-text-centered small-text">Generated video</h2>
        </div>`;

  // Add second output if needed
  let itemHTMLMiddle = '';
  if (hasSecondOutput) {
    itemHTMLMiddle = `
      <div class="column">
        <video poster="" id="${videoID}_output2" class="carousel-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output2.mp4">
            <!-- No source element to avoid initial loading -->
        </video>
        <h2 class="subtitle has-text-centered small-text">Generated video</h2>
      </div>`;
  }

  // End structure
  let itemHTMLEnd = `
      </div>
    </div>`;

  return itemHTMLStart + itemHTMLMiddle + itemHTMLEnd;
}

function createEvalCarouselItem(videoID) {

  return `
  <div class="item_eval item_${videoID} no-margin-table-wrapper">
    <div class="no-margin-table-wrapper">
      <table class="no-borders">
        <colgroup>
          <col style="width: 32%;">
          <col style="width: 18%;">
          <col style="width: 18%;">
          <col style="width: 32%;">
        </colgroup>
        <tr>
          <td colspan="2" style="vertical-align:middle; text-align:center; border:none;" class="small-text">
            <video poster="" id="${videoID}_input_vid" class="block-video" autoplay controls muted loop playsinline style="width: 64%; height: auto; margin: 0 auto;" preload="none" data-src="./static/videos/${videoID}_input.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
          <td colspan="2" style="vertical-align:middle; text-align:center; border:none;" class="small-text">
            <img src="./static/images/${videoID}_input_img.png" id="${videoID}_input_img" class="block-image" style="width: 64%; height: auto; margin: 0 auto;"/>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="small-text bottom-padding">Motion reference video</td>
          <td colspan="2" class="small-text bottom-padding">Input image</td>
        </tr>
        <tr>
          <td>
            <video poster="" id="${videoID}_output_svd" class="block-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output_svd.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
          <td>
            <video poster="" id="${videoID}_output_vc" class="block-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output_vc.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
          <td>
            <video poster="" id="${videoID}_output_md" class="block-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output_md.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
          <td>
            <video poster="" id="${videoID}_output_ours" class="block-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output_ours.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
        </tr>
        <tr>
          <td class="small-text">SVD</td>
          <td class="small-text">VC</td>
          <td class="small-text">MD</td>
          <td class="small-text"><b>Ours</b></td>
        </tr>
      </table>
    </div> 
  </div>`;
}

function synchronizeVideos(query) {
  const videos = document.querySelectorAll(query);
  let syncing = false;

  const syncAllVideos = (currentTime) => {
    if (syncing) return; // Avoid redundant syncing
    syncing = true;
    videos.forEach(v => {
      if (Math.abs(v.currentTime - currentTime) > 0.1) {
        v.currentTime = currentTime;
      }
    });
    syncing = false;
  };

  videos.forEach(video => {
    let initializing = true;

    video.addEventListener('play', () => {
      if (initializing) {
          initializing = false; // Set to false after the first play event
          return; // Prevent sync call on initial play
      }

      videos.forEach(v => {
        if (v !== video && v.paused) {
          // Try-catch block does not solve the actual problem but at least gives debugging info.
          v.play().catch((error) => {
            console.log("Play interrupted:", error, "Video:", video.id, "v:", v.id);
          });
        }
      });
    });

    video.addEventListener('pause', () => {
      videos.forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
        }
      });
    });

    video.addEventListener('ended', () => {
      videos.forEach(v => {
        v.pause();
        v.currentTime = 0;
      });
    });

    video.addEventListener('seeked', () => {
        syncAllVideos(video.currentTime);
    });

    video.addEventListener('seeking', () => {
        syncAllVideos(video.currentTime);
    });
  });
}
