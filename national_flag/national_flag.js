"use strict";

const NUM_AREA = 6; // 地域数
const ASIA = 0;
const EUROPE = 1;
const NORTH_AMERICA = 2;
const SOUTH_AMERICA = 3;
const AFRICA = 4;
const OCEANIA = 5;

// name: ファイル名はname.imgとする。ボタンにもこの名前が表示される。
// finderから国名をコピペしているが、おそらく文字コードの違いがありバグ
// となるので、initで正規化している。
// '='は使えないので注意
const flags = [
    { name: "UAE", area: ASIA },
    { name: "アイスランド", area: EUROPE },
    { name: "アイルランド", area: EUROPE },
    { name: "アゼルバイジャン", area: ASIA },
    { name: "アフガニスタン", area: ASIA },
    { name: "アメリカ", area: NORTH_AMERICA },
    { name: "アルジェリア", area: AFRICA },
    { name: "アルゼンチン", area: SOUTH_AMERICA },
    { name: "アルバニア", area: EUROPE },
    { name: "アルメニア", area: ASIA },
    { name: "アンゴラ", area: AFRICA },
    { name: "アンティグア・バーブーダ", area: NORTH_AMERICA },
    { name: "アンドラ", area: EUROPE },
    { name: "イエメン", area: ASIA },
    { name: "イギリス", area: EUROPE },
    { name: "イスラエル", area: ASIA },
    { name: "イタリア", area: EUROPE },
    { name: "イラク", area: ASIA },
    { name: "イラン", area: ASIA },
    { name: "インド", area: ASIA },
    { name: "インドネシア", area: ASIA },
    { name: "ウガンダ", area: AFRICA },
    { name: "ウクライナ", area: EUROPE },
    { name: "ウズベキスタン", area: ASIA },
    { name: "ウルグアイ", area: NORTH_AMERICA },
    { name: "エクアドル", area: NORTH_AMERICA },
    { name: "エジプト", area: AFRICA },
    { name: "エストニア", area: EUROPE },
    { name: "エスワティニ", area: AFRICA },
    { name: "エチオピア", area: AFRICA },
    { name: "エリトリア", area: AFRICA },
    { name: "エルサルバドル", area: NORTH_AMERICA },
    { name: "オーストラリア", area: OCEANIA },
    { name: "オーストリア", area: EUROPE },
    { name: "オマーン", area: ASIA },
    { name: "オランダ", area: EUROPE },
    { name: "ガーナ", area: AFRICA },
    { name: "カーボベルデ", area: AFRICA },
    { name: "ガイアナ", area: NORTH_AMERICA },
    { name: "カザフスタン", area: ASIA },
    { name: "カタール", area: ASIA },
    { name: "カナダ", area: NORTH_AMERICA },
    { name: "ガボン", area: AFRICA },
    { name: "カメルーン", area: AFRICA },
    { name: "ガンビア", area: AFRICA },
    { name: "カンボジア", area: ASIA },
    { name: "ギニア", area: AFRICA },
    { name: "ギニアビサウ", area: AFRICA },
    { name: "キプロス", area: EUROPE },
    { name: "キューバ", area: NORTH_AMERICA },
    { name: "ギリシャ", area: EUROPE },
    { name: "キリバス", area: OCEANIA },
    { name: "キルギス", area: ASIA },
    { name: "グアテマラ", area: NORTH_AMERICA },
    { name: "クウェート", area: ASIA },
    { name: "クック諸島", area: OCEANIA },
    { name: "グレナダ", area: NORTH_AMERICA },
    { name: "クロアチア", area: EUROPE },
    { name: "ケニア", area: AFRICA },
    { name: "コートジボワール", area: AFRICA },
    { name: "コスタリカ", area: NORTH_AMERICA },
    { name: "コソボ", area: EUROPE },
    { name: "コモロ", area: AFRICA },
    { name: "コロンビア", area: SOUTH_AMERICA },
    { name: "コンゴ共和国", area: AFRICA },
    { name: "コンゴ民主共和国", area: AFRICA },
    { name: "サウジアラビア", area: ASIA },
    { name: "サモア", area: OCEANIA },
    { name: "サントメ・プリンシペ", area: AFRICA },
    { name: "ザンビア", area: AFRICA },
    { name: "サンマリノ", area: EUROPE },
    { name: "シエラレオネ", area: AFRICA },
    { name: "ジブチ", area: AFRICA },
    { name: "ジャマイカ", area: NORTH_AMERICA },
    { name: "ジョージア", area: EUROPE },
    { name: "シリア", area: ASIA },
    { name: "シンガポール", area: ASIA },
    { name: "ジンバブエ", area: AFRICA },
    { name: "スイス", area: EUROPE },
    { name: "スウェーデン", area: EUROPE },
    { name: "スーダン", area: AFRICA },
    { name: "スペイン", area: EUROPE },
    { name: "スリナム", area: SOUTH_AMERICA },
    { name: "スリランカ", area: ASIA },
    { name: "スロバキア", area: EUROPE },
    { name: "スロベニア", area: EUROPE },
    { name: "セーシェル", area: AFRICA },
    { name: "セネガル", area: AFRICA },
    { name: "セルビア", area: EUROPE },
    { name: "セントクリストファー・ネービス", area: NORTH_AMERICA },
    { name: "セントビンセント", area: NORTH_AMERICA },
    { name: "セントルシア", area: NORTH_AMERICA },
    { name: "ソマリア", area: AFRICA },
    { name: "ソロモン諸島", area: OCEANIA },
    { name: "タイ", area: ASIA },
    { name: "タジキスタン", area: ASIA },
    { name: "タンザニア", area: AFRICA },
    { name: "チェコ", area: EUROPE },
    { name: "チャド", area: AFRICA },
    { name: "チュニジア", area: AFRICA },
    { name: "チリ", area: SOUTH_AMERICA },
    { name: "ツバル", area: OCEANIA },
    { name: "デンマーク", area: EUROPE },
    { name: "ドイツ", area: EUROPE },
    { name: "トーゴ", area: AFRICA },
    { name: "ドミニカ共和国", area: NORTH_AMERICA },
    { name: "ドミニカ国", area: NORTH_AMERICA },
    { name: "トリニダード・トバゴ", area: NORTH_AMERICA },
    { name: "トルクメニスタン", area: ASIA },
    { name: "トルコ", area: ASIA },
    { name: "トンガ", area: OCEANIA },
    { name: "ナイジェリア", area: AFRICA },
    { name: "ナウル", area: OCEANIA },
    { name: "ナミビア", area: AFRICA },
    { name: "ニウエ", area: OCEANIA },
    { name: "ニカラグア", area: NORTH_AMERICA },
    { name: "ニジェール", area: AFRICA },
    { name: "ニュージーランド", area: OCEANIA },
    { name: "ネパール", area: ASIA },
    { name: "ノルウェー", area: EUROPE },
    { name: "バーレーン", area: ASIA },
    { name: "ハイチ", area: NORTH_AMERICA },
    { name: "パキスタン", area: ASIA },
    { name: "バチカン市国", area: EUROPE },
    { name: "パナマ", area: NORTH_AMERICA },
    { name: "バヌアツ", area: OCEANIA },
    { name: "バハマ", area: NORTH_AMERICA },
    { name: "パプアニューギニア", area: OCEANIA },
    { name: "パラオ", area: OCEANIA },
    { name: "パラグアイ", area: SOUTH_AMERICA },
    { name: "バルバドス", area: NORTH_AMERICA },
    { name: "ハンガリー", area: EUROPE },
    { name: "バングラデシュ", area: ASIA },
    { name: "フィジー", area: OCEANIA },
    { name: "フィリピン", area: ASIA },
    { name: "フィンランド", area: EUROPE },
    { name: "ブータン", area: ASIA },
    { name: "ブラジル", area: SOUTH_AMERICA },
    { name: "フランス", area: EUROPE },
    { name: "ブルガリア", area: EUROPE },
    { name: "ブルキナファソ", area: AFRICA },
    { name: "ブルネイ", area: ASIA },
    { name: "ブルンジ", area: AFRICA },
    { name: "ベトナム", area: ASIA },
    { name: "ベナン", area: AFRICA },
    { name: "ベネズエラ", area: SOUTH_AMERICA },
    { name: "ベラルーシ", area: EUROPE },
    { name: "ベリーズ", area: NORTH_AMERICA },
    { name: "ペルー", area: SOUTH_AMERICA },
    { name: "ベルギー", area: EUROPE },
    { name: "ポーランド", area: EUROPE },
    { name: "ボスニア・ヘルツェゴビナ", area: EUROPE },
    { name: "ボツワナ", area: AFRICA },
    { name: "ボリビア", area: SOUTH_AMERICA },
    { name: "ポルトガル", area: EUROPE },
    { name: "ホンジュラス", area: NORTH_AMERICA },
    { name: "マーシャル諸島", area: OCEANIA },
    { name: "マダガスカル", area: AFRICA },
    { name: "マラウイ", area: AFRICA },
    { name: "マリ", area: AFRICA },
    { name: "マルタ", area: EUROPE },
    { name: "マレーシア", area: ASIA },
    { name: "ミクロネシア", area: OCEANIA },
    { name: "ミャンマー", area: ASIA },
    { name: "メキシコ", area: SOUTH_AMERICA },
    { name: "モーリシャス", area: AFRICA },
    { name: "モーリタニア", area: AFRICA },
    { name: "モザンビーク", area: AFRICA },
    { name: "モナコ", area: EUROPE },
    { name: "モルディブ", area: ASIA },
    { name: "モルドバ", area: EUROPE },
    { name: "モロッコ", area: AFRICA },
    { name: "モンゴル", area: ASIA },
    { name: "モンテネグロ", area: EUROPE },
    { name: "ヨルダン", area: ASIA },
    { name: "ラオス", area: ASIA },
    { name: "ラトビア", area: EUROPE },
    { name: "リトアニア", area: EUROPE },
    { name: "リビア", area: AFRICA },
    { name: "リヒテンシュタイン", area: AFRICA },
    { name: "リベリア", area: AFRICA },
    { name: "ルーマニア", area: EUROPE },
    { name: "ルクセンブルク", area: EUROPE },
    { name: "ルワンダ", area: AFRICA },
    { name: "レソト", area: AFRICA },
    { name: "レバノン", area: ASIA },
    { name: "ロシア", area: EUROPE },
    { name: "韓国", area: ASIA },
    { name: "赤道ギニア", area: AFRICA },
    { name: "中央アフリカ", area: AFRICA },
    { name: "中国", area: ASIA },
    { name: "東ティモール", area: ASIA },
    { name: "南アフリカ", area: AFRICA },
    { name: "南スーダン", area: AFRICA },
    { name: "日本", area: ASIA },
    { name: "北マケドニア", area: EUROPE },
    { name: "北朝鮮", area: ASIA }
];



