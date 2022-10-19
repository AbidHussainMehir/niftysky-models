waitForElm('#mars').then((elm) => {

  let controls;
  
  let marsgroup = new THREE.Object3D();
  var alcastro = new THREE.Raycaster();
  const cursor = {x: 0, y: 0}
  let pins = [];

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(document.getElementById('mars').offsetWidth, document.getElementById('mars').offsetHeight);
  document.getElementById('mars').appendChild(renderer.domElement);

  document.getElementById('mars').onclick = function(){
    controls.autoRotate = false;
    document.querySelector("#mars .roler").style.display = "none";
  };

  const node = document.createElement("div");
  node.className = "roler";
  document.getElementById("mars").appendChild(node);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,
    document.getElementById('mars').offsetWidth / document.getElementById('mars').offsetHeight,
    0.01,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 0;
  camera.position.x = 0;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.minDistance = 3;
  controls.maxDistance = 6;

  controls.rotateSpeed = 0.4;
  controls.autoRotate = true;
  controls.autoRotateSpeed = -10;

  controls.update();
  //===================================================== lights
  var light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(1, 1, 1).normalize();
  scene.add(light1);
  var light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(-1, -1, -1).normalize();
  scene.add(light2);

  var light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(1, -2, 1).normalize();
  scene.add(light3);
  var light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(3, -1, -1).normalize();
  scene.add(light4);

  var light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);

  //===================================================== resize
  window.addEventListener("resize", function () {
    let width = document.getElementById('mars').offsetWidth;
    let height = document.getElementById('mars').offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

document.getElementById('mars').addEventListener('mousemove', movecallback, false);
function movecallback(event){
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
cursor.x = (x / document.getElementById('mars').offsetWidth) * 2 - 1;
cursor.y =  - (y / document.getElementById('mars').offsetHeight) * 2 + 1;
}
// function movecallback(event){
//   cursor.x = (event.clientX / document.getElementById('mars').offsetWidth) * 2 - 1;
//   cursor.y =  - (event.clientY / document.getElementById('mars').offsetHeight) * 2 + 1;
// }

document.getElementById('mars').addEventListener('click', clickcallback);
function clickcallback(event){   
alcastro.setFromCamera(cursor, camera);
var intersects = alcastro.intersectObjects( pins );
if (intersects.length>0){
        showpopup(intersects[0].object.userData.lat, intersects[0].object.userData.long,intersects[0].object.userData.title,intersects[0].object.userData.diameter,intersects[0].object.userData.region)
}
}

  var loader = new THREE.GLTFLoader();
  var model;
  var animationtime = false;
  loader.load(
    "/glb/mars.glb",
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
        }
      });

      model = gltf.scene;
      // model.scale.set(0.004, 0.004, 0.004);
      if (document.getElementById("mars").offsetWidth > 600) {
        model.scale.set(0.0056, 0.0056, 0.0056);
      } else if (document.getElementById("mars").offsetWidth > 400) {
        model.scale.set(0.0047, 0.0047, 0.0047);
      } else {
        model.scale.set(0.004, 0.004, 0.004);
      }
      model.rotation.y = Math.PI;
      marsgroup.add(model);
    }
  );

  //fetch('https://api.niftysky.org/moon-items?_limit=20000&category=mars')
  fetch('/data/moon-items.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    for (var i = 0; i < myJson.length; i++){     
      const pin = new THREE.Mesh( new THREE.SphereGeometry( 0.02, 12, 12 ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
      var latRad = myJson[i].Center_Latitude * (Math.PI / 180);
      var lonRad = -myJson[i].Center_Longitude * (Math.PI / 180);
      if (document.getElementById("mars").offsetWidth > 600) {
        pin.position.set(
          Math.cos(latRad) * Math.cos(lonRad) * 2.81,
          Math.sin(latRad) * 2.81,
          Math.cos(latRad) * Math.sin(lonRad) * 2.81
      );
      } else if (document.getElementById("mars").offsetWidth > 400) {
        pin.position.set(
          Math.cos(latRad) * Math.cos(lonRad) * 2.36,
          Math.sin(latRad) * 2.36,
          Math.cos(latRad) * Math.sin(lonRad) * 2.36
      );
      } else {
        pin.position.set(
          Math.cos(latRad) * Math.cos(lonRad) * 2,
          Math.sin(latRad) * 2,
          Math.cos(latRad) * Math.sin(lonRad) * 2
      );      }
     
      //pin.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
      pin.userData = {
        region:myJson[i].Quad,
        Center_Latitude:myJson[i].Center_Latitude,
         diameter:myJson[i].diameter,title:myJson[i].title,lat: myJson[i].Center_Latitude, long: myJson[i].Center_Longitude };
      pins.push( pin );
      marsgroup.add(pin); 
    }
    scene.add(marsgroup);
  });

  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);

  }
  render();
});






//IDEALLY YOU HAVE TO REMOVE BELOW CODE AND DEFINE THIS FUNCTION OUTSIDE webgl or three FOLDERS IN REACT
function showpopup(lat, long,title,dia,region){
  var modal = document.getElementById("myModal");
    document.getElementById("marsModel").innerHTML=`${title}`
    document.getElementById("diameter").innerHTML=`Diameter: ${dia}`
    document.getElementById("region").innerHTML=`Region: ${region}`
    modal.style.display = "block";
  // marsModel
  //  alert("Show Popup at: Lat: " + lat +", Long: "+ long +"for :"+title);
}