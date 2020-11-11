var sectionIds = {};
$('.section').each(function(index) {
  $(this).attr('id', 'page' + index);
  $('.menuBar').append('<div class=tip data-page="page' + index + '" data-index="' + index + '"></div>');
});


$(document).on('click', '.menuBar .tip', function() {
  var elmnt = document.getElementById($(this).data('page'));
  elmnt.scrollIntoView({
    block: 'start',
    behavior : 'smooth'
  });
  curPage = $(this).data('index');
  return false;
});

var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html')
    : $('body')) : $('html,body'), $section = $('section');
var numOfPages = $section.length - 1, // 取得section
curPage = 0, // 起始頁
scrollLock = false; // 滾動開關
function scrollPage() {
  // 滑鼠滾動
  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (scrollLock)
      return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
      navigateUp();
    else
      navigateDown();
  });
  // 鍵盤上下鍵
  $(document).on("keydown", function(e) {
    if (scrollLock)
      return;
    if (e.which === 38)
      navigateUp();
    else if (e.which === 40)
      navigateDown();
  });
}

$(function() {
  scrollPage();
  $('.menuBar .tip:first-child').addClass('tipActive');
});

// 上滾動
function navigateUp() {
  if (curPage === 0)
    return;
  curPage--;
  pagination();
};
// 下滾動
function navigateDown() {
  if (curPage === numOfPages)
    return;
  curPage++;
  pagination();
};
// 滾動至上/下區塊
function pagination() {
/*scrollLock = true;
  $body.stop().animate({
    scrollTop : $section.eq(curPage).offset().top
  }, 1000, 'swing', function() {
    scrollLock = false;
  });*/
};


// 選定頁面上多個 section
const sectionBlocks = document.querySelectorAll('.section')

var watcher = new IntersectionObserver(onEnterView);

for (let image of sectionBlocks) {
  watcher.observe(image); // 開始監視
}

  function onEnterView(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            // 監視目標進入畫面
            var section = entry.target;
            $('.menuBar .tip').removeClass('tipActive');
            $('[data-page="' + section.id + '"]').addClass('tipActive');
          
            //observer.unobserve(section); // 取消監視  因為要持續監視故不取消
        }
    }
  }





