(function( Alerts, $, undefined ) {
	var _container_selector = "#message-container";
	var _container;
	var _count = 0;
	var _max_count = 3;
	var _directionUp = true;
	var _speed = "fast";
	var _messageLevel = {
		Success: "success",
		Info: "info",
		Warning: "warning",
		Danger: "danger"
	};
	
	Multistream.Alerts.OnLoad = function(css) {
		var _css = {
			right: "20px",
			top: "20px"
		};
		
		if (!_.isUndefined(css)) {
			$.extend(true, _css, css);
		}
		
		_container = $(_container_selector);
		_container.css(_css);
		_count = 0;
		
		$(document.body).on("click", ".close-message", function(){
			var panel_selector = $(this).data("target");
			
			Multistream.Alerts.RemoveMessage($(panel_selector));
		});
	};
	
	Multistream.Alerts.AddMessage = function(title, message, level) {
		var newMessage = Multistream.Alerts.New(title, level, message);
		newMessage.hide();
		
		if	(_directionUp) {
			newMessage.prependTo(_container);
		} else {
			newMessage.appendTo(_container);
		}
		
		newMessage.slideDown(_speed);
			
		if (++_count > _max_count) {
			if	(_directionUp) {
				Multistream.Alerts.RemoveMessage(
					_container
						.children(".message-open")
						.last()
				);
			} else {
				Multistream.Alerts.RemoveMessage(
					_container
						.children(".message-open")
						.first()
				);
			}
		}
	};
	
	Multistream.Alerts.AddSuccess = function(title, message) {
		Multistream.Alerts.AddMessage(title, message, _messageLevel.Success);
	};
	Multistream.Alerts.AddInfo = function(title, message) {
		Multistream.Alerts.AddMessage(title, message, _messageLevel.Info);
	};
	Multistream.Alerts.AddWarning = function(title, message) {
		Multistream.Alerts.AddMessage(title, message, _messageLevel.Warning);
	};
	Multistream.Alerts.AddDanger = function(title, message) {
		Multistream.Alerts.AddMessage(title, message, _messageLevel.Danger);
	};
	Multistream.Alerts.RemoveMessage = function(el) {
		el.slideUp(_speed).removeClass("message-open");
		
		--_count;
	};
	
	Multistream.Alerts.New = function(title, level, message) {
		var _id = "panel_" + new Date().getTime();
		return $(
			"<div class='panel panel-" + level + " message-open' id='" + _id + "'>" + 
				"<div class='panel-heading'>" + 
					title +
					"<button type='button' class='close close-message' data-target='#" + _id + "'  aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
				"</div>" + 
				"<div class='panel-body'>" + 
					message +
				"</div>" + 
			"</div>"
		);
	};
}( window.Multistream.Alerts = window.Multistream.Alerts || {}, jQuery ));