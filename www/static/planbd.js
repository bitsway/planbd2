
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
var apipath="http://e.businesssolutionapps.com/planbd2/syncmobile_150813/";

//--- local
//var apipath="http://127.0.0.1:8000/planbd2/syncmobile_150813/";


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
var achLatTypePast='';
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

var achLatRep='';
var achLatBoy='';
var achLatGirl='';
var achLatTeacher='';
var achLatBoysGirls='';
var achLatForAll='';

var achChkBudget='';
var achAnlBudget='';
							
var achNumOfTap='';

var achRecHyMsg='';
var achLocationHwDev='';
var achAvailableHwdev='';
var achAvailableSoap='';

var achOdfStatus='';
var achDateOfDecCer='';
var achHH='';
var	achOdfAdult='';
var	achOdfChild='';	

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
	$("#sucChk").text("");
	
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
	$("#sucChk").text("");
	
	$("#ach_lat").val("");
	$("#ach_long").val("");
	
	$("#primarySchDiv").hide();
	$('#secSchDiv').hide();
	
	//$("#achCluster").hide();
	$("#achHhID").hide();	
	//$("#tbl_water_point").hide();	
	$("#tbl_sanitation").hide();
	$("#trLatTypePast").hide();
	$("#handWashFacilities").hide();
		
	//$("#handwash_event").hide();
	
	$("#sharedLatHH").hide();	
	
	$("#tblHandSan").hide();		
	$("#divSchoolWash").hide();
	
	$("#achWardOld").hide();
	$("#achCluster").hide();	
	$("#epiClusterCom").hide();
	$("#odfStatus").hide();
	$("#div_odf").hide();
	$("#schBudgetUl").hide();
	$(".bud_amt").hide();
	
	$(".activities").text(localStorage.achPlanActivities);
	
	
	
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
	
			
		
	if (localStorage.achPlanSector=="HandWash"){
		if (localStorage.achPlanId=="2"){
			$("#trLatTypePast").show();
		}
		
		$("#trLatType").hide();
		$("#tblHandSan").show();
		$("#handWashFacilities").show();						
		$("#achWardOld").show();
		$("#achCluster").show();
		$("#epiClusterCom").show();
		$("#achHhID").show();
		$("#latType").val("");
		$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");		
	}else if (localStorage.achPlanSector=="Sanitation"){
		if (localStorage.achPlanId=="2"){
			$("#trLatTypePast").show();
			}
		$("#tblHandSan").show();
		$("#trLatType").show();
		$("#achWardOld").show();
		$("#achCluster").show();
		$("#epiClusterCom").show();
		$("#achHhID").show();
		$("#tbl_sanitation").show();
		$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");					
	}else if(localStorage.achPlanSector=="SchoolWash"){			
		if(localStorage.achPlanId=="4"){
			$("#divSchoolWash").show();
			$("#tbl_school_lat").show();
			$("#tbl_lat_boys_girls").show();
			$("#schBudgetUl").show();
			$("#tbl_num_of_tap").hide();
			$("#rehab_wf").html("<strong>Rehabilitation of WASH Facilities</strong>");
		}else if(localStorage.achPlanId=="5"){
			$("#tbl_school_lat").hide();
			$("#divSchoolWash").show();
			$("#tbl_lat_boys_girls").hide();
			$("#schBudgetUl").hide();
			$("#tbl_num_of_tap").show();
			$("#rehab_wf").html("<strong>Installation of Group HWD</strong>");	
		}						
							
	}else if(localStorage.achPlanSector=="CommunityODF"){
		$(".vill_para").hide();			
		$("#achWardOld").show();
		$("#achCluster").show();
		$("#epiClusterCom").show();
		$("#odfStatus").show();
		$("#achWardNew").hide();
		$("#div_odf").show();
		$(".com_or_cluster_name").html("Community Name (EPI Cluster Name)<sup class='reqField'>*</sup>");
		
	}
	
	

	
//-------------------------------date format

});



//----------------back button
function backClick(){
	$(".errorChk").text("");
	$("#sucChk").text("");
	
	$("#ach_lat").val("");
	$("#ach_long").val("");
	
	}

//---------------------report Type list	
function achivementclick(){
	$(".errorChk").text("");
	$("#sucChk").text("");
	localStorage.ach_temp="";
	$("#achPhoto").val("");
	
	$(".activities").text(localStorage.achPlanActivities);
	
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
		
		$("input:radio[name='rec_hy_msg']" ).attr('checked','');
		$("input:radio[name='location_hw_dev']" ).attr('checked','');
		$("input:radio[name='available_hw_dev']" ).attr('checked','');
		$("input:radio[name='available_soap']" ).attr('checked','');
			
		$("#achID").val("");
		
		$("#population").val("");
		$("#household").val("");
		$("#male").val("");
		$("#female").val("");
		//$("#girlsUnder").val("");
		//$("#boysUnder").val("");
		$("#girls").val("");
		$("#boys").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#poorA").val("");
		$("#poorB").val("");
		//$("#poorC").val("");
		//$("#poorEx").val("");
		$("#ethMale").val("");
		$("#ethFemale").val("");	
		//$("#serRecpent").val("");	
		$("#achPhoto").val("");
		
		$("#latType").val("");		
		$("#latTypePast").val("");		
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
		
		$("#lat_rep").val("");
		$("#lat_boys").val("");
		$("#lat_girls").val("");
		$("#lat_teacher").val("");
		
		$("#lat_boys_and_girls").val("");
		$("#lat_for_all").val("");
		
		$("input:radio[name='sch_badget']" ).attr('checked','');			
		$("#anl_budget_amt").val("");
		
		$("#lat_total_population").val("");
		
		
		$("#num_of_tap").val("");
		
		$("#num_0f_hh").val("");
		$("#odf_adult").val("");
		$("#odf_child").val("");
		$("#odf_total").val("");
		
		$("#st_of_rehab_date").val("");
		$("#schWash_conp_date").val("");
		
		$("#achWordNew").val("");
		
		$("#achOdfStatus").val("");
		
		
		
		$("#san_or_hw_conp_y").val("");	
		$("#san_or_hw_conp_m").val("");
		$("#san_or_hw_conp_d").val("");
		
		
		$("#st_of_rehab_y").val("");	
		$("#st_of_rehab_m").val("");
		$("#st_of_rehab_d").val("");				
		
		$("#schWash_conp_y").val("");
		$("#schWash_conp_m").val("");
		$("#schWash_conp_d").val("");
		
		$("#dec_or_cer_y").val("");
		$("#dec_or_cer_m").val("");
		$("#dec_or_cer_d").val("");
			
		
		$("#ach_lat").val("");
		$("#ach_long").val("");
		
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
		
		
		localStorage.achPlanId=ach_plan_id;
		localStorage.achPlanActivities=achPlanActivities;
		localStorage.achPlanSector=achPlanSector;
		
		$(".activities").text(localStorage.achPlanActivities);
		
		
		if (localStorage.achPlanSector=="HandWash"){
			if (localStorage.achPlanId=="2"){
				$("#trLatTypePast").show();
			}
			
			$("#trLatType").hide();
			$("#tblHandSan").show();
			$("#handWashFacilities").show();						
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#achHhID").show();
			$("#latType").val("");
			$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");
			$(".hh_or_wp_id").html("Water Point ID(Same as Social Map)<sup class='reqField'>*</sup>");
		}else if (localStorage.achPlanSector=="Sanitation"){
			if (localStorage.achPlanId=="2"){
				$("#trLatTypePast").show();
				}
			$("#tblHandSan").show();
			$("#trLatType").show();
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#achHhID").show();
			$("#tbl_sanitation").show();
			$(".com_or_cluster_name").html("EPI Cluster/ Community Name<sup class='reqField'>*</sup>");
			$(".hh_or_wp_id").html("HHID(Same as Social Map)<sup class='reqField'>*</sup>");			
		}else if(localStorage.achPlanSector=="SchoolWash"){			
			if(localStorage.achPlanId=="4"){
				$("#divSchoolWash").show();
				$("#tbl_school_lat").show();
				$("#schBudgetUl").show();
				$("#tbl_num_of_tap").hide();
				$("#rehab_wf").html("<strong>Rehabilitation of WASH Facilities</strong>");
			}else if(localStorage.achPlanId=="5"){
				$("#tbl_school_lat").hide();
				$("#divSchoolWash").show();
				$("#schBudgetUl").show();
				$("#tbl_num_of_tap").show();
				$("#rehab_wf").html("<strong>Installation of Group HWD</strong>");	
			}						
								
		}else if(localStorage.achPlanSector=="CommunityODF"){			
			$("#achWardOld").show();
			$("#achCluster").show();
			$("#epiClusterCom").show();
			$("#odfStatus").show();
			$("#achWardNew").hide();
			$("#div_odf").show();
			$(".com_or_cluster_name").html("Community Name (EPI Cluster Name)<sup class='reqField'>*</sup>");
			
		}

		
		
		if (startDt==""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			localStorage.startDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		}
		
		$(".errorChk").text("");
		
				
		
		var url = "#selectionConfirmed";
		$.mobile.navigate(url);
		
		location.reload();
		
		
						
		//$(location).attr('href',url);
	}
}


