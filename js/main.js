var scores = 0; //積分
var current_question_id = -1; //現在做的題目
var sum_question = -1; //做幾題了
var sum_knowledge = -1; //看幾個之事了
var is_hinted = 0; //是否提示過

$(document).ready(function () { //網頁讀取完畢後 開始執行javascript

    //	question_mode()
    //knowledge_mode()
    //sumup_mode()
    $("#content > div").hide(); //先隱藏所有內容

    $("#Index_view").show(); //顯示歡迎頁面
    //hint_mode();
});

function knowledge_mode() //知識閱讀模式
{
    $("#content > div").hide();
    $("#knowledge_view").show()
    next_knowledge(); //開始出題
}

function ans(answer) //回答答案
{
    if (answer == answer_db[current_question_id]) //答對
    {
        scores = scores + 5; //增加積分
        agent_say("棒棒喲!!!!(y)");
    } else {
        agent_say("答錯了唷>_<");

    }
    window.setTimeout(next_question, 2000) //agent講話兩秒後換下一題


}

function sumup_mode() //總結模式
{
    $("#scores").html(scores) //顯示分數
    $("#knowledge_view").hide()
    $("#question_view").hide()
    $("#sumup_view").show();
}

function next_question() // 出題
{

    //agent_mute();
    if (sum_question == 5) //做五題進入總結模式
    {
        sumup_mode();
        return;
    }

    var nextq = current_question_id + 1; //題目id

    $('#timer_q').countdown('destroy'); //設定倒數計時器

    $('#timer_q').countdown({
        until: "+15s",
        format: 'S',
        layout: '{sn}',
        onExpiry: timer_q_stop
    }); //設定倒數計時器

    $("#question").html(question_db[nextq]);
    current_question_id = nextq;

    sum_question++;



}

function countdown_stop() //時間到
{
    console.log("TIME UP")
    agent_say("時間到!");
    window.setTimeout(next, 2000)

}

function timer_q_stop() {
    console.log("q_TIME UP")

    agent_say("要快點啦!");
    window.setTimeout(next_question, 3000)
}

function question_mode() //出題模式
{
    if (is_hinted == 0) {  //如果沒有提示過，就有提示的額度

        $(".agent").click(function () {  
            //開啟提示功能的滑鼠觸發
            console.log("hint")
            hint_mode();
            is_hinted = 1 //只提示一次 
        })
    }
    $("#knowledge_view").hide()
    $("#question_view").show()
    $("#sumup_view").hide();
    next_question()


}

function close_hint_mode() { //關閉agent提示
    $("#content > div").hide();
    $("#question_view").show();
    $('.agent').popover('destroy') 
}

function hint_mode() {  //agent提示模式

    $("#content > div").hide();
    $("#hint_view").show();


    $('.agent').popover('destroy')

    var texts = new Array(); //Agent簡單的對話
    texts[0] = "應該是Yes吧!!<br>No好像也可以~"
    texts[1] = "不要告訴你勒~<br>打我啊~~"
    texts[2] = "其實我只是時薪109的工讀生<br>不能要求我什麼都會吧"

    var id = Math.floor((Math.random() * 2) + 1); //亂數

    $('.agent').popover({   //畫出提示
        content: texts[id],
        placement: 'top',
        trigger: 'manual',
        html: "true"
    }).popover('show')



}

function next_knowledge(evaluate) //下一個知識
{
    sum_knowledge++;
    if (sum_knowledge == 5) { //知識看完了5則
        question_mode(); //進入測驗模式
        $('#timer_view').countdown('destroy');
        return;
    }
    //var nextq= Math.floor((Math.random()*5)+1);;
    var nextq = sum_knowledge
    $("#knowledge").html(knowledge_db[nextq]);

    $('#timer_view').countdown('destroy');    //先砍掉之前的倒數計時器

    $('#timer_view').countdown({   //倒數計時器
        until: "+45s",
        format: 'S',
        layout: '{sn}',
        onExpiry: countdown_stop
    });

    //agent_mute()
}

