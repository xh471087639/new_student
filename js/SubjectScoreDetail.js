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

  })
   check.click(function () {
     beizhu.addClass('hide');
      xuanze.addClass('hide');
       edit.removeClass('hide');

  })

//$('#AddStu').click(function () {
 /*$.ajax({
            type: 'post',
            url: Path + '/AcademyKeys/getAllMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: false,
            data: {
                
            },
            success: function(result) {
                //  $("#addstuspace").html("");

                var str = '';
                for (var i = 0; i < result.data.length; i++) {
                    var ids = result.data[i].id;
                    str += ' <div class="" style="text-align: center;">'+ ' <div class="input-field col s4">' + ' <input type="text" class="validate" name="xinxi" id=' + ids + ' >' +' <label for="">'+result.data[i].value + '</label>'+'</div>'+'</div>' ;

                }
                $('#addstuspace').html(str);
            }
        });
});
*/
 /*var _http;

if(window.XMLHttpRequest)
{
	_http=new  XMLHttpRequest();
}
 else{  
	 _http=new ActiveXObject("Microsoft.XMLHTTP");
 }
 //打开连接，发送请求 
 _http.open("post","url"); 
_http.send(null);
 _http.onreadystatechange=function()
 {  
	 if(_http.readyState === 4 && _http.statues === 200) 
 {      
	 var _content = _http.responseText;    
 }
 }
*/
	//新增成绩
    $('#Resetsure').click(function() {
    var auserValue =$("#user").val();
	var _stidValue =$("#studentid").val();
	var _titleValue =$("#coursetitle").val();
	var _creValue =$("#coursecredit").val();
	var _remarksValue = $("#remarks").val();
	var _markValue = $("#convertmark").val();  
	var _pointValue = $("#coursegradepoint").val();  
	var _curriculValue = $("#curricul").val();  
	var _yearValue = $("#academicyear").val();
	var _termValue = $("#schoolterm").val();
		console.log(typeof _termValue);
        $.ajax({
            type: 'post',
            url: Path + '/Course/iuAchievement',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {              
			userId:auserValue ,             
			studentId:_stidValue,
			courseTitle: _titleValue,
			courseCredit:_creValue,
			remarks:_remarksValue,
			convertMark:_markValue,
            courseGradePoint:_pointValue,
			curriculumNature:_curriculValue,             
			academicYear:_yearValue,
			schoolTerm:_termValue
            },
			/* success: function(data) {
               alert("新增数据成功");  
            },
            error:function(data){
				alert("数据传送失败"); */
		//contentType: "json/application",
		success:function(response){      
			//console.log(response);      
			if(response.code === 0 || response.code === 2) {  
				alert("新增成功");       
			} else {               
				alert("保存失败");          
			}              
		},          
		error:function() {           
			alert("系统繁忙，请稍后再试...");   
		}             
           
            
        });
    }); 
	
	
 var btn=document.getElementById('btn'); 
	        console.log(btn);
		     btn.onclick=function(){
					



				 //var kiki=['学号','班级'];
				 //values[kiki[0]]=$.cookie('学号');
                 //values[kiki[1]]=$.cookie('班级');

                 var values={};
				values['学号']=$.cookie('学号');
				values['专业']=$.cookie('专业');
				values['班级']=$.cookie('班级');

                 console.log(values);
				 //console.log(values);
				 //var con=JSON.stringify(values);
				 
				 //var values1=$.cookie('学号');
				 //var  values2=$.cookie('班级');
				  //var values="{\"学号\":"+values1+",\"班级\":"+values2+"}";
				    //var con = values.join("-"); 
				    //console.log(con);
                 //const map2 = new Map([
                   //  ['学号', values1],
                     //['班级',values2]
                // ])


					var flag=$.cookie('flag');
							$.ajax({
                               type: 'post',
                               url: Path + '/Course/searchMsg/detail',
                               contentType: 'application/x-www-form-urlencoded',
                               dataType: 'json',
                               async: true,
                               //traditional:true,
                               data: {
            	               conditions:values,
							   
							  
                           },
							 success: function(result) {
            	             $("#tbady1").html("");
            	             $("#tbody2").html("");
            	             var str1 ='';
                             var str = '';
                             for (var i = 0; i < result.data.result.length; i++) {
                             //var ids = result.data.result[i][1];
                             var tmp = result.data.result[i];//先把这一整行data存起来
                              //console.log(tmp);
                                 str += '<tr>';
                                 str1 +='<tr>';
					        for (var j = 0; j <4; j++) {
                             switch (j) {
							case 0:str += '<td>'+tmp.academicYear+'</td>';break;
                            case 1:str += '<td>'+tmp.clas+'</td>';break;
                            case 2:str += '<td>'+tmp.sname+'</td>';break;
                            case 3:str += '<td>'+tmp.sno+'</td>';break;
                        }
					        }
                                 for (var x= 0; x <6; x++) {
                                     switch (j) {
                                         case 0:str1 += '<td>'+tmp.courseTitle+'</td>';break;
                                         case 1:str1 += '<td>'+tmp.curriculumNature+'</td>';break;
                                         case 2:str1 += '<td>'+tmp.courseCredit+'</td>';break;
                                         case 3:str1 += '<td>'+tmp.convertMark+'</td>';break;
                                         case 4:str1 += '<td>'+tmp.courseGradePoint+'</td>';break;
                                         case 5:str1 += '<td>'+tmp.item+'</td>';break;
                                     }
                                 }
                    str += '</tr>'
                                 str1 += '</tr>';
					console.log(str)
                 }
					$("#tbady1").html(str);
                                 $("#tbody2").html(str1);
				 },
				   error : function(data){
				
                      }
				  })
				 }		


});