function achDataNext2(){
	
		$(".errorChk").text("");
		$("#sucChk").text("");	
		
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
	
		
		$("#san_or_hw_conp_y").val(year);
		$("#san_or_hw_conp_m").val(month);
		
		$("#st_of_rehab_y").val(year);
		$("#st_of_rehab_m").val(month);
		
		$("#schWash_conp_y").val(year);
		$("#schWash_conp_m").val(month);
		
		$("#dec_or_cer_y").val(year);
		$("#dec_or_cer_m").val(month);
			
	
		if(localStorage.schoolType=="Primary"){
			$('#primarySchDiv').show();
		}else{
			$('#secSchDiv').show();
			}
		
		
		if(localStorage.chkBudget=="YES"){
			$('.bud_amt').show();
		}else{
			$('.bud_amt').hide();
			}
		
		$(".activities").text(localStorage.achPlanActivities);
		
		var achRevDetailsArray=localStorage.ach_temp.split('fdfd');
		
		
		//------------------
		$( "input:radio[name='activity_select'][value='"+achRevDetailsArray[0]+"']" ).attr('checked','checked');
				
		$("#achWord").val(achRevDetailsArray[1]);
		$("#achClusterID").val(achRevDetailsArray[2]);
		
		$("#achID").val(achRevDetailsArray[7]);
		
		$("#population").val(achRevDetailsArray[8]);
		
		$("#male").val(achRevDetailsArray[9]);
		$("#female").val(achRevDetailsArray[10]);
		
		$("#girls").val(achRevDetailsArray[11]);
		$("#boys").val(achRevDetailsArray[12]);
		$("#dapMale").val(achRevDetailsArray[13]);
		$("#dapFemale").val(achRevDetailsArray[14]);
	
		
		if(achRevDetailsArray[16]!=undefined){
			var sanCompArr=achRevDetailsArray[16].split("/");		
			$("#san_or_hw_conp_y").val(sanCompArr[2]);	
			$("#san_or_hw_conp_m").val(sanCompArr[0]);
			$("#san_or_hw_conp_d").val(sanCompArr[1]);
			}
		//$("#san_conp_date").val(achRevDetailsArray[16]);
		
		
					
		//$("#wp_tech").val("");
		//$("#wp_conp_date").val("");
		
		
		$("#achWordNew").val(achRevDetailsArray[3]);
		$("#epiComName").val(achRevDetailsArray[4]);
		$("#villSubClusName").val(achRevDetailsArray[5]);
		$("#nameOfHhhID").val(achRevDetailsArray[6]);
		
		$("#latType").val(achRevDetailsArray[15]);
		//$("#san_or_hw_conp_date").val(achRevDetailsArray[16]);
		$("#schType").val(achRevDetailsArray[17]);
		
		$("#p_school_combo").val(achRevDetailsArray[18]);
		$("#s_school_combo").val(achRevDetailsArray[19]);
		
		$("#sch_girl").val(achRevDetailsArray[20]);
		$("#sch_boy").val(achRevDetailsArray[21]);
		$("#totalStudent").val(eval(achRevDetailsArray[20])+eval(achRevDetailsArray[21]));
		$("#teach_female").val(achRevDetailsArray[22]);
		$("#teach_male").val(achRevDetailsArray[23]);
		$("#totalTeacher").val(eval(achRevDetailsArray[22])+eval(achRevDetailsArray[23]));
		$("#sch_dapFemale").val(achRevDetailsArray[24]);
		$("#sch_dapMale").val(achRevDetailsArray[25]);
		$("#totalDisable").val(eval(achRevDetailsArray[24])+eval(achRevDetailsArray[25]));
		
		
		if(achRevDetailsArray[26]!=undefined){
			var stRehabArr=achRevDetailsArray[26].split("/");
			$("#st_of_rehab_y").val(stRehabArr[2]);	
			$("#st_of_rehab_m").val(stRehabArr[0]);
			$("#st_of_rehab_d").val(stRehabArr[1]);
		}
		
		if(achRevDetailsArray[27]!=undefined){
			var schWashArr=achRevDetailsArray[27].split("/");
			$("#schWash_conp_y").val(schWashArr[2]);
			$("#schWash_conp_m").val(schWashArr[0]);
			$("#schWash_conp_d").val(schWashArr[1]);
		}
		
		$("#achOdfStatus").val(achRevDetailsArray[28]);
		
		$("#achPhoto").val(achRevDetailsArray[30]);
		
		startDt=achRevDetailsArray[31]
		var achlat=$("#ach_lat").val(achRevDetailsArray[32]);
		var achlong=$("#ach_long").val(achRevDetailsArray[33]);
					
		var image = document.getElementById('myImageA');
		image.src = achRevDetailsArray[30];
		imagePathA = achRevDetailsArray[30];
		
		$("#latTypePast").val(achRevDetailsArray[34]);
		
		$("input:radio[name='rec_hy_msg'][value='"+achRevDetailsArray[35]+"']").attr('checked','checked');
		$("input:radio[name='location_hw_dev'][value='"+achRevDetailsArray[36]+"']").attr('checked','checked');
		$("input:radio[name='available_hw_dev'][value='"+achRevDetailsArray[37]+"']").attr('checked','checked');
		$("input:radio[name='available_soap'][value='"+achRevDetailsArray[38]+"']").attr('checked','checked');
		
		
		$("#lat_boys").val(achRevDetailsArray[39]);
		$("#lat_girls").val(achRevDetailsArray[40]);
		$("#lat_teacher").val(achRevDetailsArray[41]);
		$("#lat_total_population").val(eval(achRevDetailsArray[39])+eval(achRevDetailsArray[40])+eval(achRevDetailsArray[41]));
		
		$("#lat_boys_and_girls").val(achRevDetailsArray[46]);
		$("#lat_for_all").val(achRevDetailsArray[47]);
		
		$("input:radio[name='sch_badget'][value='"+achRevDetailsArray[48]+"']").attr('checked','checked');					
		$("#anl_budget_amt").val(achRevDetailsArray[49]);
		
		$("#num_of_tap").val(achRevDetailsArray[42]);
		
		$("#num_0f_hh").val(achRevDetailsArray[43]);
		$("#odf_adult").val(achRevDetailsArray[44]);
		$("#odf_child").val(achRevDetailsArray[45]);
		
		$("#odf_total").val(eval(achRevDetailsArray[44])+eval(achRevDetailsArray[45]));
		
		if(achRevDetailsArray[50]!=undefined){
			var schWashArr=achRevDetailsArray[50].split("/");
			$("#dec_or_cer_y").val(schWashArr[2]);
			$("#dec_or_cer_m").val(schWashArr[0]);
			$("#dec_or_cer_d").val(schWashArr[1]);
		}
		
		//----------------------------------------------------------------------------
	
	
	var url = "#achiveDataList";
	$.mobile.navigate(url);
	
	}