function agent_say(text) {  //agent無聊說話
    console.log(text)
    $('.agent').popover('destroy')

    $('.agent').popover({
        content: text,
        placement: 'left',
        trigger: 'manual'
    }).popover('show')
    setTimeout(function () {
        $('.agent').popover('hide');
    }, 2000);
}

function agent_mute() { //agent閉嘴
    $('.agent').popover('hide');
}


function selectAgent(agent) {  //選擇agent
    $('.agent').attr("src", "agent/Agent-" + agent + ".jpg")
    knowledge_mode();  
}

function selectAgent_mode() {
    $("#content > div").hide();
    $("#AgentSelect_view").show();
}


var knowledge_db = new Array();


knowledge_db[0] = "          <h4>羽衣甘藍(KALE)</h4>          羽衣甘藍(KALE)-蔬菜國王 黃綠色蔬菜之王 萬能蔬菜羽衣甘藍的療效作用：保護胃粘膜、預防癌症、動脈硬化、高血壓、胃潰瘍、十二指腸潰瘍、血栓、美肌美膚等作用。甘藍菜維他命Ｃ的含量超過任何蔬菜、有預防癌症、感冒、降低膽固醇、美肌美膚的作用。";


knowledge_db[1] = "<h4>解構主義建築</h4>解構主義建築是一個從1980年代晚期開始的後現代建築思潮。它的特點是把整體破碎化（解構）。主要想法是對外觀的處理，通過非線性或非歐幾里得幾何的設計，來形成建築元素之間關係的變形與移位，譬如樓層和牆壁，或者結構和外廓。[1]大廈完成後的視覺外觀產生的各種解構「樣式」以刺激性的不可預測性和可控的混亂為特徵。一些解構主義的建築師受到法國哲學家德希達（Jacques Derrida）的文字和他解構想法的影響。雖然這個影響的程度仍然受到懷疑，而其他人則被重申的俄國構成主義運動中的幾何學不平衡想法所影響。";

knowledge_db[2] = "<h4>雲門(Cloud Gate)</h4>雲門(Cloud Gate)，因其外形又被俗稱為「豆莢」）是一件由英國藝術家阿尼什·卡普爾所設計的公共藝術塑像作品，位於美國伊利諾州芝加哥盧普區千禧公園的AT&T廣場內，大通長廊（Chase Promenade）與麥考密克中心論壇廣場與溜冰場（McCormick Tribune Plaza & Ice Rink）之間，建造於2004年6月至2006年5月。這一作品長20米，寬13米，高10米，拱底最高處距地面約4米，重100噸。雲門雖由168塊不鏽鋼板接焊而成，但其表面非常光滑，遊客可以在其上看到被反射和扭曲的城市輪廓，但完全觀察不到接縫。此外，塑像的底部為會歪曲和重疊影像的凹形空間，被稱為「omphalos」（希臘語意為「中央」）。";


knowledge_db[3] = "<h4>貝爾格勒</h4>貝爾格勒（塞爾維亞語：Београд）是塞爾維亞首都和最大的城市，位於塞爾維亞北部薩瓦河和多瑙河匯合處，此處也是潘諾尼亞平原和巴爾幹半島的相遇處。根據塞爾維亞人口統計，貝爾格勒共有人口1,576,124（2002年）[1]，是原南斯拉夫地區最大的城市，也是僅次於伊斯坦堡、雅典和布加勒斯特的巴爾幹半島第四大城市。貝爾格勒地區最早的人類居住出現在公元前4800年溫查文明時期。如今的城市位置由凱爾特人於公元前3世紀確定，後被羅馬帝國佔領[2][3]。城市的斯拉夫語名字Beligrad（字面意思為「白城」）第一次被提及是在878年。1284年，貝爾格勒第一次成為塞爾維亞斯雷姆王國的首都。此後，它還先後成為塞爾維亞（1404年-1918年、2006年-）、南斯拉夫（1918年-2003年）首都以及塞爾維亞與蒙特內哥羅的行政、立法首都（2003年-2006年）[4]。"

