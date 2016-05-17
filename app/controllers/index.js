if (OS_ANDROID) {
	var actionBarModule = require('com.alcoapps.actionbarextras');
}

function windowOpen(e) {	
	actionBarModule.title = "Miles";
}

$.pagingControl.setScrollableView($.scrollableViewContainer);

function animateBar(e) {
  // if (e.y > 50) {
  //   $.index.activity.actionBar.hide();    
  // } else {
  //   $.index.activity.actionBar.show();
  // };
}

$.index.open();