//-----------------------------achivement data people support

function achivementDataPSupport(){
	
	$(".errorChk").text("");
	$("#sucChk").text("");
		
	
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
	
	var currentDay = new Date(month+ "/" + day + "/" +year);
	
	
	
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
	var latTypePast=$("#latTypePast").val();
	
	
	// for hand wash or latrine	
	var sanHwCompDateY=$("#san_or_hw_conp_y").val();	
	var sanHwCompDateM=$("#san_or_hw_conp_m").val();
	var sanHwCompDateD=$("#san_or_hw_conp_d").val();
	
	if(sanHwCompDateD.length==1){
		sanHwCompDateD="0"+sanHwCompDateD
		}
		
	if(sanHwCompDateM.length==1){
		sanHwCompDateM="0"+sanHwCompDateM
		}
		
	var sanHwCompDate=sanHwCompDateM+"/"+sanHwCompDateD+"/"+sanHwCompDateY;	
	
	var errSanHwCompDate=sanHwCompDateY+"/"+sanHwCompDateM+"/"+sanHwCompDateD;
	
	var chkSanCompDate=new Date(sanHwCompDate);
	
	
	
	//hand wash
	var recHyMsg=$("input[name='rec_hy_msg']:checked").val();
	var locationHwDev=$("input[name='location_hw_dev']:checked").val();
	var availableHwDev=$("input[name='available_hw_dev']:checked").val();
	var availableSoap=$("input[name='available_soap']:checked").val();	
	
	
	
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
	
	var schRehabInsDateY=$("#st_of_rehab_y").val();	
	var schRehabInsDateM=$("#st_of_rehab_m").val();
	var schRehabInsDateD=$("#st_of_rehab_d").val();		
	if(schRehabInsDateD.length==1){
		schRehabInsDateD="0"+schRehabInsDateD
		}
	if(schRehabInsDateM.length==1){
		schRehabInsDateM="0"+schRehabInsDateM
		}
			
	var schRehabInsDate=schRehabInsDateM+"/"+schRehabInsDateD+"/"+schRehabInsDateY;
	
	var errSchRehabInsDate=schRehabInsDateY+"/"+schRehabInsDateM+"/"+schRehabInsDateD;
		
	var chkSchRehabInsDate=new Date(schRehabInsDate);
	
	var schWashCompDateY=$("#schWash_conp_y").val();
	var schWashCompDateM=$("#schWash_conp_m").val();
	var schWashCompDateD=$("#schWash_conp_d").val();
	
	if(schWashCompDateD.length==1){
		schWashCompDateD="0"+schWashCompDateD
		}
	if(schWashCompDateM.length==1){
		schWashCompDateM="0"+schWashCompDateM
		}	
	var schWashCompDate=schWashCompDateM+"/"+schWashCompDateD+"/"+schWashCompDateY;
	
	var errSchWashCompDate=schWashCompDateY+"/"+schWashCompDateM+"/"+schWashCompDateD;
		
	var chkSchwCompDate=new Date(schWashCompDate);
	
	
	
	//------------- school info others 
	//var numberOfLatRep=$("#lat_rep").val();
	var numberOfLatBoy=$("#lat_boys").val();
	var numberOfLatGirl=$("#lat_girls").val();
	var numberOfLatTeacher=$("#lat_teacher").val();
	
	var latBoysGirls=$("#lat_boys_and_girls").val();
	var latForAll=$("#lat_for_all").val();
	
	var chkBudget=$("input[name='sch_badget']:checked").val();
	var anlBudget=$("#anl_budget_amt").val();
	
	
		
	var numberOfTap=$("#num_of_tap").val();
	
	
	//------ ODF
	
	var odfStatus=$("#achOdfStatus").val();
	var odfHH=$("#num_0f_hh").val();
	var odfAdult=$("#odf_adult").val();
	var odfChild=$("#odf_child").val();
	
	var decCerDateY=$("#dec_or_cer_y").val();
	var decCerDateDateM=$("#dec_or_cer_m").val();
	var decCerDateDateD=$("#dec_or_cer_d").val();
	
	if(decCerDateDateD.length==1){
		decCerDateDateD="0"+decCerDateDateD
		}
	if(decCerDateDateM.length==1){
		decCerDateDateM="0"+decCerDateDateM
		}	
	var decCerDate=decCerDateDateM+"/"+decCerDateDateD+"/"+decCerDateY;
	
	var errDecCerDate=decCerDateY+"/"+decCerDateDateM+"/"+decCerDateDateD;
		
	var chkDecCerDate=new Date(decCerDate);
	
	
	
	/*if(odfHH==''){
		odfHH=0;
		}
	if(odfAdult==''){
		odfAdult=0;
		}
	
	if(odfChild==''){
		odfChild=0;
		}
	
	
	
	
	if(ach_cluster==''){
		ach_cluster=0;
		}
	
	if(ach_id==''){
		ach_id=0;
		}
	
	
	if(female==''){
			female=0;
			}
	
	if(male==''){
			male=0;
			}
			
	if(girlsUnder==''){
			girlsUnder=0;
			}
			
	if(boysUnder==''){
			boysUnder=0;
			}
			
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
	if(teachMale==''){
		teachMale=0;
		}
		
	if(schDFemale==''){
		schDFemale=0;
		}
	if(population==''){
		population=0;
		}

	//---------- school
	
	if(numberOfLatBoy==''){
		numberOfLatBoy=0;
		}
	
	if(numberOfLatGirl==''){
		numberOfLatGirl=0;
		}
	
	if(numberOfLatTeacher==''){
		numberOfLatTeacher=0;
		}
	if(numberOfTap==''){
		numberOfTap=0;
		}
	
	if(latBoysGirls==""){
		latBoysGirls=0
		}
	if(latForAll==""){
		latForAll=0
		}*/
			
var date_flag=true;
var dateError="";	
	
if (localStorage.achPlanSector=="Sanitation" || localStorage.achPlanSector=="HandWash"){
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
	}else if(female=="" || female<0) {
		$(".errorChk").text("Required Female 18+");
	}else if(male=="" || male<0) {
		$(".errorChk").text("Required Male 18+");		
	}else if(girls=="" || girls<0) {
		$(".errorChk").text("Required Girls<18");
	}else if(boys=="" || boys<0) {
		$(".errorChk").text("Required boys<18");
	}else if(population<0){
		$(".errorChk").text("Invalid Population");	
	}else if(dapFemale=="" || dapFemale<0) {
		$(".errorChk").text("Required Disable Female");
	}else if(dapMale=="" || dapMale<0) {
		$(".errorChk").text("Required Disable Male");
	}else{
		if(localStorage.achPlanSector=="Sanitation"){
			if(localStorage.achPlanId=="2" && latTypePast=="") {
				$(".errorChk").text("Required Latrine Type(Past) ");
			}else if(latType=="") {
				$(".errorChk").text("Required Latrine Type(Present) ");			
			}else if(sanHwCompDate=="") {
				$(".errorChk").text("Required ComPletion Date. ");	
			}else{
				if (isNaN(chkSanCompDate)==true){
					date_flag=false;
					dateError="Invalid Completion Date "+errSanHwCompDate;				
				}else if (chkSanCompDate=='Invalid Date'){
						date_flag=false;
						dateError="Invalid Completion Date "+errSanHwCompDate;
				}
				
				if (date_flag==false){				
					$(".errorChk").text(dateError);
				}else{
					if (chkSanCompDate>currentDay){
						$(".errorChk").text("Required Completion Date Less Then Today");
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
						achLatTypePast=latTypePast
						achComDate=sanHwCompDate
											
						var ach_plan_id=$("input[name='activity_select']:checked").val();
						//alert(ach_plan_id);						
						$(".errorChk").text("");
						
						var url="#inPhoto";
						$.mobile.navigate(url);	
					}					
				}				
			}
			
		}else if(localStorage.achPlanSector=="HandWash"){
				if(recHyMsg==undefined || recHyMsg==""){
					$(".errorChk").text("Required Received Hygiene Message");
				}else if(locationHwDev==undefined || locationHwDev==""){
					$(".errorChk").text("Required Location of Hand washing device (within 5 meters)");
				}else if(availableHwDev==undefined || availableHwDev==""){
					$(".errorChk").text("Required Availability of water into HW Device");
				}else if(availableSoap==undefined || availableSoap==""){
					$(".errorChk").text("Required Availability of soap");
				}else{
					if (isNaN(chkSanCompDate)==true){
						date_flag=false;
						dateError="Invalid Completion Date "+errSanHwCompDate;				
					}else if (chkSanCompDate=='Invalid Date'){
							date_flag=false;
							dateError="Invalid Completion Date "+errSanHwCompDate;
					}
					
					if (date_flag==false){				
						$(".errorChk").text(dateError);
					}else{
						if (chkSanCompDate>currentDay){
							$(".errorChk").text("Required Completion Date Less Then Today");
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
							achLatTypePast=latTypePast
							achComDate=sanHwCompDate
							
							achRecHyMsg=recHyMsg
							achLocationHwDev=locationHwDev
							achAvailableHwdev=availableHwDev
							achAvailableSoap=availableSoap
							
							
							var ach_plan_id=$("input[name='activity_select']:checked").val();
							//alert(ach_plan_id);						
							$(".errorChk").text("");
							
							
							var url="#inPhoto";
							$.mobile.navigate(url);
						}
					}
				}
			}		
		}
		
	}else if(localStorage.achPlanSector=="SchoolWash"){
		if(ach_word_new=="") {
			$(".errorChk").text("Required Ward ID (New) ");
		}else if (typeOfSchool=="" ){
			$(".errorChk").text("Required School Type ");						
		}else if (typeOfSchool=="Primary" && nameOfpSchool=="" ){
			$(".errorChk").text("Required School Name ");
		}else if (typeOfSchool=="Secondary" && nameOfsSchool=="" ){
			$(".errorChk").text("Required School Name ");			
		}else if(schGirl=="" || schGirl<0) {
			$(".errorChk").text("Required Student Girls");
		}else if(schBoy=="" || schBoy<0) {
			$(".errorChk").text("Required Student Boys");		
		}else if(teachFemale=="" || teachFemale<0) {
			$(".errorChk").text("Required Teacher Female");
		}else if(teachMale=="" || teachMale<0) {
			$(".errorChk").text("Required Teacher Male");		
		}else if(schDFemale=="" || schDFemale<0) {
			$(".errorChk").text("Required Disable Girls");
		}else if(schDMale=="" || schDMale<0) {
			$(".errorChk").text("Required Disable Boys");
		}else{
			if(localStorage.achPlanId=="4"){
				if(numberOfLatBoy=="" || numberOfLatBoy<0) {
					$(".errorChk").text("Required Only for boys");
				}else if(numberOfLatGirl=="" || numberOfLatGirl<0) {
					$(".errorChk").text("Required Only for girls");
				}else if(numberOfLatTeacher=="" || numberOfLatTeacher<0) {
					$(".errorChk").text("Required Only for teachers");
				}else if(latBoysGirls=="" || latBoysGirls<0) {
					$(".errorChk").text("Required For boys and girls");
				}else if(latForAll=="" || latForAll<0) {
					$(".errorChk").text("Required For all");
				}else if(chkBudget==undefined || chkBudget==""){
					$(".errorChk").text("Required the school maintain/has budget for O&M of WASH Facilities");
				}else if(chkBudget=="YES" && (anlBudget=="" || anlBudget<0)){
					$(".errorChk").text("Required budget amount or invalid amaunt");
				}else{
										
					if (isNaN(chkSchRehabInsDate)==true){
						date_flag=false;
						dateError="Invalid Instalation Date "+errSchRehabInsDate;				
					}else if (isNaN(chkSchwCompDate)==true){
						date_flag=false;
						dateError="Invalid Completion Date "+errSchWashCompDate;				
					}else if (chkSchRehabInsDate=='Invalid Date'){			
						date_flag=false;
						dateError="Invalid Instalation Date "+errSchRehabInsDate;
					}else if (chkSchwCompDate=='Invalid Date'){
						date_flag=false;
						dateError="Invalid Completion Date "+errSchWashCompDate;
					}
					
					if (date_flag==false){				
					$(".errorChk").text(dateError);
					}else{			
						if (chkSchRehabInsDate>currentDay){
							$(".errorChk").text("Required Instalation Date Less Then Today");
						}else if (chkSchwCompDate>currentDay){
							$(".errorChk").text("Required Completion Date Less Then Today");
						}else if(chkSchRehabInsDate>chkSchwCompDate){
							$(".errorChk").text("Required Inatalation Date Less Then Completion Date");
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
							
							
							achLatBoy=numberOfLatBoy
							achLatGirl=numberOfLatGirl
							achLatTeacher=numberOfLatTeacher
							
							achLatBoysGirls=latBoysGirls
							achLatForAll=latForAll
							
							achChkBudget=chkBudget
							achAnlBudget=anlBudget

							var ach_plan_id=$("input[name='activity_select']:checked").val();
							//alert(ach_plan_id);						
							$(".errorChk").text("");
									
									
							var url="#inPhoto";
							$.mobile.navigate(url);
										
						}
					}
										
				}
				
			}else if(localStorage.achPlanId=="5"){
				if(numberOfTap=="" || numberOfTap<0){
					$(".errorChk").text("Required Number of Tap");	
				}else{ 				
					if (isNaN(chkSchRehabInsDate)==true){
						date_flag=false;
						dateError="Invalid Instalation Date "+errSchRehabInsDate;				
					}else if (isNaN(chkSchwCompDate)==true){
						date_flag=false;
						dateError="Invalid Completion Date "+errSchWashCompDate;				
					}else if (chkSchRehabInsDate=='Invalid Date'){			
						date_flag=false;
						dateError="Invalid Instalation Date "+errSchRehabInsDate;
					}else if (chkSchwCompDate=='Invalid Date'){
						date_flag=false;
						dateError="Invalid Completion Date "+errSchWashCompDate;
					}
						
					if (date_flag==false){				
						$(".errorChk").text(dateError);
					}else{			
						if (chkSchRehabInsDate>currentDay){
							$(".errorChk").text("Required Instalation Date Less Then Today");
						}else{
							
							if (chkSchwCompDate>currentDay){
								$(".errorChk").text("Required Completion Date Less Then Today");
							}else{
								if(chkSchRehabInsDate>chkSchwCompDate){
									$(".errorChk").text("Required Inatalation Date Less Then Completion Date");
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
									
									achNumOfTap=numberOfTap
									
									achSchRehabInsDate=schRehabInsDate
									achSchWashCompDate=schWashCompDate
									
									var ach_plan_id=$("input[name='activity_select']:checked").val();
									//alert(ach_plan_id);						
									$(".errorChk").text("");
									
									
									var url="#inPhoto";
									$.mobile.navigate(url);
								}					
							}				
						}
					}
				}
			}
		}
			
					
	}else if(localStorage.achPlanSector=="CommunityODF"){
		if (ach_word=="" ){		
			$(".errorChk").text("Required Ward (Old) ");
		}else if(ach_cluster=="") {
			$(".errorChk").text("Required Cluster ID ");			
		}else if(epiComName=="") {
			$(".errorChk").text("Required EPI Cluster/Community Name ");
		}else if(odfStatus=="") {
			$(".errorChk").text("Required ODF Status");		
		}else if(odfHH=="" || odfHH<0) {
			$(".errorChk").text("Required Number of HH");
		}else if(odfAdult=="" || odfAdult<0) {
			$(".errorChk").text("Required Adult");
		}else if(odfChild=="" || odfChild<0) {
			$(".errorChk").text("Required Children");			
		}else{
			if (isNaN(chkDecCerDate)==true){
				date_flag=false;
				dateError="Invalid Date of declaration/certification "+errDecCerDate;				
			}else if (chkDecCerDate=='Invalid Date'){
					date_flag=false;
					dateError="Invalid Date of declaration/certification "+errDecCerDate;
			}
			
			if (date_flag==false){				
				$(".errorChk").text(dateError);
			}else{						
				achWord=ach_word
				achCluster=ach_cluster
				achEpiComName=epiComName
				achVillSubClusName=villSubClusName
				achOdfStatus=odfStatus
				achDateOfDecCer=decCerDate	
				
				achHH=odfHH
				achOdfAdult=odfAdult
				achOdfChild=odfChild
				
				
				$.ajax({
						type: 'POST',
						url:apipath+'checkOdfStatus?cid=PLANBD&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&achWord='+achWord+'&achCluster='+achCluster+'&achOdfStatus='+achOdfStatus,
						   
						   success: function(result) {
							   if(result=="Success"){
								   var ach_plan_id=$("input[name='activity_select']:checked").val();
									//alert(ach_plan_id);						
									$(".errorChk").text("");
									
									var url="#inPhoto";
									$.mobile.navigate(url);							  						  
							   }else{
								   $(".errorChk").text(result);								   
								}
				
				
						   }
				});
			
			
		  	}
			
		}			
	}
}






