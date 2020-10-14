$(function () {
    getUserInfo();
    // 获取layer方法
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                layui.layer.msg(res.message || '获取用户名失败')
                return;
            }
            renderAvatar(res.data);
        },
        // 无论失败还是成功都会调用template回调函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份验证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })

}
// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎 &nbsp; &nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}