let ele_buttons = null;
let ele_check_areas = null;
//let ele_check_sound = null;
//let ele_sound = null;
//let ele_correct_sound = null;
//let ele_wrong_sound = null;
let ele_wrong_text = null;
let ele_question_flag = null;
let ele_question_name = null;
let ele_modes = null;
let allcheckButton = null;
let toggleBtn = null;
let clearButton = null;
let giveupButton = null;
let ele_giveup_second = null;
let ele_best_time = null;
let bestTime = null; // 最高記録。無いときはnull
let numCorrect = 0; // 正解数
let currentQuestion = 0; // 現在の問題番号
let questions = [];

const GIVEUP_PENALTY_TIME = 10000; // 10秒

const START_CAPTION = "スタート";
const STOP_CAPTION = "中止";

const MODE_FLAG = 0; // 国旗→名前
const MODE_NAME = 1; // 名前→国旗

const SETTINGS_KEY_NAME = 'national_flag_settings';

// ローカルストレージ用keyname
function getBestTimeKeyName() {
    let asia = ele_check_areas[ASIA].checked ? 1 : 0;
    let europe = ele_check_areas[EUROPE].checked ? 1 : 0;
    let north_america = ele_check_areas[NORTH_AMERICA].checked ? 1 : 0;
    let south_america = ele_check_areas[SOUTH_AMERICA].checked ? 1 : 0;
    let africa = ele_check_areas[AFRICA].checked ? 1 : 0;
    let oceania = ele_check_areas[OCEANIA].checked ? 1 : 0;
    let mode_flag = ele_modes[MODE_FLAG].checked ? 1 : 0;
    let mode_name = ele_modes[MODE_NAME].checked ? 1 : 0;
    return `flag_best_${asia}_${europe}_${north_america}_${south_america}_${africa}_${oceania}_${mode_flag}_${mode_name}`;
}

