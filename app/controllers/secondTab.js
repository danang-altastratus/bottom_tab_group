// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var tableData = [];
for (var i = 0; i < 100; i++) {
	tableData.push(
		{
			properties: {
				image: "http://rnr30.compgroup.netdna-cdn.com/wp-content/sites/22/2015/07/Horizontal-Logo-White.png",				
				title: "List item index ke-" + i,
				color: "#000",
				height: 50				
			}	
		}
	);	
}

$.listSection.setItems(tableData);
