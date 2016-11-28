$("#title").hide();

var show_elements = function() {
	$("#title").fadeIn(1500);
	$(".top_bar").animate({"top" : "7%"}, 1000);
	$(".bottom_bar").animate({"bottom" : "7%"}, 1000);
	$(".progress_bar").animate({"right" : "0%"}, 1000);
	$(".lateral_bar").css({"left" : "-10%"}, 1000);
	$(".lateral_bar").animate({"left" : "0%"}, 1000);
}

$(window).on("load", function() {
  // Animate loader off screen
	$(".se-pre-con").fadeOut();
	console.log("page loaded, waiting for elements to show");
	setTimeout(show_elements, 500);
});

// $(".arrow_box").mouseover(function(){
// 	$(".arrow_right, .arrow_left").css({"background-color":"#EDAF53"});
// })
// $(".arrow_box").mouseleave(function(){
// 	$(".arrow_right, .arrow_left").css({"background-color":"#252525"});
// })
// $(".arrow_box").click(function(){
// 	$(".arrow_right, .arrow_left").css({"background-color":"#252525"});
// })

//Create reference for divs position
var divs = [];
divs[0] = 0;

//create html progress_bar
for (i = 0; i <works_es.length; i++) {
	progress_bar_html = '<li><a id = "work' + i + '_bar_link" onclick=goto_div(' + i +')>&#9679;</a></li>';
	$("#progress_bar").append(progress_bar_html);
	$("#work" + i + "_bar_link").mouseover(function(){
		$(this).css({"font-size":"22px"});
	})
	$("#work" + i + "_bar_link").mouseleave(function(){
		$(this).css({"font-size":"12px"});
	})
}

var populate_works = function(works){

	for (i = 0; i <works.length; i++) {

		works_html = '<div class = "work" id="work' + i + '">' +
						'<div class = "work_box work_shadow" style="background-image:url(' + "'projects/" + works_es[i].image + "')" + '"' + ' data-toggle="modal" data-target="#work' + i + '_description">' +
							'<div class = "work_description">'+
								'<h1>' + works[i].title + '</h1>' + 
								'<h2>' + works[i].subtitle + '</h2>' +
							'</div>' + 
							'<div class = "work_info"><a><span class = "smooth">info</span></a></div>' +
						'</div>'+
					'</div>'+
					// --------------- MODAL --------------
					'<div id="work' + i + '_description" class="modal fade work" role="dialog">' + 
						'	<div class="lateral_bar"><ul class="nav" data-toggle="modal" data-target="#about">'+
							'<li id="about_tab"><a>About</a></li></ul></div>' +
						'<div class = "work_box" ' + i + '_description">' +
							'<div class = "work_video">' + 
								'<iframe id="video' + i + '" src="' + works_es[i].video + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' +
							'</div>'+
							'<div class = "work_description_modal">' +
								'<h1>'+ works[i].info_title + '</h1>' + 
								'<p>' + works[i].info  + '</p>' + 
							'</div>' + 
							'<div class = "work_info close_button">' +
								'<a data-dismiss="modal" data-target="#work1_description"><span class = "smooth" onclick="stopvideo(' + i + ')">close</span></a>' +
							'</div>' +
						'</div>' + 
					'</div>'
		
		//populate the html	
		if(i === 0) {
			$("#about").after(works_html);
		} else {
			$("#work" + (i-1)).after(works_html);
		}
		
		//create div reference for down arrow
		divs[i + 1] = $("#work" + i).offset().top;
	}
}

$(document).scroll(function() {
	for (i = 1; i <= works_es.length; i++) {
		if ($(window).scrollTop() >= divs[i]-1 && ($(window).scrollTop() < divs[i+1] - 1 || divs[i+1] == undefined)) {
			$("#work" + (i-1) + "_bar_link").css({"font-size":"22px"});
		} else {
			$("#work" + (i-1) + "_bar_link").css({"font-size":"12px"});
		}
	}
})

var remove_divs = function(){
	for (i=0; i<works_es.length; i++) {
	$("#work" + i).remove();
	}
}

var change_text = function(old_text, new_text){
	$(old_text).fadeOut(200, function(){
			$(this).html(new_text).fadeIn(200);
		})
}

change_text("#title_about_section", title_about_section_es);
change_text("#description_about_section", description_about_section_es);


var change_language = function(language) {
	if(language === "es") {
		remove_divs();
		populate_works(works_es);
		change_text("#main_subtitle", main_subtitle_es);
		// change_text("#about_tab", "Contacto");
		change_text("#title_about_section", title_about_section_es);
		change_text("#description_about_section", description_about_section_es);
	} else {
		remove_divs();
		populate_works(works_en);
		change_text("#main_subtitle", main_subtitle_en);
		// change_text("#about_tab", "About");
		change_text("#title_about_section", title_about_section_en);
		change_text("#description_about_section", description_about_section_en);
	}
}

var stopvideo = function(videoID){
    var iframe = document.getElementById("video" + videoID);
    iframe.src = iframe.src;
}

var goto_div = function(i) {
    $('html,body').animate({scrollTop: divs[i + 1]}, 1000);
}

$("#next_button").click(function(){
	for (i=0; i<divs.length; i++) {
		if ($(window).scrollTop() < Math.floor(divs[i+1])) {
			position = i;
			break;
		}	
	}
    // $('html,body').animate({scrollTop: divs[position + 1]}, 1000);
    $('html,body').animate({scrollTop: $("#work"+i).offset().top}, 1000);
})


if(navigator.language == "es"){
	change_language("es");
	populate_works(works_es);
} else {
	populate_works(works_en);
	change_language("en");
}


// $(window).scroll(function(event){
// 	var position = Math.floor(($(window).scrollTop() + 1)/ divs[1]);
// 	var st = $(this).scrollTop();
// 	if (st > lastScrollTop){
// 		$('html,body').animate({scrollTop: divs[position + 1 ]}, 1000);
// 	} else {
//		$('html,body').animate({scrollTop: (divs[position - 1])}, 1000);
// 	}
// 	lastScrollTop = st;
// });

// $(window).bind('mousewheel', function(event) {
//     var position = Math.floor(($(window).scrollTop() + 1)/ divs[1]);
// 	if (event.originalEvent.wheelDelta >= 0) {
// 		console.log('Scroll up');
// 		$('html,body').animate({scrollTop: (divs[position - 1])}, 1000);
// 	} else {
// 		$('html,body').animate({scrollTop: divs[position + 1 ]}, 1000);

//     }
// });

