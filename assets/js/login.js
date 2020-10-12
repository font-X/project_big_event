$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })
    $('#link_login').on('click', function () {
        $('.reg').hide();
        $('.login').show();
    })
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码的校检规则
        repwd: function (value) {
            var pwd = $('.reg [name=password]').val();
            if (pwd !== value) {
                return "两次的密码不一致，请重新输入"
            }
        }
    })

    //注册功能
    //1监听form表单提交
    //post请求
    //判断res返回值
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            url: "/api/reguser",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 模拟人的点击行为
                $('#link_login').click()
            }

        })
    })
    //登录功能
    $("#form-login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})