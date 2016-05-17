// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var tableData = [];
for (var i = 0; i < 100; i++) {
	var rows = Ti.UI.createTableViewRow({
		height: 50,
		selectedBackgroundColor: "grey"		
	});

	var image = Ti.UI.createImageView({
		backgroundColor: "#fff",
		image: "http://www.redevents.com/images/RedEvents/logo_icon/Logo_Red_Events_small-web.jpg",
		height: 30,
		width: 30,
		left: 15
	});
	
	var label = Ti.UI.createLabel({
		color: "#000",
		text: "Row index ke-" + i,
		left: 50
	});
	
	rows.add(image);
	rows.add(label);
	tableData.push(rows);	
}

$.tableViewContainer.setData(tableData);
