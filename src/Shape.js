export default class Shape {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.gravity = 2
    }

    update() {
        this.y +=this.gravity
    }

    draw(ctx) {
        ctx.beginPath();

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.closePath();

        ctx.shadowBlur = 0;
    }

    containsPoint(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}