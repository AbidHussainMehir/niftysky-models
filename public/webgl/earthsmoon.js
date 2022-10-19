

  waitForElm('#earthsmoon').then((elm) => {

    let controls;

    //===================================================== canvas
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
    // renderer.setClearColor(0x000000, 1);
    renderer.setSize(document.getElementById('earthsmoon').offsetWidth, document.getElementById('earthsmoon').offsetHeight);
    document.getElementById('earthsmoon').appendChild(renderer.domElement);


    document.getElementById('earthsmoon').onclick = function(){
      
      controls.autoRotate = false;
      document.querySelector("#earthsmoon .roler").style.display = "none";
    };

    const node = document.createElement("div");
    node.className = "roler";
    document.getElementById("earthsmoon").appendChild(node);


    //===================================================== scene
    var scene = new THREE.Scene();

    //===================================================== camera
    var camera = new THREE.PerspectiveCamera(
      60,
      document.getElementById('earthsmoon').offsetWidth / document.getElementById('earthsmoon').offsetHeight,
      0.01,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 0;
    camera.position.x = 0;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.minDistance = 2.2;
    controls.maxDistance = 6;


    controls.rotateSpeed = 0.4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;


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
      let width = document.getElementById('earthsmoon').offsetWidth;
      let height = document.getElementById('earthsmoon').offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    var loader = new THREE.GLTFLoader();
    var model;
    var animationtime = false;
    loader.load(
      "/glb/earthsmoon.glb",
      function (gltf) {
        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            //node.material.side = THREE.DoubleSide;
          }
        });

        model = gltf.scene;
        if (document.getElementById("earthsmoon").offsetWidth > 600) {
          model.scale.set(0.005, 0.005, 0.005);
        } else if (document.getElementById("earthsmoon").offsetWidth > 400) {
          model.scale.set(0.004, 0.004, 0.004);
        }  else {
          model.scale.set(0.0034, 0.0034, 0.0034);
        }
        
        // model.scale.set(0.004, 0.004, 0.004);
        scene.add(model);
      }
    );



    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    //scene.add( cube );


    function render() {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(render);

    }

    render();

  });