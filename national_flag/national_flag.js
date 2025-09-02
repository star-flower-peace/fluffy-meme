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
    { name: "UAE", area: ASIA, nigate: false },
    { name: "アイスランド", area: EUROPE, nigate: false },
    { name: "アイルランド", area: EUROPE, nigate: false },
    { name: "アゼルバイジャン", area: ASIA, nigate: false },
    { name: "アフガニスタン", area: ASIA, nigate: false },
    { name: "アメリカ", area: NORTH_AMERICA, nigate: false },
    { name: "アルジェリア", area: AFRICA, nigate: false },
    { name: "アルゼンチン", area: SOUTH_AMERICA, nigate: false },
    { name: "アルバニア", area: EUROPE, nigate: false },
    { name: "アルメニア", area: ASIA, nigate: false },
    { name: "アンゴラ", area: AFRICA, nigate: false },
    { name: "アンティグア・バーブーダ", area: NORTH_AMERICA, nigate: false },
    { name: "アンドラ", area: EUROPE, nigate: false },
    { name: "イエメン", area: ASIA, nigate: false },
    { name: "イギリス", area: EUROPE, nigate: false },
    { name: "イスラエル", area: ASIA, nigate: false },
    { name: "イタリア", area: EUROPE, nigate: false },
    { name: "イラク", area: ASIA, nigate: false },
    { name: "イラン", area: ASIA, nigate: false },
    { name: "インド", area: ASIA, nigate: false },
    { name: "インドネシア", area: ASIA, nigate: false },
    { name: "ウガンダ", area: AFRICA, nigate: false },
    { name: "ウクライナ", area: EUROPE, nigate: false },
    { name: "ウズベキスタン", area: ASIA, nigate: false },
    { name: "ウルグアイ", area: SOUTH_AMERICA, nigate: false },
    { name: "エクアドル", area: SOUTH_AMERICA, nigate: false },
    { name: "エジプト", area: AFRICA, nigate: false },
    { name: "エストニア", area: EUROPE, nigate: false },
    { name: "エスワティニ", area: AFRICA, nigate: false },
    { name: "エチオピア", area: AFRICA, nigate: false },
    { name: "エリトリア", area: AFRICA, nigate: false },
    { name: "エルサルバドル", area: NORTH_AMERICA, nigate: false },
    { name: "オーストラリア", area: OCEANIA, nigate: false },
    { name: "オーストリア", area: EUROPE, nigate: false },
    { name: "オマーン", area: ASIA, nigate: false },
    { name: "オランダ", area: EUROPE, nigate: false },
    { name: "ガーナ", area: AFRICA, nigate: false },
    { name: "カーボベルデ", area: AFRICA, nigate: false },
    { name: "ガイアナ", area: NORTH_AMERICA, nigate: false },
    { name: "カザフスタン", area: ASIA, nigate: false },
    { name: "カタール", area: ASIA, nigate: false },
    { name: "カナダ", area: NORTH_AMERICA, nigate: false },
    { name: "ガボン", area: AFRICA, nigate: false },
    { name: "カメルーン", area: AFRICA, nigate: false },
    { name: "ガンビア", area: AFRICA, nigate: false },
    { name: "カンボジア", area: ASIA, nigate: false },
    { name: "ギニア", area: AFRICA, nigate: false },
    { name: "ギニアビサウ", area: AFRICA, nigate: false },
    { name: "キプロス", area: EUROPE, nigate: false },
    { name: "キューバ", area: NORTH_AMERICA, nigate: false },
    { name: "ギリシャ", area: EUROPE, nigate: false },
    { name: "キリバス", area: OCEANIA, nigate: false },
    { name: "キルギス", area: ASIA, nigate: false },
    { name: "グアテマラ", area: NORTH_AMERICA, nigate: false },
    { name: "クウェート", area: ASIA, nigate: false },
    { name: "クック諸島", area: OCEANIA, nigate: false },
    { name: "グレナダ", area: NORTH_AMERICA, nigate: false },
    { name: "クロアチア", area: EUROPE, nigate: false },
    { name: "ケニア", area: AFRICA, nigate: false },
    { name: "コートジボワール", area: AFRICA, nigate: false },
    { name: "コスタリカ", area: NORTH_AMERICA, nigate: false },
    { name: "コソボ", area: EUROPE, nigate: false },
    { name: "コモロ", area: AFRICA, nigate: false },
    { name: "コロンビア", area: SOUTH_AMERICA, nigate: false },
    { name: "コンゴ共和国", area: AFRICA, nigate: false },
    { name: "コンゴ民主共和国", area: AFRICA, nigate: false },
    { name: "サウジアラビア", area: ASIA, nigate: false },
    { name: "サモア", area: OCEANIA, nigate: false },
    { name: "サントメ・プリンシペ", area: AFRICA, nigate: false },
    { name: "ザンビア", area: AFRICA, nigate: false },
    { name: "サンマリノ", area: EUROPE, nigate: false },
    { name: "シエラレオネ", area: AFRICA, nigate: false },
    { name: "ジブチ", area: AFRICA, nigate: false },
    { name: "ジャマイカ", area: NORTH_AMERICA, nigate: false },
    { name: "ジョージア", area: EUROPE, nigate: false },
    { name: "シリア", area: ASIA, nigate: false },
    { name: "シンガポール", area: ASIA, nigate: false },
    { name: "ジンバブエ", area: AFRICA, nigate: false },
    { name: "スイス", area: EUROPE, nigate: false },
    { name: "スウェーデン", area: EUROPE, nigate: false },
    { name: "スーダン", area: AFRICA, nigate: false },
    { name: "スペイン", area: EUROPE, nigate: false },
    { name: "スリナム", area: SOUTH_AMERICA, nigate: false },
    { name: "スリランカ", area: ASIA, nigate: false },
    { name: "スロバキア", area: EUROPE, nigate: false },
    { name: "スロベニア", area: EUROPE, nigate: false },
    { name: "セーシェル", area: AFRICA, nigate: false },
    { name: "セネガル", area: AFRICA, nigate: false },
    { name: "セルビア", area: EUROPE, nigate: false },
    { name: "セントクリストファー・ネービス", area: NORTH_AMERICA, nigate: false },
    { name: "セントビンセント", area: NORTH_AMERICA, nigate: false },
    { name: "セントルシア", area: NORTH_AMERICA, nigate: false },
    { name: "ソマリア", area: AFRICA, nigate: false },
    { name: "ソロモン諸島", area: OCEANIA, nigate: false },
    { name: "タイ", area: ASIA, nigate: false },
    { name: "タジキスタン", area: ASIA, nigate: false },
    { name: "タンザニア", area: AFRICA, nigate: false },
    { name: "チェコ", area: EUROPE, nigate: false },
    { name: "チャド", area: AFRICA, nigate: false },
    { name: "チュニジア", area: AFRICA, nigate: false },
    { name: "チリ", area: SOUTH_AMERICA, nigate: false },
    { name: "ツバル", area: OCEANIA, nigate: false },
    { name: "デンマーク", area: EUROPE, nigate: false },
    { name: "ドイツ", area: EUROPE, nigate: false },
    { name: "トーゴ", area: AFRICA, nigate: false },
    { name: "ドミニカ共和国", area: NORTH_AMERICA, nigate: false },
    { name: "ドミニカ国", area: NORTH_AMERICA, nigate: false },
    { name: "トリニダード・トバゴ", area: NORTH_AMERICA, nigate: false },
    { name: "トルクメニスタン", area: ASIA, nigate: false },
    { name: "トルコ", area: ASIA, nigate: false },
    { name: "トンガ", area: OCEANIA, nigate: false },
    { name: "ナイジェリア", area: AFRICA, nigate: false },
    { name: "ナウル", area: OCEANIA, nigate: false },
    { name: "ナミビア", area: AFRICA, nigate: false },
    { name: "ニウエ", area: OCEANIA, nigate: false },
    { name: "ニカラグア", area: NORTH_AMERICA, nigate: false },
    { name: "ニジェール", area: AFRICA, nigate: false },
    { name: "ニュージーランド", area: OCEANIA, nigate: false },
    { name: "ネパール", area: ASIA, nigate: false },
    { name: "ノルウェー", area: EUROPE, nigate: false },
    { name: "バーレーン", area: ASIA, nigate: false },
    { name: "ハイチ", area: NORTH_AMERICA, nigate: false },
    { name: "パキスタン", area: ASIA, nigate: false },
    { name: "バチカン市国", area: EUROPE, nigate: false },
    { name: "パナマ", area: NORTH_AMERICA, nigate: false },
    { name: "バヌアツ", area: OCEANIA, nigate: false },
    { name: "バハマ", area: NORTH_AMERICA, nigate: false },
    { name: "パプアニューギニア", area: OCEANIA, nigate: false },
    { name: "パラオ", area: OCEANIA, nigate: false },
    { name: "パラグアイ", area: SOUTH_AMERICA, nigate: false },
    { name: "バルバドス", area: NORTH_AMERICA, nigate: false },
    { name: "ハンガリー", area: EUROPE, nigate: false },
    { name: "バングラデシュ", area: ASIA, nigate: false },
    { name: "フィジー", area: OCEANIA, nigate: false },
    { name: "フィリピン", area: ASIA, nigate: false },
    { name: "フィンランド", area: EUROPE, nigate: false },
    { name: "ブータン", area: ASIA, nigate: false },
    { name: "ブラジル", area: SOUTH_AMERICA, nigate: false },
    { name: "フランス", area: EUROPE, nigate: false },
    { name: "ブルガリア", area: EUROPE, nigate: false },
    { name: "ブルキナファソ", area: AFRICA, nigate: false },
    { name: "ブルネイ", area: ASIA, nigate: false },
    { name: "ブルンジ", area: AFRICA, nigate: false },
    { name: "ベトナム", area: ASIA, nigate: false },
    { name: "ベナン", area: AFRICA, nigate: false },
    { name: "ベネズエラ", area: SOUTH_AMERICA, nigate: false },
    { name: "ベラルーシ", area: EUROPE, nigate: false },
    { name: "ベリーズ", area: NORTH_AMERICA, nigate: false },
    { name: "ペルー", area: SOUTH_AMERICA, nigate: false },
    { name: "ベルギー", area: EUROPE, nigate: false },
    { name: "ポーランド", area: EUROPE, nigate: false },
    { name: "ボスニア・ヘルツェゴビナ", area: EUROPE, nigate: false },
    { name: "ボツワナ", area: AFRICA, nigate: false },
    { name: "ボリビア", area: SOUTH_AMERICA, nigate: false },
    { name: "ポルトガル", area: EUROPE, nigate: false },
    { name: "ホンジュラス", area: NORTH_AMERICA, nigate: false },
    { name: "マーシャル諸島", area: OCEANIA, nigate: false },
    { name: "マダガスカル", area: AFRICA, nigate: false },
    { name: "マラウイ", area: AFRICA, nigate: false },
    { name: "マリ", area: AFRICA, nigate: false },
    { name: "マルタ", area: EUROPE, nigate: false },
    { name: "マレーシア", area: ASIA, nigate: false },
    { name: "ミクロネシア", area: OCEANIA, nigate: false },
    { name: "ミャンマー", area: ASIA, nigate: false },
    { name: "メキシコ", area: NORTH_AMERICA, nigate: false },
    { name: "モーリシャス", area: AFRICA, nigate: false },
    { name: "モーリタニア", area: AFRICA, nigate: false },
    { name: "モザンビーク", area: AFRICA, nigate: false },
    { name: "モナコ", area: EUROPE, nigate: false },
    { name: "モルディブ", area: ASIA, nigate: false },
    { name: "モルドバ", area: EUROPE, nigate: false },
    { name: "モロッコ", area: AFRICA, nigate: false },
    { name: "モンゴル", area: ASIA, nigate: false },
    { name: "モンテネグロ", area: EUROPE, nigate: false },
    { name: "ヨルダン", area: ASIA, nigate: false },
    { name: "ラオス", area: ASIA, nigate: false },
    { name: "ラトビア", area: EUROPE, nigate: false },
    { name: "リトアニア", area: EUROPE, nigate: false },
    { name: "リビア", area: AFRICA, nigate: false },
    { name: "リヒテンシュタイン", area: EUROPE, nigate: false },
    { name: "リベリア", area: AFRICA, nigate: false },
    { name: "ルーマニア", area: EUROPE, nigate: false },
    { name: "ルクセンブルク", area: EUROPE, nigate: false },
    { name: "ルワンダ", area: AFRICA, nigate: false },
    { name: "レソト", area: AFRICA, nigate: false },
    { name: "レバノン", area: ASIA, nigate: false },
    { name: "ロシア", area: EUROPE, nigate: false },
    { name: "韓国", area: ASIA, nigate: false },
    { name: "赤道ギニア", area: AFRICA, nigate: false },
    { name: "中央アフリカ", area: AFRICA, nigate: false },
    { name: "中国", area: ASIA, nigate: false },
    { name: "東ティモール", area: ASIA, nigate: false },
    { name: "南アフリカ", area: AFRICA, nigate: false },
    { name: "南スーダン", area: AFRICA, nigate: false },
    { name: "日本", area: ASIA, nigate: false },
    { name: "北マケドニア", area: EUROPE, nigate: false },
    { name: "北朝鮮", area: ASIA, nigate: false }
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
let ele_nigateonly = null;
let ele_nigate_check = null;
let ele_nigate_label = null;
let allcheckButton = null;
let allclearButton = null;
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
const NIGATE_KEY_NAME = 'nigate_flag_settings';

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

