$(document).ready(function(){
	//Declare Filter array
	var filterArray = {};
	var segmentationNames = {};
	var currentQuestionId = $(".questions_table tbody tr:first a").prop('id').replace('question','');
	var currentQuestionType = $(".questions_table tbody tr:first span").text();
	var parentQuestionId = 0;

	var colors = ["rgba(100, 155, 255, 255)","rgba(243, 134, 48,1)", "rgb(224, 228, 204)", "rgb(105, 210, 231)",  "rgba(255, 155, 100, 255)", "rgba(155, 100, 255, 255)", "rgba(155, 155, 155, 255)", "rgba(100, 155, 100, 255)", "rgba(100, 100, 155, 255)", "rgba(100, 255, 155, 255)", "rgba(100, 255, 1100, 255)", "rgba(155, 100, 255, 255)", "rgba(100,155, 255, 255)", "rgba(0, 255, 0, 255)", "rgba(1100, 100, 255, 255)", "rgba(100,255, 255, 255)", "rgba(110, 255, 110, 255)", "rgba(2100,100, 255, 255)", "rgba(100,255, 255, 255)"];

	$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
	// $(".filter a").click(function(e){
	// 	e.preventDefault();

	// });



	//Question heading slideUp slideDown Questions body
	$("#questions_headline").click(function(){
		//Check if hidden or shown
		if($("#questions_body").css("display") == "block"){
			$("#questions_headline i").removeClass("fa-chevron-down").addClass("fa-chevron-right");
		}else{
			$("#questions_headline i").removeClass("fa-chevron-right").addClass("fa-chevron-down");
		}
		$("#questions_body").slideToggle();

	});

	//Choosing a question changes the content of the #questions_headline and draws the chart accordingly
	$(".question").click(function(e){
		e.preventDefault();				
		var question = $(this).text();
		
		setCurrentQuestionId($(this).prop('id').replace('question',''));
		setCurrentQuestionType($(this).next().text());

		//If the question happens to be multiple set The parentId to be QuestionId Else set parentId to 0
		if(getCurrentQuestionType()  == "Multiple Choice"){
			setParentQuestionId(getCurrentQuestionId());
		}else{
			setParentQuestionId(0);
		}
		
		$("#questions_headline").html("<p> <i class='fa fa-chevron-right'></i> <strong>Showing Graph of : </strong> "+question+"</p>")
		$("#questions_body").slideToggle();

		drawGraph(null,null);

	});
	$(".child_questions").on('click',".child_question",function(){
		
		setCurrentQuestionId($(this).prop('id').replace('child_question',''));
		setCurrentQuestionType($(this).next().text());

		
		drawGraph(null,null);
	});


	//Set the Respondent filter accordion
	$("#respondent_filter_accordion").accordion({
		heightStyle: "content"

	});
	//Toggle Show / Hide
	$("#respondent_filter").click(function(){
		$("#respondent_filter_accordion").slideToggle();
	});


	//UnChecking filter chekbox results in increase and vice verse
	$(".filter_checkbox").click(function(){
		//CHekc if checked
		if($(this).prop('checked')){
			//Decrease badge Number
			$(".respondent_filter_badge").text( parseInt($(".respondent_filter_badge").text())-1);

		}else{
			//Increase badge Number
			$(".respondent_filter_badge").text( parseInt($(".respondent_filter_badge").text())+1);
		}
		updateFilterArray($(this));

	});

	//Clicking Sync Changes Results in drawingGraph again
	$(".sync_changes").click(function(){
		drawGraph(null,null);
	});


	

	//Functions begin here

	//Draw the chart
	function  drawGraph(canvas_id,options){
		
		options = {"segmentationId" : getCurrentSegmentationId(),"questionId" : getCurrentQuestionId(),"filterArray":getCurrentFilterArray(),"questionType":getCurrentQuestionType() ,"parentQuestionId" : getParentQuestionId() }
		
		//Check if anything is missing if missing exit
		if( typeof(options["segmentationId"]) !== "undefined" && typeof(options["questionId"]) !== "undefined" && typeof(options["questionType"]) !== "undefined"){
			if(options["questionType"] == "Multiple Choice"){
				//List all Children Questions 
				listChildQuestions(options["questionId"]);
				$('.child_questions').show();
				return;
			}else{
				$('.child_questions').hide();
				$('.child_questions .child_question').remove();
			}

			$.ajax({
			  type: "POST",
			  url: "",
			  data: {"_token":$('input[name="_token"]').attr('value'),"options" : options},
			  success: function(result){
			  		plotChart(result);
			  },
			  dataType: "json"
			});
		}

		

	}

	function plotChart(result){
		
		datasets_array  = [];

	 	var color_counter = 0;
	 	 

	 	
	 	$.each(result.data,function(key,value){
	 		datasets_array.push({
	 		label:'Hello',
			fillColor : colors[color_counter],
			strokeColor : "rgba(0,0,0,0.8)",
			highlightFill: colors[color_counter],
			highlightStroke: "rgba(0,0,0,1)",
			data : result.data[key]
		});
	 		color_counter++;
	 	});

		var data = {
			labels: result.label,
			datasets: datasets_array
		};
		console.log(data);
		
		$(".chart_container #chart").remove();
		$(".chart_container").append('<canvas id="chart"></canvas>');
		var canvas = document.getElementById("chart");
		canvas.width = $(".chart_container").width();
     	canvas.height = $(".chart_container").height();

		var ctx = document.getElementById("chart").getContext("2d");
		var myStackedBarChart = new Chart(ctx).StackedBar(data, {relativeBars:true});

		listLegends(result.legend);
	}
	function listLegends(labels){
		$(".legend_list").html('');
		var color_counter = 0;
		$.each(labels,function(key,value){
	 		$(".legend_list").append("<li><span class='color' style='background-color:"+colors[color_counter]+";width:12px;height:12px;display:inline-block;'></span> "+value+"</li>");
	 		color_counter++;
	 	});

	}
	function listChildQuestions(questionId){
		$.ajax({
			type:"POST",
			url:"/analysis/list_child_questions",
			data:{"_token":$('input[name="_token"]').attr('value'),"questionId" : questionId},
			success : function(result){
				$.each(result,function(key,value){
					$(".child_questions").append('<div class="col-md-4"><button class="btn btn-default btn-block child_question" id ="child_question'+value.id+'" >'+ value.question+'</button><span style="display:none">'+value.question_type+'</span></div>');
				});
			},
			dataType:"json"
		});

	}
	drawGraph(null,null);
	

	
	//Returns the current Question Id
	function getCurrentQuestionId(){
		return currentQuestionId;
	}

	//Sets the current Question Id for global variable currentQuestionId
	function setCurrentQuestionId(questionId){
		currentQuestionId = questionId;
	}

	//Returns the parent Question Id
	function getParentQuestionId(){
		return parentQuestionId;
	}

	//Sets the parent Question Id for global variable currentQuestionId
	function setParentQuestionId(questionId){
		parentQuestionId = questionId;
	}
	
	function getCurrentQuestionType(){
		return currentQuestionType;
	}
	function setCurrentQuestionType(questionType){
		currentQuestionType = questionType;
	}

	//Returns the current filterArray
	function getCurrentFilterArray(){
		return filterArray;
	}

	//Returns the segmentation id if there exist one
	function getCurrentSegmentationId(){
		return $("#segmentations").val();
	}
	

	//Updates the filter array whenever the filterCheckboxes are altered
	function updateFilterArray(checkboxItem){
		//Get the name of the checkbox
		var name = checkboxItem.prop('name').replace('[]','');
		if(checkboxItem.prop('checked')){
			//Remove the value from the filterArray
			

			filterToRemove = checkboxItem.prop('value');
			filterArray[name].splice($.inArray(filterToRemove, filterArray[name]),1);

			if(filterArray[name].length == 0){
				delete filterArray[name];
				$('#segmentations').prepend('<option value='+name+'>'+segmentationNames[name]+'</option>');
			}

		}else{
			//Add the value to the filterArray object
			
			
			//Add the segmentation name into the segmentationNames[name]
			//Check if the Segmentation option is available or already missing

			if($('#segmentations option[value='+name+']').length != 0){
				segmentationNames[name] = $('#segmentations option[value='+name+']').text();
				$('#segmentations option[value='+name+']').remove();
				
			}
			//If there exists an array u push it to the array
			if(filterArray[name]){
				filterArray[name].push(checkboxItem.prop('value'));

			}else{
				//Else set the value to a new array with the current checkboxItem value
				filterArray[name] = [checkboxItem.prop('value')];
					
			}
			
		}
	}




});