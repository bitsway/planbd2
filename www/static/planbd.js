
var latitude="";
var longitude="";

var latitudewq="";
var longitudewq="";

function getLocationInfoAch() {	

	navigator.geolocation.getCurrentPosition(onSuccess, onError);		
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

function getLocationInfoWq() {
	//$("#wq_lat").val(11111);
   	//$("#wq_long").val(11111);
	navigator.geolocation.getCurrentPosition(onSuccessWq, onErrorWq);		
	$(".errorChk").html("Confirming location. Please wait.");
}

// onSuccess Geolocation
function onSuccessWq(position) {
	$("#wq_lat").val(position.coords.latitude);
	$("#wq_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onErrorWq(error) {
   $("#wq_lat").val(0);
   $("#wq_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}
//---- online 
var apipath="http://e.businesssolutionapps.com/planbd2/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/planbd2/syncmobile/";


var planFlag=0;
var primarySchoolFlag=0;
var secondarySchFlag=0;

var achPlanSector='';


var achWord='';
var achCluster='';

var achHndEvent='';

var achWardNew='';
var achEpiComName='';
var achVillSubClusName='';
var achHhhName='';

var achID='';
	
var startDt='';
var syncResult='';
var achPlanId='';
var achPlanActivities='';
var achCBOid='';
var achPopulation='';
var achHousehold='';
var achMale='';
var achFemale='';
var achGirlsUnder='';
var achBoysUnder='';
var achGirls='';
var achBoys='';
var achDapMale='';
var achDapFemale='';
var achPoorC='';
var achPoorEx='';
var achEthMale='';
var achEthFemale='';


var achLatType='';
var achComDate='';


var achTypeOfSchool='';
var achNameOfSchool='';
var nameOfpSchool='';
var nameOfsSchool='';
var achSchGirl='';
var achSchBoy='';
var achTeachFemale='';
var achTeachMale='';
var achSchDFemale='';
var achSchDMale='';
var achSchRehabInsDate='';
var achSchWashCompDate='';

var achOdfStatus='';

var achWpTech='';
var achWpComDate='';


var achServiceRecpt='';
var achPhoto='';
var wqPhoto='';
var reviewAchFlag=0; //used for html triger
var reviewAchDisplayFlag=false; //used for save data from review
var arrayId=-1;

var imageName = "";
var imagePathA="";
var imagePathW="";

$(function(){
	
	$('#syncBasic').click(function() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorChk").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorChk").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
			
		 	//alert(apipath+'passwordCheck?cid=PLANBD&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({				   
//			  url:apipath+'dataSyncCheck?cid=WAB&mobile='+mobile+'&password='+encodeURI(password)+'&sync_code='+localStorage.sync_code,
				url:apipath+'passwordCheck?cid=PLANBD&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					if (syncResultArray[0]=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.plan_list=syncResultArray[2];
						localStorage.primary_school=syncResultArray[3];
						localStorage.secondary_school=syncResultArray[4];
						
						
						localStorage.mobile_no=mobile;
						
						
						localStorage.ach_save="";
						localStorage.water_q_save="";
						
						$(".errorChk").html("Sync Successful");
						//alert('aa');
						
						$('#syncBasic').show();
						
						if (planFlag==0){
							$("#planlistDiv").html(localStorage.plan_list);
							planFlag=1;
						}else{
							$('#planlistDiv').empty();
							$('#planlistDiv').append(localStorage.plan_list).trigger('create');
						}
						
						if (primarySchoolFlag==0){
							$("#primarySchDiv").html(localStorage.primary_school);	
							primarySchoolFlag=1;
						}else{
							$('#primarySchDiv').empty();
							$('#primarySchDiv').append(localStorage.primary_school).trigger('create');
						}
						
						if (secondarySchFlag==0){			   
							$("#secSchDiv").html(localStorage.secondary_school);	
							secondarySchFlag=1;
						}else{
							$('#secSchDiv').empty();
							$('#secSchDiv').append(localStorage.secondary_school).trigger('create');
						}
												
						
						
						var url = "#pagesync";
						$.mobile.navigate(url);
						//$(location).attr('href',url);
//						location.reload();
					}
					else {
						
						$(".errorChk").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
		 
		 }//-----/field
			
	});//-----/basic
	
});//------/func

//------------------water aid button click

function waterAidClick(){
	$(".errorChk").text("");
	
	planFlag=0
	primarySchoolFlag=0
	secondarySchFlag=0
	
	$("#primarySchDiv").hide();
	$('#secSchDiv').hide();
	//var url = "#reportType";
	//$(location).attr('href',url);
	
	$.mobile.navigate("#reportType")
	location.reload();
	
	}
	
$(document).ready(function(){	
	$("#planlistDiv").html(localStorage.plan_list);	

	
	$(".errorChk").text("");
	$(".activities").text("");
	
	$("#primarySchDiv").hide();
	$('#secSchDiv').hide();
	
	//$("#achCluster").hide();
	$("#achHhID").hide();	
	//$("#tbl_water_point").hide();	
	$("#tbl_sanitation").hide();	
	$("#handwash_event").hide();
	$("#sharedLatHH").hide();	
	
	$("#tblHandSan").hide();		
	$("#divSchoolWash").hide();
	
	$("#achWardOld").hide();
	$("#achCluster").hide();	
	$("#epiClusterCom").hide();
	$("#odfStatus").hide();
	
	
	
	
	
//-------------------------------date format



	
});


//----------------back button
function backClick(){
	$(".errorChk").text("");
	}

//---------------------report Type list	
function achivementclick(){
	$(".errorChk").text("");
	
	if(localStorage.plan_list==undefined || localStorage.plan_list==""){
		$(".errorChk").text("Required Sync");
	}else{
		if (planFlag==0){
			$("#planlistDiv").html(localStorage.plan_list);
			planFlag=1;
		}else{
			$('#planlistDiv').empty();
			$('#planlistDiv').append(localStorage.plan_list).trigger('create');
		}
		
		
		if (primarySchoolFlag==0){
			$("#primarySchDiv").html(localStorage.primary_school);	
			primarySchoolFlag=1;
		}else{
			$('#primarySchDiv').empty();
			$('#primarySchDiv').append(localStorage.primary_school).trigger('create');
		}
		
		if (secondarySchFlag==0){			   
			$("#secSchDiv").html(localStorage.secondary_school);	
			secondarySchFlag=1;
		}else{
			$('#secSchDiv').empty();
			$('#secSchDiv').append(localStorage.secondary_school).trigger('create');
		}
		
	
		
		$("#achWord").val("");
		$("#achClusterID").val("");
		$("input:radio[name='hnd_event']" ).attr('checked','');
		
		$("#achID").val("");
		
		$("#population").val("");
		$("#household").val("");
		$("#male").val("");
		$("#female").val("");
		$("#girlsUnder").val("");
		$("#boysUnder").val("");
		$("#girls").val("");
		$("#boys").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#poorA").val("");
		$("#poorB").val("");
		$("#poorC").val("");
		$("#poorEx").val("");
		$("#ethMale").val("");
		$("#ethFemale").val("");	
		$("#serRecpent").val("");	
		$("#achPhoto").val("");
		
		$("#latType").val("");
		$("#san_conp_date").val("");	
		$("#wp_tech").val("");
		$("#wp_conp_date").val("");
		
		
		$("#achWordNew").val("");
		$("#epiComName").val("");
		$("#villSubClusName").val("");
		$("#nameOfHhhID").val("");
		
		$("#latTypeD").val("");
		$("#san_or_hw_conp_date").val("");
		$("#schType").val("");
		$("#schName").val("");
		
		$("#sch_girl").val("");
		$("#sch_boy").val("");
		$("#totalStudent").val("");
		$("#teach_female").val("");
		$("#teach_male").val("");
		$("#totalTeacher").val("");
		$("#sch_dapFemale").val("");
		$("#sch_dapMale").val("");
		$("#totalDisable").val("");
		
		$("#st_of_rehab_date").val("");
		$("#schWash_conp_date").val("");
		
		$("#achWordNew").val("");
		
		reviewAchDisplayFlag==false;
		arrayId='';
		
		
		
		var url = "#planList";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		//location.reload();
	}
}
	
//------------------------------domain list 
function achDataNext(){	
		
	if($("#planlistDiv").find("input[name='activity_select']:checked").length==0){
		$(".errorChk").text("Required Plan");
	}else{
		var ach_plan_id=$("input[name='activity_select']:checked").val();
		
		achPlanActivities=$("#achActivityName"+ach_plan_id).val();
		
		 achPlanSector=$("#achActivitySector"+ach_plan_id).val();
		
		
		achPlanId=ach_plan_id;
		achPlanActivities=achPlanActivities;
		
		$(".activities").text(achPlanActivities);
		
		
			
		
		if (achPlanSector=="HandWash"){
			
			$("#trLatType").hide();
			$("#tblHandSan").show();
						
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#achHhID").show();
			$("#latType").val("");
			$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");
			$(".hh_or_wp_id").html("Water Point ID<sup class='reqField'>*</sup>");
		}else if (achPlanSector=="Sanitation"){
			$("#tblHandSan").show();
			$("#trLatType").show();
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#achHhID").show();
			$("#tbl_sanitation").show();
			$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");
			$(".hh_or_wp_id").html("HH ID<sup class='reqField'>*</sup>");			
		}else if(achPlanSector=="SchoolWash"){			
			$("#divSchoolWash").show();					
		}else if(achPlanSector=="CommunityODF"){			
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#odfStatus").show();
			$("#achWardNew").hide();
			$(".com_or_cluster_name").html("Community Name (EPI Cluster Name)<sup class='reqField'>*</sup>");					
			}

		
		
		if (startDt==""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			startDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		}
		
		$(".errorChk").text("");
		
		
		var url = "#achiveDataList";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
	}
}


//-----------------------------achivement data people support

function achivementDataPSupport(){
	$(".errorChk").text("");	
	
	var now = new Date();
	var month=now.getUTCMonth()+1;
	if (month<10){
		month="0"+month
		}
	var day=now.getUTCDate();
	if (day<10){
		day="0"+day
		}
		
	var year=now.getUTCFullYear();
	
	var currentDay = new Date(year+ "-" + month + "-" + day);
	
	
	
	var ach_word=$("#achWord").val();	
	var ach_cluster=$("#achClusterID").val();	
	var ach_word_new=$("#achWordNew").val();
	
	var epiComName=$("#epiComName").val();	
	var villSubClusName=$("#villSubClusName").val();		
	
	//hhh name
	var ach_hhh_name=$("#nameOfHhhID").val();	
	// hh id
	var ach_id=$("#achID").val();
	
	
	//hand wash
	//var hnd_event=$("input[name='hnd_event']:checked").val();
	
		
	var population=$("#population").val();
	var household=$("#household").val();
	var male=$("#male").val();
	var female=$("#female").val();

	var girls=$("#girls").val();
	var boys=$("#boys").val();
	var dapMale=$("#dapMale").val();
	var dapFemale=$("#dapFemale").val();
	
	

	
	//for sanitation 
	var latType=$("#latType").val();
	
	// for hand wash or latrine	
	var sanHwCompDate=$("#san_or_hw_conp_date").val();	
		
		
	

	
	//------------- school info
	var typeOfSchool=$("#schType").val();
	nameOfpSchool=$("#p_school_combo").val();
	nameOfsSchool=$("#s_school_combo").val();
	
	
	var schGirl=$("#sch_girl").val();
	var schBoy=$("#sch_boy").val();
	
	
	var teachFemale=$("#teach_female").val();
	var teachMale=$("#teach_male").val();
	
	var schDFemale=$("#sch_dapFemale").val();
	var schDMale=$("#sch_dapMale").val();
	
	
	var schRehabInsDate=$("#st_of_rehab_date").val();
	var schWashCompDate=$("#schWash_conp_date").val();
	
	//------ ODF
	
	var odfStatus=$("#achOdfStatus").val();
		
	
	
	
	if(ach_cluster==''){
		ach_cluster=0;
		}
	
	if(ach_id==''){
		ach_id=0;
		}
	
	if(male==''){
			male=0;
			}
	
	if(female==''){
			female=0;
			}
			
	/*if(girlsUnder==''){
			girlsUnder=0;
			}
			
	if(boysUnder==''){
			boysUnder=0;
			}*/
			
	if(girls==''){
			girls=0;
			}
			
	if(boys==''){
			boys=0;
			}
			
	if(dapMale==''){
			dapMale=0;
			}
			
	if(dapFemale==''){
			dapFemale=0;
			}
	
	if(schDMale==''){
		schDMale=0;
		}
	

	
	if(schGirl==''){
		schGirl=0;
		}
	if(schBoy==''){
		schBoy=0;
		}
	if(teachFemale==''){
		teachFemale=0;
		}
	if(schDFemale==''){
		schDFemale=0;
		}
	if(population==''){
		population=0;
		}

	
	
	
if (achPlanSector=="Sanitation" || achPlanSector=="HandWash"){
	if (ach_word=="" ){		
		$(".errorChk").text("Required Ward (Old) ");
	}else if(ach_cluster=="") {
		$(".errorChk").text("Required Cluster ID ");
	}else if(ach_word_new=="") {
		$(".errorChk").text("Required Ward ID (New) ");
	}else if(epiComName=="") {
		$(".errorChk").text("Required EPI Community Name ");
	}else if(ach_hhh_name=="") {
		$(".errorChk").text("Required Household Head Name ");
	}else if(ach_id=="") {
		$(".errorChk").text("Required Household ID ");
	}else if(achPlanSector=="Sanitation" && latType=="") {
		$(".errorChk").text("Required Latrine Type ");
	}else if(sanHwCompDate=="") {
		$(".errorChk").text("Required ComPletion Date. ");
	}else{
		var chkSanCompDate = new Date(sanHwCompDate);
		if (chkSanCompDate>currentDay){
			$(".errorChk").text("Required Completion Date Less Then Today");
		}else{
			if(population<0){
				$(".errorChk").text("Invalid Population");
			}else{
				achWord=ach_word																		
				achCluster=ach_cluster
				
				achWardNew=ach_word_new	
				
				achEpiComName=epiComName
				achVillSubClusName=villSubClusName
				
				achHhhName=ach_hhh_name										
						
				//hh id
				achID=ach_id
				
				achPopulation=population
				
				achMale=male
				achFemale=female
				
				achGirls=girls
				achBoys=boys
				achDapMale=dapMale
				achDapFemale=dapFemale
																					
				achLatType=latType
				achComDate=sanHwCompDate
				
				var ach_plan_id=$("input[name='activity_select']:checked").val();
				//alert(ach_plan_id);						
				$(".errorChk").text("");
				
				
				var url="#inPhoto";
				$.mobile.navigate(url);	
				
			}						
		}
	}
	
	}else if(achPlanSector=="SchoolWash"){
		if (typeOfSchool=="" ){
			$(".errorChk").text("Required School Type ");						
		}else if (typeOfSchool=="Primary" && nameOfpSchool=="" ){
			$(".errorChk").text("Required School Name ");
		}else if (typeOfSchool=="Secondary" && nameOfsSchool=="" ){
			$(".errorChk").text("Required School Name ");						
		}else if (schRehabInsDate=="" || schWashCompDate=="" ){
				$(".errorChk").text("Required Reabilitation and Completion Date ");						
		}else{
			var chkSchwCompDate = new Date(schRehabInsDate);
			if (chkSchwCompDate>currentDay){
				$(".errorChk").text("Required Completion Date Less Then Today");
			}else{	
								
				achWardNew=ach_word_new
				
				achTypeOfSchool=typeOfSchool
				
				if(achTypeOfSchool=="Primary"){
					achNameOfSchool=nameOfpSchool
				}else if (achTypeOfSchool=="Secondary") {
					achNameOfSchool=nameOfsSchool
				}
					
				achSchGirl=schGirl
				achSchBoy=schBoy
				
				achTeachFemale=teachFemale
				achTeachMale=teachMale	
				
				achSchDFemale=schDFemale
				achSchDMale=schDMale
				
				achSchRehabInsDate=schRehabInsDate
				achSchWashCompDate=schWashCompDate
				
				var ach_plan_id=$("input[name='activity_select']:checked").val();
				//alert(ach_plan_id);						
				$(".errorChk").text("");
				
				
				var url="#inPhoto";
				$.mobile.navigate(url);	
				
			}
		}
			
					
	}else if(achPlanSector=="CommunityODF"){
		if (ach_word=="" ){		
			$(".errorChk").text("Required Ward (Old) ");
		}else if(ach_cluster=="") {
			$(".errorChk").text("Required Cluster ID ");			
		}else if(epiComName=="") {
			$(".errorChk").text("Required EPI Cluster/Community Name ");
		}else if(odfStatus=="") {
			$(".errorChk").text("Required ODF Status");
		}else{
			achWord=ach_word
			achCluster=ach_cluster
			achEpiComName=epiComName
			achVillSubClusName=villSubClusName
			achOdfStatus=odfStatus
			
			var ach_plan_id=$("input[name='activity_select']:checked").val();
			//alert(ach_plan_id);						
			$(".errorChk").text("");
			
			$("#btn_take_pic").hide();
			$("#myImageA").hide();
			$("#btn_ach_lat_long").hide();
			$("#btn_ach_save").hide();						
			
			var url="#inPhoto";
			$.mobile.navigate(url);	
			
		}			
	}
}


//------------------ show population hand wash or latrine
function totalPopulation(){
	var male=$("#male").val();
	var female=$("#female").val();
	//var girlsUnder=$("#girlsUnder").val();
	//var boysUnder=$("#boysUnder").val();
	var girls=$("#girls").val();
	var boys=$("#boys").val();
	
	var dapFemale=$("#dapFemale").val();
	var dapMale=$("#dapMale").val();
	
	if(male==''){
			male=0;
			}
	if(female==''){
			female=0;
			}
	/*if(girlsUnder==''){
			girlsUnder=0;
			}
	if(boysUnder==''){
			boysUnder=0;
			}*/
	if(girls==''){
			girls=0;
			}
	if(boys==''){
			boys=0;
			}
			
	if(dapFemale==''){
			dapFemale=0;
			}
	if(dapMale==''){
			dapMale=0;
			}
			
	var totalMF=eval(male)+eval(female)+eval(girls)+eval(boys)+eval(dapFemale)+eval(dapMale);
	
	$("#population").val(totalMF);
	}


//----------------------- school Wash

function totalStudent(){
	var sch_girl=$("#sch_girl").val();
	var sch_boy=$("#sch_boy").val();	
	
	if(sch_girl==''){
			sch_girl=0;
			}
	if(sch_boy==''){
			sch_boy=0;
			}
	
			
	var totalST=eval(sch_girl)+eval(sch_boy);
	
	$("#totalStudent").val(totalST);
	}


function totalTeacher(){
	
	var teach_female=$("#teach_female").val();
	var teach_male=$("#teach_male").val();	
	
	if(teach_female==''){
			teach_female=0;
			}
	if(teach_male==''){
			teach_male=0;
			}
	
	var totalTeacher=eval(teach_female)+eval(teach_male);
	
	$("#totalTeacher").val(totalTeacher);
	}

function totalDStudent(){
	var sch_dapFemale=$("#sch_dapFemale").val();
	var sch_dapMale=$("#sch_dapMale").val();	
	
	if(sch_dapFemale==''){
			sch_dapFemale=0;
			}
	if(sch_dapMale==''){
			sch_dapMale=0;
			}
	
			
	var totalDST=eval(sch_dapFemale)+eval(sch_dapMale);
	
	$("#totalDisable").val(totalDST);
	}


		
		
		
		
function getSchoolName(){
	var schoolType=$("#schType").val();
	
	if (schoolType=="Primary"){
		$('#secSchDiv').hide();
		$('#primarySchDiv').show();
	}else if(schoolType=="Secondary"){
		$('#primarySchDiv').hide();		
		$('#secSchDiv').show();
		
	}
	

}
//--------------/school wash



	
//-----------------------------planid,CBO ID, ID, Population, Household,male,Female,girls Under, boys Under,girls,boys,DAP male, DAP Female,Poor A,Poor B ,Poor C, Poor D, Ethnic Male, Ethnic Female, service Recepent, service recepent value
function achiveDataSave(){
		$(".errorChk").text("");		
		//$("#btn_ach_save").hide();
		//$("#btn_ach_submit").hide();
		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();		
		
		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		if (achPhoto=='' || achPhoto==undefined){
			$(".errorChk").text("Please confirm Photo ");
			$("#btn_ach_save").show();
			$("#btn_ach_submit").show();
		}else{
		
			if(latitude==0 || longitude==0){
				$(".errorChk").text("Please confirm your location ");
				$("#btn_ach_save").show();
				$("#btn_ach_submit").show();
			}else{
				
								
				//achivementSave=achPlanId+'fdfd'+achCBOid+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achHousehold+'fdfd'+achMale+'fdfd'+achFemale+'fdfd'+achGirlsUnder+'fdfd'+achBoysUnder+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achPoorA+'fdfd'+achPoorB+'fdfd'+achPoorC+'fdfd'+achPoorEx+'fdfd'+achEthMale+'fdfd'+achEthFemale+'fdfd'+achServiceRecpt+'fdfd'+achPlanActivities+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude+'fdfd'+achWord+'fdfd'+achHndEvent+'fdfd'+achCluster+'fdfd'+achLatType+'fdfd'+achComDate+'fdfd'+achWpTech+'fdfd'+achWpComDate		
				achivementSave=achPlanId+'fdfd'+achWord+'fdfd'+achCluster+'fdfd'+achWardNew+'fdfd'+achEpiComName
				+'fdfd'+achVillSubClusName+'fdfd'+achHhhName+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achMale+'fdfd'+achFemale
				+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achLatType+'fdfd'+achComDate
				+'fdfd'+achTypeOfSchool+'fdfd'+nameOfpSchool+'fdfd'+nameOfsSchool+'fdfd'+achSchGirl+'fdfd'+achSchBoy+'fdfd'+achTeachFemale
				+'fdfd'+achTeachMale+'fdfd'+achSchDFemale+'fdfd'+achSchDMale+'fdfd'+achSchRehabInsDate+'fdfd'+achSchWashCompDate
				+'fdfd'+achOdfStatus+'fdfd'+achPlanActivities+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude
				
				if (achPlanId==''){
					$(".errorChk").text("New records not available");
					$("#btn_ach_save").show();
				}else{
					
					achivementStr=localStorage.ach_save;		
					var addFlag=true;			
					
					if (achivementStr==undefined || achivementStr==''){			
						localStorage.ach_save=achivementSave
					}else{
						var achiveSavArray=achivementStr.split('rdrd');
						
						if (reviewAchDisplayFlag==true){					
							if (arrayId ==-1){							
									$(".errorChk").text("Review Index value Error");
									$("#btn_ach_save").show();
							}else{
								achiveSavArray[arrayId]=achivementSave
								
								
								var achTemp="";
								var achTempStr="";
								for (i=0;i<achiveSavArray.length;i++){
									accTemp=achiveSavArray[i]
									
									if (achTempStr==""){
										achTempStr=accTemp
									}else{
										achTempStr=achTempStr+'rdrd'+accTemp
										}
									
								}
								if (achTempStr==""){
									$(".errorChk").text("Review Index Error" );
									$("#btn_ach_save").show();
								}else{
									localStorage.ach_save=achTempStr;
									}
								
								}
						}else{				
							if (achiveSavArray.length >= 10){
								addFlag=false;					
							}else{
								localStorage.ach_save=achivementStr+'rdrd'+achivementSave
								
							}
						}
					}
					
					if (addFlag==false){
						$(".errorChk").text("Maximum 10 records allowed to be saved for review");
						$("#btn_ach_save").show();
					}else{
						achWord='';
						achCluster='';
						achHndEvent='';
					
						achPlanId='';
						achID='';
						achCBOid='';
						achPopulation='';
						achHousehold='';
						vachMale='';
						achFemale='';
						achGirlsUnder='';
						achBoysUnder='';
						achGirls='';
						achBoys='';
						achDapMale='';
						achDapFemale='';
						//---------------not use
						achPoorA='';
						achPoorB='';
						achPoorC='';
						achPoorEx='';
						achEthMale='';
						achEthFemale='';			
						
						achServiceRecpt='';
						//--------------------------
						achLatType='';
						achComDate='';
						
						achWpTech='';
						achWpComDate='';
						//----------------------------
						achWardNew='';
						achEpiComName='';
						achVillSubClusName='';
						achHhhName='';
						
						achTypeOfSchool='';
						achNameOfSchool='';
						achSchGirl='';
						achSchBoy='';
						achTeachFemale='';
						achTeachMale='';
						achSchDFemale='';
						achSchDMale='';
						achSchRehabInsDate='';
						achSchWashCompDate='';
						
						
						//-----------------------
						achPhoto='';
						startDt='';
						
						latitude='';
						longitude='';
						
						$("#achWord").val();
						$("#achClusterID").val("");
						$("#achID").val(""); //hhid
						$("input:radio[name='hnd_event']" ).attr('checked','');
						$("#population").val("");
						$("#household").val("");
						$("#male").val("");
						$("#female").val("");
						$("#girlsUnder").val("");
						$("#boysUnder").val("");
						$("#girls").val("");
						$("#boys").val("");
						$("#dapMale").val("");
						$("#dapFemale").val("");
						$("#poorA").val("");
						$("#poorB").val("");
						$("#poorC").val("");
						$("#poorEx").val("");
						$("#ethMale").val("");
						$("#ethFemale").val("");
						
						//sanitation
						$("#latType").val("");
						$("#san_conp_date").val("");
						
						//water point
						$("#wp_tech").val("");
						$("#wp_conp_date").val("");
	
						$("#achPhoto").val("");
						
						$("#ach_lat").val("");
						$("#ach_long").val("");
						
						reviewAchDisplayFlag==false;
						arrayId=-1;
						
						
						$(".errorChk").text("Successfully saved for review");
						$("#btn_take_pic").hide();
						$("#btn_ach_lat_long").hide();
						
						}
				}
			}
		}
	}

function deleteAchReview(){	
		arrayId=eval($("input[name='achReviewRad']:checked").val());
		
		if (arrayId ==undefined){							
				$(".errorChk").text("Select a Record");
				
		}else{
				var achiveSavArray3=localStorage.ach_save.split('rdrd');
				
				achiveSavArray3.splice(arrayId,1);
				
				var achTemp3="";
				var achTempStr3="";
				for (k=0;k<achiveSavArray3.length;k++){
					accTemp3=achiveSavArray3[k];
					
					if (achTempStr3==""){
						achTempStr3=accTemp3
					}else{
						achTempStr3=achTempStr3+'rdrd'+accTemp3
						}
					
				}				
				localStorage.ach_save=achTempStr3;				
				
				var url = "#reportType";
				//$(location).attr('href',url);
				$.mobile.navigate(url);
				location.reload();
			}
	
	}
//Review Data List
function reviewAchiveData(){
		//listOfReviewData='';
		var achivement=localStorage.ach_save
		
		if (achivement==undefined || achivement==''){
			$(".errorChk").text("Review data not available");
		}else{
			var achivementSaveArray=achivement.split('rdrd');
			
			var achiveSaveCount=achivementSaveArray.length;
			
			var achiveArray=[];
			var reviewDataDiv="";
			var planID="";
			var cboID="";
			var achActivities="";
			
			reviewDataDiv='<ul data-role="listview" data-inset="true"><li style="background-color:#F2F2F2;">Review </li><li class="ui-field-contain"><fieldset data-role="controlgroup">'
			for (i=0;i<achiveSaveCount;i++){
				achiveArray=achivementSaveArray[i].split('fdfd');
				planID=achiveArray[0];
				//cboID=achiveArray[1];
				achActivities=achiveArray[29];
				
				reviewDataDiv=reviewDataDiv+'<input type="radio" name="achReviewRad"  id="achReviewRad'+i+'"  value="'+i+'"/> <label for="achReviewRad'+i+'">'+achActivities+'-'+planID+'</label>'
				
				}
			
			reviewDataDiv=reviewDataDiv+'</fieldset></li></ul>'
			
			if (reviewAchFlag==0){
				$("#reviewAchList").html(reviewDataDiv);
				reviewAchFlag=1;
			}else{
				$('#reviewAchList').empty();
				$('#reviewAchList').append(reviewDataDiv).trigger('create');
				}
			
			//-----------------------------
			if (planFlag==0){
				$("#planlistDiv").html(localStorage.plan_list);
				planFlag=1;
			}else{
				$('#planlistDiv').empty();
				$('#planlistDiv').append(localStorage.plan_list).trigger('create');
			}
			
			
			if (primarySchoolFlag==0){
				$("#primarySchDiv").html(localStorage.primary_school);	
				primarySchoolFlag=1;
			}else{
				$('#primarySchDiv').empty();
				$('#primarySchDiv').append(localStorage.primary_school).trigger('create');
			}
			
			if (secondarySchFlag==0){			   
				$("#secSchDiv").html(localStorage.secondary_school);	
				secondarySchFlag=1;
			}else{
				$('#secSchDiv').empty();
				$('#secSchDiv').append(localStorage.secondary_school).trigger('create');
			}
			
			
			
			$("#achClusterID").val("");
			$("#achID").val("");
			$("input:radio[name='hnd_event']" ).attr('checked','');
			
			$("#population").val("");
			$("#household").val("");
			$("#male").val("");
			$("#female").val("");
			$("#girlsUnder").val("");
			$("#boysUnder").val("");
			$("#girls").val("");
			$("#boys").val("");
			$("#dapMale").val("");
			$("#dapFemale").val("");
			$("#poorA").val("");
			$("#poorB").val("");
			$("#poorC").val("");
			$("#poorEx").val("");
			$("#ethMale").val("");
			$("#ethFemale").val("");	
			$("#serRecpent").val("");
			
			$("#latType").val("");
			$("#san_conp_date").val("");
			
			$("#wp_tech").val("");
			$("#wp_conp_date").val("");
						
			$("#achPhoto").val("");				
			
			$("#ach_lat").val("");
			$("#ach_long").val("");
			
			reviewAchDisplayFlag==false;
			arrayId=-1;
			
			
			var url = "#reviewDataList";
			//$(location).attr('href',url);
			$.mobile.navigate(url);
		}	
		
	}

	
function reviewDataNext(){
	$('#btn_take_pic').hide();
	$('#btn_ach_lat_long').hide();
	
	reviewAchDisplayFlag=true;
	arrayId=eval($("input[name='achReviewRad']:checked").val());
	
	if (arrayId ==undefined){							
			$(".errorChk").text("Select a Record");			
	}else{
		
		var achivementRevArray2=localStorage.ach_save.split('rdrd');
		var achRevDetails=achivementRevArray2[arrayId];
		
		var achRevDetailsArray=achRevDetails.split('fdfd');
		
		//------------------
		$( "input:radio[name='activity_select'][value='"+achRevDetailsArray[0]+"']" ).attr('checked','checked');
		//$("#plan_select").val(achRevDetailsArray[0])
		
			
		
		
		$("#achWord").val(achRevDetailsArray[1]);
		$("#achClusterID").val(achRevDetailsArray[2]);
		//$("input:radio[name='hnd_event']" ).attr('checked','');
		
		$("#achID").val(achRevDetailsArray[7]);
		
		$("#population").val(achRevDetailsArray[8]);
		//$("#household").val("");
		$("#male").val(achRevDetailsArray[9]);
		$("#female").val(achRevDetailsArray[10]);
		//$("#girlsUnder").val("");
		//$("#boysUnder").val("");
		$("#girls").val(achRevDetailsArray[11]);
		$("#boys").val(achRevDetailsArray[12]);
		$("#dapMale").val(achRevDetailsArray[13]);
		$("#dapFemale").val(achRevDetailsArray[14]);
	
		
		
		$("#san_conp_date").val(achRevDetailsArray[16]);	
		$("#wp_tech").val("");
		$("#wp_conp_date").val("");
		
		
		$("#achWordNew").val(achRevDetailsArray[3]);
		$("#epiComName").val(achRevDetailsArray[4]);
		$("#villSubClusName").val(achRevDetailsArray[5]);
		$("#nameOfHhhID").val(achRevDetailsArray[6]);
		
		$("#latType").val(achRevDetailsArray[15]);
		$("#san_or_hw_conp_date").val(achRevDetailsArray[16]);
		$("#schType").val(achRevDetailsArray[17]);
		$("#p_school_combo").val(achRevDetailsArray[18]);
		$("#s_school_combo").val(achRevDetailsArray[19]);
		
		$("#sch_girl").val(achRevDetailsArray[20]);
		$("#sch_boy").val(achRevDetailsArray[21]);
		//$("#totalStudent").val("");
		$("#teach_female").val(achRevDetailsArray[22]);
		$("#teach_male").val(achRevDetailsArray[23]);
		//$("#totalTeacher").val("");
		$("#sch_dapFemale").val(achRevDetailsArray[24]);
		$("#sch_dapMale").val(achRevDetailsArray[25]);
		//$("#totalDisable").val("");
		
		$("#st_of_rehab_date").val(achRevDetailsArray[26]);
		$("#schWash_conp_date").val(achRevDetailsArray[27]);
		
		$("#achOdfStatus").val(achRevDetailsArray[28]);
		
		$("#achPhoto").val(achRevDetailsArray[30]);
		
		startDt=achRevDetailsArray[31]
		var achlat=$("#ach_lat").val(achRevDetailsArray[32]);
		var achlong=$("#ach_long").val(achRevDetailsArray[33]);
					
		var image = document.getElementById('myImageA');
		image.src = achRevDetailsArray[30];
		imagePathA = achRevDetailsArray[30];
	
		
	
		$(".errorChk").text("");
		var url = "#planList";
		//$(location).attr('href',url);
		$.mobile.navigate(url);
	}
}



function achiveDataSubmit(){
		$("#btn_ach_submit").hide();
		
		var d = new Date();	
		var get_time=d.getTime();		

		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();

		if(achPlanSector=="CommunityODF"){
			syncDataAch();
		}else{
			if (latitude==undefined || latitude==''){
				latitude=0;
				}
			if (longitude==undefined || longitude==''){
				longitude=0;
				}
			
			if (achPhoto=='' || achPhoto==undefined){
				$(".errorChk").text("Please confirm Photo ");
				$("#btn_ach_submit").show();
			}else{		
				if(latitude==0 || longitude==0){
					$(".errorChk").text("Please confirm your location ");
					$("#btn_ach_submit").show();
				}else{				
					if (achPlanId==''){
						$(".errorChk").text("New records not available");
						$("#btn_ach_submit").show();
					}else{
						//imagePathA="test"
						if (imagePathA!=""){
							$(".errorChk").text("Syncing photo..");
							imageName = localStorage.mobile_no+"_"+get_time+".jpg";						
							uploadPhotoAch(imagePathA, imageName);
						}
						
					}
				}//end check location
			}//chk photo
		}
	}

function syncDataAch(){	
			
			//alert(apipath+'submitAchiveData?cid=PLANBD&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&achWord='+achWord+'&achCluster='+achCluster+'&achWardNew='+achWardNew+'&achEpiComName='+encodeURIComponent(achEpiComName)+'&achVillSubClusName='+encodeURIComponent(achVillSubClusName)+'&achHhhName='+encodeURIComponent(achHhhName)+'&achID='+achID+'&achPopulation='+achPopulation+'&achMale='+achMale+'&achFemale='+achFemale+'&achGirls='+achGirls+'&achBoys='+achBoys+'&achDapMale='+achDapMale+'&achDapFemale='+achDapFemale+'&achLatType='+encodeURIComponent(achLatType)+'&achComDate='+achComDate+"&achTypeOfSchool="+achTypeOfSchool+"&achNameOfSchool="+encodeURIComponent(achNameOfSchool)+"&achSchGirl="+achSchGirl+"&achSchBoy="+achSchBoy+"&achTeachFemale="+achTeachFemale+"&achTeachMale="+achTeachMale+"&achSchDFemale="+achSchDFemale+"&achSchDMale="+achSchDMale+"&achSchRehabInsDate="+achSchRehabInsDate+"&achSchWashCompDate="+achSchWashCompDate+'&achOdfStatus='+achOdfStatus+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+imageName+'&ach_startDt='+startDt);
			$.ajax({
					type: 'POST',
					url:apipath+'submitAchiveData?cid=PLANBD&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&achWord='+achWord+'&achCluster='+achCluster+'&achWardNew='+achWardNew+'&achEpiComName='+encodeURIComponent(achEpiComName)+'&achVillSubClusName='+encodeURIComponent(achVillSubClusName)+'&achHhhName='+encodeURIComponent(achHhhName)+'&achID='+achID+'&achPopulation='+achPopulation+'&achMale='+achMale+'&achFemale='+achFemale+'&achGirls='+achGirls+'&achBoys='+achBoys+'&achDapMale='+achDapMale+'&achDapFemale='+achDapFemale+'&achLatType='+encodeURIComponent(achLatType)+'&achComDate='+achComDate+"&achTypeOfSchool="+achTypeOfSchool+"&achNameOfSchool="+encodeURIComponent(achNameOfSchool)+"&achSchGirl="+achSchGirl+"&achSchBoy="+achSchBoy+"&achTeachFemale="+achTeachFemale+"&achTeachMale="+achTeachMale+"&achSchDFemale="+achSchDFemale+"&achSchDMale="+achSchDMale+"&achSchRehabInsDate="+achSchRehabInsDate+"&achSchWashCompDate="+achSchWashCompDate+'&achOdfStatus='+achOdfStatus+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+imageName+'&ach_startDt='+startDt,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//------------------------
							
							if (reviewAchDisplayFlag==true){					
								if (arrayId ==-1){							
										$(".errorChk").text("Review Index value Error");
								}else{	
										var achiveSavArray2=localStorage.ach_save.split('rdrd');
										//alert(achiveSavArray2.length+','+arrayId);
										achiveSavArray2.splice(arrayId,1);
										
										var achTemp2="";
										var achTempStr2="";
										for (j=0;j<achiveSavArray2.length;j++){
											accTemp2=achiveSavArray2[j];
											
											if (achTempStr2==""){
												achTempStr2=accTemp2
											}else{
												achTempStr2=achTempStr2+'rdrd'+accTemp2
												}
											
										}										
										localStorage.ach_save=achTempStr2;
									}
									
							}
							//----------------
							
							$( "input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
							$("#cbo_combo").val("");
							
							achPlanId="";
							achCBOid="";
							$(".errorChk").text('Successfully Submitted');
							$("#btn_ach_save").hide();
							$("#btn_take_pic").hide();
							$("#btn_ach_lat_long").hide();
							//$("#achlocation").val('Successfully Submited');
							
						}else if(result=='Failed3'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Invalid Ward');									
							$("#btn_ach_submit").show();
						}else if(result=='Failed4'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Invalid Cluster');										
							$("#btn_ach_submit").show();
						}else if(result=='Failed5'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Event Already Exists');															
							$("#btn_ach_submit").show();
						}else if(result=='Failed6'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Already Exists');									
							$("#btn_ach_submit").show();
						}else{
							$(".errorChk").text('Unauthorized Access');
							//$(".errorChk").text('Try again after 5 minutes');																		
							$("#btn_ach_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}





// ------------------------------------- Report data

function ffReport(){
	//$(".errorChk").text(apipath+'get_ff_rpt_activity?cid=PLANBD&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code);
	$.ajax({
			url:apipath+'get_ff_rpt_activity?cid=PLANBD&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
		  success: function(result) {
					ach_list=result;
					ach_list_array=(ach_list).split("rdrd");
					
					for(i=0;i<ach_list_array.length;i++){
						ach_array=ach_list_array[i].split("fdfd");
						var population=ach_array[3];
						if(population=="None"){
							population="";
							}
						
						$('#ff_rpt_activity').append('<tr class="plan_tr" style="font-size:11px;"><td >'+ach_array[0]+'</td><td>'+ach_array[1]+'</td><td>'+ach_array[2]+'</td><td>'+population+'</td></tr>');
						
						//$('#ff_rpt_activity').append('<tr class="plan_tr" style="font-size:11px;"><td >'+ach_array[0]+'</td><td>'+ach_array[1]+'</td><td>'+ach_array[2]+'</td><td>'+ach_array[3]+'</td><td>'+ach_array[4]+'</td></tr>');
						
					}
			
					}
		});
	
	}



function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}

function showLatLong(){
	//alert ($("#ach_lat").val());
	}

// ----------------Camera-----------------------------------------------


//Acheivement
function getAchivementImage() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccessA(imageURI) {
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePathA = imageURI;
	$("#achPhoto").val(imagePathA);
	
}

function onFailA(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}




//------------------------------------------------------------------------------
//File upload 
function uploadPhotoAch(imageURI, imageName) {	
	//winAch();
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/planbd2/planbd2_image_sync/fileUploader/"),winAch,fail,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),winAch,fail,options);
	
}

function winAch(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$(".errorChk").text('File upload Successful. Syncing Data...');
	syncDataAch();
}



function fail(error) {
	$(".errorChk").text('Memory or Network Error. Please Save and try to Submit later');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}



