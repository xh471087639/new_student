// JavaScript Document
document.cookie='aa='+4;
$(document).ready(function(){
var Path = "http://47.101.33.66:8000/studentsys";
 var edit = $('.edit');
  var beizhu = $('.beizhu');
  var xuanze = $('.xuanze');
  var clear = $('.clear');
  var check = $('.check');
  edit.click(function () {
   beizhu.removeClass('hide');
   edit.addClass('hide');
   xuanze.removeClass('hide');
  });

  clear.click(function () {
     beizhu.addClass('hide');
      xuanze.addClass('hide');
       edit.removeClass('hide');

  });
   check.click(function () {
     beizhu.addClass('hide');
      xuanze.addClass('hide');
       edit.removeClass('hide');

  });
//var num=null;
var oBtn=null;
//var flag=null;
//查找学生成绩
$('#search').click(function () {
       var opkey = $('#select option:selected').val();
	 console.log(opkey);
	 var opvalue = $('#icon_prefix').val();
        if (opvalue===''){
            opkey='学号';
            opvalue='2';
        }
        var opmes = {};
        opmes[opkey] = opvalue;
	 console.log(opmes);
        //var academicyear = $('#ECselect option:selected').text();
        $.ajax({
            type: 'post',
            url: Path + '/Course/searchMsg/simple',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                "conditions": opmes
            },
            success: function (result) {
				//num= result.data.result.length;
                $("#tbody").html("");
                var str = '';
                for (var i = 0; i < result.data.result.length; i++) {
                    var ids = result.data.result[i][1];
                    var tmp = result.data.result[i];//先把这一整行data存起来
                    str += '<tr>' + '<td>' + '<label>' + '<input type="checkbox" name="checkedstu" value=' + ids + '>' + '<span> ' + '</span>' + '</label>' + '</td>';
					
                       for (var j = 0; j <11; j++) {
                        switch (j) {
							case 0:str += '<td>'+tmp.academy+'</td>';break;
                            case 1:str += '<td>'+tmp.major+'</td>';break;
                            case 2:str += '<td>'+tmp.clas+'</td>';break;
                            case 3:str += '<td>'+tmp.sname+'</td>';break;
							case 4:str += '<td>'+tmp.sno+'</td>';break;
							case 5:str += '<td>'+tmp.finalFirstPoint+'</td>';break;
						    case 6:str += '<td>'+tmp.finalSecondPoint+'</td>';break;
							case 7:str += '<td>'+tmp.finalAvgPoint+'</td>';break;
							case 8:str += '<td>'+tmp.g+'</td>';break;
							case 9:str += '<td>'+tmp.ggNum+'</td>';break;
							case 10:str += '<td>'+'<input class="button" type="button" value="详情">'+'</td>';break;
                        }

                    }
                    str += '</tr>';
				}
				 $('#tbody').html(str);
				/*
				var uname= getCookie('banji');
				console.log(uname);*/
                
				//console.log(document.cookie);
				oBtn=document.getElementsByClassName('button');
				
				//console.log(oBtn[0]);
				
				$.cookie('学号', tmp.sno,{path:'/',secure:false,raw:false})
				$.cookie('班级', tmp.clas,{path:'/',secure:false,raw:false})
                $.cookie('专业', tmp.major,{path:'/',secure:false,raw:false})
				$.cookie('flag', tmp.academy,{path:'/',secure:false,raw:false})
               // var test=$.cookie('学号');
				 for (var x = 0; x <result.data.result.length; x++)
				 {
				  oBtn[x].onclick = function(){
			      window.location.href="SubjectScoreDetail.html";
				  }
				 }
				 },
                 error : function(data){
				
                      }
				
    });
		});
	
           
	            //console.log(oBtn);
				
				 
			 //}
							  /*
                 
                          })
							}*/
							
	            		
				
           
//详情页面

//导入学生成绩
$("#saveZipButton").click(function () {
    // var formData = new FileReader();
    // formData.readAsBinaryString(document.getElementById("files").files[0]);
    //var files = new FormData(document.getElementById("files").files[0]);
    var files = new FormData();
	files.append("files", document.getElementById("excel-file").files[0]);
    // console.log(formData);
    // console.log(formData.result);
    // console.log(typeof formData.result);
    // console.log(document.getElementById("files").src);
	console.log(files);
    $.ajax({
        type: 'post',
        url:  Path +'/Course/importAchievement',
        data: files,
        cache: false,
        processData: false,
        contentType:false,
        async: false,
        dataType : "json",
        enctype:"multipart/form-data"
	
		}).success(function (data) {
        console.log(data);
    }).error(function () {
        alert("上传失败");
    });
});
//导出学生综合测评表
$('#deletestuMes').click(function () {
    var deleid = [];
    var checkboxstu = document.getElementsByName("checkedstu");
        for (var i = 0; i < checkboxstu.length; i++) {
            if (checkboxstu[i].checked) {
                deleid.push(checkboxstu[i].value);
            }
        }
        $.ajax({
            type: 'post',
            url: Path + '/StudentMessage/deleteMsgByKeyList',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            traditional:true,
            data: {
            	idList:deleid,
            },
            success: function(data) {
            	$('#search').click();

            },
            error:function(data){
            }
        });
});

});