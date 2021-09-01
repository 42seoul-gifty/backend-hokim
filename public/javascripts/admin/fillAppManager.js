function createUneditableOptionTable(title, name, data) {
  var innerText = `<table id="select" class="table" style="margin-top: 10px;">
	  <tr><th>${title}</th></tr>
	  <tr><td>
	  
		<ul class="list-group" >
		`;
  data.forEach((elem) => {
    innerText += `	 
		   <li class="list-group-item" >
			<div class="form-row align-items-center" style="display:flex; justify-content: space-between;">
			  <div class="col-auto my-1">
				<div class="form-check">
					<label class="form-check-label" for="${name}-${elem.id}" > ${elem.value} </label>
				  </div> 
			  </div>
		
			  
			</div>
		  </li>`;
  });

  innerText += ` 
	
  </ul></td></tr>
  </table>  `;

  document
    .getElementById("button-group")
    .insertAdjacentHTML("beforebegin", innerText);
}

function createOptionTable(title, name, data) {
  var innerText = `<table id="select" class="table" style="margin-top: 10px;">
	<tr><th>${title}</th></tr>
	<tr><td>
	
	  <ul class="list-group" type=${name}>
	  `;
  data.forEach((elem) => {
    innerText += `	 
		 <li class="list-group-item" >
		  <div class="form-row align-items-center" style="display:flex; justify-content: space-between;">
			<div class="col-auto my-1">
			  <div class="form-check">
				  <input class="form-check-input" name=${title} type="checkbox" value="" id="${name}-${elem.id}" >
				  <label class="form-check-label ${name}" for="${name}-${elem.id}" > ${elem.value} </label>
				</div> 
			</div>
			<div class="col-auto my-1">
			  <input class="form-control" name=${title} type="text" value="" hidden>
			</div> 
			
			 <div class="col-auto my-1">
				<button  class="btn btn-success  btn-edit">수정</button>
			</div>
		  </div>
		</li>`;
  });

  innerText += ` 
	  <li class="list-group-item" >
		<input class="form-control" name=${title} type="text" value="" placeholder="${title}을(를) 입력하세요" >
		<button  class="btn btn-success form-control btn-add" >추가</button>
		
	  </li>
</ul></td></tr>
</table>  `;

  document
    .getElementById("button-group")
    .insertAdjacentHTML("beforebegin", innerText);
}

function editButtonClick(e) {
  const input = $(e.target).closest("li").find(".form-control")[0];
  if (input.hasAttribute("hidden")) {
    input.removeAttribute("hidden");
    e.target.innerHTML = "확인";
  } else {
    if (input.value != "") {
      console.log(input.value);
      const label = $(e.target).closest("li").find("label")[0];
      if (!$(label).attr("origin")) $(label).attr("origin", label.innerHTML);
      label.innerHTML = input.value;
      $(label).addClass(" edited");
    }
    input.value = "";
    input.setAttribute("hidden", "");
    e.target.innerHTML = "수정";
  }
}

function addOption(e) {
  const ul = $(e.target).closest("ul");
  const input = $(e.target).closest("li").find("input")[0].value;
  const name = $(ul).attr("type");

  $(ul).find("li").last().before(`
    <li class="list-group-item" >
     <div class="form-row align-items-center" style="display:flex; justify-content: space-between;">
  	 <div class="col-auto my-1">
  	   <div class="form-check">
  		   <input class="form-check-input" name=${name} type="checkbox" value="" id="${name}" >
  		   <label class="form-check-label ${name} new" for="${name}" > ${input} </label>
  		 </div>
  	 </div>
  	 <div class="col-auto my-1">
  	   <input class="form-control" name=${name} type="text" value="" hidden>
  	 </div>

  	  <div class="col-auto my-1">
  		 <button  class="btn btn-success  btn-edit new">수정</button>
  	 </div>
     </div>
   </li>`);
  const Button = $(ul).find("li").last().prev().find(".btn-edit")[0];
  $(Button).on("click", (e) => {
    editButtonClick(e);
  });
  $(e.target).closest("li").find("input")[0].value = "";
}

function addEditButtonEvent() {
  $(".btn-edit").on("click", (e) => {
    editButtonClick(e);
  });

  $(".btn-add").on("click", (e) => {
    addOption(e);
  });
}

axios({ url: "/all", method: "get" })
  .then((res) => {
    console.log(res.data);
    const data = res.data.data;
    createUneditableOptionTable("성별", "gender", data.gender);
    createOptionTable("나이", "age", data.age);
    createOptionTable("금액대", "price", data.price);
    createOptionTable("그룹", "group", data.group);
    addEditButtonEvent();
  })
  .catch((e) => {
    console.log(e);
  });
