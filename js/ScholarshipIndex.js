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
	
	
  /*获取全部字段*/
  firstshow();

   var zdlength;//字段对象
    function firstshow() {
       $.ajax({
        type: 'post',
        url: Path + '/AcademyKeys/getAllMsg',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: false,
        data: {
          
        },
        success: function(result) {
          $("#zdtr th:gt(0)").remove();
          $('#select').html("");

          zdlength=result.data;
          
          var str1 = '';
          var str2 = '';
          for (var i = 0; i < result.data.length; i++) {
            var opids = result.data[i].id;
            str1 += '<th>' + result.data[i].value + '</th>';
            str2 += '<option value=' + opids + ' name="opt" >' + result.data[i].value + '</option>';
        }
        $('#zdtr').append(str1);
        $('#select').append(str2);
        $('select').formSelect();//服务端数据渲染后执行,再一次初始化
    }
});
   }
/*查找学生信息*/
$('#search').click(function () {
        var opkey = $('#select option:selected').val();
        var opvalue = $('#icon_prefix').val();
        var opmes={};
        opmes[opkey]=opvalue;

     $.ajax({
            type: 'post',
            url: Path + '/StudentMessage/getMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
            
             "conditions":opmes,
             "direction":false
            },
            success: function(result) {
                 $("#tbody").html("");
                var str = '';
                for (var i = 0; i < result.data.length; i++) {
                     var ids = result.data[i]._id;
                    var tmp=result.data[i];//先把这一整行data存起来
                     str += '<tr>' + '<td>' + '<label>' +'<input type="checkbox" name="checkedstu" value=' + ids + '>' + '<span> ' + '</span>' + '</label>' + '</td>';
                  for (var j = 0; j < zdlength.length; j++) {
                    var tmp2=tmp[ zdlength[j].id ];//map格式
                    if (tmp2==null){
                          str += '<td>-</td>';
                      }else{
                         str += '<td>' +tmp2  + '</td>';
                      }
                }
                 str += '</tr>';
                }
                 $('#tbody').html(str);
            },
            error:function(data){
            }
        });
});
/*查找学生信息*/
	
//导出学生综合测评表
$('#comprehensive').click(function () {
    var deleid = [];
	var academy = $('#select1').val();
	//console.log(typeof academy);
	//var checkboxstu = document.getElementById('all');
   var checkboxstu = document.getElementsByName("checkedstu");
	console.log(checkboxstu._id);
        for (var i = 0; i < checkboxstu.length; i++) {
            if (checkboxstu[i].checked) {
                deleid.push(checkboxstu[i].value);
            }
        }
        console.log(deleid);
        $.ajax({
            type: 'post',
            url: Path + '/export/comprehensiveAssessment/a',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            traditional:true,
            data: {
            	ids:deleid,
				academyYear:academy,
            },
            success: function(result) {
            	var downPath = Path + "/file/download/path/" + result.data;
                   // console.log(downPath);
                    window.location.href = downPath;
            },
            error:function(data){
            }
        });
});

//导出学生成绩表
$('#course').click(function () {
    var deleid = [];
    var academy = $('#select1').val();
    var checkboxstu = document.getElementsByName("checkedstu");
    console.log(checkboxstu._id);
    for (var i = 0; i < checkboxstu.length; i++) {
        if (checkboxstu[i].checked) {
            deleid.push(checkboxstu[i].value);
        }
    }
    console.log(deleid);
        $.ajax({
            type: 'post',
            url: Path + '/export/courseAchievement',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            traditional:true,
            data: {
            	ids:deleid,
				academyYear:academy,
            },
            success: function(result) {
                var downPath = Path + "/file/download/path/" + result.data;
                // console.log(downPath);
                window.location.href = downPath;
            },
            error:function(data){
            }
        });
});
});




