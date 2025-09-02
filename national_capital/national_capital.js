"use strict";

const NUM_AREA = 6; // 地域数
const ASIA = 0;
const EUROPE = 1;
const NORTH_AMERICA = 2;
const SOUTH_AMERICA = 3;
const AFRICA = 4;
const OCEANIA = 5;

// finderから国名をコピペしているが、おそらく文字コードの違いがありバグ
// となるので、initで正規化している。
// '='は使えないので注意
const capitals = [
    { name: "UAE", area: ASIA, nigate: false, capital: "アブダビ" },
    { name: "アイスランド", area: EUROPE, nigate: false, capital: "レイキャビク" },
    { name: "アイルランド", area: EUROPE, nigate: false, capital: "ダブリン" },
    { name: "アゼルバイジャン", area: ASIA, nigate: false, capital: "バクー" },
    { name: "アフガニスタン", area: ASIA, nigate: false, capital: "カブール" },
    { name: "アメリカ", area: NORTH_AMERICA, nigate: false, capital: "ワシントンD.C." },
    { name: "アルジェリア", area: AFRICA, nigate: false, capital: "アルジェ" },
    { name: "アルゼンチン", area: SOUTH_AMERICA, nigate: false, capital: "ブエノスアイレス" },
    { name: "アルバニア", area: EUROPE, nigate: false, capital: "ティラナ" },
    { name: "アルメニア", area: ASIA, nigate: false, capital: "エレバン" },
    { name: "アンゴラ", area: AFRICA, nigate: false, capital: "ルアンダ" },
    { name: "アンティグア・バーブーダ", area: NORTH_AMERICA, nigate: false, capital: "セントジョンズ" },
    { name: "アンドラ", area: EUROPE, nigate: false, capital: "アンドラ・ラ・ベリャ" },
    { name: "イエメン", area: ASIA, nigate: false, capital: "サナア" },
    { name: "イギリス", area: EUROPE, nigate: false, capital: "ロンドン" },
    { name: "イスラエル", area: ASIA, nigate: false, capital: "エルサレム" },
    { name: "イタリア", area: EUROPE, nigate: false, capital: "ローマ" },
    { name: "イラク", area: ASIA, nigate: false, capital: "バグダッド" },
    { name: "イラン", area: ASIA, nigate: false, capital: "テヘラン" },
    { name: "インド", area: ASIA, nigate: false, capital: "ニューデリー" },
    { name: "インドネシア", area: ASIA, nigate: false, capital: "ジャカルタ" },
    { name: "ウガンダ", area: AFRICA, nigate: false, capital: "カンパラ" },
    { name: "ウクライナ", area: EUROPE, nigate: false, capital: "キエフ" },
    { name: "ウズベキスタン", area: ASIA, nigate: false, capital: "タシュケント" },
    { name: "ウルグアイ", area: SOUTH_AMERICA, nigate: false, capital: "モンテビデオ" },
    { name: "エクアドル", area: SOUTH_AMERICA, nigate: false, capital: "キト" },
    { name: "エジプト", area: AFRICA, nigate: false, capital: "カイロ" },
    { name: "エストニア", area: EUROPE, nigate: false, capital: "タリン" },
    { name: "エスワティニ", area: AFRICA, nigate: false, capital: "ムババーネ" },
    { name: "エチオピア", area: AFRICA, nigate: false, capital: "アディスアベバ" },
    { name: "エリトリア", area: AFRICA, nigate: false, capital: "アスマラ" },
    { name: "エルサルバドル", area: NORTH_AMERICA, nigate: false, capital: "サンサルバドル" },
    { name: "オーストラリア", area: OCEANIA, nigate: false, capital: "キャンベラ" },
    { name: "オーストリア", area: EUROPE, nigate: false, capital: "ウィーン" },
    { name: "オマーン", area: ASIA, nigate: false, capital: "マスカット" },
    { name: "オランダ", area: EUROPE, nigate: false, capital: "アムステルダム" },
    { name: "ガーナ", area: AFRICA, nigate: false, capital: "アクラ" },
    { name: "カーボベルデ", area: AFRICA, nigate: false, capital: "プライア" },
    { name: "ガイアナ", area: NORTH_AMERICA, nigate: false, capital: "ジョージタウン" },
    { name: "カザフスタン", area: ASIA, nigate: false, capital: "アスタナ" },
    { name: "カタール", area: ASIA, nigate: false, capital: "ドーハ" },
    { name: "カナダ", area: NORTH_AMERICA, nigate: false, capital: "オタワ" },
    { name: "ガボン", area: AFRICA, nigate: false, capital: "リーブルヴィル" },
    { name: "カメルーン", area: AFRICA, nigate: false, capital: "ヤウンデ" },
    { name: "ガンビア", area: AFRICA, nigate: false, capital: "バンジュール" },
    { name: "カンボジア", area: ASIA, nigate: false, capital: "プノンペン" },
    { name: "ギニア", area: AFRICA, nigate: false, capital: "コナクリ" },
    { name: "ギニアビサウ", area: AFRICA, nigate: false, capital: "ビサウ" },
    { name: "キプロス", area: EUROPE, nigate: false, capital: "ニコシア" },
    { name: "キューバ", area: NORTH_AMERICA, nigate: false, capital: "ハバナ" },
    { name: "ギリシャ", area: EUROPE, nigate: false, capital: "アテネ" },
    { name: "キリバス", area: OCEANIA, nigate: false, capital: "タラワ" },
    { name: "キルギス", area: ASIA, nigate: false, capital: "ビシュケク" },
    { name: "グアテマラ", area: NORTH_AMERICA, nigate: false, capital: "グアテマラシティ" },
    { name: "クウェート", area: ASIA, nigate: false, capital: "クウェートシティ" },
    { name: "クック諸島", area: OCEANIA, nigate: false, capital: "アバルア" },
    { name: "グレナダ", area: NORTH_AMERICA, nigate: false, capital: "セントジョージズ" },
    { name: "クロアチア", area: EUROPE, nigate: false, capital: "ザグレブ" },
    { name: "ケニア", area: AFRICA, nigate: false, capital: "ナイロビ" },
    { name: "コートジボワール", area: AFRICA, nigate: false, capital: "ヤムスクロ" },
    { name: "コスタリカ", area: NORTH_AMERICA, nigate: false, capital: "サンホセ" },
    { name: "コソボ", area: EUROPE, nigate: false, capital: "プリシュティナ" },
    { name: "コモロ", area: AFRICA, nigate: false, capital: "モロニ" },
    { name: "コロンビア", area: SOUTH_AMERICA, nigate: false, capital: "ボゴタ" },
    { name: "コンゴ共和国", area: AFRICA, nigate: false, capital: "ブラザヴィル" },
    { name: "コンゴ民主共和国", area: AFRICA, nigate: false, capital: "キンシャサ" },
    { name: "サウジアラビア", area: ASIA, nigate: false, capital: "リヤド" },
    { name: "サモア", area: OCEANIA, nigate: false, capital: "アピア" },
    { name: "サントメ・プリンシペ", area: AFRICA, nigate: false, capital: "サントメ" },
    { name: "ザンビア", area: AFRICA, nigate: false, capital: "ルサカ" },
    { name: "サンマリノ", area: EUROPE, nigate: false, capital: "サンマリノ" },
    { name: "シエラレオネ", area: AFRICA, nigate: false, capital: "フリータウン" },
    { name: "ジブチ", area: AFRICA, nigate: false, capital: "ジブチ" },
    { name: "ジャマイカ", area: NORTH_AMERICA, nigate: false, capital: "キングストン" },
    { name: "ジョージア", area: EUROPE, nigate: false, capital: "トビリシ" },
    { name: "シリア", area: ASIA, nigate: false, capital: "ダマスカス" },
    { name: "シンガポール", area: ASIA, nigate: false, capital: "シンガポール" },
    { name: "ジンバブエ", area: AFRICA, nigate: false, capital: "ハラレ" },
    { name: "スイス", area: EUROPE, nigate: false, capital: "ベルン" },
    { name: "スウェーデン", area: EUROPE, nigate: false, capital: "ストックホルム" },
    { name: "スーダン", area: AFRICA, nigate: false, capital: "ハルツーム" },
    { name: "スペイン", area: EUROPE, nigate: false, capital: "マドリード" },
    { name: "スリナム", area: SOUTH_AMERICA, nigate: false, capital: "パラマリボ" },
    { name: "スリランカ", area: ASIA, nigate: false, capital: "スリジャヤワルダナプラコッテ" },
    { name: "スロバキア", area: EUROPE, nigate: false, capital: "ブラチスラヴァ" },
    { name: "スロベニア", area: EUROPE, nigate: false, capital: "リュブリャナ" },
    { name: "セーシェル", area: AFRICA, nigate: false, capital: "ビクトリア" },
    { name: "セネガル", area: AFRICA, nigate: false, capital: "ダカール" },
    { name: "セルビア", area: EUROPE, nigate: false, capital: "ベオグラード" },
    { name: "セントクリストファー・ネービス", area: NORTH_AMERICA, nigate: false, capital: "バセテール" },
    { name: "セントビンセント", area: NORTH_AMERICA, nigate: false, capital: "キングスタウン" },
    { name: "セントルシア", area: NORTH_AMERICA, nigate: false, capital: "カストリーズ" },
    { name: "ソマリア", area: AFRICA, nigate: false, capital: "モガディシュ" },
    { name: "ソロモン諸島", area: OCEANIA, nigate: false, capital: "ホニアラ" },
    { name: "タイ", area: ASIA, nigate: false, capital: "バンコク" },
    { name: "タジキスタン", area: ASIA, nigate: false, capital: "ドゥシャンベ" },
    { name: "タンザニア", area: AFRICA, nigate: false, capital: "ドドマ" },
    { name: "チェコ", area: EUROPE, nigate: false, capital: "プラハ" },
    { name: "チャド", area: AFRICA, nigate: false, capital: "ンジャメナ" },
    { name: "チュニジア", area: AFRICA, nigate: false, capital: "チュニス" },
    { name: "チリ", area: SOUTH_AMERICA, nigate: false, capital: "サンティアゴ" },
    { name: "ツバル", area: OCEANIA, nigate: false, capital: "フナフティ" },
    { name: "デンマーク", area: EUROPE, nigate: false, capital: "コペンハーゲン" },
    { name: "ドイツ", area: EUROPE, nigate: false, capital: "ベルリン" },
    { name: "トーゴ", area: AFRICA, nigate: false, capital: "ロメ" },
    { name: "ドミニカ共和国", area: NORTH_AMERICA, nigate: false, capital: "サントドミンゴ" },
    { name: "ドミニカ国", area: NORTH_AMERICA, nigate: false, capital: "ロゾー" },
    { name: "トリニダード・トバゴ", area: NORTH_AMERICA, nigate: false, capital: "ポートオブスペイン" },
    { name: "トルクメニスタン", area: ASIA, nigate: false, capital: "アシガバート" },
    { name: "トルコ", area: ASIA, nigate: false, capital: "アンカラ" },
    { name: "トンガ", area: OCEANIA, nigate: false, capital: "ヌクアロファ" },
    { name: "ナイジェリア", area: AFRICA, nigate: false, capital: "アブジャ" },
    { name: "ナウル", area: OCEANIA, nigate: false, capital: "ヤレン" },
    { name: "ナミビア", area: AFRICA, nigate: false, capital: "ウィントフック" },
    { name: "ニウエ", area: OCEANIA, nigate: false, capital: "アロフィ" },
    { name: "ニカラグア", area: NORTH_AMERICA, nigate: false, capital: "マナグア" },
    { name: "ニジェール", area: AFRICA, nigate: false, capital: "ニアメ" },
    { name: "ニュージーランド", area: OCEANIA, nigate: false, capital: "ウェリントン" },
    { name: "ネパール", area: ASIA, nigate: false, capital: "カトマンズ" },
    { name: "ノルウェー", area: EUROPE, nigate: false, capital: "オスロ" },
    { name: "バーレーン", area: ASIA, nigate: false, capital: "マナマ" },
    { name: "ハイチ", area: NORTH_AMERICA, nigate: false, capital: "ポルトープランス" },
    { name: "パキスタン", area: ASIA, nigate: false, capital: "イスラマバード" },
    { name: "バチカン市国", area: EUROPE, nigate: false, capital: "バチカン" },
    { name: "パナマ", area: NORTH_AMERICA, nigate: false, capital: "パナマシティ" },
    { name: "バヌアツ", area: OCEANIA, nigate: false, capital: "ポートビラ" },
    { name: "バハマ", area: NORTH_AMERICA, nigate: false, capital: "ナッソー" },
    { name: "パプアニューギニア", area: OCEANIA, nigate: false, capital: "ポートモレスビー" },
    { name: "パラオ", area: OCEANIA, nigate: false, capital: "マルキョク" },
    { name: "パラグアイ", area: SOUTH_AMERICA, nigate: false, capital: "アスンシオン" },
    { name: "バルバドス", area: NORTH_AMERICA, nigate: false, capital: "ブリッジタウン" },
    { name: "ハンガリー", area: EUROPE, nigate: false, capital: "ブダペスト" },
    { name: "バングラデシュ", area: ASIA, nigate: false, capital: "ダッカ" },
    { name: "フィジー", area: OCEANIA, nigate: false, capital: "スバ" },
    { name: "フィリピン", area: ASIA, nigate: false, capital: "マニラ" },
    { name: "フィンランド", area: EUROPE, nigate: false, capital: "ヘルシンキ" },
    { name: "ブータン", area: ASIA, nigate: false, capital: "ティンプー" },
    { name: "ブラジル", area: SOUTH_AMERICA, nigate: false, capital: "ブラジリア" },
    { name: "フランス", area: EUROPE, nigate: false, capital: "パリ" },
    { name: "ブルガリア", area: EUROPE, nigate: false, capital: "ソフィア" },
    { name: "ブルキナファソ", area: AFRICA, nigate: false, capital: "ワガドゥグー" },
    { name: "ブルネイ", area: ASIA, nigate: false, capital: "バンダルスリブガワン" },
    { name: "ブルンジ", area: AFRICA, nigate: false, capital: "ブジュンブラ" },
    { name: "ベトナム", area: ASIA, nigate: false, capital: "ハノイ" },
    { name: "ベナン", area: AFRICA, nigate: false, capital: "ポルトノボ" },
    { name: "ベネズエラ", area: SOUTH_AMERICA, nigate: false, capital: "カラカス" },
    { name: "ベラルーシ", area: EUROPE, nigate: false, capital: "ミンスク" },
    { name: "ベリーズ", area: NORTH_AMERICA, nigate: false, capital: "ベルモパン" },
    { name: "ペルー", area: SOUTH_AMERICA, nigate: false, capital: "リマ" },
    { name: "ベルギー", area: EUROPE, nigate: false, capital: "ブリュッセル" },
    { name: "ポーランド", area: EUROPE, nigate: false, capital: "ワルシャワ" },
    { name: "ボスニア・ヘルツェゴビナ", area: EUROPE, nigate: false, capital: "サラエボ" },
    { name: "ボツワナ", area: AFRICA, nigate: false, capital: "ハボローネ" },
    { name: "ボリビア", area: SOUTH_AMERICA, nigate: false, capital: "ラパス" },
    { name: "ポルトガル", area: EUROPE, nigate: false, capital: "リスボン" },
    { name: "ホンジュラス", area: NORTH_AMERICA, nigate: false, capital: "テグシガルパ" },
    { name: "マーシャル諸島", area: OCEANIA, nigate: false, capital: "マジュロ" },
    { name: "マダガスカル", area: AFRICA, nigate: false, capital: "アンタナナリボ" },
    { name: "マラウイ", area: AFRICA, nigate: false, capital: "リロングウェ" },
    { name: "マリ", area: AFRICA, nigate: false, capital: "バマコ" },
    { name: "マルタ", area: EUROPE, nigate: false, capital: "バレッタ" },
    { name: "マレーシア", area: ASIA, nigate: false, capital: "クアラルンプール" },
    { name: "ミクロネシア", area: OCEANIA, nigate: false, capital: "パリキール" },
    { name: "ミャンマー", area: ASIA, nigate: false, capital: "ネピドー" },
    { name: "メキシコ", area: NORTH_AMERICA, nigate: false, capital: "メキシコシティ" },
    { name: "モーリシャス", area: AFRICA, nigate: false, capital: "ポートルイス" },
    { name: "モーリタニア", area: AFRICA, nigate: false, capital: "ヌアクショット" },
    { name: "モザンビーク", area: AFRICA, nigate: false, capital: "マプト" },
    { name: "モナコ", area: EUROPE, nigate: false, capital: "モナコ" },
    { name: "モルディブ", area: ASIA, nigate: false, capital: "マレ" },
    { name: "モルドバ", area: EUROPE, nigate: false, capital: "キシナウ" },
    { name: "モロッコ", area: AFRICA, nigate: false, capital: "ラバト" },
    { name: "モンゴル", area: ASIA, nigate: false, capital: "ウランバートル" },
    { name: "モンテネグロ", area: EUROPE, nigate: false, capital: "ポドゴリツァ" },
    { name: "ヨルダン", area: ASIA, nigate: false, capital: "アンマン" },
    { name: "ラオス", area: ASIA, nigate: false, capital: "ビエンチャン" },
    { name: "ラトビア", area: EUROPE, nigate: false, capital: "リガ" },
    { name: "リトアニア", area: EUROPE, nigate: false, capital: "ヴィリニュス" },
    { name: "リビア", area: AFRICA, nigate: false, capital: "トリポリ" },
    { name: "リヒテンシュタイン", area: EUROPE, nigate: false, capital: "ファドゥーツ" },
    { name: "リベリア", area: AFRICA, nigate: false, capital: "モンロビア" },
    { name: "ルーマニア", area: EUROPE, nigate: false, capital: "ブカレスト" },
    { name: "ルクセンブルク", area: EUROPE, nigate: false, capital: "ルクセンブルク" },
    { name: "ルワンダ", area: AFRICA, nigate: false, capital: "キガリ" },
    { name: "レソト", area: AFRICA, nigate: false, capital: "マセル" },
    { name: "レバノン", area: ASIA, nigate: false, capital: "ベイルート" },
    { name: "ロシア", area: EUROPE, nigate: false, capital: "モスクワ" },
    { name: "韓国", area: ASIA, nigate: false, capital: "ソウル" },
    { name: "赤道ギニア", area: AFRICA, nigate: false, capital: "マラボ" },
    { name: "中央アフリカ", area: AFRICA, nigate: false, capital: "バンギ" },
    { name: "中国", area: ASIA, nigate: false, capital: "北京" },
    { name: "東ティモール", area: ASIA, nigate: false, capital: "ディリ" },
    { name: "南アフリカ", area: AFRICA, nigate: false, capital: "プレトリア" },
    { name: "南スーダン", area: AFRICA, nigate: false, capital: "ジュバ" },
    { name: "日本", area: ASIA, nigate: false, capital: "東京" },
    { name: "北マケドニア", area: EUROPE, nigate: false, capital: "スコピエ" },
    { name: "北朝鮮", area: ASIA, nigate: false, capital: "ピョンヤン" }
];



