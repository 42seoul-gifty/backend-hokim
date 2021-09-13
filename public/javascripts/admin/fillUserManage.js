(function ($) {
  $(function () {
    const sorts = document.getElementsByClassName("fa-sort");

    Array.from(sorts).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (elem.getAttribute("desc") == null) {
          userSort(elem.id + " desc");
          elem.setAttribute("desc", "");
        } else {
          userSort(elem.id + " asc");
          elem.removeAttribute("desc");
        }
      });
    });

    userSort("");
  });
})(jQuery);

function userSort(value) {
  let container = $("#pagination");
  container.pagination({
    pageSize: 10,
    dataSource: function (done) {
      axios({
        url: `/admin/user/filter?order=${value}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          _csrf: $("#_csrf").val(),
        },
      })
        .then((res) => {
          const data = res.data.user;
          console.log(data);
          $("#user_list").empty();
          var dataHtml = "";
          $.each(data, function (index, user) {
            dataHtml += `<tr> <td scope="col"><p>${user.id}</p></td>
                          <td scope="col"><p>${user.nickname}</p></td>
                          <td scope="col"><p>${user.createdAt}</p></td>
                          <td scope="col"><p>${user.order_count}</p></td>
                          <td scope="col"><p>${user.order_amount}</p></td>
                          <td scope="col">
                          <button
                            type="button"
                            class="btn btn-light btn-resign"
                            id="${user.id}"
                          >
                            탈퇴처리
                          </button>
                        </td>`;
          });
          $("#user_list").append(dataHtml);

          const resign = document.getElementsByClassName("btn-resign");
          Array.from(resign).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              deleteUser(elem);
            });
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
  $(elem).closest("tr").remove();
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
    })
    .catch((err) => {
      alert("탈퇴 시키지 못했습니다");
      console.log(err.error);
    });
}
