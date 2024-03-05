import { makeAutoObservable } from 'mobx';
import { Rect } from '../components/shapes/rect';
import { toJS } from 'mobx';
export interface GroupItem { [key: string]: { shape: Rect[], inputValue: string} }
class Store {
    shapes: GroupItem | undefined = undefined

    currentGroup: string | undefined = undefined;

    initialized = false;

    constructor() {
        makeAutoObservable(this, { shapes: true }, { deep: true });
    }

    updateShapes(groupItem: { time: string, shape: Rect[] }) {
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
        this.currentGroup = time

    }
    setCurrentGroup(groupKey: string) {
        this.currentGroup = groupKey
    }

    setCurrentShape(shape: Rect, index) {
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