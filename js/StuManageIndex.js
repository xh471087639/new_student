$(document).ready(function() {

    var Path = "http://47.101.33.66:8000/studentsys";
    /*获取全部字段*/
    /*模板下载*/
    $('#downloadtemplate').click(function () {
        open(Path+'/file/download/studentMessage');
    })
    /*模板下载*/
    firstshow();

    var zdlength;//字段对象
    function firstshow() {
        $.ajax({
            type: 'post',
            url: Path + '/AcademyKeys/getAllMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: false,
            data: {},
            success: function (result) {
                $("#zdtr th:gt(0)").remove();
                $('#select').html("");

                zdlength = result.data;

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

    /*获取全部字段*/

    /*添加学生信息*/

    $('#AddStu').click(function () {

        $.ajax({
            type: 'post',
            url: Path + '/AcademyKeys/getAllMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: false,
            data: {},
            success: function (result) {
                /*  $("#addstuspace").html("");*/

                var str = '';
                for (var i = 0; i < result.data.length; i++) {
                    var ids = result.data[i].id;
                    str += ' <div class="" style="text-align: center;">' + ' <div class="input-field col s4">' + ' <input type="text" class="validate" name="xinxi" id=' + ids + ' >' + ' <label for="">' + result.data[i].value + '</label>' + '</div>' + '</div>';

                }
                $('#addstuspace').html(str);
            }
        });
    });

    $('#Sureaddstu').click(function () {
        var key = [];
        var values = [];
        var mes = {};
        var xinxi = document.getElementsByName("xinxi");
        //console.log(xinxi);
        for (var i = 0; i < xinxi.length; i++) {
            key.push(xinxi[i].id);
            values.push(xinxi[i].value);
            mes[key[i]] = values[i];
        }
        console.log(values);
        //console.log(mes);
        //console.log(key);
        $.ajax({
            type: 'post',
            url: Path + '/StudentMessage/addMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {

                "message": mes
            },
            success: function (data) {
                $('#search').click();
            },
            error: function (data) {
            }
        });
    });

    /*添加学生信息*/


    /*查找学生信息*/
    $('#search').click(function () {
        var opkey = $('#select option:selected').val();
        var opvalue = $('#icon_prefix').val();
        var opmes = {};
        opmes[opkey] = opvalue;

        $.ajax({
            type: 'post',
            url: Path + '/StudentMessage/getMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {

                "conditions": opmes,
                "direction": false
            },
            success: function (result) {
                $("#tbody").html("");
                var str = '';
                for (var i = 0; i < result.data.length; i++) {
                    var ids = result.data[i]._id;
                    var tmp = result.data[i];//先把这一整行data存起来
                    str += '<tr>' + '<td>' + '<label>' + '<input type="checkbox" name="checkedstu" value=' + ids + '>' + '<span> ' + '</span>' + '</label>' + '</td>';
                    for (var j = 0; j < zdlength.length; j++) {
                        var tmp2 = tmp[zdlength[j].id];//map格式
                        if (tmp2 == null) {
                            str += '<td>-</td>';
                        } else {
                            str += '<td>' + tmp2 + '</td>';
                        }
                    }
                    str += '</tr>';
                }
                $('#tbody').html(str);
            },
            error: function (data) {
            }
        });
    });
    /*查找学生信息*/


    /*全选学生信息*/

    $('#all').click(function () {
        var one = document.getElementsByName("checkedstu");

        if (this.checked) {
            /*console.log("12");*/
            for (var i = 0; i < one.length; i++) {
                one[i].checked = true;
            }

        }
        else {
            /*console.log("11");*/
            for (var j = 0; j < one.length; j++) {
                one[j].checked = false;
            }

        }
    });
    /*全选学生信息*/


    /*删除学生信息*/
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
            traditional: true,
            data: {
                idList: deleid,
            },
            success: function (data) {
                $('#search').click();

            },
            error: function (data) {
            }
        });
    });

    /*删除学生信息*/

    /*导出学生信息*/

    /*$('#export').click(function(){
        $('#all2').click(function(){
            if(this.checked){
                for(var i=0;i<one.length;i++)
                    one[i].checked=true;
            }
            else{
                for (var j = 0; j < one.length; j++)
                    one[j].checked=false;
            }
        });
        var columname = [];
        var one = document.getElementsByName("one");
        var two = $('.two');
        var exids = [];
        var checkboxstu = document.getElementsByName("checkedstu");
        for (var i = 0; i < checkboxstu.length; i++) {
            if (checkboxstu[i].checked) {
                exids.push(checkboxstu[i].value);
            }
        }
        console.log(exids);
        console.log(columname);

        $('#sureexport').click(function(){

        for (var j = 0; j < one.length; j++) {
            if (one[j].checked) {
                columname.push(two[j].innerHTML);
            }
        }
            $.ajax({
                type: 'post',
                url: Path + '/export/studentMessage',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                traditional:true,
                data:{
                    "ids" : exids,
                    "column" : columname,
                    "columnIndex" :[1,2,3,4,5,6,7,8,9] ,


                },

                success: function(result) {
                    var downPath = Path + "/file/download/path/" + result.data;
                    console.log(downPath);
                    window.location.href = downPath;
                },
                error:function(data){
                }
            });
        });
    });
    /*导出学生信息*/
    $('#sureexport').click(function () {        //当鼠标单击id=sureexport的元素触发回调函数
        const firstchildren = document.getElementById('tbody').firstElementChild; //储存根节点下子节点的第一个元素
        let brother = firstchildren.nextElementSibling; //储存根节点下的子节点的下一个兄弟节点，而后进行遍历
        for (allpeple = 1; brother != null; allpeple++) {
            brother = brother.nextElementSibling;
        }  //for循环确认需要遍历的次数，用以确认上传次数与数组需要储存的对象数
        var allchildren = Array();
        for (i = 0; i < allpeple; i++) {
            let times = i;
            brother = firstchildren;
            while (times) {
                brother = brother.nextElementSibling;
                --times;
            }
            brother = brother.firstElementChild;
            brother = brother.nextElementSibling;
            t_number = brother.innerHTML;
            brother = brother.nextElementSibling;
            t_name = brother.innerHTML;
            brother = brother.nextElementSibling;
            t_college = brother.innerHTML;
            brother = brother.nextElementSibling;
            t_major = brother.innerHTML;
            brother = brother.nextElementSibling;
            t_class = brother.innerHTML;
            var temporary = {
                number: t_number,
                name: t_name,
                college: t_college,
                major: t_major,
                class: t_class
            };
            allchildren.push(temporary);
        } //每次遍历都将信息储存到数组对象中
        let str = `学号,姓名,学院,专业,班级\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        for (let i = 0; i < allchildren.length; i++) {
            for (let item in allchildren[i]) {
                str += `${allchildren[i][item] + '\t'},`;
            }//for循环调用页面新增接口，绕过直接上传，进行多次新增以达到目的
            str += '\n';
        }
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str); //对字符串进行文件编码
        var link = document.createElement("a"); //link记录创建的a元素
        link.href = uri; //设置a元素href属性
        if (document.getElementById('putoutname').value == '') {
            link.download = "学生信息管理导出表.csv";
        }
        else {
            alert(document.getElementById('putoutname').value);
            link.download = document.getElementById('putoutname').value + ".csv";
        }//如果没有输入文字则默认文件名为学生信息管理导出表，否则则为自定义名字
        document.body.appendChild(link);//添加a元素到body下
        link.click();//单机a元素
        document.body.removeChild(link);//触发后移出a元素

    });
    /*导入学生信息*/
    /*
    $('#import').click(function(){
     ('#downloadtemplate').click(function(){
       $.ajax({
                type: 'post',
                url: Path + '/file/download/studentMessage',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                traditional:true,
                data:{},
                success: function() {

                },
                error:function(data){
                }
            });
     });


      $("#upload").click(function () {
                var formData = new FormData($('#uploadForm')[0]);
                $.ajax({
                    type: 'post',
                   // url:  Path +'/StudentMessage/importMsg',
                    url:  Path +'/StudentMessage/addMsg',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    async: false,
                }).success(function (data) {
                    console.log(data);
                }).error(function () {
                    alert("上传失败");
                });
            });
        });
        */
    /*
        $("#upload").click(function () {
        var formData=new FormData();
        var name=$('#Files').val();
        formData.append('file',$("Files")[0].files[0]);
        formData.append("name",name);
        $.ajax({
                    type: 'post',
                    url:  Path +'/StudentMessage/addMsg',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    async: false,
            beforeSend:function()
            {
                console.log("正在进行，请稍等");
            },
            success:function(reponseStr)
            {
                if(reponseStr==="01")
                    {
                        alert("导入成功");
                    }
                else{
                    alert("导入失败");
                }
            }
        });
        });
    h*/
    /*导入学生信息*/
// });
function Importxlsx (e) {
      var files = e.target.files;

            var fileReader = new FileReader();
	          fileReader.readAsBinaryString(files[0]);
            fileReader.onload = function(ev) {
                try {
                    var data = ev.target.result,
                        workbook = XLSX.read(data, {
                            type: 'binary'
                        }), // 以二进制流方式读取得到整份excel表格对象
                        persons = []; // 存储获取到的数据
                } catch (e) {
                    alert('文件类型不正确');
                    return;
                }

                // 表格的表格范围，可用于判断表头是否数量是否正确
                var fromTo = '';
				//var persons = [];
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                       // console.log(fromTo);
                        persons =persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break; // 如果只取第一张表，就取消注释这行
                    }
                }
              // alert(persons);
				//var arr=persons[0].姓名;
				//console.log(arr);
				 //var values = {};
                //console.log(persons);
				   /* values[1]=persons[0].学号;
					values[2]=persons[0].姓名;
					values[3]=persons[0].学院;
					values[4]=persons[0].专业;
					values[5]=persons[0].班级;
					console.log(values);*/

		$('#upload').click(function() {
                   //var key = [];
             var values = {};
                   //var mes={};
                  // var xinxi = persons;
             for (var i = 0; i < persons.length; i++) {

					values[1]=persons[i].学号;
					values[2]=persons[i].姓名;
					values[3]=persons[i].学院;
					values[4]=persons[i].专业;
					values[5]=persons[i].班级;
					//console.log(values);
		  $.ajax({
            type: 'post',
            url: Path + '/StudentMessage/addMsg',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {

             "message":values
            },
            success: function(data) {
            	$('#search').click();
            },
            error:function(data){
            }
        });
           }



    });


            // 以二进制方式打开文件
         //   fileReader.readAsBinaryString(files[0]);

			}
 };

    $("#excel-file").change(function () {
        e=event;
        if (!(/\.csv/.test(document.getElementById("excel-file").value))) {
            if(/\.xlsx/.test(document.getElementById("excel-file").value)){
                Importxlsx(e);
            }
            else {
                alert("文件类型错误");
            }
        }
        else {
            let reader=new FileReader();
            reader.readAsText(event.target.files[0],"gbk");
            reader.onload=function(){

                let text=Array();
                for (let i=0;this.result[i]!=null;i++){
                    text[i]=this.result[i];
                }
                text=text.filter(function (item) {
                    return(item!='\t');
                })
                console.log(text);
                let commalie=Array();
                text.forEach(function (item,index) {
                    if ((item==",")||(item=="\n")){
                        commalie.push(index);
                    }
                })
                console.log(commalie);
                let newtext=Array();
                let ls;
                for (let i=4;commalie[i+1]!=null;i++){
                    ls="";
                    for (let x=commalie[i]+1;x<commalie[i+1];x++) {
                        ls=ls+text[x];
                    }
                    newtext.push(ls);
                }
                console.log(newtext);
                $('#upload').click(function() {
                    for (let i = 0; newtext[i + 1] != null; i = i + 6) {
                        var values = {};
                        values[1] = newtext[i];
                        values[2] = newtext[i + 1];
                        values[3] = newtext[i + 2];
                        values[4] = newtext[i + 3];
                        values[5] = newtext[i + 4];
                        $.ajax({
                            type: 'post',
                            url: Path + '/StudentMessage/addMsg',
                            contentType: 'application/x-www-form-urlencoded',
                            dataType: 'json',
                            async: true,
                            data: {
                                "message": values
                            },
                            success: function (data) {
                                $('#search').click();
                            },
                            error: function (data) {

                            }
                        });

                    }
                });
            };
        }

    });
});
$(document).ready(function () {   
	document.getElementById('search').click(); 
});//加载后click触发getmsg


 
 


	