import { makeAutoObservable } from 'mobx';
import { RectAttr } from '../components/shapes/rect';
import { toJS } from 'mobx';
export interface GroupItem { [key: string]: { shape: RectAttr[], inputValue: string} }
class Store {
    shapes: GroupItem | undefined = {
        "00:00:00": {
            "shape": [
                {
                    "text": "实例1",
                    "startX": 149,
                    "startY": 314,
                    "endX": 429,
                    "endY": 604,
                    "strokeStyle": "#ea7ebf"
                }
            ],
            "inputValue": "123【实例1】"
        },
        "00:00:01": {
            "shape": [
                {
                    "text": "实例1",
                    "startX": 233,
                    "startY": 250,
                    "endX": 505,
                    "endY": 582,
                    "strokeStyle": "#b3e2ef"
                },
                {
                    "text": "实例2",
                    "startX": 569,
                    "startY": 130,
                    "endX": 845,
                    "endY": 452,
                    "strokeStyle": "#fc2dd3"
                }
            ],
            "inputValue": "456【实例2】"
        },
        "00:00:02": {
            "shape": [
                {
                    "text": "实例1",
                    "startX": 177,
                    "startY": 358,
                    "endX": 355,
                    "endY": 640,
                    "strokeStyle": "#946af7"
                },
                {
                    "text": "实例2",
                    "startX": 547,
                    "startY": 48,
                    "endX": 801,
                    "endY": 552,
                    "strokeStyle": "#e5b879"
                },
                {
                    "text": "实例3",
                    "startX": 925,
                    "startY": 220,
                    "endX": 1049,
                    "endY": 622,
                    "strokeStyle": "#1057a8"
                }
            ],
            "inputValue": ""
        }
    }

    currentGroup: string | undefined = undefined;

    initialized = false;

    constructor() {
        makeAutoObservable(this, { shapes: true }, { deep: true });
    }

    updateShapes(groupItem: { time: string, shape: RectAttr[] }) {
        const { time, shape } = groupItem
        if (!this.shapes) {
            this.shapes = { [time]: {shape: [...shape], inputValue: ''} }
        } else {
            const originShapes = {...this.shapes[time]}
            this.shapes = { 
                ...this.shapes, 
                [time]: {
                    shape: [...shape],
                    inputValue: originShapes.inputValue || ''
                },
                
            };
        }
        // console.log(toJS(this.shapes))
        this.currentGroup = time

    }
    setCurrentGroup(groupKey: string) {
        this.currentGroup = groupKey
    }

    setCurrentShape(shape: RectAttr, index) {
        if(!this.shapes || !this.currentGroup) {
            return;
        }
        this.shapes[this.currentGroup].inputValue = `${this.shapes[this.currentGroup].inputValue} 【${shape.text}】`
    }

    setInputValue(val: string) {
        if(!this.shapes || !this.currentGroup) {
            return;
        }
        this.shapes[this.currentGroup].inputValue = val

    }
    async init() {
        this.initialized = true;

    }
}
export default new Store();