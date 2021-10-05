import { pagenation } from "./pagenation.js";

(function ($) {
  $(function () {
    const sorts = document.getElementsByClassName("fa-sort");

    const start = document.getElementById("start");
    const end = document.getElementById("end");
    document.getElementById("filter").addEventListener("click", () => {
      receiverSort(start.value, end.value);
    });

    Array.from(sorts).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(elem.id);
        if (elem.getAttribute("desc") == null) {
          receiverSort(start.value, end.value, elem.id, "desc");
          elem.setAttribute("desc", "");
        } else {
          receiverSort(start.value, end.value, elem.id, "asc");
          elem.removeAttribute("desc");
        }
      });
    });
    receiverSort(
      "",
      "",
      $(document.getElementById("page"))[0].getAttribute("value"),
      $(document.getElementById("page"))[0].getAttribute("order")
    );

    const data = location.href.split("&");
    data.forEach((elem) => {
      const value = elem.split("=");
      if (
        value.length == 1 ||
        value[0].includes("page") ||
        value[0].includes("value") ||
        value[0].includes("order") ||
        value[1] == ""
      )
        return 1;
      $(document.getElementById(value[0]))[0].setAttribute("value", value[1]);
    });
  });
})(jQuery);

function receiverSort(start, end, value, order) {
  let container = $("#pagination");
  container.pagination({
    pageSize: 10,
    dataSource: function (done) {
      axios({
        url: `/admin/shipping/filter?page=${
          document.getElementById("page").textContent
        }&${value ? `value=${value}&order=${order}` : ""}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          start: start,
          end: end,
          _csrf: $("#_csrf").val(),
        }),
      })
        .then((res) => {
          const data = res.data.receiver;
          $(document.getElementById("page"))[0].setAttribute("value", value);
          $(document.getElementById("page"))[0].setAttribute("order", order);
          $("#order_list").empty();
          var dataHtml = "";
          $.each(data, function (index, user) {
            dataHtml += `<tr>
            <td scope="col">
            ${user.id}</td>
            <td scope="col">
            <p onclick="location.href='/admin/receiver/detail/${user.id}'"
            class="btn btn-light">${user.name}
            </p></td>
            <td scope="col">${user.phone}</td>
            <td scope="col">${user.address}, ${user.detail_address}</td>
            <td scope="col">${
              user?.Product?.name ? user.Product.name : "-"
            }</td>
            <td scope="col">
              <select class="form-select" aria-label="Default select example" id="${
                user.id
              }">
                <option value="배송전" ${
                  user.shipment_status == "배송전" ? "selected" : ""
                } >배송전</option>
                <option value="배송요청" ${
                  user.shipment_status == "배송요청" ? "selected" : ""
                }>배송요청</option>
                <option value="배송완료" ${
                  user.shipment_status == "배송완료" ? "selected" : ""
                }>배송완료</option>
                <option value="주문취소" ${
                  user.shipment_status == "주문취소" ? "selected" : ""
                }>주문취소</option>
              </select>
            </td>
            <td scope="col">${user.updatedAt}</td>
          </tr>`;
          });
          $("#order_list").append(dataHtml);

          $(".form-select").each((index, elem) => {
            $(elem).change(() => {
              selectChange(elem);
            });
          });

          pagenation(
            "/admin/shipping",
            res.data.page,
            res.data.totalPage,
            () => {
              return `start=${document.getElementById("start").value}&end=${
                document.getElementById("end").value
              }&value=${$(document.getElementById("page"))[0].getAttribute(
                "value"
              )}&order=${$(document.getElementById("page"))[0].getAttribute(
                "order"
              )}`;
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const selectChange = (target) => {
    if (!$(target).hasClass("changed")) $(target).addClass("changed");
  };
}
