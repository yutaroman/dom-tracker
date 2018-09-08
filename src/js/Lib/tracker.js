import { throttle } from 'throttle-debounce';

export default class Tracker {
    constructor(button) {
        // マスクの追加
        let mask = document.createElement('div');
        mask.className = 'mask';
        document.body.appendChild(mask);

        // マスクのスタイル
        let maskStyle = document.createElement('style');
        let css = document.styleSheets.item(0);
        let idx = document.styleSheets[0].cssRules.length;
        document.getElementsByTagName('head').item(0).appendChild(maskStyle);
        css.insertRule(".mask {border: 3px solid rgb(0, 128, 255); background-color: rgba(0, 128, 255, 0.2); width: 100%; height: 100%; cursor: move; overflow: hidden; position: absolute; z-index: 200000;}", idx);

        // マスクの bool 初期値
        let maskFlag = false;

        document.getElementById(button).addEventListener('click', () => {
            maskFlag = true;
        });

        document.body.addEventListener('mousemove', throttle(50, (e) => {
            this.handleMouseMove(e, maskFlag, mask);
        }), false);

        mask.addEventListener('mouseup', () => {
            maskFlag = false;
        });
    }

    handleMouseMove = (e, maskFlag, mask) => {
        if (maskFlag === true) {
            mask.style.width = '';
            mask.style.height = '';
            mask.style.top = '';
            mask.style.left = '';

            let x = e.clientX; // event の x 座標
            let y = e.clientY; // event の y 座標
            let element = document.elementFromPoint(x, y); // 座標の要素の取得
            let rect = element.getBoundingClientRect(); // 要素の座標の取得

            if (mask != null) {
                mask.style.width = rect.width + 'px';
                mask.style.height = rect.height + 'px';
                mask.style.left = rect.left + window.pageXOffset + 'px'; // scroll 量を考慮
                mask.style.top = rect.top + window.pageYOffset + 'px'; // scroll 量を考慮
            }
        }
    }
};