// 設定をローカルストレージに保存
function saveSettings() {
    let asia = ele_check_areas[ASIA].checked ? 1 : 0;
    let europe = ele_check_areas[EUROPE].checked ? 1 : 0;
    let north_america = ele_check_areas[NORTH_AMERICA].checked ? 1 : 0;
    let south_america = ele_check_areas[SOUTH_AMERICA].checked ? 1 : 0;
    let africa = ele_check_areas[AFRICA].checked ? 1 : 0;
    let oceania = ele_check_areas[OCEANIA].checked ? 1 : 0;
    // let sound = ele_check_sound.checked ? 1 : 0;
    // let mode_flag = ele_modes[MODE_FLAG].checked ? 1 : 0;
    // let mode_name = ele_modes[MODE_NAME].checked ? 1 : 0;
    localStorage.setItem(SETTINGS_KEY_NAME, `${asia}_${europe}_${north_america}_${south_america}_${africa}_${oceania}`);
    //localStorage.setItem(SETTINGS_KEY_NAME, `${asia}_${europe}_${north_america}_${south_america}_${africa}_${oceania}_${sound}_${mode_flag}_${mode_name}`);
}

// 設定をローカルストレージから読み出し
function loadSettings() {
    let strSetting = localStorage.getItem(SETTINGS_KEY_NAME);
    if (null != strSetting) {
        const settings = strSetting.match(/\d+/g);
        ele_check_areas[ASIA].checked = settings[0] == '1' ? true : false;
        ele_check_areas[EUROPE].checked = settings[1] == '1' ? true : false;
        ele_check_areas[NORTH_AMERICA].checked = settings[2] == '1' ? true : false;
        ele_check_areas[SOUTH_AMERICA].checked = settings[3] == '1' ? true : false;
        ele_check_areas[AFRICA].checked = settings[4] == '1' ? true : false;
        ele_check_areas[OCEANIA].checked = settings[5] == '1' ? true : false;
        //ele_check_sound.checked = settings[6] == '1' ? true : false;
        //ele_modes[MODE_FLAG].checked = settings[7] == '1' ? true : false;
        //ele_modes[MODE_NAME].checked = settings[8] == '1' ? true : false;
    }
}

