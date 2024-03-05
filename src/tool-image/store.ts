import { makeAutoObservable } from 'mobx';
import { RectAttr } from '../components/shapes/rect';
import { toJS } from 'mobx';
class Store {
    shapes: RectAttr[] = undefined
    currentShape: RectAttr | undefined = undefined;

    inputValue: string = ''

    initialized = false;
    
    constructor() {
        makeAutoObservable(this, {
        });
    }

    setShapes(shapes: RectAttr[]) {
        this.shapes = [...shapes]
    }

    setCurrentShape(shape: RectAttr, index) {
        this.currentShape = shape
        this.inputValue = `${this.inputValue} 【${shape.text}】`
    }

    setInputValue(val: string) {
        this.inputValue = val
    }
    async init() {
        this.initialized = true;

    }
}
export default new Store();