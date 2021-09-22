function createOptionTable(name, data) {
  var selectText = "";
  var deleteText = "";
  data.forEach((elem) => {
    if (elem.deleted != 1)
      selectText += `	 
        <tr>
          <td>
            <div class="col-auto my-1">
              <p class="form-check-label ${name}"  origin="${elem.id}"
                for="${name}-${elem.id}" >${elem.value} </p>
            </div>
          </td>

          <td>
            <div class="col-auto my-1">
              <input class="form-control" name=${name} 
              type=${name == "price" ? "number" : "text"} value="" hidden>
            </div> 
          </td>

          <td>
            <div class="col-auto my-1 selected-btns"  style="float:right;">
              <button  class="btn blue-button btn-edit">수정</button>
              <button  class="btn red-button btn-delete">삭제</button>
            </div>
            <div class="deleted-btns"  style="float:right;" hidden>
              <button  class="btn blue-button btn-restore">복구</button>
            </div>
          </td>
        </tr>
        `;
    else
      deleteText += `	 
    <tr>
      <td>
        <div class="col-auto my-1">
          <p class="form-check-label ${name}"  origin="${elem.id}"
            for="${name}-${elem.id}" >${elem.value} </p>
        </div>
      </td>

      <td>
        <div class="col-auto my-1">
          <input class="form-control" name=${name} 
          type=${name == "price" ? "number" : "text"} value="" hidden>
        </div> 
      </td>

      <td>
      <div class="col-auto my-1 selected-btns"  style="float:right;" hidden>
        <button  class="btn blue-button btn-edit">수정</button>
        <button  class="btn red-button btn-delete">삭제</button>
      </div>
      <div class="deleted-btns"  style="float:right;">
        <button  class="btn blue-button btn-restore">복구</button>
      </div>
      </td>
    </tr>
    `;
  });

  document
    .getElementById("selected")
    .insertAdjacentHTML("beforeend", selectText);
  document
    .getElementById("deleted")
    .insertAdjacentHTML("beforeend", deleteText);
}

function checkPriceInput(value) {
  if (
    !value.includes(",") ||
    value.includes("(") ||
    value.includes(")") ||
    isNaN(value.split(",")[1])
  ) {
    return false;
  }

  return true;
}

function editButtonClick(e) {
  const input = $(e.target).closest("tr").find(".form-control")[0];
  var value = input.value;

  if (input.hasAttribute("hidden")) {
    input.removeAttribute("hidden");
    e.target.innerHTML = "확인";
  } else {
    if (value != "") {
      const label = $(e.target).closest("tr").find("p")[0];
      label.innerHTML = value;
      $(label).addClass(" edited");
    }
    input.setAttribute("hidden", "");
    e.target.innerHTML = "수정";
  }
}

function deleteButtonClick(e) {
  const input = $(e.target).closest("tr")[0];
  const label = $(e.target).closest("tr").find("p")[0];

  if ($(label).hasClass("new")) $(input).remove();
  else {
    $(label).addClass(" restored");
    $(input).find(".selected-btns")[0].setAttribute("hidden", "");
    $(input).find(".deleted-btns")[0].removeAttribute("hidden");
    var element = $(input).detach();
    $("#deleted").append(element);
    $(label).addClass(" removed");
  }
}

function restoreButtonClick(e) {
  const input = $(e.target).closest("tr")[0];
  const label = $(e.target).closest("tr").find("p")[0];

  $(input).find(".deleted-btns")[0].setAttribute("hidden", "");
  $(input).find(".selected-btns")[0].removeAttribute("hidden");
  $(label).addClass(" restored");
  var element = $(input).detach();
  $("#selected").append(element);
}

function addOption(e) {
  var input = $(e.target).closest("div").find("input")[0].value;
  if (input == "") {
    alert("값이 비었습니다.");
    return;
  }
  var name = "gender";
  $("#selected").append(`
    <tr>

    <td>
      <div class="form-row align-items-center" style="display:flex; justify-content: space-between;">
      <div class="col-auto my-1">
        <p class="form-check-label ${name} new" for="${name}" > ${input} </p>
      </div>
     </td>

     <td>
      <div class="col-auto my-1">
        <input class="form-control" name=${name} type="text" value=""
        type=${name == "price" ? "number" : "text"} hidden
        >
      </div>
     </td>

     <td>
  	  <div class="col-auto my-1" style="float:right;">
      <button  class="btn blue-button btn-edit">수정</button>
      <button  class="btn red-button btn-delete">삭제</button>
  	  </div>
     </td>

     </tr>
   `);
  const editButton = $("#selected").find("tr").last().find(".btn-edit")[0];
  const deleteButton = $("selected").find("tr").last().find(".btn-delete")[0];
  $(editButton).on("click", (e) => {
    editButtonClick(e);
  });
  $(deleteButton).on("click", (e) => {
    deleteButtonClick(e);
  });
  $(e.target).closest("div").find("input")[0].value = "";
}

function addEditButtonEvent() {
  $(".btn-delete").on("click", (e) => {
    deleteButtonClick(e);
  });

  $(".btn-restore").on("click", (e) => {
    restoreButtonClick(e);
  });

  $(".btn-edit").on("click", (e) => {
    editButtonClick(e);
  });

  $(".btn-add").on("click", (e) => {
    addOption(e);
  });
}

function showDeleted() {
  if ($("#show-deleted").text().includes("않은")) {
    $("#selected")[0].removeAttribute("hidden");
    $("#deleted")[0].setAttribute("hidden", "");
    $("#show-deleted").text("삭제된 항목 보기");
  } else {
    $("#deleted")[0].removeAttribute("hidden");
    $("#selected")[0].setAttribute("hidden", "");
    $("#show-deleted").text("삭제되지 않은 항목 보기");
  }
}

axios({
  url: `/${document.getElementById("type").textContent}s`,
  method: "get",
})
  .then((res) => {
    const data = res.data.data;

    createOptionTable(document.getElementById("type").textContent, data);
    addEditButtonEvent();
  })
  .catch((e) => {
    console.log(e);
  });

document.getElementById("show-deleted").addEventListener("click", () => {
  showDeleted();
});
