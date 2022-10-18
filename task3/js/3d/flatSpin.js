let scene2, mesh2;

let values = [{ "x1": 0 }, { "y1": 50 }, { "z1": 0 },
{ "z2": 0 }, { "y2": 50 }, { "z2": 0 }];
let x = 0.01;

window.addEventListener("DOMContentLoaded", function () {
	let sliders = document.getElementsByClassName("slider");
	for (let i = 0; i < sliders.length; i++) {
		values[sliders[i].id] = sliders[i].value;
	}
}, false);

window.addEventListener("DOMContentLoaded", flatSpin.bind(null, "img/facebook.png"), false);


function flatSpin(imgName) {
	// Three.jsを初期化
	var renderer = new THREE.WebGLRenderer();
	// 描画領域のサイズは縦横とも300ピクセル
	renderer.setSize(300, 300);
	// 背景色と不透明度を設定
	renderer.setClearColorHex(0x000000);
	// Three.jsによって生成されたCanvasを追加
	let canvas = document.getElementById("canvas2");
	canvas.appendChild(renderer.domElement);
	// カメラを初期化
	var camera = new THREE.PerspectiveCamera(40, 1.0, 1, 200);
	// カメラ位置を設定
	camera.position.set(0, 0, 40);
	camera.lookAt({ x: 0, y: 0, z: 0 });
	setFlatTexture(imgName);
	// カメラを追加
	scene2.add(camera);
	// レンダリング＆アニメーション
	function render() {
		// 回転
		let x = values["x1"] / 1000;
		let y = values["y1"] / 1000;
		let z = values["z1"] / 1000;
		mesh2.rotation.x = mesh2.rotation.x + x;
		mesh2.rotation.y = mesh2.rotation.y + y;
		mesh2.rotation.z = mesh2.rotation.z + z;
		requestAnimationFrame(render);
		renderer.render(scene2, camera);
	}
	render();
}

function setFlatTexture(imgName) {
	const texture = THREE.ImageUtils.loadTexture(imgName);
	var material = new THREE.MeshPhongMaterial();
	material.map = texture;

	var geometry = new THREE.CubeGeometry(20, 20, 0);
	mesh2 = new THREE.Mesh(geometry, material);
	// シーンを初期化する
	scene2 = new THREE.Scene();
	// 立方体を3Dシーンに追加
	scene2.add(mesh2);

	const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
	scene2.add(light);
}