knowledge_db[4] = "<h4>羅馬（義大利語：Roma）</h4>為義大利首都，也是國家政治、經濟、文化和交通中心，世界著名的歷史文化名城，古羅馬帝國的發祥地，因建城歷史悠久而被暱稱為「永恆之城」[1][2]。其位於義大利半島中西部，台伯河下游平原地的七座小山丘上，市中心面積有1200多平方公里。羅馬是全世界天主教會的中心，有700多座教堂與修道院，7所天主教大學，市內的梵蒂岡是天主教教宗和教廷的駐地。羅馬與佛羅倫斯同為義大利文藝復興中心[3]，現今仍保存有相當豐富的文藝復興與巴洛克風貌；1980年，羅馬的歷史城區被列為世界文化遺產[4]。"

knowledge_db[5] = "<h4>拿坡里</h4>拿坡里（又譯那波利、那不勒斯；義大利語：Napoli；拿坡里語：Nàpule；英語：Naples）是義大利南部的第一大城市，坎帕尼亞大區以及拿坡里省的首府。城市面積117平方公里，人口略低於100萬。拿坡里都會區有大約380萬人人口，是僅次於米蘭和羅馬的義大利第三大都會區[2]和歐洲第15大都會區[2]。拿坡里地區也是義大利人口最稠密的地方。拿坡里位於拿坡里灣的北岸，其東西兩側分別是兩個火山區域：維蘇威火山和坎皮佛萊格瑞火山區。因此，該市自古至今不斷受到火山活動和地震的威脅。拿坡里始於前600年 [3]，以其豐富的歷史、文化、藝術和美食而著稱，拿坡里歷史中心被聯合國教科文組織列為世界文化遺產。比薩餅起源於拿坡里。音樂是拿坡里文化中產生了廣泛影響的的一個重要組成部分，包括發明了浪漫吉他和曼陀林，以及對歌劇和拿波里民謠的重大貢獻。在其存在的2500餘年歷史中，大部分時間都扮演著重要角色。該市為古希臘人所創建，在「大希臘」中扮演重要角色；後來，羅馬人、諾曼人和西班牙人都在該市留下了自己的印記，也曾經是波旁王朝統治的兩西西里王國的首都，直到義大利統一。今天，拿坡里仍是繁榮的地中海港口和商業城市，高速鐵路和地鐵網伴隨著都會區的擴張。另一方面，黑手黨組織克莫拉繼續困擾著居民的生活，妨礙經濟與社會的發展。"

knowledge_db[6] = "          <h4>筆記型電腦的規格</h4>          <p>通常現在筆記型電腦的速度都很快了，在沒有特殊使用需求(如打3D華麗遊戲、快速千萬筆資料處理)的狀況買筆電應多考慮售後服務、重量、外型、價格等其他因素，而不必為了看懂規格反而被商家騙得團團轉，反而沒選到自己想要的機型</p>";


var question_db = new Array();
question_db[0] = "蘇老師的KALB要收'吃苦耐勞，欲有所學'的學生是因為該實驗室無限量提供羽衣甘藍，讓學生預防癌症、動脈硬化、高血壓、胃潰瘍";

question_db[1] = "解構主義的主要想法是對外觀的處理，通過非線性或非歐幾里得幾何的設計，來形成建築元素之間關係的變形與移位，譬如樓層和牆壁，或者結構和外廓。"
question_db[2] = "雲門(Cloud Gate)是一個台灣聞名世界的表演藝術團體"
question_db[3] = "貝爾格勒的人口在巴爾幹半島大概排第六名"
question_db[4] = "羅馬是文藝復興的重要據點"
question_db[5] = "拿坡里是義大利首都，所以拿坡里不必擔心有火山";
question_db[6] = "對於運算需求不高的普通使用者，現在選購筆電還需要以規格為第一考量嗎?";

var answer_db = new Array();
answer_db[0] = "1"
answer_db[1] = "1"
answer_db[2] = "0"
answer_db[3] = "0"
answer_db[4] = "1"
answer_db[5] = "0"
answer_db[0] = "0"