if (OS_ANDROID) {
	var actionBarModule = require('com.alcoapps.actionbarextras');	
}

$.pagingControl.setScrollableView($.scrollableViewContainer);

var actionBarTitle;

var tabs = [{
  id : 0,
  title : "One"
}, {
  id : 1,
  title : "Two"
}, {
  id : 2,
  title : "Three"
}, {
  id : 3,
  title : "Four"
}];

$.myTabGroup.init({
  nodes : tabs,
  backgroundColor : "#ffffff",
  activeBackgroundColor : "#ffffff",
  tabClickCallback: updateView
});

$.myTabGroup.setIndex(0);

function updateView(_index) {
	switch(_index) {
		case 0:		
			Ti.App.fireEvent("home", actionBarModule);				
			$.firstView.setVisible(true);
			$.secondView.setVisible(false);
			$.thirdView.setVisible(false);
			$.fourthView.setVisible(false);
			break;
		case 1:				
			Ti.App.fireEvent("event", actionBarModule);			
			$.secondView.setVisible(true);
			$.firstView.setVisible(false);			
			$.thirdView.setVisible(false);
			$.fourthView.setVisible(false);
			break;
		case 2:					
			Ti.App.fireEvent("blog", actionBarModule);	
			$.thirdView.setVisible(true);
			$.firstView.setVisible(false);
			$.secondView.setVisible(false);			
			$.fourthView.setVisible(false);
			break;
		case 3:					
			Ti.App.fireEvent("about", actionBarModule);	
			$.fourthView.setVisible(true);
			$.firstView.setVisible(false);
			$.secondView.setVisible(false);
			$.thirdView.setVisible(false);			
			break;
	}
	
	actionBarTitle = _index;	
}

function windowOpen(e) {
	actionBarModule.setTitle("HOME");

	Ti.App.addEventListener("home", function updateTitle(e) {	
		actionBarModule.setTitle("HOME");
	});		

	Ti.App.addEventListener("event", function updateTitle(e) {	
		actionBarModule.setTitle("EVENT");
	});		

	Ti.App.addEventListener("blog", function updateTitle(e) {	
		actionBarModule.setTitle("BLOG");
	});		

	Ti.App.addEventListener("about", function updateTitle(e) {	
		actionBarModule.setTitle("ABOUT");
	});  
}

$.index.open();