let ele_buttons = null;
let ele_check_areas = null;
let ele_wrong_text = null;
let ele_question_str = null;
let ele_question_correct = null;
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

const MODE_NAME = 0; // 国名→首都
const MODE_CAPITAL = 1; // 首都→国名

const SETTINGS_KEY_NAME = 'national_capital_settings';
const NIGATE_KEY_NAME = 'nigate_capital_settings';

// ローカルストレージ用keyname
function getBestTimeKeyName() {
    let asia = ele_check_areas[ASIA].checked ? 1 : 0;
    let europe = ele_check_areas[EUROPE].checked ? 1 : 0;
    let north_america = ele_check_areas[NORTH_AMERICA].checked ? 1 : 0;
    let south_america = ele_check_areas[SOUTH_AMERICA].checked ? 1 : 0;
    let africa = ele_check_areas[AFRICA].checked ? 1 : 0;
    let oceania = ele_check_areas[OCEANIA].checked ? 1 : 0;
    let mode_capital = ele_modes[MODE_CAPITAL].checked ? 1 : 0;
    let mode_name = ele_modes[MODE_NAME].checked ? 1 : 0;
    return `capital_best_${asia}_${europe}_${north_america}_${south_america}_${africa}_${oceania}_${mode_capital}_${mode_name}`;
}

