$(document).ready(function() {

    const Path = "http://47.101.33.66:8000/studentsys";

    /*模板下载*/
    $('#ECdownloadtemplate').click(function () {
        open(Path+'/file/download/quality');
    })
    /*模板下载*/



    /*操行分查询*/


    /*操行分查询*/

    /*查询学生*/
    $('#ECsearch').click(function () {
        var opkey = $('#select option:selected').val();
        var opvalue = $('#icon_prefix').val();
        if (opvalue==''){
            opkey='学号';
            opvalue='2';
        }
        var opmes = {};
        opmes[opkey] = opvalue;
        //var academicyear = $('#ECselect option:selected').text();
        $.ajax({
            type: 'post',
            url: Path + '/Quality/searchMsg/simple',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                "conditions": opmes
            },
            success: function (result) {
                $("#tbody").html("");
                var str = '';
                for (var i = 0; i < result.data.result.length; i++) {
                    var ids = result.data.result[i][1];
                    var tmp = result.data.result[i];//先把这一整行data存起来
                    str += '<tr>' + '<td>' + '<label>' + '<input type="checkbox" name="checkedstu" value=' + ids + '>' + '<span> ' + '</span>' + '</label>' + '</td>';
                    for (var j = 0; j < 2; j++) {
                        switch (j) {
                            case 0:str += '<td>'+tmp.sno+'</td>';break;
                            case 1:str += '<td>'+tmp.sname+'</td>';break;
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
    $('#ECIsearch').click(function () {
        let opkey = $('#select option:selected').val();
        let opvalue = $('#icon_prefix').val();
        let item={};

        if(document.getElementById('select_item')){
        if ($('#select_item').val()==3){
            item[0]=1;
            item[1]=2;
        }else{
            item[0]=$('#select_item').val();
        }
        }else {
            item[0]=1;
            item[1]=2;
        }

        if (opvalue==''){
            opkey='学号';
            opvalue='2';
        }
        let opmes = {};
        opmes[opkey] = opvalue;
        //var academicyear = $('#ECselect option:selected').text();
        let year=new Array();
        if (document.getElementById('ECselect')){
            year[0]=document.getElementById('ECselect').value;
        }else {
            year[0]='2018-2019';
        }
        $.ajax({
            type: 'post',
            url: Path + '/Quality/searchMsg/simple',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                "conditions": opmes,
                "academic_year":year[0],
                "item":item,
            },
            success: function (result) {
                $("#tbody").html("");
                var str = '';
                for (var i = 0; i < result.data.result.length; i++) {
                    var ids = result.data.result[i][1];
                    const tmp = result.data.result[i];//先把这一整行data存起来
                    str += '<tr>' + '<td>' + '<label>' + '<input type="checkbox" name="checkedstu" value=' + ids + '>' + '<span> ' + '</span>' + '</label>' + '</td>';
                    for (let j = 0; j < 10; j++) {
                        for (let k = 0; k < 4; k++){
                            switch (k) {
                                case 0:if (tmp.quality.思想政治分==undefined){tmp.quality.思想政治分=0};break;
                                case 1:if (tmp.quality.科技创新分==undefined){tmp.quality.科技创新分=0};break;
                                case 2:if (tmp.quality.技术技能分==undefined){tmp.quality.技术技能分=0};break;
                                case 3:if (tmp.quality.组织管理分==undefined){tmp.quality.组织管理分=0};break;
                            }
                        }
                        switch (j) {
                            case 0:str += '<td>'+tmp.clas+'</td>';break;
                            case 1:str += '<td>'+tmp.sname+'</td>';break;
                            case 2:str += '<td>'+tmp.sno+'</td>';break;
                            case 3:str += '<td>'+tmp.quality.思想政治分+'</td>';break;
                            case 4:str += '<td>'+tmp.quality.科技创新分+'</td>';break;
                            case 5:str += '<td>'+tmp.quality.技术技能分+'</td>';break;
                            case 6:str += '<td>'+tmp.quality.组织管理分+'</td>';break;
                            //case 7:str += '<td>'+tmp.quality.特殊加分+'</td>';break;
                            case 7:str += '<td>'+0+'</td>';break;
                            case 8:str +='<td>'+(parseFloat(tmp.quality.思想政治分)+parseFloat(tmp.quality.科技创新分)+parseFloat(tmp.quality.技术技能分)+parseFloat(tmp.quality.组织管理分))+'</td>';break;
                            case 9:str +='<td>无</td>';break;
                        }

                    }
                    if (document.getElementById('label10').innerHTML=="状态"){
                        str +="<td class="+"\"fixed-action-btn\">" + "<a class="+"\"btn-floating\">" + "<i class=\"large material-icons\">"+"mode_edit"+"</i>"+"</a>" + " <ul>" + " <li><a class=\"btn-floating modal-trigger\" href=\"#modal1\"><i class=\"material-icons\">check</i></a></li>" + "<li><a class=\"btn-floating modal-trigger\" href=\"#modal2\"><i class=\"material-icons\">clear</i></a></li>" + " <li><a class=\"btn-floating\" href=\"IndividualScoreDetail.html\" target=\"_blank\"><i class=\"material-icons\">person</i></a></li>" + " </ul>"+"</td>"
                    }
                    str += '</tr>';
                }
                $('#tbody').html(str);
            },
            error: function (data) {
            }
        });
    });
    /*查询学生*/


    /*全选学生信息*/

    $('#ECall').click(function () {
        var one = document.getElementsByName("checkedstu");
        if (this.checked) {
            for (var i = 0; i < one.length; i++)
                one[i].checked = true;
        }
        else {
            for (var j = 0; j < one.length; j++)
                one[j].checked = false;
        }
    });
    /*全选学生信息*/
    // function ergodic_firstchild(id){
    //     let firstchild=document.getElementById(id).firstElementChild;
    //     console.log(firstchild);
    //     let all=new Array;
    //     let getchild=firstchild;
    //     let a;
    //     for (i=0;getchild;i++,getchild=getchild.nextElementSibling){
    //         if (getchild.firstElementChild.firstElementChild.firstElementChild.checked==true) {
    //             a=parseInt(getchild.firstElementChild.nextElementSibling.innerHTML);
    //             console.log(a);
    //             console.log(typeof a);
    //         }
    //         all[i]=a;
    //         console.log(all);
    //         for (i=0;i<4;i++){
    //             console.log(i in all);
    //         }
    //     };
    //     return all;
    // }
    /*传数据*/
    $('#ECsave').click(function () {
        //var Sno = ergodic_firstchild("tbody");
        let firstchild=document.getElementById("tbody").firstElementChild;
        let getchild=firstchild;
        let Sno =Array();
        let sno=Array();
        for (i=0;getchild;getchild=getchild.nextElementSibling){
                    if (getchild.firstElementChild.firstElementChild.firstElementChild.checked==true) {
                        Sno[i]=parseInt(getchild.firstElementChild.nextElementSibling.innerHTML);
                        ++i;
                    }
        }
        console.log(Sno);
        for (i=0;i<Sno.length;i++){
            sno.push(Sno[i]);
        }
        var project = $('#reason').val();
        var academicYears = $('#year').val();
        var item = $('#select1 option:selected').val();
        var projectType = $('#select2 option:selected').val();
        var checkboxstu = document.getElementsByName("checkedstu");
        for (var i = 0; i < checkboxstu.length; i++) {
            if (checkboxstu[i].checked) {
                Sno.push(checkboxstu[i].value);
            }

        }

        var value;
        if ($('#scorevalue').val() != "") value = $('#scorevalue').val();
        else value = $('#select3 option:selected').val();
        console.log(sno);
        $.ajax({
            type: 'post',
            url: Path + '/Quality/addMsgs',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            traditional: true,
            data: {
                "snoList": sno,
                "value": value,
                "projectType": projectType,
                "project": project,
                "academicYears": academicYears,
                "item": item,
            },
            success: function (data) {
               //window.location.href = "ScoreIndex.html";
                /*zidongchaxvn*/
            },
            error: function (data) {

            }
        });
    });
    /*传数据*/

    /*点击取消*/
    $('#ECcancel').click(function () {
        location.href += "?reload=true";
    });
    /*点击取消*/

    /*导入操行分表*/
    // $('#ECimport').click(function () {
    //     $('#ECdownloadtemplate').click(function () {
    //         $.ajax({
    //             type: 'post',
    //             url: Path + '/file/download/quality',
    //             contentType: 'application/x-www-form-urlencoded',
    //             dataType: 'json',
    //             async: true,
    //             traditional: true,
    //             data: {},
    //
    //             success: function () {
    //
    //             },
    //             error: function (data) {
    //             }
    //         });
    //     });
$("#ECupload").click(function () {
    // var formData = new FileReader();
    // formData.readAsBinaryString(document.getElementById("files").files[0]);
    var files = new FormData();
    files.append('files',document.getElementById("files").files[0]);
    // console.log(formData);
    // console.log(formData.result);
    // console.log(typeof formData.result);
    // console.log(document.getElementById("files").src);
    $.ajax({
        type: 'post',
        url:  Path +'/Quality/importMsg',
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

    })

/*导入操行分表*/


/*导出主页操行分表*/
$('#Resetsure').click(function () {        //当鼠标单击id=sureexport的元素触发回调函数
    const firstchildren = document.getElementById('tbody').firstElementChild; //储存根节点下子节点的第一个元素
    let brother = firstchildren; //储存根节点下的子节点的下一个兄弟节点，而后进行遍历
    for (allpeple = 0; brother != null; allpeple++) {
        brother = brother.nextElementSibling;
    }  //for循环确认需要遍历的次数，用以确认上传次数与数组需要储存的对象数
    var allchildren = Array();
    brother = firstchildren;
    for (i = 0; i < allpeple; i++) {
        let inbrother=brother.firstElementChild;
        let all_information=Array();
       for (let k=0;k<9;k++) {
           inbrother=inbrother.nextElementSibling;
           all_information[k]=inbrother.innerHTML;
       }
        var temporary = {
            class: all_information[0],
            name: all_information[1],
            number: all_information[2],
            points1:all_information[3],
            points2:all_information[4],
            points3:all_information[5],
            points4:all_information[6],
            points5:all_information[7],
            points6:all_information[8],
        };
        allchildren.push(temporary);

        if(i+1<allpeple){
            brother =brother.nextElementSibling;
            inbrother=brother.firstElementChild;
        }
    } //每次遍历都将信息储存到数组对象中

    let str = `班级,姓名,学号,思想道德分,科技创新分,技术技能分,组织管理分,特殊加分,总分\n`;
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
        link.download = "操行分公示表.csv";
    }
    else {
        alert(document.getElementById('putoutname').value);
        link.download = document.getElementById('putoutname').value + ".csv";
    }//如果没有输入文字则默认文件名为学生信息管理导出表，否则则为自定义名字
    document.body.appendChild(link);//添加a元素到body下
    link.click();//单机a元素
    document.body.removeChild(link);//触发后移出a元素

});
/*导出主页操行分表*/


























