export class Rect {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    ctx: CanvasRenderingContext2D | null = null;
    text = '';
    ratio = window.devicePixelRatio
    strokeStyle = '#ff0000'
    textSize = { width: 42 * this.ratio, height: 20 * this.ratio };
    roundRectRadius = 2 * this.ratio;
    roundRectStyle = '#FFE600';
    fontStyle = `${12 * this.ratio}px Arial`;
    lineColor = '#FFE600';
    textColor = '#0f121a';
    constructor(props: { ctx: any; startX: any; startY: any; endX: any; endY: any; strokeStyle: any; text: any; }) {
        this.startX = props.startX
        this.startY = props.startY
        this.endX = props.endX
        this.endY = props.endY
        this.ctx = props.ctx
        this.text = props.text
        this.strokeStyle = props.strokeStyle
    }
    get minX() {
        return Math.min(this.startX, this.endX)
    }
    get maxX() {
        return Math.max(this.startX, this.endX)
    }
    get minY() {
        return Math.min(this.startY, this.endY)
    }
    get maxY() {
        return Math.max(this.startY, this.endY)
    }
    minDistance = 2

    get ignore() {
        return this.maxX - this.minX < this.minDistance || this.maxY - this.minY < this.minDistance
    }
    draw() {
        if (this.ignore) {
            return
        }
        this.drawRect()
        this.drawNumber()
    }
    drawRect() {
        if (!this.ctx) {
            return
        }
        const width = this.maxX - this.minX
        const height = this.maxY - this.minY;
        this.ctx.lineWidth = 2 * this.ratio;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.strokeRect(this.minX, this.minY, width, height);
    }
    drawNumber() {
        if (!this.ctx) {
            return
        }
        const rectPos = {
            x: this.minX - 1 * this.ratio,
            y: this.minY - this.textSize.height - 1 * this.ratio,
        };
        const textPos = {
            x: this.minX + 4 * this.ratio,
            y: this.minY - this.textSize.height / 3
        };
        this.ctx.font = this.fontStyle;
        this.ctx.fillStyle = this.roundRectStyle;
        this.ctx.roundRect(rectPos.x, rectPos.y, this.textSize.width, this.textSize.height, this.roundRectRadius);
        this.ctx.fill();

        const textYStr = `${this.text}`;
        this.ctx.fillStyle = this.textColor;
        this.ctx.beginPath();
        this.ctx.fillText(textYStr, textPos.x, textPos.y);
        this.ctx.closePath();
    }
    isInside({ x, y }) {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
    }
    toJSON() {
        return {
            text: this.text
        }
    }
}