// 設定をローカルストレージに保存
function saveSettings() {
    let asia = ele_check_areas[ASIA].checked ? 1 : 0;
    let europe = ele_check_areas[EUROPE].checked ? 1 : 0;
    let north_america = ele_check_areas[NORTH_AMERICA].checked ? 1 : 0;
    let south_america = ele_check_areas[SOUTH_AMERICA].checked ? 1 : 0;
    let africa = ele_check_areas[AFRICA].checked ? 1 : 0;
    let oceania = ele_check_areas[OCEANIA].checked ? 1 : 0;
    localStorage.setItem(SETTINGS_KEY_NAME, `${asia}_${europe}_${north_america}_${south_america}_${africa}_${oceania}`);
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
    }
}

// にがてリストをローカルストレージに保存
function saveNigate() {
    let saveStr = "";
    for (let i = 0; i < capitals.length; i++) {
        saveStr += capitals[i].nigate ? "1_" : "0_";
    }
    //console.log(saveStr);

    localStorage.setItem(NIGATE_KEY_NAME, saveStr);
}

// にがてリストをローカルストレージから読み出し
function loadNigate() {
    let strSetting = localStorage.getItem(NIGATE_KEY_NAME);
    if (null != strSetting) {
        const settings = strSetting.match(/\d+/g);
        for (let i = 0; i < capitals.length; i++) {
            capitals[i].nigate = settings[i] == '1' ? true : false;
            // console.log(capitals[i].nigate);
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

// capitalの五十音順にソート
function sortByCapital(arry) {
  return arry.sort((a, b) => {
    return a.capital.localeCompare(b.capital, 'ja');
  });
}

// nameの五十音順にソート
function sortByName(arry) {
  return arry.sort((a, b) => {
    return a.name.localeCompare(b.name, 'ja');
  });
}

// 初期化
function init() {
    ele_buttons = document.getElementById("buttons");
    ele_check_areas = document.getElementsByName("area");
    ele_wrong_text = document.querySelector('.wrong_text');
    ele_question_str = document.getElementById("question_str");
    ele_question_correct = document.getElementById("question_correct");
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
    for (let i = 0; i < capitals.length; i++) {
        capitals[i].name = capitals[i].name.normalize('NFKC');
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

}

// 回答ボタンをセット
function resetAnswers() {

    // 子要素全削除
    while (ele_buttons.firstChild) {
        ele_buttons.removeChild(ele_buttons.firstChild);
    }

    let button_capitals = ele_modes[MODE_CAPITAL].checked ? sortByName(capitals) : sortByCapital(capitals);

    // 地域ごとにボタンを並べる
    for (let area = 0; area < NUM_AREA; area++) {
        if (ele_check_areas[area].checked) {
            for (let i = 0; i < button_capitals.length; i++) {
                if (ele_nigateonly.checked && !button_capitals[i].nigate) {
                    continue;
                }
                if (area == button_capitals[i].area) {
                    let ele = null;
                    ele = document.createElement("input");
                    ele.type = "button";
                    ele.className = "country_button";
                    ele.value = ele_modes[MODE_CAPITAL].checked ? button_capitals[i].name : button_capitals[i].capital;
                    setElementColor(ele, area);

                    ele.country = button_capitals[i].name;
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
function setElementColor(ele, area) {
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
    // ボタン
    // ele.style.opacity = "0"; // その場にありながら透明（消す）
    ele.style.color = "white";
    ele.disabled = true;
}

// 問題を準備
function prepareQuestions() {

    questions.length = 0; //配列を空にする
    currentQuestion = 0;
    numCorrect = 0;

    for (let i = 0; i < capitals.length; i++) {
        if (ele_check_areas[capitals[i].area].checked) {
            // ++for Debug 短く試すとき用
            /*
            if (capitals[i].name != "モンゴル" && capitals[i].name != "イラン") {
                //if (capitals[i].name != "モンゴル") { 
                continue;
            } else {
                console.log(capitals[i].name);
            }
            */
            // --for Debug 短く試すとき用

            if (ele_nigateonly.checked && !capitals[i].nigate) {
                continue;
            }
            questions.push(capitals[i]);
        }
    }
    // 配列をシャッフル
    questions.shuffle();

    // 最初の問題
    showNextQuestion();
}

function showNextQuestion() {
    ele_question_str.textContent = ele_modes[MODE_CAPITAL].checked ? questions[currentQuestion].capital : questions[currentQuestion].name;
    ele_question_correct.textContent = "　";
    ele_question_str.style.color = 'black';
    ele_wrong_text.textContent = "　";
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
    ele_wrong_text.textContent = "　";
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
    ele_wrong_text.textContent = "　";
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
        ele_question_str.textContent = "　";
        ele_question_correct.textContent = "　";
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
            for (let i = 0; i < capitals.length; i++) {
                if (capitals[i].nigate == true) {
                    // どれか一つでもにがてがあれば開始
                    noNigate = false;
                    break;
                }
            }
        }

        if (noCheckd) {
            window.alert("一つ以上の地域にチェックを入れてください");
        } else if (noNigate) {
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
        for (let i = 0; i < capitals.length; i++) {
            capitals[i].nigate = false;
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
    ele_question_correct.textContent = ele_modes[MODE_CAPITAL].checked ? questions[currentQuestion].name : questions[currentQuestion].capital;
    setElementColor(ele_question_correct, questions[currentQuestion].area);
    ele_wrong_text.textContent = "　";
    penaltyTime += GIVEUP_PENALTY_TIME;
}

//
//--ボタン
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

