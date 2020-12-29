//根据两点坐标返回角度
function getAngle(pointArr) {
    let startPoint = pointArr[0]; //第一个点
    let endPoint = pointArr[1]; //第二个点
    let x = Math.abs(endPoint.x - startPoint.x); //x轴上移动的距离
    let y = Math.abs(endPoint.y - startPoint.y); //y轴上移动的距离
    let hypotenuse = Math.sqrt((x * x) + (y * y)); //直角三角形的斜边
    let angle = Math.asin(y / hypotenuse) / ((2 * Math.PI) / 360); //获得角度大小
    return Math.round(angle); //进行四舍五入
}

export default {
    getAngle
};
