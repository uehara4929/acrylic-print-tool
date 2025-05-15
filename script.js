const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadPDF = document.getElementById('downloadPDF');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const rotateLeft = document.getElementById('rotateLeft');
const rotateRight = document.getElementById('rotateRight');

let scale = 1;
let rotation = 0;
let img = null;

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        img = new Image();
        img.onload = () => {
            scale = 1;
            rotation = 0;
            drawImage();
        };
        img.src = URL.createObjectURL(file);
    }
});

const drawImage = () => {
    const margin = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2 + margin, -img.height / 2 + margin);
    ctx.restore();

    // カットラインの描画
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeRect(margin / 2, margin / 2, canvas.width - margin, canvas.height - margin);
};

zoomIn.addEventListener('click', () => {
    scale += 0.1;
    drawImage();
});

zoomOut.addEventListener('click', () => {
    scale = Math.max(0.1, scale - 0.1);
    drawImage();
});

rotateLeft.addEventListener('click', () => {
    rotation -= 15;
    drawImage();
});

rotateRight.addEventListener('click', () => {
    rotation += 15;
    drawImage();
});

// PDF生成
downloadPDF.addEventListener('click', () => {
    const pdfCanvas = document.createElement('canvas');
    pdfCanvas.width = canvas.width;
    pdfCanvas.height = canvas.height;
    const pdfCtx = pdfCanvas.getContext('2d');

    pdfCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.href = pdfCanvas.toDataURL('application/pdf');
    link.download = 'acrylic_design.pdf';
    link.click();
});
