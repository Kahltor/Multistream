(function( Multistream, $, undefined ) {
	Multistream.AddStreamEvent;
	Multistream.StreamType = {
		Twitch: "twitch",
		YouTube: "youtube"
	};
	
	function _GetTwitchEmbed(streamer, options) {
		var _options = {
			class: "embed-responsive-item",
			//id: "frame_" + streamer,
			src: "http://www.twitch.tv/" + streamer + "/embed",
			frameborder: "0",
			scrolling: "no"
			//style: "width: 100%, height: 100%"
		};
		
		if (!_.isUndefined(options)) {
			$.extend( true, _options, options );
		}
		
		return $("<iframe />", _options);
	};

	function _GetYouTubeEmbed(streamer, options) {
		Multistream.Alerts.AddWarning("<span aria-hidden='true' class='glyphicon glyphicon-question-sign'></span>", "Стриминг с сервиса <strong>youtube</strong> на данный момент не реализован");
		return $("<div />");
	};
	
	Multistream.GetStreamEmbed = function (streamer, streamType, streamOptions) {
		var embedContainer = $("<div />", {
			class: "embed-responsive embed-responsive-16by9"
		});
		
		switch (streamType) {
			case Multistream.StreamType.Twitch:
				embedContainer.append(_GetTwitchEmbed(streamer, streamOptions));
				break;
				//return _GetTwitchEmbed(streamer, streamOptions);
			case Multistream.StreamType.YouTube:
				embedContainer.append(_GetYouTubeEmbed(streamer, streamOptions));
				break;
				//return _GetYouTubeEmbed(streamer, streamOptions);
			default:
				break;
		}
		
		return embedContainer;
	};
	
	function _AddStreamOnClick(el) {
		var streamer = $("#add-stream-input").val();
		if (streamer !== "") {
			//$("body").append(Multistream.GetStreamEmbed(streamer, el.data("service")));
			Multistream.AddStreamEvent.call(this, el);
		} else {
			Multistream.Alerts.AddInfo("<span aria-hidden='true' class='glyphicon glyphicon-info-sign'></span>", "Необходимо ввести ID стримера");
		}
	};
	
	Multistream.OnLoad = function(addStreamEventFunction) {
		//TODO:
		//загрузить стримы из URL
		
		if (_.isFunction(addStreamEventFunction)) {
			Multistream.AddStreamEvent = addStreamEventFunction;
		} else {
			Multistream.AddStreamEvent = function() { return false; };
		}
		
		$("img.add-stream").on("click", function() {
			_AddStreamOnClick($(this));
		});
		
		$("button.add-stream").on("click", function() {
			_AddStreamOnClick($(this).children());
		});
	}
}( window.Multistream = window.Multistream || {}, jQuery ));