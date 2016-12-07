<div id="contentWindow">
    <div id="topController">
        <div class="titleWrapper">
            <a class="welcomeLogin" href="#popupWrapper">欢迎登录</a>
        </div>
        <div class="toggleWrapper">
            <a class="toggle" href="#">&#9932;</a>
        </div>
    </div>
    <div class="formBlock login">
        <div class="formContentWrapper login">
            <input class="account login" type="text" name="account" placeholder="用户名或者邮箱" autocomplete="off"
                   autofocus="autofocus" spellcheck="false" autocapitalize="off" autocorrect="off"/>
            <br />
            <label class="labelAccount login" class="error"></label>
            <br />
            <input class="psw login" type="password" name="psw" placeholder="密码" autocomplete="false" spellcheck="false"
                   autocapitalize="off" autocorrect="off"/>
            <br />
            <label class="labelPsw login" class="error"></label>
            <br/>
            <button class="submit login">登录</button>
            <div class="loader login"></div>
            <div class="bottomController">
                <div class="titleWrapper">
                    <a id="toRegister" href="#popupWrapper"><span class="toRegister">还没有帐号？马上注册!</span></a>
                </div>
            </div>
        </div>
    </div>
    <div class="formBlock signup">
        <div class="formContentWrapper signup">
            <input class="username signup" type="text" name="username" placeholder="用户名" autocomplete="off"
                   autofocus="autofocus" spellcheck="false" autocapitalize="off" autocorrect="off" required="required"/>
            <br />
            <label class="labelUsername signup" class="error"></label>
            <br/>
            <input class="email signup" type="email" name="email" placeholder="邮箱" autocomplete="off" required="required"
                   spellcheck="false" autocapitalize="off" autocorrect="off"/>
            <br />
            <label class="labelEmail signup" class="error"></label>
            <br />
            <input class="psw signup" type="password" name="psw" placeholder="密码" autocomplete="false" spellcheck="false"
                   autocapitalize="off" autocorrect="off" required="required"/>
            <br />
            <label class="labelPsw signup" class="error"></label>
            <br/>
            <button class="submit signup">确认注册</button>
            <div class="loader signup"></div>
            <br/><br/>
            <div class="bottomController">
                <div class="titleWrapper">
                    <a id="toLogin" href="#popupWrapper"><span class="toLogin">回去登录界面</span></a>
                </div>
            </div>
        </div>
    </div>
</div>