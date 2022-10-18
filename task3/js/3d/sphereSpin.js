let scene3, mesh3;

window.addEventListener("DOMContentLoaded", sphereSpin.bind(null, "img/facebook.png"), false);

function sphereSpin(imgName) {
	// Three.jsを初期化
	var renderer = new THREE.WebGLRenderer();
	// 描画領域のサイズは縦横とも300ピクセル
	renderer.setSize(300, 300);
	// 背景色と不透明度を設定
	renderer.setClearColorHex(0x000000);
	// Three.jsによって生成されたCanvasを追加
	let canvas = document.getElementById("canvas3");
	canvas.appendChild(renderer.domElement);
	// カメラを初期化
	var camera = new THREE.PerspectiveCamera(40, 1.0, 1, 200);
	// カメラ位置を設定
	camera.position.set(0, 0, 40);
	camera.lookAt({ x: 0, y: 0, z: 0 });
	setSphereTexture(imgName);
	// カメラを追加
	scene3.add(camera);
	// レンダリング＆アニメーション
	function render() {
		let x = values["x2"] / 1000;
		let y = values["y2"] / 1000;
		let z = values["z2"] / 1000;
		mesh3.rotation.x = mesh3.rotation.x + x;
		mesh3.rotation.y = mesh3.rotation.y + y;
		mesh3.rotation.z = mesh3.rotation.z + z;
		requestAnimationFrame(render);
		renderer.render(scene3, camera);
	}
	render();
}

function setSphereTexture(imgName) {
	const texture = THREE.ImageUtils.loadTexture(imgName);
	var material = new THREE.MeshPhongMaterial();
	material.map = texture;

	var geometry = new THREE.SphereGeometry(10, 10, 10);
	mesh3 = new THREE.Mesh(geometry, material);
	// シーンを初期化する
	scene3 = new THREE.Scene();
	// 立方体を3Dシーンに追加
	scene3.add(mesh3);

	const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
	scene3.add(light);
}