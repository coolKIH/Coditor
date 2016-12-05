<div class="projectTitleWrapper">
    <button
            id="titleDisplayer">无标题项目
    </button>
    <div id="projectTitleWriter">
        <form id="projectTitleForm" method="post">
            <input name="projectTitle" type="text" /><br/>
            <input type="submit" style="position: absolute; left: -9999px"/>
        </form>
    </div>
</div>
<div class="editor">
    <textarea class="code html" placeholder="HTML"></textarea>
    <textarea class="code css" placeholder="CSS"></textarea>
    <textarea class="code js" placeholder="Javascript"></textarea>
</div>
<div class="buttonsWrapper">
    <button class="submitCode">运行</button>
    <button class="saveCode">保存代码</button>
</div>
<div class="viewer iframeContainer">
    <iframe id="resulting-frame"  src="resulting-frame/resulting.frame.html">
        <p>Iframe not supported</p>
    </iframe>
</div>
<div class="buttonsWrapper">
    <button class="runInNewPage">在新窗口打开</button>
</div>
