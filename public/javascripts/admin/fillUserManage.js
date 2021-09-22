import { pagenation } from "./pagenation.js";

(function ($) {
  $(function () {
    const sorts = document.getElementsByClassName("fa-sort");

    Array.from(sorts).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (elem.getAttribute("desc") == null) {
          userSort(elem.id, "desc");
          elem.setAttribute("desc", "");
        } else {
          userSort(elem.id, "asc");
          elem.removeAttribute("desc");
        }
      });
    });

    userSort("", "");
  });
})(jQuery);

function userSort(value, order) {
  let container = $("#pagination");
  container.pagination({
    pageSize: 10,
    dataSource: function (done) {
      axios({
        url: `/admin/user/filter?page=
        ${document.getElementById("page").textContent}
        &value=${value}&order=${order}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          _csrf: $("#_csrf").val(),
        },
      })
        .then((res) => {
          $(document.getElementById("page"))[0].setAttribute("value", value);
          $(document.getElementById("page"))[0].setAttribute("order", order);
          const data = res.data.user;
          $("#user_list").empty();
          var dataHtml = "";
          $.each(data, function (index, user) {
            dataHtml += `<tr> <td scope="col"><p>${user.id}</p></td>
                          <td scope="col"><p onclick="location.href='/admin/user/detail/${
                            user.id
                          }'" class="btn btn-light">${user.email}</p></td>
                          <td scope="col">
                          <p>${user.nickname}
                          </p></td>
                          <td scope="col"><p>${user.createdAt}</p></td>
                          <td scope="col"><p>${user.order_count}</p></td>
                          <td scope="col"><p>${user.order_amount}</p></td>
                          <td scope="col">
                          ${
                            user.deleted == 1
                              ? `<button
                              type="button"
                              class="btn blue-button btn-restore"
                              id="${user.id}"
                            >
                              탈퇴취소
                            </button>
                          </td>
                              `
                              : ` <button
                            type="button"
                            class="btn red-button btn-resign"
                            id="${user.id}"
                          >
                            탈퇴처리
                          </button>
                        </td>`
                          }
                         `;
          });
          $("#user_list").append(dataHtml);

          const resign = document.getElementsByClassName("btn-resign");
          Array.from(resign).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              deleteUser(elem);
            });
          });

          const restore = document.getElementsByClassName("btn-restore");
          Array.from(restore).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              restoreUser(elem);
            });
          });

          pagenation("/admin/user", res.data.page, res.data.totalPage, () => {
            return `email=&value=${$(
              document.getElementById("page")
            )[0].getAttribute("value")}&order=${$(
              document.getElementById("page")
            )[0].getAttribute("order")}`;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}

function deleteUser(elem) {
  if (!confirm("정말 탈퇴시키시겠습니까?")) return;
  axios({
    url: `/admin/user/${elem.id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      _csrf: $("#_csrf").val(),
    },
  })
    .then((res) => {
      alert("탈퇴 되었습니다");
      window.location.reload();
    })
    .catch((err) => {
      alert("탈퇴 시키지 못했습니다");
      console.log(err.error);
    });
}

function restoreUser(elem) {
  if (!confirm("정말 복구시키시겠습니까?")) return;
  axios({
    url: `/admin/user/${elem.id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      _csrf: $("#_csrf").val(),
    },
  })
    .then((res) => {
      alert("복구 되었습니다");
      window.location.reload();
    })
    .catch((err) => {
      alert("복구 하지 못했습니다");
      console.log(err.error);
    });
}
