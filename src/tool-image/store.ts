import { makeAutoObservable } from 'mobx';
import { Rect } from '../components/shapes/rect';

class Store {
    shapes: Rect[] = []

    currentShape: Rect | undefined = undefined;

    inputValue: string = ''

    initialized = false;
    
    constructor() {
        makeAutoObservable(this, {
        });
    }

    setShapes(shapes: Rect[]) {
        this.shapes = [...shapes]
    }

    setCurrentShape(shape: Rect, index) {
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