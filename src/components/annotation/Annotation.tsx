import React from "react";
import { Rect, RectAttr } from "../shapes/rect";
import randomColor from 'randomcolor';

interface AnnotationProps {
    onChange: (val: RectAttr[]) => void;
    imageSrc?: string;
    containerName?: string;
    value?: RectAttr[];
}

export class Annotation extends React.Component<AnnotationProps> {
    containerName;
    imageSrc;
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    ctx: CanvasRenderingContext2D | null = null;
    ratio = window.devicePixelRatio
    containerSize = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };


    mousedownPosition
    mousemovePosition
    currentRectShape
    isDragging = false
    rectCache: Rect[] = []
    backgroundImage: HTMLImageElement
    onChange: (val: RectAttr[]) => void;

    constructor(props: AnnotationProps) {
        super(props);
        this.imageSrc = props.imageSrc
        this.containerName = props.containerName
        this.onChange = props.onChange

    }
    async componentDidMount() {
        if (this.imageSrc) {
            this.backgroundImage = await this.initImage()
            this.updateCanvasSizeByImage()
        } else {
            this.updateCanvasSizeByContainer()
        }
        const canvas = this.canvasRef.current! as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.addEventListener('mousedown', this.mousedown);
        canvas.addEventListener('mousemove', this.mousemove);
        canvas.addEventListener('mouseup', this.mouseup);
        this.generateDefaultShapes()
        this.draw()
    }
    componentDidUpdate(prevProps: Readonly<AnnotationProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.value !== this.props.value) {
            this.generateDefaultShapes()
            this.draw()
        }
    }
    generateDefaultShapes = () => {
        if (this.props.value && this.props.value.length > 0) {
            const defaultShapes = this.props.value.map(item => {
                return this.createRectFromData(item)
            })
            this.rectCache = [...defaultShapes]
        }
    }
    updateCanvasSizeByImage = () => {
        const canvas = this.canvasRef.current! as HTMLCanvasElement;
        const { width, left, top } = canvas.getBoundingClientRect();
        if (this.backgroundImage) {
            const height = width / this.backgroundImage.width * this.backgroundImage.height;
            this.containerSize = {
                width,
                height,
                left,
                top
            };
            canvas.width = width * this.ratio;
            canvas.height = height * this.ratio;
        }
    }

    updateCanvasSizeByContainer = () => {
        const canvas = this.canvasRef.current! as HTMLCanvasElement;
        const container = document.querySelector(`.${this.containerName}`)
        if (container) {

            const { width, height, left, top } = container.getBoundingClientRect();
            this.containerSize = {
                width,
                height,
                left,
                top
            };
            canvas.width = width * this.ratio;
            canvas.height = height * this.ratio;
        }
    }
    mousemove = (e) => {
        if (!this.isDragging) {
            return;
        }
        const { clientX, clientY } = e;

        const { left, top } = this.containerSize;
        const x = (clientX - left) * this.ratio;
        const y = (clientY - top) * this.ratio;
        this.mousemovePosition = {
            x,
            y,
        };
        const targetRect = this.findTargetRect(this.mousedownPosition);

        if (targetRect) {
            this.currentRectShape = targetRect;
        } else {
            this.currentRectShape = this.createRect();
        }
        if (this.currentRectShape) {
            this.updateRect()
        }
    }

    mousedown = (e) => {
        if (this.isDragging) {
            return;
        }
        this.isDragging = true;
        const { clientX, clientY } = e;
        const { left, top } = this.containerSize;
        const x = (clientX - left) * this.ratio;
        const y = (clientY - top) * this.ratio;
        this.mousedownPosition = {
            x: x,
            y: y,
        };

    }

    findTargetRect({ x, y }) {
        for (let index = 0; index < this.rectCache.length; index++) {
            const element = this.rectCache[index];
            if (element.isInside({ x, y })) {
                return element
            }
        }
        return null
    }

    mouseup = () => {
        this.isDragging = false
        this.mousedownPosition = null
        this.mousemovePosition = null
        this.currentRectShape = null
        this.onChange(this.rectCache.map(item => item.toJSON()))
    }

    initImage() {
        return new Promise((resolve: (val: HTMLImageElement) => void, reject) => {
            const image = new Image();
            image.src = this.imageSrc;
            image.onload = () => {
                resolve(image)
            }
            image.onerror = () => {
                reject(null)
            }
        })
    }
    drawImage() {
        if (!this.backgroundImage) {
            return;
        }
        this.ctx?.drawImage(this.backgroundImage, 0, 0, this.containerSize.width * this.ratio, this.containerSize.height * this.ratio);
    }
    draw = () => {
        if (!this.ctx) {
            return;
        }
        requestAnimationFrame(this.draw)
        this.ctx!.clearRect(0, 0, this.containerSize.width * this.ratio, this.containerSize.height * this.ratio);
        this.drawImage()
        for (let index = 0; index < this.rectCache.length; index++) {
            const element = this.rectCache[index];
            element.draw();
        }

    }
    updateRect() {
        this.currentRectShape.startX = this.mousedownPosition.x;
        this.currentRectShape.startY = this.mousedownPosition.y;
        this.currentRectShape.endX = this.mousemovePosition.x;
        this.currentRectShape.endY = this.mousemovePosition.y;
    }
    createRectFromData({ startX, startY, endX, endY, strokeStyle, text }) {
        const shape = new Rect({
            ctx: this.ctx,
            startX,
            startY,
            endX,
            endY,
            strokeStyle,
            text
        })
        return shape
    }

    createRect() {
        if (!this.ctx) {
            return null;
        }
        if (!this.mousedownPosition) {
            return null;
        }
        const shape = new Rect({
            ctx: this.ctx,
            startX: this.mousedownPosition.x,
            startY: this.mousedownPosition.y,
            endX: this.mousemovePosition?.x,
            endY: this.mousemovePosition?.y,
            strokeStyle: randomColor(),
            text: `实例${this.rectCache.length + 1}`
        })
        if (shape.ignore) {
            return null
        }
        this.rectCache.push(shape)
        return shape
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mousemove);
        window.removeEventListener('mousedown', this.mousedown);
        window.removeEventListener('mouseup', this.mouseup);
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                id="annotationCanvas"
                style={{
                    display: 'block',
                    width: '100%',
                    // height: '100%',
                }}>
            </canvas>
        )
    }
}
export default Annotation;