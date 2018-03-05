var modal_num = 0;


window.onresize = function () {
  arrange_person();
};

window.onload = function() {
  // Get the modal
  var modal = document.getElementById('modal-area');
  var prev_btn = document.getElementById('prev_btn');
  var next_btn = document.getElementById('next_btn');
  var close_btn = document.getElementById('close_btn');

  var people_contents = [];
  var people_btn = [];
  var total_num = 15;

  for(var i=0; i<total_num; i++) {
    var content = document.getElementById('people' + i );
    var btn = document.getElementById(i);
    people_contents.push(content);
    people_btn.push(btn);
  }

  arrange_person();

  for (var j=0; j<total_num; j++) {
    people_btn[j].onclick = function(ele) {
      prev_btn.onclick = function() {
        modal_num--;
        if(modal_num < 0) {
          modal_num = people_contents.length-1;
        }
        hidden_Modal();
        people_contents[modal_num].style.display = "block";
      };

      next_btn.onclick = function() {
        modal_num++;
        if(modal_num > people_contents.length-1) {
          modal_num = 0;
        }
        hidden_Modal();
        people_contents[modal_num].style.display = "block";
      };

      var id_value = ele.target.id;
      var id_number = Number(id_value);
      modal_num = id_number;
      hidden_Modal();
      people_contents[id_number].style.display = "block";
    };
  }

  function hidden_Modal() {
    modal.style.display = "block";
    for (var k=0; k<total_num; k++) {
      people_contents[k].style.display = "none";
    }
  }


  close_btn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
};

function arrange_person() {
  var full_width =document.getElementById('person-wrapper').offsetWidth;
  var img_width = 0;
  if(window.innerWidth < 641) {
    img_width =document.getElementsByClassName('people-modal')[0].offsetWidth + 20;
  } else {
    img_width =document.getElementsByClassName('people-modal')[0].offsetWidth + 32;
  }

  var num = parseInt(full_width / img_width);
  document.getElementById('person-list').style.marginLeft = (full_width - img_width*num) / 2 + 'px';
}
