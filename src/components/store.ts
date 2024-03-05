import { makeAutoObservable, runInAction, action, makeObservable } from 'mobx';
import { Rect } from './shapes/rect';
class Store {
    shapes: Rect[] = []

    currentShape: Rect|undefined = undefined;

    /**
     * is tool initialized
     */
    initialized = false;
    constructor() {
        makeAutoObservable(this, {
        });

    }
    setShapes(shapes: Rect[]) {
        this.shapes = [...shapes]
    }

    setCurrentShape(shape: Rect) {
        this.currentShape = shape
    }

    async init() {
        this.initialized = true;

    }
}
export default new Store();