// 配列シャッフル
Array.prototype.shuffle = function () {
    let i = this.length;
    while (i) {
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

// 初期化
function init() {
    ele_buttons = document.getElementById("buttons");
    ele_check_areas = document.getElementsByName("area");
    //ele_check_sound = document.getElementById("sound");
    //ele_sound = document.getElementById("sound");
    //ele_correct_sound = document.getElementById('correct_sound');
    //ele_wrong_sound = document.getElementById('wrong_sound');
    ele_wrong_text = document.querySelector('.wrong_text');
    ele_question_flag = document.getElementById("question_flag");
    ele_question_name = document.getElementById("question_name");
    ele_best_time = document.getElementById("best_time");
    ele_modes = document.getElementsByName("mode");
    allcheckButton = document.querySelector('.allcheck_button');
    toggleBtn = document.querySelector('.toggle_button');
    clearButton = document.querySelector('.clear_best_button');
    giveupButton = document.getElementById("giveup_button");
    ele_giveup_second = document.querySelector('.giveup_second');

    // 濁点カタカナの文字コードに不備が出るので統一して正規化しておく。
    for (let i = 0; i < flags.length; i++) {
        flags[i].name = flags[i].name.normalize('NFKC');
    }

    loadSettings(); // 設定を読み出しておく

    resetAnswers();

    toggleBtn.value = START_CAPTION;

    setButtonsState(false);

    // 地域チェックボックスイベントハンドラ
    for (let area = 0; area < NUM_AREA; area++) {
        ele_check_areas[area].addEventListener('change', (e) => {
            resetAnswers();
            saveSettings(); // 設定を保存
            setButtonsState(false);
        });
    }

    // モードラジオボックスイベントハンドラ
    for (let i = 0; i < 2; i++) {
        ele_modes[i].addEventListener('change', (e) => {
            resetAnswers();
            saveSettings(); // 設定を保存
            setButtonsState(false);
        });
    }

    /*
    // 音チェックボックスイベントハンドラ
    ele_check_sound.addEventListener('change', (e) => {
        saveSettings(); // 設定を保存
    });
    */
}

// 回答ボタンをセット
function resetAnswers() {

    // 子要素全削除
    while (ele_buttons.firstChild) {
        ele_buttons.removeChild(ele_buttons.firstChild);
    }

    // 地域ごとにボタンを並べる
    for (let area = 0; area < NUM_AREA; area++) {
        if (ele_check_areas[area].checked) {
            for (let i = 0; i < flags.length; i++) {
                if (area == flags[i].area) {
                    let ele = null;
                    ele = document.createElement("input");
                    if (ele_modes[MODE_FLAG].checked) {
                        ele.type = "button";
                        ele.className = "country_button";
                        ele.value = flags[i].name;
                        setElementColor(ele, area, false);
                    } else {
                        ele.type = "image";
                        ele.className = "answer_flag";
                        ele.src = encodeURI(`./img/${flags[i].name}.png`);
                        setElementColor(ele, area, true);
                    }
                    ele.country = flags[i].name;
                    if (window.ontouchstart === undefined) {
                        ele.onclick = onAnswer; // クリック時
                    } else {
                        ele.ontouchstart = onAnswer; // タップ時
                    }
                    ele_buttons.appendChild(ele);
                }
            }
        }
    }

    updateBestTime();
}

// カラーをセット
function setElementColor(ele, area, isImg) {
    if (isImg) {
        if (area == ASIA) {
            ele.style.border = "5px solid brown";
        } else if (area == EUROPE) {
            ele.style.border = "5px solid cornflowerblue";
        } else if (area == NORTH_AMERICA) {
            ele.style.border = "5px solid orangered";
        } else if (area == SOUTH_AMERICA) {
            ele.style.border = "5px solid darkolivegreen";
        } else if (area == AFRICA) {
            ele.style.border = "5px solid chocolate";
        } else { // OCEANIA
            ele.style.border = "5px solid darkblue";
        }
    } else {
        if (area == ASIA) {
            ele.style.color = 'brown';
        } else if (area == EUROPE) {
            ele.style.color = 'cornflowerblue';
        } else if (area == NORTH_AMERICA) {
            ele.style.color = 'orangered';
        } else if (area == SOUTH_AMERICA) {
            ele.style.color = 'darkolivegreen';
        } else if (area == AFRICA) {
            ele.style.color = 'chocolate';
        } else { // OCEANIA
            ele.style.color = 'darkblue';
        }
    }
}

function updateBestTime() {
    // 最高記録表示
    bestTime = localStorage.getItem(getBestTimeKeyName());
    if (null != bestTime) {
        ele_best_time.textContent = timeToTextContent(bestTime);
    } else {
        ele_best_time.textContent = "0";
    }

    // 現在記録リセット
    document.getElementById("record").textContent = "0";
}

function setButtonPushed(ele) {
    if (ele_modes[MODE_FLAG].checked) {
        // ボタン
        ele.style.opacity = "0"; // その場にありながら透明（消す）
    } else {
        // イメージ
        ele.src = "./dummy_flag.png";
        ele.style.border = "5px solid white";

    }
    ele.disabled = true;
}

// 問題を準備
function prepareQuestions() {

    questions.length = 0; //配列を空にする
    currentQuestion = 0;
    numCorrect = 0;

    for (let i = 0; i < flags.length; i++) {
        if (ele_check_areas[flags[i].area].checked) {
            // for Debug 短く試すとき用
            // if (flags[i].name != "モンゴル" && flags[i].name != "イラン") {             
            //if (flags[i].name != "モンゴル") { 
            //    continue;
            //} else {
            //    console.log(flags[i].name);
            //}

            questions.push(flags[i]);
        }
    }
    // 配列をシャッフル
    questions.shuffle();

    // 最初の問題
    showNextQuestion();
}

function showNextQuestion() {
    if (ele_modes[MODE_FLAG].checked) {
        ele_question_flag.src = encodeURI(`./img/${questions[currentQuestion].name}.png`);
        ele_question_name.textContent = "";
    } else {
        ele_question_flag.src = "";
        ele_question_name.textContent = questions[currentQuestion].name;
    }
    ele_question_name.style.color = 'black';
}

////////////////////
//++開始・終了関連
//

// スタート
function gameStart() {
    prepareQuestions();
    resetRecord(); // 必要
    startRecord();
    setButtonsState(true);
}

// 中断
function gameStop() {
    resetRecord();
    setButtonsState(false);
    ele_wrong_text.textContent = "";
}

// 終了
function gameEnd() {

    if ((null == bestTime) || (bestTime > elapsedTime)) {
        // 記録更新
        bestTime = elapsedTime;
        localStorage.setItem(getBestTimeKeyName(), bestTime.toString());
        window.alert("新記録達成！");
        updateBestTime();
    }

    stopRecord();

    setButtonsState(false);

    toggleBtn.value = START_CAPTION;
    ele_wrong_text.textContent = "";
}
//
//++開始・終了関連
////////////////////

////////////////////
//++ボタン
//
// 各ボタンの有効・無効状態の設定
function setButtonsState(isStart) {
    // すべてチェックボタン
    allcheckButton.disabled = isStart ? true : false;

    // 地域チェックボックス
    for (let area = 0; area < NUM_AREA; area++) {
        ele_check_areas[area].disabled = isStart ? true : false;
    }

    // モードラジオボックス
    for (let i = 0; i < ele_modes.length; i++) {
        ele_modes[i].disabled = isStart ? true : false;
    }

    // 記録クリアボタン
    clearButton.disabled = isStart ? true : false;

    // 答えを見るボタン
    giveupButton.disabled = isStart ? false : true;
    giveupButton.style.display = isStart ? 'block' : 'none';
    ele_giveup_second.style.display = isStart ? 'block' : 'none';

    // 問題
    if (!isStart) {
        ele_question_flag.src = "";
        ele_question_name.textContent = "";
    }

    // 国名ボタン
    let buttons = ele_buttons.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = isStart ? false : true;
        // ボタンが凹んでいる状態
        buttons[i].style.opacity = isStart ? "" : "0.5";

        if (window.ontouchstart === undefined) {
            buttons[i].onclick = isStart ? onAnswer : null; // クリック時
        } else {
            buttons[i].ontouchstart = isStart ? onAnswer : null; // タップ時
        }

    }
}

// (地域)すべてチェックボタン
function onAllAreaButton() {
    for (let area = 0; area < NUM_AREA; area++) {
        ele_check_areas[area].checked = true;
    }
    resetAnswers();
    setButtonsState(false);
    saveSettings(); // 設定を保存
}

// スタート or 中止ボタン
function onToggleButton() {
    if (toggleBtn.value === START_CAPTION) {
        let noCheckd = true;
        for (let area = 0; area < NUM_AREA; area++) {
            if (ele_check_areas[area].checked) {
                // どれか一つでも地域にチェックが入っていれば開始
                noCheckd = false;
                break;
            }
        }

        if (noCheckd) {
            window.alert("一つ以上の地域にチェックを入れてください");
        } else {
            gameStart();
            toggleBtn.value = STOP_CAPTION;
        }
    } else { // 中止
        gameStop();
        toggleBtn.value = START_CAPTION;
    }
}

// 記録クリアボタン
function onClearBestTimeButton() {
    if (window.confirm("最高記録を消しても良いですか？")) {
        localStorage.removeItem(getBestTimeKeyName());
        resetRecord();
        resetAnswers();
    }
}

// 回答クリックまたはタップ時
function onAnswer(e) {
    //    console.log("onAnswer");
    let answer = e.target;

    if (answer.country == questions[currentQuestion].name) {
        // 正解
        // correctSound();
        setButtonPushed(answer);
        currentQuestion += 1;
        if (currentQuestion == questions.length) {
            // 全問終了
            gameEnd();
        } else {
            showNextQuestion();
        }
    } else {
        // 不正解
        // wrongSound();
        ele_wrong_text.textContent = "☓";
    }
}

// 答えを見るボタン
function onGiveupButton() {
    if (ele_modes[MODE_FLAG].checked) {
        ele_question_name.textContent = questions[currentQuestion].name;
    } else {
        ele_question_flag.src = encodeURI(`./img/${questions[currentQuestion].name}.png`);
    }
    setElementColor(ele_question_name, questions[currentQuestion].area, false);
    ele_wrong_text.textContent = "";
    penaltyTime += GIVEUP_PENALTY_TIME;
}

//
//--ボタン
////////////////////

////////////////////
//++効果音
//
/*
function correctSound() {
    if (ele_sound.checked) {
        ele_correct_sound.currentTime = 0;
        ele_correct_sound.play();
    }
}

function wrongSound() {
    if (ele_check_sound.checked) {
        ele_wrong_sound.currentTime = 0;
        ele_wrong_sound.play();
    }
}
*/
//
//--効果音
////////////////////

////////////////////
//++Record関連
//
let startTime;
let elapsedTime = 0;
let penaltyTime = 0;
let intervalTimer = NaN;

function startRecord() {
    startTime = Date.now() - elapsedTime;
    timerStart()
}

function resetRecord() {
    clearInterval(intervalTimer);
    elapsedTime = 0;
    penaltyTime = 0;
    document.getElementById("record").textContent = "0";
}

function stopRecord() {
    clearInterval(intervalTimer);
}

function timerStart() {
    intervalTimer = setInterval(function () {
        elapsedTime = Date.now() - startTime + penaltyTime;
        document.getElementById("record").textContent = timeToTextContent(elapsedTime);
    }, 100); // 秒
//    }, 100); // 10分の1秒
}

function timeToTextContent(time) {
    let seconds = Math.floor(time / 1000);
    // 秒に変換
    return `${seconds}`;
    // 0.0の形式の文字列に変換
    //let tenth_of_a_second = Math.floor((time % 1000) / 100);
    //return `${seconds}.${tenth_of_a_second}`;
}

//
//--Record関連
////////////////////