//------------------ show population hand wash or latrine
function totalPopulation(){
	var male=$("#male").val();
	var female=$("#female").val();

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
			
	var totalMF=eval(male)+eval(female)+eval(girls)+eval(boys);//+eval(dapFemale)+eval(dapMale);
	
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



function totalhwRehab(){
	var lat_boys=$("#lat_boys").val();
	var lat_girls=$("#lat_girls").val();	
	var lat_teacher=$("#lat_teacher").val();
	var lat_boys_and_girls=$("#lat_boys_and_girls").val();
	var lat_for_all=$("#lat_for_all").val();
	
	if(lat_boys==''){
			lat_boys=0;
			}
	if(lat_girls==''){
			lat_girls=0;
			}
	if(lat_teacher==''){
			lat_teacher=0;
			}
	if(lat_boys_and_girls==''){
			lat_boys_and_girls=0;
			}
	if(lat_for_all==''){
			lat_for_all=0;
			}
	
			
	var totalLatPopulation=eval(lat_boys)+eval(lat_girls)+eval(lat_teacher)+eval(lat_boys_and_girls)+eval(lat_for_all);
	
	$("#lat_total_population").val(totalLatPopulation);
}



function totalOdf(){
	var odf_adult=$("#odf_adult").val();
	var odf_child=$("#odf_child").val();	
	
	if(odf_adult==''){
			odf_adult=0;
			}
	if(odf_child==''){
			odf_child=0;
			}
	
			
	var totalOdf=eval(odf_adult)+eval(odf_child);
	
	$("#odf_total").val(totalOdf);
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

function chkBudget(){
	var chkBudget=$("input[name='sch_badget']:checked").val();
	
	if (chkBudget=="YES"){
		$(".bud_amt").show();
	}else{
		$("#anl_budget_amt").val("");
		$(".bud_amt").hide();
	}	
}


	
//-----------------------------planid,CBO ID, ID, Population, Household,male,Female,girls Under, boys Under,girls,boys,DAP male, DAP Female,Poor A,Poor B ,Poor C, Poor D, Ethnic Male, Ethnic Female, service Recepent, service recepent value
function achiveDataSave(){
		$(".errorChk").text("");		
	
		
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
				achivementSave=localStorage.achPlanId+'fdfd'+achWord+'fdfd'+achCluster+'fdfd'+achWardNew+'fdfd'+achEpiComName+'fdfd'+achVillSubClusName+'fdfd'+achHhhName+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achMale+'fdfd'+achFemale+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achLatType+'fdfd'+achComDate+'fdfd'+achTypeOfSchool+'fdfd'+nameOfpSchool+'fdfd'+nameOfsSchool+'fdfd'+achSchGirl+'fdfd'+achSchBoy+'fdfd'+achTeachFemale+'fdfd'+achTeachMale+'fdfd'+achSchDFemale+'fdfd'+achSchDMale+'fdfd'+achSchRehabInsDate+'fdfd'+achSchWashCompDate+'fdfd'+achOdfStatus+'fdfd'+localStorage.achPlanActivities+'fdfd'+achPhoto+'fdfd'+localStorage.startDt+'fdfd'+latitude+'fdfd'+longitude+'fdfd'+achLatTypePast+'fdfd'+achRecHyMsg+'fdfd'+achLocationHwDev+'fdfd'+achAvailableHwdev+'fdfd'+achAvailableSoap+'fdfd'+achLatBoy+'fdfd'+achLatGirl+'fdfd'+achLatTeacher+'fdfd'+achNumOfTap+'fdfd'+achHH+'fdfd'+achOdfAdult+'fdfd'+achOdfChild+'fdfd'+achLatBoysGirls+'fdfd'+achLatForAll+'fdfd'+achChkBudget+'fdfd'+achAnlBudget+'fdfd'+achDateOfDecCer			
				
				
				if (localStorage.achPlanId==''){
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
						achLatTypePast=''
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
						
						achLatRep='';
						achLatBoy='';
						achLatGirl='';
						achLatTeacher='';
						
						achLatBoysGirls='';
						achLatForAll='';
						
						achChkBudget='';
						achAnlBudget='';
						
						//-----------------------
						achPhoto='';
						startDt='';
						
						latitude='';
						longitude='';
						
						$("#achWord").val();
						$("#achClusterID").val("");
						$("#achID").val(""); //hhid
						$("input:radio[name='hnd_event']").attr('checked','');
						
						$("input:radio[name='rec_hy_msg']").attr('checked','');
						$("input:radio[name='location_hw_dev']").attr('checked','');
						$("input:radio[name='available_hw_dev']").attr('checked','');
						$("input:radio[name='available_soap']").attr('checked','');
		
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
						$("#latTypePast").val("");
						$("#san_conp_date").val("");
						
						//school
						$("#lat_rep").val("");
						$("#lat_boys").val("");
						$("#lat_girls").val("");
						$("#lat_teacher").val("");
						
						$("#lat_boys_and_girls").val("");
						$("#lat_for_all").val("");
						
						$("#lat_total_population").val("");
						
						$("input:radio[name='sch_badget']" ).attr('checked','');			
						$("#anl_budget_amt").val("");
						
						$("#num_of_tap").val("");
						
						// odf
						$("#achOdfStatus").val("");
						$("#num_0f_hh").val("");
						$("#odf_adult").val("");
						$("#odf_child").val("");
						$("#odf_total").val("");
						
						//water point
						$("#wp_tech").val("");
						$("#wp_conp_date").val("");
	
						$("#achPhoto").val("");
						
						$("#ach_lat").val("");
						$("#ach_long").val("");
						
						$("#san_or_hw_conp_d").val("");
						$("#st_of_rehab_d").val("");
						$("#schWash_conp_d").val("");
						
						$("#san_or_hw_conp_y").val("");	
						$("#san_or_hw_conp_m").val("");
						$("#san_or_hw_conp_d").val("");
						
						$("#st_of_rehab_y").val("");	
						$("#st_of_rehab_m").val("");
						$("#st_of_rehab_d").val("");
							
						$("#schWash_conp_y").val("");
						$("#schWash_conp_m").val("");
						$("#schWash_conp_d").val("");
						
						$("#dec_or_cer_y").val("");
						$("#dec_or_cer_m").val("");
						$("#dec_or_cer_d").val("");
						
						reviewAchDisplayFlag==false;
						arrayId=-1;
						
						
						$(".errorChk").text("");
						$("#sucChk").text("Successfully saved for review");
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
			$("#latTypePast").val("");
			$("#san_conp_date").val("");
			
			$("#lat_rep").val("");
			$("#lat_boys").val("");
			$("#lat_girls").val("");
			$("#lat_teacher").val("");
			
			$("#lat_boys_and_girls").val("");
			$("#lat_for_all").val("");
			
			$("#lat_total_population").val("");
			
			$("input:radio[name='sch_badget']" ).attr('checked','');			
			$("#anl_budget_amt").val("");
			
			$("#num_of_tap").val("");
			
			$("#achOdfStatus").val("");
			$("#num_0f_hh").val("");
			$("#odf_adult").val("");
			$("#odf_child").val("");
			$("#odf_total").val("");
			
			$("#wp_tech").val("");
			$("#wp_conp_date").val("");
						
			$("#achPhoto").val("");				
			
			$("#ach_lat").val("");
			$("#ach_long").val("");
			
			$("#san_or_hw_conp_d").val("");
			$("#st_of_rehab_d").val("");
			$("#schWash_conp_d").val("");
			
			$("#san_or_hw_conp_y").val("");	
			$("#san_or_hw_conp_m").val("");
			$("#san_or_hw_conp_d").val("");
			
			$("#st_of_rehab_y").val("");	
			$("#st_of_rehab_m").val("");
			$("#st_of_rehab_d").val("");
				
			$("#schWash_conp_y").val("");
			$("#schWash_conp_m").val("");
			$("#schWash_conp_d").val("");
			
			$("#dec_or_cer_y").val("");
			$("#dec_or_cer_m").val("");
			$("#dec_or_cer_d").val("");
						
			
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
	//alert(arrayId);
	if (arrayId ==undefined){							
			$(".errorChk").text("Select a Record");			
	}else{
		
		localStorage.tmpReviewAchDisplayFlag=reviewAchDisplayFlag;
		localStorage.tmpArrayId=arrayId;		
		
		var achivementRevArray2=localStorage.ach_save.split('rdrd');
		var achRevDetails=achivementRevArray2[arrayId];
		
		localStorage.ach_temp=achRevDetails;
		
		var achRevDetailsArray=achRevDetails.split('fdfd');
		
		//------------------
		$( "input:radio[name='activity_select'][value='"+achRevDetailsArray[0]+"']" ).attr('checked','checked');
		
		
		$("#achWord").val(achRevDetailsArray[1]);
		$("#achClusterID").val(achRevDetailsArray[2]);
		
		
		$("#achID").val(achRevDetailsArray[7]);
		
		$("#population").val(achRevDetailsArray[8]);
	
		$("#male").val(achRevDetailsArray[9]);
		$("#female").val(achRevDetailsArray[10]);

		$("#girls").val(achRevDetailsArray[11]);
		$("#boys").val(achRevDetailsArray[12]);
		$("#dapMale").val(achRevDetailsArray[13]);
		$("#dapFemale").val(achRevDetailsArray[14]);
	
		
		
		if(achRevDetailsArray[16]!=undefined){
			var sanCompArr=achRevDetailsArray[16].split("/");		
			$("#san_or_hw_conp_y").val(sanCompArr[2]);	
			$("#san_or_hw_conp_m").val(sanCompArr[0]);
			$("#san_or_hw_conp_d").val(sanCompArr[1]);
		}	
		
		$("#wp_tech").val("");
		$("#wp_conp_date").val("");
		
		
		$("#achWordNew").val(achRevDetailsArray[3]);
		$("#epiComName").val(achRevDetailsArray[4]);
		$("#villSubClusName").val(achRevDetailsArray[5]);
		$("#nameOfHhhID").val(achRevDetailsArray[6]);
		
		$("#latType").val(achRevDetailsArray[15]);
		
		
		$("#san_or_hw_conp_date").val(achRevDetailsArray[16]);
		
		
		
		
		$("#schType").val(achRevDetailsArray[17]);
		
		if (achRevDetailsArray[17]=="Primary"){
			localStorage.schoolType="Primary";
		}else{
			localStorage.schoolType="Secondary";
			}
		
		$("#p_school_combo").val(achRevDetailsArray[18]);
		$("#s_school_combo").val(achRevDetailsArray[19]);
		
		$("#sch_girl").val(achRevDetailsArray[20]);
		$("#sch_boy").val(achRevDetailsArray[21]);
		$("#totalStudent").val(eval(achRevDetailsArray[20])+eval(achRevDetailsArray[21]));
		$("#teach_female").val(achRevDetailsArray[22]);
		$("#teach_male").val(achRevDetailsArray[23]);
		$("#totalTeacher").val(eval(achRevDetailsArray[22])+eval(achRevDetailsArray[23]));
		$("#sch_dapFemale").val(achRevDetailsArray[24]);
		$("#sch_dapMale").val(achRevDetailsArray[25]);
		$("#totalDisable").val(eval(achRevDetailsArray[24])+eval(achRevDetailsArray[25]));
		
		
		if(achRevDetailsArray[26]!=undefined){
			var stRehabArr=achRevDetailsArray[26].split("/");
			$("#st_of_rehab_y").val(stRehabArr[2]);	
			$("#st_of_rehab_m").val(stRehabArr[0]);
			$("#st_of_rehab_d").val(stRehabArr[1]);
		}
		
		if(achRevDetailsArray[27]!=undefined){
			var schWashArr=achRevDetailsArray[27].split("/");
			$("#schWash_conp_y").val(schWashArr[2]);
			$("#schWash_conp_m").val(schWashArr[0]);
			$("#schWash_conp_d").val(schWashArr[1]);
		}
		
		
		$("#achOdfStatus").val(achRevDetailsArray[28]);
		
		$("#achPhoto").val(achRevDetailsArray[30]);
		
		startDt=achRevDetailsArray[31]
		var achlat=$("#ach_lat").val(achRevDetailsArray[32]);
		var achlong=$("#ach_long").val(achRevDetailsArray[33]);
					
		var image = document.getElementById('myImageA');
		image.src = achRevDetailsArray[30];
		imagePathA = achRevDetailsArray[30];
		
		$("#latTypePast").val(achRevDetailsArray[34]);
		
		$("input:radio[name='rec_hy_msg'][value='"+achRevDetailsArray[35]+"']").attr('checked','checked');
		$("input:radio[name='location_hw_dev'][value='"+achRevDetailsArray[36]+"']").attr('checked','checked');
		$("input:radio[name='available_hw_dev'][value='"+achRevDetailsArray[37]+"']").attr('checked','checked');
		$("input:radio[name='available_soap'][value='"+achRevDetailsArray[38]+"']").attr('checked','checked');
		
		
		$("#lat_boys").val(achRevDetailsArray[39]);
		$("#lat_girls").val(achRevDetailsArray[40]);
		$("#lat_teacher").val(achRevDetailsArray[41]);
		$("#lat_total_population").val(eval(achRevDetailsArray[39])+eval(achRevDetailsArray[40])+eval(achRevDetailsArray[41]));
		
		$("#lat_boys_and_girls").val(achRevDetailsArray[46]);
		$("#lat_for_all").val(achRevDetailsArray[47]);
		
		$("input:radio[name='sch_badget'][value='"+achRevDetailsArray[48]+"']").attr('checked','checked');
		
		
		if (achRevDetailsArray[48]=="YES"){
			localStorage.chkBudget="YES";
		}else{
			localStorage.chkBudget="NO";
		}
					
		$("#anl_budget_amt").val(achRevDetailsArray[49]);
		
		$("#num_of_tap").val(achRevDetailsArray[42]);
		
		$("#num_0f_hh").val(achRevDetailsArray[43]);
		$("#odf_adult").val(achRevDetailsArray[44]);
		$("#odf_child").val(achRevDetailsArray[45]);
		
		$("#odf_total").val(eval(achRevDetailsArray[44])+eval(achRevDetailsArray[45]));
		
		if(achRevDetailsArray[50]!=undefined){
			var schWashArr=achRevDetailsArray[50].split("/");
			$("#dec_or_cer_y").val(schWashArr[2]);
			$("#dec_or_cer_m").val(schWashArr[0]);
			$("#dec_or_cer_d").val(schWashArr[1]);
		}
		
		
	
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

		/*if(achPlanSector=="CommunityODF"){
			syncDataAch();
		}else{*/
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
					if (localStorage.achPlanId==''){
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
		/*}*/
	}
	
	

function syncDataAch(){	
			
			//alert(apipath+'submitAchiveData?cid=PLANBD&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+localStorage.achPlanId+'&achWord='+achWord+'&achCluster='+achCluster+'&achWardNew='+achWardNew+'&achEpiComName='+encodeURIComponent(achEpiComName)+'&achVillSubClusName='+encodeURIComponent(achVillSubClusName)+'&achHhhName='+encodeURIComponent(achHhhName)+'&achID='+achID+'&achPopulation='+achPopulation+'&achMale='+achMale+'&achFemale='+achFemale+'&achGirls='+achGirls+'&achBoys='+achBoys+'&achDapMale='+achDapMale+'&achDapFemale='+achDapFemale+'&achLatType='+encodeURIComponent(achLatType)+'&achLatTypePast='+encodeURIComponent(achLatTypePast)+'&achComDate='+achComDate+"&achTypeOfSchool="+achTypeOfSchool+"&achNameOfSchool="+encodeURIComponent(achNameOfSchool)+"&achSchGirl="+achSchGirl+"&achSchBoy="+achSchBoy+"&achTeachFemale="+achTeachFemale+"&achTeachMale="+achTeachMale+"&achSchDFemale="+achSchDFemale+"&achSchDMale="+achSchDMale+"&achSchRehabInsDate="+achSchRehabInsDate+"&achSchWashCompDate="+achSchWashCompDate+'&achOdfStatus='+achOdfStatus+'&achHH='+achHH+'&achOdfAdult='+achOdfAdult+'&achOdfChild='+achOdfChild+'&achLatBoy='+achLatBoy+'&achLatGirl='+achLatGirl+'&achLatTeacher='+achLatTeacher+'&achLatBoysGirls='+achLatBoysGirls+'&achLatForAll='+achLatForAll+'&achNumOfTap='+achNumOfTap+'&achRecHyMsg='+achRecHyMsg+'&achLocationHwDev='+achLocationHwDev+'&achAvailableHwdev='+achAvailableHwdev+'&achAvailableSoap='+achAvailableSoap+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+imageName+'&ach_startDt='+encodeURIComponent(localStorage.startDt)+'&achChkBudget='+achChkBudget+'&achAnlBudget='+achAnlBudget );
			
			$.ajax({
					type: 'POST',
					url:apipath+'submitAchiveData?cid=PLANBD&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+localStorage.achPlanId+'&achWord='+achWord+'&achCluster='+achCluster+'&achWardNew='+achWardNew+'&achEpiComName='+encodeURIComponent(achEpiComName)+'&achVillSubClusName='+encodeURIComponent(achVillSubClusName)+'&achHhhName='+encodeURIComponent(achHhhName)+'&achID='+achID+'&achPopulation='+achPopulation+'&achMale='+achMale+'&achFemale='+achFemale+'&achGirls='+achGirls+'&achBoys='+achBoys+'&achDapMale='+achDapMale+'&achDapFemale='+achDapFemale+'&achLatType='+encodeURIComponent(achLatType)+'&achLatTypePast='+encodeURIComponent(achLatTypePast)+'&achComDate='+achComDate+"&achTypeOfSchool="+achTypeOfSchool+"&achNameOfSchool="+encodeURIComponent(achNameOfSchool)+"&achSchGirl="+achSchGirl+"&achSchBoy="+achSchBoy+"&achTeachFemale="+achTeachFemale+"&achTeachMale="+achTeachMale+"&achSchDFemale="+achSchDFemale+"&achSchDMale="+achSchDMale+"&achSchRehabInsDate="+achSchRehabInsDate+"&achSchWashCompDate="+achSchWashCompDate+'&achOdfStatus='+achOdfStatus+'&achHH='+achHH+'&achOdfAdult='+achOdfAdult+'&achOdfChild='+achOdfChild+'&achLatBoy='+achLatBoy+'&achLatGirl='+achLatGirl+'&achLatTeacher='+achLatTeacher+'&achLatBoysGirls='+achLatBoysGirls+'&achLatForAll='+achLatForAll+'&achNumOfTap='+achNumOfTap+'&achRecHyMsg='+achRecHyMsg+'&achLocationHwDev='+achLocationHwDev+'&achAvailableHwdev='+achAvailableHwdev+'&achAvailableSoap='+achAvailableSoap+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+imageName+'&ach_startDt='+encodeURIComponent(localStorage.startDt)+'&achChkBudget='+achChkBudget+'&achAnlBudget='+achAnlBudget+'&achDateOfDecCer='+achDateOfDecCer,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//------------------------							
							
							if (localStorage.tmpReviewAchDisplayFlag=="true"){
												
								if (localStorage.tmpArrayId=='-1'){							
										$(".errorChk").text("Review Index value Error");
								}else{	
										
										var achiveSavArray2=localStorage.ach_save.split('rdrd');
										//alert(achiveSavArray2.length+','+arrayId);
										achiveSavArray2.splice(localStorage.tmpArrayId,1);
										
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
							$("#ach_lat").val("");
							$("#ach_long").val("");
							$("#achPhoto").val("");
														
							achPlanId="";
							achCBOid="";
							$("#sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
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
							$(".errorChk").text('This community has already been declared as ODF');										
							$("#btn_ach_submit").show();
						}else if(result=='Failed5'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Not Declared');										
							$("#btn_ach_submit").show();
						}else if(result=='Failed6'){
							//$(".errorChk").text('Failed to Submit');							
							$(".errorChk").text('This community has already been certified as ODF');															
							$("#btn_ach_submit").show();
						}else if(result=='Failed7'){
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
	//alert(apipath+'get_ff_rpt_activity?cid=PLANBD&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code);
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
						
						$('#ff_rpt_activity').append('<tr class="plan_tr" style="font-size:11px;"><td >'+ach_array[0]+'</td><td>'+ach_array[1]+'</td><td>'+ach_array[2]+'</td></tr>');
						
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



