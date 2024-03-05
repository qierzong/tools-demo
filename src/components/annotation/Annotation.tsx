import React from "react";
import { Rect } from "../shapes/rect";
import randomColor from 'randomcolor';

interface AnnotationProps {
    onChange: (val: Rect[], index: number) => void;
}

export class Annotation extends React.Component<AnnotationProps> {
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
    onChange: (val: Rect[], index: number) => void;


    constructor(props: AnnotationProps) {
        super(props);
        this.onChange = props.onChange

    }
    async componentDidMount() {
        this.backgroundImage = await this.initImage()

        const canvas = this.canvasRef.current! as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const { width, left, top } = canvas.getBoundingClientRect();
        const height = width / this.backgroundImage.width * this.backgroundImage.height;

        this.containerSize = {
            width,
            height,
            left,
            top
        };
        canvas.width = width * this.ratio;
        canvas.height = height * this.ratio;
        canvas.addEventListener('mousedown', this.mousedown);
        canvas.addEventListener('mousemove', this.mousemove);
        canvas.addEventListener('mouseup', this.mouseup);
        
        this.draw()
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
        this.onChange(this.rectCache)
    }
    initImage() {
        return new Promise((resolve: (val: HTMLImageElement) => void, reject) => {
            const image = new Image();
            image.src = 'https://oss-prd.appen.com.cn:9001/appen-matrixgo/test/dogs.jpg';
            image.onload = () => {
                resolve(image)
            }
            image.onerror = () => {
                reject(null)
            }
        })
    }
    drawImage() {
        this.ctx?.drawImage(this.backgroundImage, 0, 0, this.containerSize.width * this.ratio, this.containerSize.height * this.ratio);
    }
    draw = () => {
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