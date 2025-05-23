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
    var resultsCarousel = bulmaCarousel.attach('.results-carousel', twoSlidesOptions);

    // Options for the two slides carousel
    var oneSlidesOptions = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 30000,
    }

    // Initialize all div with carousel class
    var evalCarousel = bulmaCarousel.attach('.eval-carousel', oneSlidesOptions);

    // Initialize all div with carousel class
    var ablationCarousel = bulmaCarousel.attach('.ablation-carousel', oneSlidesOptions);

    // Initialize all div with carousel class
    var svdcompCarousel = bulmaCarousel.attach('.svdcomp-carousel', oneSlidesOptions);

    // Loop on each carousel initialized
    var carousels = [...resultsCarousel, ...evalCarousel, ...ablationCarousel, ...svdcompCarousel];
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
      <table class="no-borders">
        <colgroup>
          <col style="width: 27%;">
          <col style="width: 15%;">
          <col style="width: 15%;">
          <col style="width: 15%;">
          <col style="width: 27%;">
        </colgroup>
        <tr><td></td></tr>
        <tr>
          <td colspan="2" style="vertical-align:middle; text-align:center; border:none;" class="small-text">
            <video poster="" id="${videoID}_input_vid" class="block-video" autoplay controls muted loop playsinline style="width: 64%; height: auto; margin: 0 auto;" preload="none" data-src="./static/videos/${videoID}_input.mp4">
              <!-- No source element to avoid initial loading -->
            </video>
          </td>
          <td></td>
          <td colspan="2" style="vertical-align:middle; text-align:center; border:none;" class="small-text">
            <img src="./static/images/${videoID}_input_img.png" id="${videoID}_input_img" class="block-image" style="width: 64%; height: auto; margin: 0 auto;"/>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="small-text bottom-padding">Motion reference video</td>
          <td></td>
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
            <video poster="" id="${videoID}_output_mc" class="block-video" autoplay controls muted loop playsinline height="100%" preload="none" data-src="./static/videos/${videoID}_output_mc.mp4">
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
          <td class="small-text">MC</td>
          <td class="small-text">MD</td>
          <td class="small-text"><b>Ours</b></td>
        </tr>
        <tr><td></td></tr>
      </table>
    </div>`;
}

function createAblationCarouselItem(videoID) {

  return `
      <div class="item_ablation item_${videoID} no-margin-table-wrapper">
        <table class="no-borders">
          <colgroup>
            <col style="width: 16%;">
            <col style="width: 16%;">
            <col style="width: 16%;">
            <col style="width: 16%;">
            <col style="width: 16%;">
            <col style="width: 16%;">
          </colgroup>
          <tr>
            <th>Reference</th>
            <th>\\(F'=1, N=1\\)</th>
            <th>\\(F'=1, N=15\\)</th>
            <th>\\(F'=15, N=1\\)</th>
            <th>\\(F'=15, N=5\\) (Default)</th>
            <th>\\(F'=15, N=15\\)</th>
          </tr>
          <tr>
            <td>
              <video poster="" id="${videoID}_input" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_input.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_1_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_1_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_1_15" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_1_15.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_15_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_15_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_15_5" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_15_5.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_15_15" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_15_15.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="2">
              <img src="./static/images/arrow.png" id="arrow" class="block-image"/>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="2">Significant improvement</td>
            <td></td>
            <td></td>
          </tr>
          <tr><td></td></tr>
        </table>
      </div>`;
}

function createSVDCompCarouselItem(videoID) {

  return `
      <div class="item_svdcomp item_${videoID} no-margin-table-wrapper">
        <table class="no-borders">
          <colgroup>
            <col style="width: 9%;">
            <col style="width: 16%;">
            <col style="width: 25%;">
            <col style="width: 25%;">
            <col style="width: 25%;">
          </colgroup>
          <tr>
            <td></td>
            <th class="small-text">Reference</th>
            <td>
              <video poster="" id="${videoID}_input" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_input.mp4">
              <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <th class="small-text">Target</th>
            <td>
              <img src="./static/images/${videoID}_input_img.png" id="${videoID}_input_img" class="block-image"/>
            </td>
          </tr>
          <!-- Horizontal line -->
          <tr>
            <td colspan="5" style="border-bottom: 1px solid black;"></td>
          </tr>
          <tr><td></td></tr>
          <tr>
            <th rowspan="2" style="vertical-align:middle; text-align:center;" class="small-text">SVD</th>
            <td class="small-text">Conditional</td>
            <td>
              <video poster="" id="${videoID}_cond_svd_0" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_cond_0.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_cond_svd_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_cond_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_cond_svd_2" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_cond_2.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
          </tr>
          <tr>
            <td class="small-text">Unconditional<br/>(motion visualization)</td>
            <td>
              <video poster="" id="${videoID}_uncond_svd_0" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_uncond_0.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_uncond_svd_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_uncond_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_uncond_svd_2" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_svd_uncond_2.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
          </tr>
          <!-- Horizontal line -->
          <tr>
            <td colspan="5" style="border-bottom: 1px solid black;"></td>
          </tr>
          <tr><td></td></tr>
          <tr>
            <th rowspan="2" style="vertical-align:middle; text-align:center;" class="small-text">Ours</th>
            <td class="small-text">Conditional</td>
            <td>
              <video poster="" id="${videoID}_cond_ours_0" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_cond_0.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_cond_ours_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_cond_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_cond_ours_2" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_cond_2.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
          </tr>
          <tr>
            <td class="small-text">Unconditional<br/>(motion visualization)</td>
             <td>
              <video poster="" id="${videoID}_uncond_ours_0" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_uncond_0.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_uncond_ours_1" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_uncond_1.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
            <td>
              <video poster="" id="${videoID}_uncond_ours_2" class="block-video" autoplay controls muted loop playsinline height="100%"  preload="none" data-src="./static/videos/${videoID}_output_ours_uncond_2.mp4">
                <!-- No source element to avoid initial loading -->
              </video>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="small-text">Seed 0</td>
            <td class="small-text">Seed 1</td>
            <td class="small-text">Seed 2</td>
          </tr>
          <tr><td></td></tr>
        </table>
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

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.notification .delete');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.parentNode.remove();
    });
  });
});
