"use strict";

let ele_table = null;
let ele_num_tile = null;
let ele_sum_value = null;
let ele_sound = null;
let ele_best_time = null;
let ele_new_record = null;
let toggleBtn = null;
let clearButton = null;
let bestTime = null; // 最高記録。無いときはnull
let firstTile = null; // 1つ目に選択したタイル
let secondTile = null; // 2つ目に選択したタイル
let numTile = NaN; // 一辺のタイル数
let sumValue = NaN; // 足してなる数
let isSoundOn = false; // 音
let numCorrect = 0; // 正解数

const START_CAPTION = "スタート";
const STOP_CAPTION = "中止";

const SETTINGS_KEY_NAME = 'sum_pair_settings';

// ローカルストレージ用keyname
function getBestTimeKeyName() {
    return `best_${numTile}_${sumValue}`;
}

// 設定をローカルストレージに保存
function saveSettings() {
    let sound = isSoundOn ? 1 : 0;
    localStorage.setItem(SETTINGS_KEY_NAME, `${numTile}_${sumValue}_${sound}`);
}

// 設定をローカルストレージから読み出し
function loadSettings() {
    let strSetting = localStorage.getItem(SETTINGS_KEY_NAME);
    if (null != strSetting) {
        const settings = strSetting.match(/\d+/g);
        ele_num_tile.value = settings[0];
        ele_sum_value.value = settings[1];
        ele_sound.checked = settings[2] == '1' ? true : false;
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
    ele_table = document.getElementById("table");
    ele_num_tile = document.getElementById("num_tile");
    ele_sum_value = document.getElementById("sum_value");
    ele_sound = document.getElementById("sound");
    ele_best_time = document.getElementById("best_time");
    ele_new_record = document.getElementById("new_record");
    toggleBtn = document.querySelector('.toggle_button');
    clearButton = document.querySelector('.clear_best_button');

    loadSettings(); // 設定を読み出しておく

    numTile = parseInt(ele_num_tile.value, 10); // 一辺のタイル数
    sumValue = parseInt(ele_sum_value.value, 10); // 足してなる数
    isSoundOn = ele_sound.checked;

    saveSettings(); // 設定を保存

    resetTiles();
    toggleBtn.value = START_CAPTION;

    // タイル数セレクトイベントハンドラ
    ele_num_tile.addEventListener('change', (e) => {
        numTile = parseInt(e.target.value, 10);
        resetRecord();
        resetTiles();
        saveSettings(); // 設定を保存
    });

    // 足してなる数セレクトイベントハンドラ
    ele_sum_value.addEventListener('change', (e) => {
        sumValue = parseInt(e.target.value, 10);
        resetRecord();
        resetTiles();
        saveSettings(); // 設定を保存
    });

    // 音チェックボックスイベントハンドラ
    ele_sound.addEventListener('change', (e) => {
        isSoundOn = e.target.checked;
        saveSettings(); // 設定を保存
    });

}

// タイルをセット（数字なし）
function resetTiles() {

    // tableの子要素全削除
    while (ele_table.firstChild) {
        ele_table.removeChild(ele_table.firstChild);
    }

    for (let i = 0; i < numTile; i++) {
        // 各行
        let tr = document.createElement("tr");
        for (let j = 0; j < numTile; j++) {
            // 各列
            let td = document.createElement("td");
            td.textContent = "";
            tr.appendChild(td);
        }
        ele_table.appendChild(tr);
    }

    firstTile = null;
    secondTile = null;
    numCorrect = 0;

    // 最高記録表示
    bestTime = localStorage.getItem(getBestTimeKeyName());
    if (null != bestTime) {
        ele_best_time.textContent = timeToTextContent(bestTime);
    } else {
        ele_best_time.textContent = "0.0";
    }

}

// タイルに数字をセット
function setTielsNumbers() {
    // 乱数で配列を作成
    let numbers = [];
    const min = 1; // 最小値
    const max = sumValue - 1; // 最大値

    for (let i = 1; i <= (numTile * numTile / 2); i++) {
        let val = Math.floor(Math.random() * (max - min)) + min
        numbers.push(val); //0〜sumValueまでの乱数
        numbers.push(sumValue - val);
    }
    numbers.shuffle();

    // 全タイルに上記数字とハンドラをセットする
    const trs = ele_table.children;
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        const tds = tr.children;
        for (let j = 0; j < tds.length; j++) {
            const td = tds[j];
            td.value = numbers[i * numTile + j]; // 数字
            td.textContent = td.value;
            if (window.ontouchstart === undefined) {
                td.onclick = click; // クリック時
            } else {
                td.ontouchstart = click // タップ時
            }
        }
    }
}