// にがてリストをローカルストレージに保存
function saveNigate() {
    let saveStr = "";
    for (let i = 0; i < flags.length; i++) {
        saveStr += flags[i].nigate ? "1_" : "0_";
    }
    //console.log(saveStr);

    localStorage.setItem(NIGATE_KEY_NAME, saveStr);
}

// にがてリストをローカルストレージから読み出し
function loadNigate() {
    let strSetting = localStorage.getItem(NIGATE_KEY_NAME);
    if (null != strSetting) {
        const settings = strSetting.match(/\d+/g);
        for (let i = 0; i < flags.length; i++) {
            flags[i].nigate = settings[i] == '1' ? true : false;
            // console.log(flags[i].nigate);
        }
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
    ele_nigateonly = document.getElementsByName("nigateonly")[0]; // 1つだけ;
    ele_nigate_check = document.getElementsByName("nigate_check")[0]; // 1つだけ
    ele_nigate_label = document.getElementById("nigate_label");
    allcheckButton = document.getElementsByName('allcheckbtn');
    allclearButton = document.getElementsByName('allclearbtn');
    toggleBtn = document.querySelector('.toggle_button');
    clearButton = document.querySelector('.clear_best_button');
    giveupButton = document.getElementById("giveup_button");
    ele_giveup_second = document.querySelector('.giveup_second');

    // 濁点カタカナの文字コードに不備が出るので統一して正規化しておく。
    for (let i = 0; i < flags.length; i++) {
        flags[i].name = flags[i].name.normalize('NFKC');
    }

    loadSettings(); // 設定を読み出しておく
    loadNigate();

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

    // にがてのみチェックボックスイベントハンドラ
    ele_nigateonly.addEventListener('change', (e) => {
        resetAnswers();
        setButtonsState(false);
    });

    // にがてチェックボックスイベントハンドラ
    ele_nigate_check.addEventListener('change', (e) => {
        questions[currentQuestion].nigate = ele_nigate_check.checked ? true : false;
    });

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
                if (ele_nigateonly.checked && !flags[i].nigate) {
                    continue;
                }
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
        // ele.style.opacity = "0"; // その場にありながら透明（消す）
        ele.style.color = "white";
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
            // ++for Debug 短く試すとき用
            /*
            if (flags[i].name != "モンゴル" && flags[i].name != "イラン") {
                //if (flags[i].name != "モンゴル") { 
                continue;
            } else {
                console.log(flags[i].name);
            }
            */
            // --for Debug 短く試すとき用
            
            if (ele_nigateonly.checked && !flags[i].nigate) {
                continue;
            }
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
    ele_wrong_text.textContent = "";
    ele_nigate_check.checked = questions[currentQuestion].nigate ? true : false;
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
    saveNigate();
    setButtonsState(false);
    ele_wrong_text.textContent = "";
}

// 終了
function gameEnd() {

    if (!ele_nigateonly.checked && ((null == bestTime) || (bestTime > elapsedTime))) {
        // 記録更新
        bestTime = elapsedTime;
        localStorage.setItem(getBestTimeKeyName(), bestTime.toString());
        window.alert(`新記録達成!! : ${timeToTextContent(elapsedTime)}秒`);
        updateBestTime();
    } else {
        window.alert(`記録 : ${timeToTextContent(elapsedTime)}秒`);
    }

    stopRecord();
    saveNigate();

    resetAnswers();
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
    // すべてはずすボタン
    allclearButton.disabled = isStart ? true : false;

    // 地域チェックボックス
    for (let area = 0; area < NUM_AREA; area++) {
        ele_check_areas[area].disabled = isStart ? true : false;
    }

    // モードラジオボックス
    for (let i = 0; i < ele_modes.length; i++) {
        ele_modes[i].disabled = isStart ? true : false;
    }

    // にがてのみチェックボックス
    ele_nigateonly.disabled = isStart ? true : false;

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

    // にがてチェックボックス
    ele_nigate_check.disabled = isStart ? false : true;
    ele_nigate_check.style.display = isStart ? 'inline' : 'none';
    ele_nigate_label.style.display = isStart ? 'inline' : 'none';

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

// (地域)すべてはずすボタン
function onAllClearButton() {
    for (let area = 0; area < NUM_AREA; area++) {
        ele_check_areas[area].checked = false;
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

        let noNigate = true;
        if (ele_nigateonly.checked == false) {
            noNigate = false;
        } else {
            for (let i = 0; i < flags.length; i++) {
                if (flags[i].nigate == true) {
                    // どれか一つでもにがてがあれば開始
                    noNigate = false;
                    break;
                }
            }
        }

        if (noCheckd) {
            window.alert("一つ以上の地域にチェックを入れてください");
        } else if(noNigate) {
            window.alert("にがてはありません");
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

// にがてクリアボタン
function onClearNigateOnlyButton() {
    if (window.confirm("にがてを消しても良いですか？")) {
        localStorage.removeItem(NIGATE_KEY_NAME);
        for (let i = 0; i < flags.length; i++) {
            flags[i].nigate = false;
        }
        ele_nigateonly.checked = false;
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

