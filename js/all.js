$(document).ready(function() {
	$(".dropdown-menu li").click(function() {
		$(this).parents(".input-group-btn").find(".dropdown-select").html($(this).children("a").html());
	});
	
	Multistream.OnLoad(function(element) {
		var streamer = $("#add-stream-input").val();
		//$("body").append(Multistream.GetStreamEmbed(streamer, element.data("service")));
		history.pushState({}, "", "/streamer");
	});
	Multistream.Alerts.OnLoad();
});