// スタート
function gameStart() {
    ele_num_tile.disabled = true;
    ele_sum_value.disabled = true;
    ele_sound.disabled = true;
    clearButton.disabled = true;
    ele_new_record.textContent = "";
    resetTiles();
    setTielsNumbers();
    resetRecord(); // 必要
    startRecord();
}

// 中断
function gameStop() {
    resetRecord();
    resetTiles();
    ele_num_tile.disabled = false;
    ele_sum_value.disabled = false;
    ele_sound.disabled = false;
    clearButton.disabled = false;
}

// 終了
function gameEnd() {
    // console.log("gameEnd");

    if ((null == bestTime) || (bestTime > elapsedTime)) {
        // 記録更新
        ele_new_record.textContent = " 新記録!!";
        bestTime = elapsedTime;
        localStorage.setItem(getBestTimeKeyName(), bestTime.toString());
    }

    stopRecord();

    ele_num_tile.disabled = false;
    ele_sum_value.disabled = false;
    ele_sound.disabled = false;
    clearButton.disabled = false;

    toggleBtn.value = START_CAPTION;
}


// クリックまたはタップ時
function click(e) {
    let tile = e.target;

    if (tile == firstTile) {
        if (null != secondTile) {
            // 2番目が選択されている状態で、1番目選択タイルをタップ。何もしない
        } else {
            // 1番目タイルをキャンセル
            tile.style.backgroundColor = "white";
            firstTile = null;
        }
    } else if (null == firstTile) {
        // 1番目タイル選択
        firstTile = tile;
        tile.style.backgroundColor = "skyblue";
    } else if (null == secondTile) {
        // 2番目タイル選択。
        secondTile = tile;
        tile.style.backgroundColor = "pink";
        checkCorrect();
    } else if (secondTile == e.target) {
        // 2番目選択タイルを再タップ。選択キャンセル。
        tile.style.backgroundColor = "white";
        secondTile = null;
    } else {
        // 2番目タイルが選択された状態で他のタイルを選択。入れ替え
        secondTile.style.backgroundColor = "white";
        secondTile = tile;
        tile.style.backgroundColor = "pink";
        checkCorrect();
    }
}

// 正誤チェック
function checkCorrect() {
    if (secondTile.value + firstTile.value == sumValue) {
        // 正解
        correctSound();
        firstTile.style.backgroundColor = "gray";
        firstTile.textContent = ""
        firstTile.onclick = null; // クリック時
        firstTile.ontouchstart = null // タップ時
        firstTile = null;
        secondTile.style.backgroundColor = "gray";
        secondTile.textContent = ""
        secondTile.onclick = null; // クリック時
        secondTile.ontouchstart = null // タップ時
        secondTile = null;

        numCorrect += 2;
        if (numTile * numTile == numCorrect) {
            // 全問正解
            gameEnd();
        }
    } else {
        // 不正解
        wrongSound();
    }
}

// 効果音
function correctSound() {
    if (ele_sound.checked) {
        document.getElementById('correct_sound').currentTime = 0;
        document.getElementById('correct_sound').play();
    }
}

function wrongSound() {
    if (ele_sound.checked) {
        document.getElementById('wrong_sound').currentTime = 0;
        document.getElementById('wrong_sound').play();
    }
}

// スタート or 中止ボタン
function onToggleButton() {
    if (toggleBtn.value === START_CAPTION) {
        gameStart();
        toggleBtn.value = STOP_CAPTION;
    } else { // 中止
        gameStop();
        toggleBtn.value = START_CAPTION;
    }
}

// 記録クリアボタン
function onClearBestTimeButton() {
    if (window.confirm("最高記録を消しても良いですか？")) {
        localStorage.removeItem(getBestTimeKeyName());
        ele_new_record.textContent = "";
        resetRecord();
        resetTiles();
    }

}

////////////////////
//++Record関連
//
let startTime;
let elapsedTime = 0;
let intervalTimer = NaN;

function startRecord() {
    startTime = Date.now() - elapsedTime;
    timerStart()
}

function resetRecord() {
    clearInterval(intervalTimer);
    elapsedTime = 0;
    document.getElementById("record").textContent = "0.0";
}

function stopRecord() {
    clearInterval(intervalTimer);
}

function timerStart() {
    intervalTimer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        document.getElementById("record").textContent = timeToTextContent(elapsedTime);
    }, 100);
}

// 0.0の形式の文字列に変換
function timeToTextContent(time) {
    let seconds = Math.floor(time / 1000);
    let tenth_of_a_second = Math.floor((time % 1000) / 100);
    return `${seconds}.${tenth_of_a_second}`;
}

//
//--Record関連
////////////////////
